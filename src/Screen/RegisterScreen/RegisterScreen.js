import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, TextInput, ToastAndroid } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { heightPercentageToDP as hp, widthPercentageToDP as wp, } from 'react-native-responsive-screen'
import { RegisterService } from '../../Services/RegisterService/RegisterService';
import Loader from '../../Components/Loader/Loading';
import BackButton from '../../Components/BackButton/BackButton'

class RegisterScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullname: null,
            fullnameError: null,
            username: null,
            usernameError: null,
            mobilenumber: null,
            mobilenumberError: null,
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

    onPressSubmit = async () => {
        const { fullname, username, mobilenumber } = this.state;
        if (!fullname || !username || !mobilenumber) {
            this.setFullName(fullname)
            this.setUserName(username)
            this.setMobileNumber(mobilenumber)
            return;
        }
        const body = {
            property: {
                fullname: fullname,
                email: username,
                mobile_number: mobilenumber,
            }
        }

        this.setState({ loading: true })

        try {
            await RegisterService(body).then(response => {
                if (response.error) {
                    this.setState({ loading: false })
                    ToastAndroid.show("SignUp Failed!", ToastAndroid.LONG);
                    this.resetScreen()
                    return
                }
                if (response != null) {
                    ToastAndroid.show("SignUp Success!", ToastAndroid.LONG);
                    this.props.navigation.navigate('LoginScreen')
                    this.resetScreen()
                }
            })
        }
        catch (error) {
            this.setState({ loading: false })
            ToastAndroid.show("SignUp Failed!", ToastAndroid.LONG)
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={require('../../../assets/image/background.png')} style={styles.backgroundImage}>
                    <View style={{ position: 'absolute', marginTop: hp('7%') }}>
                        <BackButton onPress={() => this.props.navigation.goBack()} />
                    </View>
                    <View style={styles.sineupview}>
                        <Text style={{ fontSize: hp('4%'), }}>Create Account </Text>
                    </View>
                    <ScrollView
                        Vertical={true}
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps={'always'}
                    >
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <View style={styles.inputview}>
                                <TextInput
                                    style={styles.TextInput}
                                    defaultValue={this.state.fullname}
                                    placeholder="Full Name"
                                    type='clear'
                                    placeholderTextColor="#ABAFB3"
                                    returnKeyType="next"
                                    blurOnSubmit={false}
                                    onSubmitEditing={() => { this.secondTextInputRef.current.focus() }}
                                    onChangeText={(fullname) => this.setFullName(fullname)}
                                />
                            </View>
                            <Text style={{ marginTop: hp('-2%'), marginLeft: hp('-20%'), color: '#ff0000' }}>{this.state.fullnameError && this.state.fullnameError}</Text>
                            <View style={styles.inputview}>
                                <TextInput
                                    style={styles.TextInput}
                                    defaultValue={this.state.username}
                                    placeholder="Email"
                                    type='clear'
                                    placeholderTextColor="#ABAFB3"
                                    returnKeyType="next"
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
                            <Text style={{ marginTop: hp('-2%'), marginLeft: hp('-20%'), color: '#ff0000' }}>{this.state.usernameError && this.state.usernameError}</Text>
                            <View style={styles.inputview} >
                                <TextInput
                                    style={styles.TextInput}
                                    placeholder="Mobile Number"
                                    type='clear'
                                    placeholderTextColor="#ABAFB3"
                                    secureTextEntry={true}
                                    returnKeyType="done"
                                    keyboardType="number-pad"
                                    ref={this.TeardTextInputRef}
                                    onSubmitEditing={() => this.onPressSubmit()}
                                    onChangeText={(mobilenumber) => this.setMobileNumber(mobilenumber)}
                                />
                            </View>
                            <Text style={{ marginTop: hp('-2%'), marginLeft: hp('-16%'), color: '#ff0000' }}>{this.state.mobilenumberError && this.state.mobilenumberError}</Text>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                            <TouchableOpacity style={styles.sineBtn} onPress={() => this.onPressSubmit()} >
                                {this.state.loading === true ? <Loader /> : <Text style={styles.sineText}>Sign Up</Text>}
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginTop: hp('5%'), justifyContent: 'center', flexDirection: 'row' }} >
                            <Text style={styles.innerText}> Don't have an account? </Text>
                            <TouchableOpacity onPress={() => { this.props.navigation.navigate('LoginScreen') }} >
                                <Text style={styles.baseText}>Signin</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </ImageBackground>
            </View>

        );
    }
}

export default RegisterScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        width: wp('100%'),
        height: hp('100 %')
    },
    sineupview: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: hp('30%'),
    },
    inputview: {
        flexDirection: 'row',
        backgroundColor: "#fff",
        borderRadius: wp('8%'),
        shadowOpacity: 0.5,
        shadowRadius: 3,
        shadowOffset: {
            height: 0,
            width: 0,
        },
        elevation: 2,
        borderColor: '#fff',
        width: wp('80%'),
        height: hp('8%'),
        margin: hp('2%'),
        alignItems: "center",
    },
    TextInput: {
        fontSize: hp('2.5%'),
        flex: 1,
        marginLeft: hp('3%'),
    },
    sineBtn: {
        flexDirection: 'row',
        width: wp('35%'),
        backgroundColor: "#F6C455",
        borderRadius: wp('7%'),
        height: hp('7%'),
        alignItems: "center",
        justifyContent: "center",
        marginTop: hp('4%'),
    },
    sineText: {
        color: '#FFFFFF',
        fontSize: hp('2.5%'),
    },
    baseText: {
        fontWeight: 'normal',
        color: '#F4AE3A',
        fontSize: hp('2%'),
    },
    innerText: {
        color: '#ABAFB3',
        fontSize: hp('2%'),
    },
})

