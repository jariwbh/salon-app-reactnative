import React, { Component } from 'react';
import {
    View, Text, StyleSheet, Image, TextInput, TouchableOpacity,
    ToastAndroid, ScrollView, SafeAreaView, Dimensions, StatusBar
} from 'react-native';
import { UpdateUserService } from '../../Services/UserService/UserService';
import AsyncStorage from '@react-native-community/async-storage';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Loader from '../../Components/Loader/Loader';
import Loading from '../../Components/Loader/Loading';
const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;
import * as KEY from '../../context/actions/key';
import * as COLOR from '../../styles/colors';
import * as IMAGE from '../../styles/image';
import * as FONT from '../../styles/typography';

class UpdateProfile extends Component {
    constructor(props) {
        super(props);
        this.companyData = this.props.route.params.companyData;
        this.state = {
            _id: this.companyData._id,
            fullname: this.companyData.property.fullname,
            fullnameError: null,
            username: this.companyData.property.primaryemail,
            usernameError: null,
            mobilenumber: this.companyData.property.mobile,
            mobilenumberError: null,
            userProfile: this.companyData.profilepic,
            profileName: this.companyData.fullname,
            memberName: this.companyData.username,
            loading: false,
        }
        this.setFullName = this.setFullName.bind(this);
        this.setUserName = this.setUserName.bind(this);
        this.setMobileNumber = this.setMobileNumber.bind(this);
        this.onPressSubmit = this.onPressSubmit.bind(this);
        this.secondTextInputRef = React.createRef();
        this.TeardTextInputRef = React.createRef();
    }

    setFullName(fullname) {
        if (!fullname || fullname.length <= 0) {
            return this.setState({ fullnameError: 'User Name cannot be empty', fullname: null });
        }
        return this.setState({ fullname: fullname, fullnameError: null })
    }

    setUserName(email) {
        const re = /\S+@\S+\.\S+/;
        if (!email || email.length <= 0) {
            return this.setState({ usernameError: 'Email cannot be empty', username: null });
        }
        if (!re.test(email)) {

            return this.setState({ usernameError: 'Ooops! We need a valid email address' });
        }
        return this.setState({ username: email, usernameError: null })
    }

    setMobileNumber(mobilenumber) {
        const reg = /^[0]?[789]\d{9}$/;
        if (!mobilenumber || mobilenumber.length <= 0) {
            return this.setState({ mobilenumberError: 'Mobile Number cannot be empty', mobilenumber: null });
        }
        if (!reg.test(mobilenumber)) {
            return this.setState({ mobilenumberError: 'Ooops! We need a valid Mobile Number' });
        }
        return this.setState({ mobilenumber: mobilenumber, mobilenumberError: null })
    }

    authenticateUser = (user) => {
        AsyncStorage.setItem('@authuser', JSON.stringify(user));
    }

    onPressSubmit = async () => {
        const { fullname, username, mobilenumber, _id, memberName } = this.state;
        if (!fullname || !username || !mobilenumber) {
            this.setFullName(fullname)
            this.setUserName(username)
            this.setMobileNumber(mobilenumber)
            return;
        }

        this.companyData.property.fullname = fullname;
        this.companyData.property.primaryemail = username;
        this.companyData.property.mobile = mobilenumber;

        const body = {
            _id: _id,
            property: this.companyData.property
        }
        this.setState({ loading: true })
        try {
            await UpdateUserService(body).then(response => {
                if (response != null) {
                    this.authenticateUser(response.data)
                    if (Platform.OS === 'android') {
                        ToastAndroid.show("Your Profile Update", ToastAndroid.LONG);
                    } else {
                        alert('Your Profile Update');
                    }
                    this.props.navigation.replace('MyProfile');
                }
            })
        }
        catch (error) {
            this.setState({ loading: false })
            if (Platform.OS === 'android') {
                ToastAndroid.show("Your Profile Not Update", ToastAndroid.LONG)
            } else {
                alert('Your Profile Not Update');
            }
        }
    }

