
import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, ToastAndroid, Image, TextInput, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { heightPercentageToDP as hp, widthPercentageToDP as wp, } from 'react-native-responsive-screen'
import AsyncStorage from '@react-native-community/async-storage';
import Loader from '../../Components/Loader'
import { LoginService } from "../../Services/LoginService/LoginService"


export default class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: 'SALON-46011',
            usererror: null,
            password: 'SALON-46011',
            passworderror: null,
            loading: false,
        };
        this.setEmail = this.setEmail.bind(this);
        this.setPassword = this.setPassword.bind(this);
        this.onPressSubmit = this.onPressSubmit.bind(this);
        this.secondTextInputRef = React.createRef();

    }
    setEmail(email) {
        if (!email || email <= 0) {
            return this.setState({ usererror: 'User Name cannot be empty' })
        }
        return this.setState({ username: email, usererror: null })
    }

    setPassword(password) {
        if (!password || password.length <= 0) {
            return this.setState({ passworderror: 'Password cannot be empty' });
        }
        return this.setState({ password: password, passworderror: null })
    }
    resetScreen() {
        this.setState({
            username: null,
            usererror: null,
            password: null,
            passworderror: null,
            loading: false,
        })
    }

    authenticateUser = (user) => (
        AsyncStorage.setItem('@authuser', JSON.stringify(user))
    )
    onPressSubmit = async () => {
        const { username, password } = this.state;
        if (!username || !password) {
            this.setEmail(username)
            this.setPassword(password)
            return;
        }
        const body = {
            username: username,
            password: password
        }
        this.setState({ loading: true })
        try {
            await LoginService(body)
                .then(response => {
                    if (response.type === "Error") {
                        this.setState({ loading: false })
                        ToastAndroid.show("Username and Password Invalid!", ToastAndroid.LONG);
                        this.resetScreen()
                        return
                    }

                    if (response != null || response != 'undefind') {
                        this.authenticateUser(response.user)
                        ToastAndroid.show("SignIn Success!", ToastAndroid.LONG);
                        this.props.navigation.navigate('TabNavigation')
                        this.resetScreen()
                        return
                    }
                })
        }
        catch (error) {
            this.setState({ loading: false })
            ToastAndroid.show("SignIn Failed!", ToastAndroid.LONG)
        };


    }
    render() {
        return (

            <View style={styles.container}>
                <ImageBackground source={require('../../../assets/image/background.png')} style={styles.backgroundImage}>
                    <View style={styles.hello}>
                        <Text style={{ color: '#36424A', fontSize: hp('5%') }}>Hello </Text>
                        <Text style={{ color: '#8A8E91', fontSize: hp('3%') }}>Sign in to your account</Text>
                    </View>
                    <ScrollView
                        Vertical={true}
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps={'always'}
                    >
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <View style={styles.inputView}>
                                <TextInput
                                    style={styles.TextInput}
                                    placeholder="Email"
                                    defaultValue={this.state.username}
                                    type='clear'
                                    returnKeyType="next"
                                    placeholderTextColor="#ABAFB3"
                                    blurOnSubmit={false}
                                    onSubmitEditing={() => { this.secondTextInputRef.current.focus() }}
                                    onChangeText={(email) => this.setEmail(email)}
                                />
                            </View>
                            <Text style={{ marginTop: hp('-3%'), marginLeft: hp('0%'), color: '#ff0000' }}>{this.state.usererror && this.state.usererror}</Text>
                            <View style={styles.inputView}>
                                <TextInput
                                    style={styles.TextInput}
                                    placeholder="**********"
                                    type='clear'
                                    defaultValue={this.state.password}
                                    placeholderTextColor="#ABAFB3"
                                    secureTextEntry={true}
                                    returnKeyType="done"
                                    ref={this.secondTextInputRef}
                                    onSubmitEditing={() => this.onPressSubmit()}
                                    onChangeText={(password) => this.setPassword(password)}
                                />
                            </View>
                            <Text style={{ marginTop: hp('-3%'), marginLeft: hp('0%'), color: '#ff0000' }}>{this.state.passworderror && this.state.passworderror}</Text>
                        </View>
                        {/* <View style={{ alignItems: 'flex-end', marginRight: hp('7%') }}>
                            <TouchableOpacity onPress={() => { this.props.navigation.navigate('ForgotPassword') }}>
                                <Text style={{ fontSize: hp('2%'), color: '#ABAFB3', marginTop: hp('0.5%') }}>Forgot password?</Text>
                            </TouchableOpacity>
                        </View> */}
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: hp('3%') }}>
                            <TouchableOpacity style={styles.loginBtn} onPress={() => this.onPressSubmit()} >
                                {this.state.loading === true ? <Loader /> : <Text style={styles.loginText}>Sign In</Text>}
                            </TouchableOpacity>

                        </View>
                        <View style={{ marginTop: hp('2%'), justifyContent: 'center', flexDirection: 'row' }} >
                            <Text style={styles.innerText}> Don't have an account? </Text>
                            <TouchableOpacity onPress={() => { this.props.navigation.navigate('RegisterScreen') }} >
                                <Text style={styles.baseText}>Create</Text>
                            </TouchableOpacity>

                        </View>
                    </ScrollView>
                </ImageBackground>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'

    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        width: wp('100%'),
        height: hp('100 %'),

    },
    hello: {
        marginTop: hp('30%'),
        marginLeft: hp('5%'),
    },
    inputView: {
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
        margin: hp('3%'),
        alignItems: "center",

    },
    TextInput: {
        fontSize: hp('2%'),
        flex: 1,
        padding: hp('2%'),
    },
    loginBtn: {
        flexDirection: 'row',
        width: wp('30%'),
        backgroundColor: "#FEBC42",
        borderRadius: wp('7%'),
        height: hp('6%'),
        alignItems: "center",
        justifyContent: "center",
        marginRight: hp('4%')

    },
    loginText: {
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