import React, { useState, useEffect } from 'react';
import {
    View, Text, StyleSheet, TextInput, ScrollView, ImageBackground, Image, StatusBar,
    TouchableOpacity, SafeAreaView, Dimensions, Keyboard, Platform
} from 'react-native';
const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;
import Loader from '../../Components/Loader/Loading'
import * as KEY from '../../context/actions/key';
import * as TYPE from '../../context/actions/type';
import * as COLOR from '../../styles/colors';
import * as IMAGE from '../../styles/image';
import Toast from 'react-native-simple-toast';
import { getBranchDetails } from '../../Services/LocalService/LocalService';
import { DefaultImage } from '../../context/actions/type';

export default function ForgotPasswordOTP(props) {
    const verifyOtpNumber = props.route.params.verifyOtpNumber;
    const username = props.route.params.username;

    const [loading, setloading] = useState(false);
    const [inputOtpNumber, setinputOtpNumber] = useState(null);
    const [inputOtpNumberError, setinputOtpNumberError] = useState(null);
    const [getBranch, setgetBranch] = useState(null);

    useEffect(() => {
    }, [loading, inputOtpNumber, inputOtpNumberError, getBranch])

    //clear Field up data
    const resetScreen = () => {
        setloading(false);
        setinputOtpNumber(null);
    }

    //OTP verify function
    const otpVerify = async () => {
        if (!inputOtpNumber) {
            setinputOtpNumberError('error');
            return;
        }
        setloading(true);
        try {
            if (Number(inputOtpNumber) === Number(verifyOtpNumber)) {
                setloading(false);
                let userValue;
                if (username) {
                    userValue = username
                }
                resetScreen();
                props.navigation.navigate('ForgotPassword', { userValue });
            } else {
                setloading(false);
                setinputOtpNumber(null);
                Toast.show('OTP not Match!', Toast.SHORT);
            }
        }
        catch (error) {
            resetScreen();
            Toast.show('User not exits!', Toast.SHORT);
        };
    }

    useEffect(() => {
        getMemberDeatilsLocalStorage();
    }, []);

    //GET MEMBER DATA IN MOBILE LOCAL STORAGE
    const getMemberDeatilsLocalStorage = async () => {
        const getBranchdata = await getBranchDetails();
        setgetBranch(getBranchdata);
    }

    return (
        <SafeAreaView style={styles().container}>
            <StatusBar backgroundColor={getBranch?.property?.appcolorcode ? getBranch.property.appcolorcode : COLOR.STATUSBARCOLOR} barStyle={KEY.DARK_CONTENT} />
            <ScrollView Vertical={true} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={KEY.ALWAYS} >
                <ImageBackground source={IMAGE.BACKGROUND_IMAGE} tintColor={COLOR.DEFALUTCOLOR} style={styles().backgroundImage}>
                    <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, marginTop: 55 }}>
                        <Image style={styles().imageLogo} resizeMode={KEY.COVER} source={getBranch?.property?.mobilelogo ? { uri: getBranch?.property?.mobilelogo } : { uri: TYPE.DefaultImage }} />
                    </View>
                </ImageBackground>
                <View style={styles().forgotview}>
                    <Text style={{ fontSize: 26 }}> Forgot Password </Text>
                </View>

                <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, marginTop: 20 }}>
                    <View style={inputOtpNumberError == null ? styles().inputview : styles().inputviewError} >
                        <TextInput
                            style={styles().TextInput}
                            placeholder="Enter OTP"
                            type={KEY.CLEAR}
                            placeholderTextColor={COLOR.PLACEHOLDER_COLOR}
                            keyboardType="decimal-pad"
                            returnKeyType={KEY.DONE}
                            defaultValue={inputOtpNumber}
                            onSubmitEditing={() => Keyboard.dismiss()}
                            onChangeText={(otp) => setinputOtpNumber(otp)}
                        />
                    </View>
                </View>
                <View style={{ marginTop: 5, flexDirection: KEY.ROW, marginRight: 40, alignItems: KEY.FLEX_END, justifyContent: KEY.FLEX_END }} >
                    <Text style={styles().innerText}> Back to </Text>
                    <TouchableOpacity onPress={() => { props.navigation.navigate('ForgotPasswordMain'), resetScreen() }} >
                        <Text style={styles(getBranch?.property?.appcolorcode ? getBranch.property.appcolorcode : COLOR.DEFALUTCOLOR).baseText}>Resend OTP</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, marginTop: 10 }}>
                    <TouchableOpacity style={styles(getBranch?.property?.appcolorcode ? getBranch.property.appcolorcode : COLOR.DEFALUTCOLOR).forBtn} onPress={() => otpVerify()}>
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
        fontSize: 16
    },
    baseText: {
        color: colorcode,
        fontSize: 14
    },
    innerText: {
        color: COLOR.BLACK_OLIVE,
        fontSize: 14
    },
    imageLogo: {
        justifyContent: KEY.CENTER,
        alignItems: KEY.CENTER,
        height: 160,
        width: 220,
        tintColor: COLOR.WHITE
    },
})