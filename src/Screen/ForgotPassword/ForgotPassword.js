import React, { useState, useEffect } from 'react';
import {
    View, Text, StyleSheet, TextInput, ScrollView, ImageBackground,
    TouchableOpacity, SafeAreaView, Dimensions, Platform, ToastAndroid
} from 'react-native';
import Loading from '../../Components/Loader/Loading';
import axiosConfig from '../../Helpers/axiosConfig';
import ForgetPasswordService from '../../Services/ForgetPasswordService/ForgetPasswordService';
const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

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
            <ImageBackground source={require('../../assets/background.png')} style={styles.backgroundImage}>
                <View style={styles.forgotview}>
                    <Text style={{ fontSize: 26 }}> Forgot Password </Text>
                </View>
                <View style={{ marginTop: 10, marginLeft: 40, flexDirection: 'row' }} >
                    <Text style={{ fontSize: 14, color: '#8A8E91' }}>Enter new password below</Text>
                </View>
                <ScrollView
                    Vertical={true}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps={'always'}
                >
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <View style={newPassworderror == null ? styles.inputview : styles.inputviewError} >
                            <TextInput
                                style={styles.TextInput}
                                placeholder='New Password'
                                type='clear'
                                placeholderTextColor="#ABAFB3"
                                defaultValue={newPassword}
                                returnKeyType="next"
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
                                type='clear'
                                placeholderTextColor="#ABAFB3"
                                returnKeyType="done"
                                blurOnSubmit={false}
                                ref={secondTextInputRef}
                                secureTextEntry={true}
                                onSubmitEditing={() => Keyboard.dismiss()}
                                onChangeText={(repassword) => setRePasswordCheck(repassword)}
                            />
                        </View>
                    </View>
                    <View style={{ marginTop: 5, flexDirection: 'row', marginRight: 40, alignItems: 'flex-end', justifyContent: 'flex-end' }} >
                        <Text style={styles.innerText}> Back to </Text>
                        <TouchableOpacity onPress={() => { this.props.navigation.navigate('LoginScreen') }} >
                            <Text style={styles.baseText}>Login</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity style={styles.forBtn} onPress={() => onPressSubmit()}>
                            {loading == true ? <Loading /> : <Text style={styles.forText}>Reset Password</Text>}
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