    render() {
        const { fullname, username, mobilenumber, userProfile, profileName, loading, fullnameError, usernameError, mobilenumberError } = this.state;
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor={COLOR.STATUSBARCOLOR} barStyle={KEY.LIGHT_CONTENT} />
                <View style={styles.headerstyle}>
                    <View style={{ justifyContent: KEY.SPACEBETWEEN, alignItems: KEY.CENTER, flexDirection: KEY.ROW, marginTop: 30 }}>
                        <View style={{ flexDirection: KEY.ROW, justifyContent: KEY.CENTER, alignItems: KEY.CENTER, marginLeft: 20 }}>
                            <TouchableOpacity onPress={() => this.props.navigation.goBack(null)}>
                                <AntDesign name='arrowleft' color={COLOR.WHITE} size={24} />
                            </TouchableOpacity>
                            <View style={{ justifyContent: KEY.CENTER, marginLeft: WIDTH / 4 }}>
                                <Text style={{ fontSize: 22, color: COLOR.WHITE, fontWeight: 'bold' }}>My Profile</Text>
                            </View>
                        </View>
                    </View>
                </View>
                {this.userData === null ?
                    <Loader />
                    : <>
                        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={KEY.ALWAYS}>
                            <Image style={styles.avatar} source={{ uri: userProfile && userProfile !== null ? userProfile : "https://res.cloudinary.com/dnogrvbs2/image/upload/v1610428971/userimage_qif8wv.jpg" }} />
                            <View style={styles.body}>
                                <View style={{
                                    flex: 1, flexDirection: 'column', alignItems: KEY.CENTER
                                }}>
                                    <View style={styles.bodyContent}>
                                        <Text style={styles.name}>{profileName && profileName}</Text>
                                    </View>
                                    <View style={styles.inputView}>
                                        <TextInput
                                            style={fullnameError == null ? styles.TextInput : styles.TextInputError}
                                            label="Name"
                                            defaultValue={fullname}
                                            placeholder="User Name"
                                            type='clear'
                                            placeholderTextColor="#ABAFB3"
                                            returnKeyType="next"
                                            blurOnSubmit={false}
                                            onSubmitEditing={() => { this.secondTextInputRef.current.focus() }}
                                            onChangeText={(fullname) => this.setFullName(fullname)}
                                        />
                                    </View>
                                    <View style={styles.inputView}>
                                        <TextInput
                                            style={usernameError == null ? styles.TextInput : styles.TextInputError}
                                            defaultValue={username}
                                            placeholder="Email Id"
                                            type='clear'
                                            placeholderTextColor="#ABAFB3"
                                            autoCapitalize="none"
                                            autoCompleteType="email"
                                            textContentType="emailAddress"
                                            keyboardType="email-address"
                                            returnKeyType="next"
                                            blurOnSubmit={false}
                                            onSubmitEditing={() => { this.TeardTextInputRef.current.focus() }}
                                            ref={this.secondTextInputRef}
                                            onChangeText={(username) => this.setUserName(username)}
                                        />
                                    </View>
                                    <View style={styles.inputView} >
                                        <TextInput
                                            style={mobilenumberError == null ? styles.TextInput : styles.TextInputError}
                                            defaultValue={mobilenumber}
                                            placeholder="Mobile Number"
                                            type='clear'
                                            placeholderTextColor="#ABAFB3"
                                            keyboardType="numeric"
                                            returnKeyType="done"
                                            ref={this.TeardTextInputRef}
                                            onSubmitEditing={() => this.onPressSubmit()}
                                            onChangeText={(mobilenumber) => this.setMobileNumber(mobilenumber)}
                                        />
                                    </View>
                                    <TouchableOpacity style={styles.update_Btn} onPress={() => this.onPressSubmit()}>
                                        {loading == true ? <Loading /> : <Text style={styles.update_text} >Update Profile</Text>}
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </ScrollView>
                    </>}
            </SafeAreaView>
        );
    }
}

export default UpdateProfile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.BACKGROUNDCOLOR
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 100,
        alignSelf: KEY.CENTER,
        marginTop: 20
    },
    bodyContent: {
        flex: 1,
        alignItems: KEY.CENTER,
        paddingBottom: 40,
        marginTop: 10
    },
    name: {
        fontSize: 22,
        color: COLOR.MENU_TEXT_COLOR,
        fontWeight: 'bold',
        textTransform: KEY.CAPITALIZE
    },
    inputView: {
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
        marginBottom: 20,
        alignItems: KEY.CENTER
    },
    TextInput: {
        fontSize: 16,
        flex: 1,
        padding: 15,
        borderColor: COLOR.WHITE,
    },
    TextInputError: {
        fontSize: 16,
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
    update_Btn: {
        flexDirection: KEY.ROW,
        backgroundColor: COLOR.DEFALUTCOLOR,
        marginTop: 10,
        borderRadius: 100,
        width: WIDTH / 2 + 20,
        height: 50,
        alignItems: KEY.CENTER,
        justifyContent: KEY.CENTER
    },
    update_text: {
        color: COLOR.WHITE,
        fontWeight: 'bold',
        fontSize: 18,
    },
    headerstyle: {
        backgroundColor: COLOR.STATUSBARCOLOR,
        width: WIDTH,
        height: 90,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        marginBottom: 20
    }
})

