import React, { Component } from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity, ImageBackground, Dimensions,
    TextInput, SafeAreaView, StatusBar, Keyboard, Image, Platform
} from 'react-native';
import RegisterService from '../../Services/RegisterService/RegisterService';
import { ScrollView } from 'react-native-gesture-handler';
import Loading from '../../Components/Loader/Loading';
import Loader from '../../Components/Loader/Loader';
import axiosConfig from '../../Helpers/axiosConfig';
import * as KEY from '../../context/actions/key';
import * as TYPE from '../../context/actions/type';
import * as COLOR from '../../styles/colors';
import * as IMAGE from '../../styles/image';
import * as FONT from '../../styles/typography';
const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;
import Toast from 'react-native-simple-toast';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { getBranchDetails } from '../../Services/LocalService/LocalService';

class RegisterScreen extends Component {
    constructor(props) {
        super(props);
        this.getBranch = null;
        this.state = {
            fullname: null,
            fullnameError: null,
            username: null,
            usernameError: null,
            mobilenumber: null,
            mobilenumberError: null,
            password: null,
            passwordError: null,
            loading: false,
            loader: true,
        }
        this.setFullName = this.setFullName.bind(this);
        this.setUserName = this.setUserName.bind(this);
        this.setMobileNumber = this.setMobileNumber.bind(this);
        this.setPassword = this.setPassword.bind(this);
        this.onPressSubmit = this.onPressSubmit.bind(this);
        this.secondTextInputRef = React.createRef();
        this.TeardTextInputRef = React.createRef();
    }

    resetScreen() {
        this.setState({
            fullname: null,
            fullnameError: null,
            username: null,
            usernameError: null,
            mobilenumber: null,
            mobilenumberError: null,
            password: null,
            passwordError: null,
            loading: false,
            loader: false,
        });
    }

    setFullName(fullname) {
        if (!fullname || fullname.length <= 0) {
            return this.setState({ fullnameError: 'User Name cannot be empty' });
        }
        return this.setState({ fullname: fullname, fullnameError: null })
    }

    setUserName(email) {
        const re = /\S+@\S+\.\S+/;
        if (!email || email.length <= 0) {
            return this.setState({ usernameError: 'Email Id can not be empty' });
        }
        if (!re.test(email)) {

            return this.setState({ usernameError: 'Ooops! We need a valid email address' });
        }
        return this.setState({ username: email, usernameError: null })
    }

    setMobileNumber(mobilenumber) {
        const reg = /^[0]?[789]\d{9}$/;
        if (!mobilenumber || mobilenumber.length <= 0) {
            return this.setState({ mobilenumberError: 'Mobile Number cannot be empty' });
        }
        if (!reg.test(mobilenumber)) {
            return this.setState({ mobilenumberError: 'Ooops! We need a valid Mobile Number' });
        }
        return this.setState({ mobilenumber: mobilenumber, mobilenumberError: null })
    }

    setPassword(password) {
        if (!password || password.length <= 0) {
            return this.setState({ passwordError: 'Password cannot be empty' });
        }
        return this.setState({ password: password, passwordError: null })
    }

    onPressSubmit = async () => {
        const { fullname, username, mobilenumber, password } = this.state;
        axiosConfig(this.getBranch?.property?.authkey);
        if (!fullname || !username || !password) {
            this.setFullName(fullname)
            this.setUserName(username)
            this.setPassword(password)
            //this.setMobileNumber(mobilenumber)
            return;
        }
        const body = {
            property: {
                fullname: fullname,
                primaryemail: username,
                //mobile: mobilenumber,
            },
            password: password
        }
        this.setState({ loading: true })
        try {
            await RegisterService(body).then(response => {
                if (response.data && response.data != undefined && response.status == 200) {
                    Toast.show('SignUp Success', Toast.SHORT);
                    this.props.navigation.navigate('LoginScreen');
                }
            })
        }
        catch (error) {
            this.setState({ loading: false })
            Toast.show('SignUp Problem!', Toast.SHORT);
        }
    }

