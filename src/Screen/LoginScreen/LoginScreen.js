import React, { Component } from 'react';
import {
    View, Text, StyleSheet, ImageBackground, ToastAndroid, Image,
    Dimensions, TextInput, TouchableOpacity, SafeAreaView, StatusBar, BackHandler
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import Loader from '../../Components/Loader/Loading'
import { LoginService } from "../../Services/LoginService/LoginService"
const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;
import axiosConfig from '../../Helpers/axiosConfig';
import * as KEY from '../../context/actions/key';
import * as COLOR from '../../styles/colors';
import * as IMAGE from '../../styles/image';

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
        this.setEmail = this.setEmail.bind(this);
        this.setPassword = this.setPassword.bind(this);
        this.onPressSubmit = this.onPressSubmit.bind(this);
        this.secondTextInputRef = React.createRef();
    }

    setEmail(email) {
        if (!email || email.length <= 0) {
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
        AsyncStorage.setItem(KEY.AUTHUSER, JSON.stringify(user))
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
                        this.props.navigation.replace('TabNavigation');
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

    render() {
        const { usererror, passworderror } = this.state;
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor={COLOR.STATUSBARCOLOR} barStyle={KEY.DARK_CONTENT} />
                <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={KEY.ALWAYS}>
                    <ImageBackground source={IMAGE.BACKGROUND_IMAGE} tintColor={COLOR.DEFALUTCOLOR} style={styles.backgroundImage}>
                        <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, marginTop: 50 }}>
                            <Image style={styles.imageLogo} resizeMode={KEY.COVER} source={IMAGE.LOGO} />
                        </View>
                    </ImageBackground>
                    <View style={styles.hello}>
                        <Text style={{ color: COLOR.BLACK, fontSize: 28 }}>Welcome </Text>
                        <Text style={{ color: COLOR.BLACK, fontSize: 18 }}>Sign in to your account</Text>
                    </View>
                    <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                        <View style={styles.inputView}>
                            <TextInput
                                style={usererror == null ? styles.TextInput : styles.TextInputError}
                                placeholder="Username"
                                defaultValue={this.state.username}
                                type={KEY.CLEAR}
                                returnKeyType={KEY.NEXT}
                                placeholderTextColor={COLOR.PLACEHOLDER_COLOR}
                                blurOnSubmit={false}
                                onSubmitEditing={() => { this.secondTextInputRef.current.focus() }}
                                onChangeText={(email) => this.setEmail(email)}
                            />
                        </View>
                        <View style={styles.inputView}>
                            <TextInput
                                style={passworderror == null ? styles.TextInput : styles.TextInputError}
                                placeholder="**********"
                                type={KEY.CLEAR}
                                defaultValue={this.state.password}
                                placeholderTextColor={COLOR.PLACEHOLDER_COLOR}
                                secureTextEntry={true}
                                returnKeyType={KEY.DONE}
                                ref={this.secondTextInputRef}
                                onSubmitEditing={() => this.onPressSubmit()}
                                onChangeText={(password) => this.setPassword(password)}
                            />
                        </View>
                    </View>
                    <View style={{ alignItems: KEY.FLEX_END, marginRight: 40 }}>
                        <TouchableOpacity onPress={() => { this.props.navigation.navigate('ForgotPasswordMain'), this.resetScreen() }}>
                            <Text style={{ fontSize: 14, color: COLOR.PLACEHOLDER_COLOR, marginTop: 5 }}>Forgot password?</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, marginTop: 20 }}>
                        <TouchableOpacity style={styles.loginBtn} onPress={() => this.onPressSubmit()} >
                            {this.state.loading == true ? <Loader /> : <Text style={styles.loginText}>Sign In</Text>}
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginTop: 15, justifyContent: KEY.CENTER, flexDirection: KEY.ROW }} >
                        <Text style={styles.innerText}> Don't have an account? </Text>
                        <TouchableOpacity onPress={() => { this.props.navigation.navigate('RegisterScreen'), this.resetScreen() }} >
                            <Text style={styles.baseText}>Create</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
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
    hello: {
        marginTop: 10,
        marginLeft: 35
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
        margin: 12,
        alignItems: KEY.CENTER
    },
    TextInput: {
        fontSize: 16,
        flex: 1,
        padding: 15,
        borderColor: COLOR.WHITE,
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
    loginBtn: {
        flexDirection: KEY.ROW,
        width: WIDTH / 3,
        backgroundColor: COLOR.DEFALUTCOLOR,
        borderRadius: 100,
        height: 40,
        alignItems: KEY.CENTER,
        justifyContent: KEY.CENTER,
        marginRight: 20
    },
    loginText: {
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