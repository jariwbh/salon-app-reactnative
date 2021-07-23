import React, { useState, useEffect } from 'react';
import {
    View, Text, StyleSheet, TextInput, ScrollView, ImageBackground,
    TouchableOpacity, SafeAreaView, Dimensions, Keyboard, ToastAndroid, Platform
} from 'react-native';
const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;
import Loader from '../../Components/Loader/Loading'

export default function ForgotPasswordOTP(props) {
    const verifyOtpNumber = props.route.params.verifyOtpNumber;
    const username = props.route.params.username;

    const [loading, setloading] = useState(false);
    const [inputOtpNumber, setinputOtpNumber] = useState(null);
    const [inputOtpNumberError, setinputOtpNumberError] = useState(null);

    useEffect(() => {
    }, [loading, inputOtpNumber, inputOtpNumberError])

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
                if (Platform.OS === 'android') {
                    ToastAndroid.show('OTP not Match!', ToastAndroid.LONG)
                } else {
                    alert('OTP not Match!');
                }
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
                        <View style={inputOtpNumberError == null ? styles.inputview : styles.inputviewError} >
                            <TextInput
                                style={styles.TextInput}
                                placeholder="Enter OTP"
                                type='clear'
                                placeholderTextColor="#ABAFB3"
                                keyboardType="decimal-pad"
                                returnKeyType="done"
                                defaultValue={inputOtpNumber}
                                onSubmitEditing={() => Keyboard.dismiss()}
                                onChangeText={(otp) => setinputOtpNumber(otp)}
                            />
                        </View>
                    </View>
                    <View style={{ marginTop: 5, flexDirection: 'row', marginRight: 40, alignItems: 'flex-end', justifyContent: 'flex-end' }} >
                        <Text style={styles.innerText}> Back to </Text>
                        <TouchableOpacity onPress={() => { props.navigation.navigate('ForgotPasswordMain'), resetScreen() }} >
                            <Text style={styles.baseText}>Resend OTP</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                        <TouchableOpacity style={styles.forBtn} onPress={() => otpVerify()}>
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
        shadowRadius: 1,
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