    async componentDidMount() {
        const getBranch = await getBranchDetails();
        this.getBranch = getBranch;
        this.wait(1000).then(() => this.setState({ loader: false }));
    }

    wait = (timeout) => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }

    render() {
        const { fullnameError, usernameError, mobilenumberError, passwordError, loader, loading } = this.state;
        return (
            <SafeAreaView style={styles().container}>
                <StatusBar backgroundColor={this.getBranch?.property?.headercolorcode ? this.getBranch.property.headercolorcode : COLOR.HEADERCOLOR} barStyle={Platform.OS === 'ios' ? KEY.DARK_CONTENT : KEY.LIGHT_CONTENT} />
                <ScrollView
                    Vertical={true}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps={KEY.ALWAYS}
                >
                    <ImageBackground source={IMAGE.BACKGROUND_IMAGE}
                        imageStyle={{ tintColor: this.getBranch?.property?.headercolorcode ? this.getBranch.property.headercolorcode : COLOR.HEADERCOLOR }}
                        tintColor={this.getBranch?.property?.headercolorcode ? this.getBranch.property.headercolorcode : COLOR.HEADERCOLOR}
                        style={styles(this.getBranch?.property?.headercolorcode ? this.getBranch.property.headercolorcode : COLOR.HEADERCOLOR).backgroundImage}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack('LoginScreen')}>
                            <AntDesign name='arrowleft' color={COLOR.WHITE} size={24} style={{ marginTop: 35, marginLeft: 20 }} />
                        </TouchableOpacity>
                        <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, marginTop: 0 }}>

                            <Image style={styles().imageLogo} resizeMode={KEY.COVER} source={this.getBranch?.property?.mobilelogo ? { uri: this.getBranch?.property?.mobilelogo } : { uri: TYPE.DefaultImage }} />
                        </View>
                    </ImageBackground>
                    <View style={styles().createtext}>
                        <Text style={{ color: COLOR.BLACK, fontSize: 28, fontFamily: FONT.FONT_FAMILY_REGULAR }}>Create Account</Text>
                    </View>

                    <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                        <View style={styles().inputview}>
                            <TextInput
                                style={fullnameError == null ? styles().TextInput : styles().TextInputError}
                                defaultValue={this.state.fullname}
                                placeholder="Full Name"
                                type={KEY.CLEAR}
                                returnKeyType={KEY.NEXT}
                                placeholderTextColor={COLOR.PLACEHOLDER_COLOR}
                                blurOnSubmit={false}
                                onSubmitEditing={() => { this.secondTextInputRef.current.focus() }}
                                onChangeText={(fullname) => this.setFullName(fullname)}
                            />
                        </View>
                        <View style={styles().inputview}>
                            <TextInput
                                style={usernameError == null ? styles().TextInput : styles().TextInputError}
                                defaultValue={this.state.username}
                                placeholder="Email"
                                type={KEY.CLEAR}
                                placeholderTextColor={COLOR.PLACEHOLDER_COLOR}
                                returnKeyType={KEY.NEXT}
                                autoCapitalize="none"
                                autoCompleteType="email"
                                textContentType="emailAddress"
                                keyboardType="email-address"
                                blurOnSubmit={false}
                                onSubmitEditing={() => { this.TeardTextInputRef.current.focus() }}
                                ref={this.secondTextInputRef}
                                onChangeText={(username) => this.setUserName(username)}
                            />
                        </View>
                        <View style={styles().inputview}>
                            <TextInput
                                style={passwordError == null ? styles().TextInput : styles().TextInputError}
                                defaultValue={this.state.password}
                                placeholder="**********"
                                type={KEY.CLEAR}
                                placeholderTextColor={COLOR.PLACEHOLDER_COLOR}
                                secureTextEntry={true}
                                returnKeyType={KEY.DONE}
                                blurOnSubmit={false}
                                onSubmitEditing={() => Keyboard.dismiss()}
                                ref={this.TeardTextInputRef}
                                onChangeText={(password) => this.setPassword(password)}
                            />
                        </View>
                        {/* <View style={styles().inputview} >
                            <TextInput
                                style={mobilenumberError == null ? styles().TextInput : styles().TextInputError}
                                placeholder="Mobile Number"
                                type={KEY.CLEAR}
                                placeholderTextColor={COLOR.PLACEHOLDER_COLOR}
                                returnKeyType={KEY.DONE}
                                keyboardType="number-pad"
                                ref={this.TeardTextInputRef}
                                onSubmitEditing={() => Keyboard.dismiss()}                               
                                onChangeText={(mobilenumber) => this.setMobileNumber(mobilenumber)}
                            />
                        </View> */}
                    </View>
                    <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, marginTop: 15 }}>
                        <TouchableOpacity style={styles(this.getBranch?.property?.appcolorcode ? this.getBranch.property.appcolorcode : COLOR.DEFALUTCOLOR).sineBtn} onPress={() => this.onPressSubmit()} >
                            {this.state.loading === true ? <Loading /> : <Text style={styles().sineText}>Sign Up</Text>}
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginTop: 15, justifyContent: KEY.CENTER, flexDirection: KEY.ROW }} >
                        <Text style={styles().innerText}>Already have an account? </Text>
                        <TouchableOpacity onPress={() => { this.resetScreen(), this.props.navigation.navigate('LoginScreen') }} >
                            <Text style={styles(this.getBranch?.property?.appcolorcode ? this.getBranch.property.appcolorcode : COLOR.DEFALUTCOLOR).baseText}>Signin</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                {loader == true ? <Loader /> : null}
            </SafeAreaView>
        );
    }
}

