import React, { useState, useEffect } from 'react';
import {
    View, Text, StyleSheet, TextInput, ScrollView, ImageBackground, Image,
    TouchableOpacity, SafeAreaView, Dimensions, Platform, ToastAndroid, StatusBar, Keyboard
} from 'react-native';
import Loading from '../../Components/Loader/Loading';
import axiosConfig from '../../Helpers/axiosConfig';
import ForgetPasswordService from '../../Services/ForgetPasswordService/ForgetPasswordService';
const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;
import * as KEY from '../../context/actions/key';
import * as COLOR from '../../styles/colors';
import * as IMAGE from '../../styles/image';

export default function ForgotPassword(props) {
    const userName = props.route.params.userValue;
    const [newPassword, setNewPassword] = useState(null);
    const [newPassworderror, setNewPassworderror] = useState(null);
    const [rePassword, setRePassword] = useState(null);
    const [rePassworderror, setRePassworderror] = useState(null);
    const [loading, setloading] = useState(false);
    const secondTextInputRef = React.createRef();

    useEffect(() => {
    }, [newPassword, newPassworderror, rePassword, rePassworderror, loading])

    //check password validation
    const setNewPasswordCheck = (password) => {
        if (!password || password.length <= 0) {
            setNewPassworderror('Password cannot be empty');
            return;
        }
        setNewPassword(password);
        setNewPassworderror(null);
        return;
    }

    //check password validation
    const setRePasswordCheck = (repassword) => {
        if (!repassword || repassword.length <= 0) {
            setRePassworderror('Re-Password cannot be empty');
            return;
        }
        setRePassword(repassword);
        setRePassworderror(null);
        return;
    }

    //clear Field up data
    const resetScreen = () => {
        setloading(false);
        setNewPassword(null);
        setNewPassworderror(null);
        setRePassword(null);
        setRePassworderror(null);
    }

    //SIGN IN BUTTON ONPRESS TO PROCESS
    const onPressSubmit = async () => {
        axiosConfig(null)
        if (!newPassword || !rePassword) {
            setNewPasswordCheck(newPassword);
            setRePasswordCheck(rePassword);
            return;
        }

        if (newPassword != rePassword) {
            setRePassworderror('Cant Match Re-Password');
            setNewPassworderror('Cant Match Password');
            return;
        }

        const body = {
            "newpassword": newPassword,
            "username": userName
        }
        setloading(true);
        try {
            const response = await ForgetPasswordService(body);
            if (response.data != null && response.data != 'undefind' && response.status == 200) {
                setloading(false);
                if (Platform.OS === 'android') {
                    ToastAndroid.show('Your Password is Reset', ToastAndroid.LONG);
                } else {
                    alert('Your Password is Reset');
                }
                props.navigation.navigate('LoginScreen');
            }
        } catch (error) {
            console.log(`error`, error);
            resetScreen();
            if (Platform.OS === 'android') {
                ToastAndroid.show('Something wrong, try again letter!', ToastAndroid.LONG);
            } else {
                alert('Something wrong, try again letter!');
            }
        };
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={COLOR.STATUSBARCOLOR} barStyle={KEY.DARK_CONTENT} />
            <ScrollView
                Vertical={true}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps={KEY.ALWAYS}
            >
                <ImageBackground source={IMAGE.BACKGROUND_IMAGE} tintColor={COLOR.DEFALUTCOLOR} style={styles.backgroundImage}>
                    <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, marginTop: 50 }}>
                        <Image style={styles.imageLogo} resizeMode={KEY.COVER} source={IMAGE.LOGO} />
                    </View>
                </ImageBackground>

                <View style={styles.forgotview}>
                    <Text style={{ fontSize: 26 }}> Forgot Password </Text>
                </View>
                <View style={{ marginTop: 10, marginLeft: 40, flexDirection: KEY.ROW }} >
                    <Text style={{ fontSize: 14, color: COLOR.BLACK }}>Enter new password below</Text>
                </View>

                <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                    <View style={newPassworderror == null ? styles.inputview : styles.inputviewError} >
                        <TextInput
                            style={styles.TextInput}
                            placeholder='New Password'
                            type={KEY.CLEAR}
                            placeholderTextColor={COLOR.PLACEHOLDER_COLOR}
                            defaultValue={newPassword}
                            returnKeyType={KEY.NEXT}
                            blurOnSubmit={false}
                            secureTextEntry={true}
                            onSubmitEditing={() => secondTextInputRef.current.focus()}
                            onChangeText={(password) => setNewPasswordCheck(password)}
                        />
                    </View>
                    <View style={rePassworderror == null ? styles.inputview : styles.inputviewError} >
                        <TextInput
                            style={styles.TextInput}
                            placeholder='Re Password'
                            type={KEY.CLEAR}
                            placeholderTextColor={COLOR.PLACEHOLDER_COLOR}
                            returnKeyType={KEY.DONE}
                            blurOnSubmit={false}
                            ref={secondTextInputRef}
                            secureTextEntry={true}
                            onSubmitEditing={() => Keyboard.dismiss()}
                            onChangeText={(repassword) => setRePasswordCheck(repassword)}
                        />
                    </View>
                </View>
                <View style={{ marginTop: 5, flexDirection: KEY.ROW, marginRight: 40, alignItems: KEY.FLEX_END, justifyContent: KEY.FLEX_END }} >
                    <Text style={styles.innerText}> Back to </Text>
                    <TouchableOpacity onPress={() => { this.props.navigation.navigate('LoginScreen') }} >
                        <Text style={styles.baseText}>Login</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                    <TouchableOpacity style={styles.forBtn} onPress={() => onPressSubmit()}>
                        {loading == true ? <Loading /> : <Text style={styles.forText}>Reset Password</Text>}
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
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
    TextInput: {
        fontSize: 16,
        flex: 1,
        padding: 15,
        borderColor: COLOR.WHITE,
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
    forBtn: {
        flexDirection: KEY.ROW,
        width: WIDTH / 3,
        backgroundColor: COLOR.DEFALUTCOLOR,
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
        color: COLOR.DEFALUTCOLOR,
        fontSize: 14
    },
    innerText: {
        color: COLOR.BLACK_OLIVE,
        fontSize: 14
    },
    imageLogo: {
        justifyContent: KEY.CENTER,
        alignItems: KEY.CENTER,
        height: 150,
        width: 220
    },
})