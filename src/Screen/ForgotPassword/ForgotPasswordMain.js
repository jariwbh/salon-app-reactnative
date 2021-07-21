import React, { useState, useEffect } from 'react';
import {
    View, Text, StyleSheet, TextInput, ScrollView, ImageBackground,
    TouchableOpacity, SafeAreaView, Dimensions, Keyboard, ToastAndroid, Platform
} from 'react-native';
import axiosConfig from '../../Helpers/axiosConfig';
import { CheckUser } from '../../Services/UserService/UserService';
const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;
import Loader from '../../Components/Loader/Loading'
import { SendEmailService, SendSmsService } from '../../Services/SendEmailandSmsService/SendEmailandSmsService';

export default function ForgotPasswordMain(props) {
    const [username, setusername] = useState(null);
    const [loading, setloading] = useState(false);
    const [usererror, setusererror] = useState(null);
    const [verifyOtpNumber, setverifyOtpNumber] = useState(null);
    const [inputOtpNumber, setinputOtpNumber] = useState(null);
    const [inputOtpNumberError, setinputOtpNumberError] = useState(null);
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
    }, [username, loading, usererror, verifyOtpNumber, inputOtpNumber, userInfo, inputOtpNumberError])

    //clear Field up data
    const resetScreen = () => {
        setloading(false);
        setusername(null);
        setusererror(null);
        setinputOtpNumber(null);
        setverifyOtpNumber(null);
    }

    //check username validation
    const setUsernamecheck = (username) => {
        if (!username || username.length <= 0) {
            setusererror('username can not be empty');
            return;
        }
        setusername(username);
        setusererror(null);
        return;
    }

    // generate OTP function 
    const createOtp = async () => {
        let body;
        if (!username) {
            setUsernamecheck(username);
            return;
        }
        try {
            setloading(true);
            if (username) {
                body = {
                    "username": username
                }
            }

            const CheckUserResponse = await CheckUser(body);
            if (Object.keys(CheckUserResponse.data).length !== 0 && CheckUserResponse.data != null && CheckUserResponse.data != 'undefind' && CheckUserResponse.status == 200) {
                const verifyOtpNumber = Math.floor(1000 + Math.random() * 9000);
                setverifyOtpNumber(verifyOtpNumber);
                setUserInfo(CheckUserResponse.data);
                onPressSubmit(CheckUserResponse.data.property, verifyOtpNumber);
                setusername(null);
                setusererror(null);
                if (Platform.OS === 'android') {
                    ToastAndroid.show('OTP Sending', ToastAndroid.LONG);
                } else {
                    alert('OTP Sending');
                }
                setloading(false);
            }
            else {
                if (Platform.OS === 'android') {
                    ToastAndroid.show('User not exits!', ToastAndroid.LONG);
                } else {
                    alert('User not exits!');
                }
                resetScreen();
            }
        }
        catch (error) {
            resetScreen();
            if (Platform.OS === 'android') {
                ToastAndroid.show('User not exits!', ToastAndroid.LONG);
            } else {
                alert('User not exits!');
            }
        };
    }

    //SIGN IN BUTTON ONPRESS TO PROCESS
    onPressSubmit = async (member, verifyOtpNumber) => {
        let memberMobile = member.mobile;
        let memberEmail = member.primaryemail;
        console.log(`verifyOtpNumber`, verifyOtpNumber);

        axiosConfig('6066c57499e17f24a4db4495');
        let mobilebody;
        let emailbody;
        if (memberMobile) {
            mobilebody = {
                "messagetype": "SMS",
                "message": {
                    "content": `${verifyOtpNumber} is the OTP for accessing on MEMBROZ USES. Valid till 5 Minutes.Do not share this with anyone.`,
                    "to": [memberMobile],
                    "subject": "Reset Password OTP"
                }
            }
        }

        if (memberEmail) {
            emailbody = {
                "messagetype": "EMAIL",
                "message": {
                    "content": `${verifyOtpNumber} is the OTP for accessing on MEMBROZ USES. Valid till 5 Minutes.Do not share this with anyone.`,
                    "to": [memberEmail],
                    "subject": "Reset Password OTP"
                }
            }
        }

        setloading(true);
        try {
            if (memberEmail) {
                const response = await SendEmailService(emailbody);
                if (response.data != 'undefind' && response.status == 200) {
                    setloading(false);
                }
            }

            if (memberMobile) {
                const response1 = await SendSmsService(mobilebody);
                if (response1.data != 'undefind' && response1.status == 200) {
                    setloading(false);
                }
            }
            props.navigation.navigate('ForgotPasswordOTP', { verifyOtpNumber: verifyOtpNumber, username: memberMobile && memberEmail });
        }
        catch (error) {
            resetScreen();
            if (Platform.OS === 'android') {
                ToastAndroid.show('User not exits!', ToastAndroid.LONG);
            } else {
                alert('User not exits!');
            }
        };
    }

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={require('../../assets/background.png')} style={styles.backgroundImage}>
                <View style={styles.forgotview}>
                    <Text style={{ fontSize: 26 }}> Forgot Password </Text>
                </View>
                <ScrollView
                    Vertical={true}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps={'always'}
                >
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                        <View style={usererror == null ? styles.inputview : styles.inputviewError} >
                            <TextInput
                                style={styles.TextInput}
                                placeholder="Username"
                                type='clear'
                                placeholderTextColor="#ABAFB3"
                                returnKeyType="done"
                                defaultValue={username}
                                onSubmitEditing={() => Keyboard.dismiss()}
                                onChangeText={(username) => setUsernamecheck(username)}
                            />
                        </View>
                    </View>
                    <View style={{ marginTop: 5, flexDirection: 'row', marginRight: 40, alignItems: 'flex-end', justifyContent: 'flex-end' }} >
                        <Text style={styles.innerText}> Back to </Text>
                        <TouchableOpacity onPress={() => { props.navigation.navigate('LoginScreen'), resetScreen() }} >
                            <Text style={styles.baseText}>Login</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 0 }}>
                        <TouchableOpacity style={styles.forBtn} onPress={() => createOtp()}>
                            {loading == true ? <Loader /> : <Text style={styles.forText}>Next</Text>}
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF"
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        width: WIDTH,
        height: HEIGHT
    },
    forgotview: {
        marginLeft: 30,
        marginTop: HEIGHT / 3 - 20
    },
    innerText: {
        color: '#605C5C',
        fontSize: 14
    },
    baseText: {
        fontWeight: 'normal',
        color: '#183BAE',
        fontSize: 14
    },
    inputview: {
        flexDirection: 'row',
        backgroundColor: "#fff",
        borderRadius: 100,
        shadowOpacity: 0.5,
        shadowRadius: 3,
        shadowOffset: {
            height: 0,
            width: 0,
        },
        elevation: 2,
        borderColor: '#fff',
        width: WIDTH - 60,
        height: 50,
        margin: 12,
        alignItems: "center"
    },
    inputviewError: {
        flexDirection: 'row',
        backgroundColor: "#FFFFFF",
        borderRadius: 100,
        shadowOpacity: 0.5,
        shadowRadius: 3,
        shadowOffset: {
            height: 0,
            width: 0,
        },
        elevation: 2,
        borderColor: '#FF0000',
        width: WIDTH - 60,
        height: 50,
        margin: 12,
        alignItems: "center",
        borderWidth: 1
    },
    TextInput: {
        fontSize: 14,
        flex: 1,
        padding: 15,
        borderColor: '#FFFFFF'
    },
    forBtn: {
        flexDirection: 'row',
        width: WIDTH / 3,
        backgroundColor: "#FEBC42",
        borderRadius: 100,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 20
    },
    forText: {
        color: '#FFFFFF',
        fontSize: 16
    },
    baseText: {
        fontWeight: 'normal',
        color: '#F4AE3A',
        fontSize: 14
    },
    innerText: {
        color: '#ABAFB3',
        fontSize: 14
    },
})