const styles = (colorcode) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.BACKGROUNDCOLOR
    },
    backgroundImage: {
        marginTop: -20,
        width: WIDTH,
        height: HEIGHT / 3,
        color: colorcode
    },
    inputview: {
        flexDirection: KEY.ROW,
        backgroundColor: COLOR.WHITE,
        borderRadius: 100,
        shadowOpacity: 0.5,
        shadowRadius: 1,
        shadowOffset: {
            height: 0,
            width: 0,
        },
        elevation: 2,
        borderColor: COLOR.WHITE,
        width: WIDTH - 60,
        height: 50,
        margin: 12,
        alignItems: KEY.CENTER
    },
    TextInput: {
        fontSize: 14,
        flex: 1,
        padding: 15,
        borderColor: COLOR.WHITE,
        fontFamily: FONT.FONT_FAMILY_REGULAR,
        color: COLOR.BLACK
    },
    TextInputError: {
        fontSize: 14,
        flex: 1,
        padding: 15,
        backgroundColor: COLOR.WHITE,
        borderColor: COLOR.ERRORCOLOR,
        borderRadius: 100,
        width: WIDTH - 60,
        height: 50,
        alignItems: KEY.CENTER,
        borderWidth: 1
    },
    sineBtn: {
        flexDirection: KEY.ROW,
        width: WIDTH / 3,
        backgroundColor: colorcode,
        borderRadius: 100,
        height: 40,
        alignItems: KEY.CENTER,
        justifyContent: KEY.CENTER,
        marginRight: 20
    },
    sineText: {
        color: COLOR.WHITE,
        fontSize: 16,
        fontFamily: FONT.FONT_FAMILY_REGULAR
    },
    baseText: {
        color: colorcode,
        fontSize: 14,
        fontFamily: FONT.FONT_FAMILY_REGULAR
    },
    innerText: {
        color: COLOR.BLACK_OLIVE,
        fontSize: 14,
        fontFamily: FONT.FONT_FAMILY_REGULAR
    },
    createtext: {
        marginTop: 10,
        marginLeft: 35
    },
    imageLogo: {
        justifyContent: KEY.CENTER,
        alignItems: KEY.CENTER,
        height: 160,
        width: 220,
        //tintColor: COLOR.WHITE
    }
})

export default RegisterScreen;



