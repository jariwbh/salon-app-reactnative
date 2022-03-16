import React, { useState, useEffect } from 'react';
import {
    View, Text, StyleSheet, TextInput, ScrollView, ImageBackground, StatusBar, Image,
    TouchableOpacity, SafeAreaView, Dimensions, Keyboard, Platform
} from 'react-native';
import axiosConfig from '../../Helpers/axiosConfig';
import { CheckUser } from '../../Services/UserService/UserService';
const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;
import Loader from '../../Components/Loader/Loading'
import { SendEmailService, SendSmsService } from '../../Services/SendEmailandSmsService/SendEmailandSmsService';
import * as KEY from '../../context/actions/key';
import * as TYPE from '../../context/actions/type';
import * as COLOR from '../../styles/colors';
import * as IMAGE from '../../styles/image';
import Toast from 'react-native-simple-toast';
import { getBranchDetails } from '../../Services/LocalService/LocalService';

export default function ForgotPasswordMain(props) {
    const [username, setusername] = useState(null);
    const [loading, setloading] = useState(false);
    const [usererror, setusererror] = useState(null);
    const [verifyOtpNumber, setverifyOtpNumber] = useState(null);
    const [inputOtpNumber, setinputOtpNumber] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [getBranch, setgetBranch] = useState(null);

    useEffect(() => {
    }, [username, loading, usererror, verifyOtpNumber,
        inputOtpNumber, userInfo, getBranch])

    useEffect(() => {
        getMemberDeatilsLocalStorage();
    }, []);

    //GET MEMBER DATA IN MOBILE LOCAL STORAGE
    const getMemberDeatilsLocalStorage = async () => {
        const getBranchdata = await getBranchDetails();
        setgetBranch(getBranchdata);
    }

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
                Toast.show('OTP Sending', Toast.SHORT);
                setloading(false);
            }
            else {
                Toast.show('User not exits!', Toast.SHORT);
                resetScreen();
            }
        }
        catch (error) {
            console.log(`error`, error);
            resetScreen();
            Toast.show('User not exits!', Toast.SHORT);
        };
    }

    //SIGN IN BUTTON ONPRESS TO PROCESS
    onPressSubmit = async (member, verifyOtpNumber) => {
        let memberMobile = member.mobile;
        let memberEmail = member.primaryemail;
        axiosConfig(getBranch?.property?.authkey);
        let mobilebody;
        let emailbody;
        if (memberMobile) {
            mobilebody = {
                "messagetype": "SMS",
                "message": {
                    "content": `${verifyOtpNumber} is the OTP for accessing on ${getBranch && getBranch.branchname} Users. Valid till 5 Minutes.Do not share this with anyone.`,
                    "to": memberMobile,
                    "subject": "Reset Password OTP"
                }
            }
        }

        if (memberEmail) {
            emailbody = {
                "messagetype": "EMAIL",
                "message": {
                    "content": `${verifyOtpNumber} is the OTP for accessing on ${getBranch && getBranch.branchname} Users. Valid till 5 Minutes.Do not share this with anyone.`,
                    "to": memberEmail,
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
            Toast.show('User not exits!', Toast.SHORT);
        };
    }

    return (
        <SafeAreaView style={styles().container}>
            <StatusBar backgroundColor={getBranch?.property?.appcolorcode ? getBranch.property.appcolorcode : COLOR.STATUSBARCOLOR} barStyle={KEY.DARK_CONTENT} />
            <ScrollView Vertical={true} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={KEY.ALWAYS}>
                <ImageBackground source={IMAGE.BACKGROUND_IMAGE} tintColor={getBranch?.property?.appcolorcode ? getBranch.property.appcolorcode : COLOR.DEFALUTCOLOR} style={styles().backgroundImage}>
                    <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, marginTop: 55 }}>
                        <Image style={styles().imageLogo} resizeMode={KEY.COVER} source={getBranch?.property?.mobilelogo ? { uri: getBranch?.property?.mobilelogo } : { uri: TYPE.DefaultImage }} />
                    </View>
                </ImageBackground>

                <View style={styles().forgotview}>
                    <Text style={{ fontSize: 26, color: COLOR.BLACK, fontFamily: FONT.FONT_FAMILY_REGULAR }}> Forgot Password </Text>
                </View>

                <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, marginTop: 20 }}>
                    <View style={usererror == null ? styles().inputview : styles().inputviewError} >
                        <TextInput
                            style={styles().TextInput}
                            placeholder="Username"
                            type={KEY.CLEAR}
                            placeholderTextColor={COLOR.PLACEHOLDER_COLOR}
                            returnKeyType={KEY.DONE}
                            defaultValue={username}
                            onSubmitEditing={() => Keyboard.dismiss()}
                            onChangeText={(username) => setUsernamecheck(username)}
                        />
                    </View>
                </View>
                <View style={{ marginTop: 5, flexDirection: KEY.ROW, marginRight: 40, alignItems: KEY.FLEX_END, justifyContent: KEY.FLEX_END }} >
                    <Text style={styles().innerText}> Back to </Text>
                    <TouchableOpacity onPress={() => { props.navigation.navigate('LoginScreen'), resetScreen() }} >
                        <Text style={styles(getBranch?.property?.appcolorcode ? getBranch.property.appcolorcode : COLOR.DEFALUTCOLOR).baseText}>Login</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, marginTop: 0 }}>
                    <TouchableOpacity style={styles(getBranch?.property?.appcolorcode ? getBranch.property.appcolorcode : COLOR.DEFALUTCOLOR).forBtn} onPress={() => createOtp()}>
                        {loading == true ? <Loader /> : <Text style={styles().forText}>Next</Text>}
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
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
    },
    forgotview: {
        marginLeft: 30,
        marginTop: 40
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
        alignItems: KEY.CENTER,
    },
    inputviewError: {
        flexDirection: KEY.ROW,
        backgroundColor: COLOR.WHITE,
        borderRadius: 100,
        shadowOpacity: 0.5,
        shadowRadius: 3,
        shadowOffset: {
            height: 0,
            width: 0,
        },
        elevation: 2,
        borderColor: COLOR.ERRORCOLOR,
        width: WIDTH - 60,
        height: 50,
        margin: 12,
        alignItems: KEY.CENTER,
        borderWidth: 1
    },
    TextInput: {
        fontSize: 14,
        flex: 1,
        padding: 15,
        borderColor: COLOR.WHITE,
        fontFamily: FONT.FONT_FAMILY_REGULAR,
        color: COLOR.BLACK
    },
    forBtn: {
        flexDirection: KEY.ROW,
        width: WIDTH / 3,
        backgroundColor: colorcode,
        borderRadius: 100,
        height: 40,
        alignItems: KEY.CENTER,
        justifyContent: KEY.CENTER,
        marginRight: 20
    },
    forText: {
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
    imageLogo: {
        justifyContent: KEY.CENTER,
        alignItems: KEY.CENTER,
        height: 160,
        width: 220,
        tintColor: COLOR.WHITE
    }
})