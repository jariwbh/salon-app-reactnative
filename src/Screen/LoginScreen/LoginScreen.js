import React, { Component } from 'react';
import {
    View, Text, StyleSheet, ImageBackground, ToastAndroid,
    Dimensions, TextInput, TouchableOpacity, SafeAreaView, StatusBar, BackHandler
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import Loader from '../../Components/Loader/Loading'
import { LoginService } from "../../Services/LoginService/LoginService"
const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;
import axiosConfig from '../../Helpers/axiosConfig';

export default class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            usererror: null,
            password: null,
            passworderror: null,
            loading: false,
        };

        this._unsubscribeSiFocus = this.props.navigation.addListener('focus', e => {
            BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
        });

        this._unsubscribeSiBlur = this.props.navigation.addListener('blur', e => {
            BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton,
            );
        });

        this.setEmail = this.setEmail.bind(this);
        this.setPassword = this.setPassword.bind(this);
        this.onPressSubmit = this.onPressSubmit.bind(this);
        this.secondTextInputRef = React.createRef();
    }

    setEmail(email) {
        if (!email || email <= 0) {
            return this.setState({ usererror: 'User Name cannot be empty' });
        }
        return this.setState({ username: email, usererror: null });
    }

    setPassword(password) {
        if (!password || password.length <= 0) {
            return this.setState({ passworderror: 'Password cannot be empty' });
        }
        return this.setState({ password: password, passworderror: null });
    }

    resetScreen() {
        this.setState({
            username: null,
            usererror: null,
            password: null,
            passworderror: null,
            loading: false,
        });
    }

    authenticateUser = (user) => (
        AsyncStorage.setItem('@authuser', JSON.stringify(user))
    )

    onPressSubmit = async () => {
        axiosConfig(null);
        const { username, password } = this.state;
        if (!username || !password) {
            this.setEmail(username);
            this.setPassword(password);
            return;
        }
        const body = {
            username: username,
            password: password
        }
        this.setState({ loading: true });
        try {
            await LoginService(body)
                .then(response => {
                    if (response.data && response.data != undefined && response.status == 200) {
                        this.authenticateUser(response.data.user);
                        let token = response.data.user._id;
                        axiosConfig(token);
                        if (Platform.OS === 'android') {
                            ToastAndroid.show("SignIn Success", ToastAndroid.LONG);
                        } else {
                            alert('SignIn Success');
                        }
                        this.props.navigation.navigate('TabNavigation');
                        this.resetScreen();
                        return
                    }
                })
        }
        catch (error) {
            this.setState({ loading: false })
            if (Platform.OS === 'android') {
                ToastAndroid.show("Username and Password Invalid", ToastAndroid.LONG)
            } else {
                alert('Username and Password Invalid');
            }

        };
    }

    componentWillUnmount() {
        this._unsubscribeSiFocus();
        this._unsubscribeSiBlur();
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton = () => {
        BackHandler.exitApp()
        return true;
    }

    render() {
        const { usererror, passworderror } = this.state;
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor="#FEBC42" barStyle="dark-content" />
                <ImageBackground source={require('../../assets/background.png')} style={styles.backgroundImage}>
                    <View style={styles.hello}>
                        <Text style={{ color: '#36424A', fontSize: 28 }}>Welcome </Text>
                        <Text style={{ color: '#8A8E91', fontSize: 18 }}>Sign in to your account</Text>
                    </View>
                    <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'always'}>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <View style={styles.inputView}>
                                <TextInput
                                    style={usererror == null ? styles.TextInput : styles.TextInputError}
                                    placeholder="Username"
                                    defaultValue={this.state.username}
                                    type='clear'
                                    returnKeyType="next"
                                    placeholderTextColor="#ABAFB3"
                                    blurOnSubmit={false}
                                    onSubmitEditing={() => { this.secondTextInputRef.current.focus() }}
                                    onChangeText={(email) => this.setEmail(email)}
                                />
                            </View>
                            <View style={styles.inputView}>
                                <TextInput
                                    style={passworderror == null ? styles.TextInput : styles.TextInputError}
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
                        </View>
                        <View style={{ alignItems: 'flex-end', marginRight: 40 }}>
                            <TouchableOpacity onPress={() => { this.props.navigation.navigate('ForgotPasswordMain'),this.resetScreen() }}>
                                <Text style={{ fontSize: 14, color: '#ABAFB3', marginTop: 5 }}>Forgot password?</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                            <TouchableOpacity style={styles.loginBtn} onPress={() => this.onPressSubmit()} >
                                {this.state.loading == true ? <Loader /> : <Text style={styles.loginText}>Sign In</Text>}
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginTop: 15, justifyContent: 'center', flexDirection: 'row' }} >
                            <Text style={styles.innerText}> Don't have an account? </Text>
                            <TouchableOpacity onPress={() => { this.props.navigation.navigate('RegisterScreen'), this.resetScreen() }} >
                                <Text style={styles.baseText}>Create</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </ImageBackground>
            </SafeAreaView>
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
        width: WIDTH,
        height: HEIGHT
    },
    hello: {
        marginTop: HEIGHT / 3,
        marginLeft: 35
    },
    inputView: {
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
    TextInput: {
        fontSize: 14,
        flex: 1,
        padding: 15,
        borderColor: '#FFFFFF'
    },
    TextInputError: {
        fontSize: 14,
        flex: 1,
        padding: 15,
        backgroundColor: "#FFFFFF",
        borderColor: '#FF0000',
        borderRadius: 100,
        width: WIDTH - 60,
        height: 50,
        alignItems: "center",
        borderWidth: 1
    },
    loginBtn: {
        flexDirection: 'row',
        width: WIDTH / 3,
        backgroundColor: "#FEBC42",
        borderRadius: 100,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 20
    },
    loginText: {
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