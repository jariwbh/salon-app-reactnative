import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Dimensions, TextInput, ToastAndroid, SafeAreaView, StatusBar, Keyboard } from 'react-native';
import RegisterService from '../../Services/RegisterService/RegisterService';
import { ScrollView } from 'react-native-gesture-handler';
import Loader from '../../Components/Loader/Loading';
import axiosConfig from '../../Helpers/axiosConfig';
const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

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
        axiosConfig('6066c57499e17f24a4db4495');
        if (!fullname || !username || !mobilenumber) {
            this.setFullName(fullname)
            this.setUserName(username)
            this.setMobileNumber(mobilenumber)
            return;
        }
        const body = {
            property: {
                fullname: fullname,
                primaryemail: username,
                mobile: mobilenumber,
            }
        }
        this.setState({ loading: true })
        try {
            await RegisterService(body).then(response => {
                if (response != null) {
                    if (Platform.OS === 'android') {
                        ToastAndroid.show("SignUp Success", ToastAndroid.LONG);
                    } else {
                        alert('SignUp Success');
                    }

                    this.props.navigation.navigate('LoginScreen');
                }
            })
        }
        catch (error) {
            this.setState({ loading: false })
            if (Platform.OS === 'android') {
                ToastAndroid.show("SignUp Failed", ToastAndroid.LONG);
            } else {
                alert('SignUp Failed');
            }

        }
    }

    render() {
        const { fullnameError, usernameError, mobilenumberError } = this.state;
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor="#FEBC42" barStyle="dark-content" />
                <ImageBackground source={require('../../assets/background.png')} style={styles.backgroundImage}>
                    <View style={styles.createtext}>
                        <Text style={{ color: '#36424A', fontSize: 28 }}>Create Account</Text>
                    </View>
                    <ScrollView
                        Vertical={true}
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps={'always'}
                    >
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <View style={styles.inputview}>
                                <TextInput
                                    style={fullnameError == null ? styles.TextInput : styles.TextInputError}
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
                            <View style={styles.inputview}>
                                <TextInput
                                    style={usernameError == null ? styles.TextInput : styles.TextInputError}
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
                            <View style={styles.inputview} >
                                <TextInput
                                    style={mobilenumberError == null ? styles.TextInput : styles.TextInputError}
                                    placeholder="Mobile Number"
                                    type='clear'
                                    placeholderTextColor="#ABAFB3"
                                    returnKeyType="done"
                                    keyboardType="number-pad"
                                    ref={this.TeardTextInputRef}
                                    onSubmitEditing={() => Keyboard.dismiss()}
                                    onChangeText={(mobilenumber) => this.setMobileNumber(mobilenumber)}
                                />
                            </View>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                            <TouchableOpacity style={styles.sineBtn} onPress={() => this.onPressSubmit()} >
                                {this.state.loading === true ? <Loader /> : <Text style={styles.sineText}>Sign Up</Text>}
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginTop: 15, justifyContent: 'center', flexDirection: 'row' }} >
                            <Text style={styles.innerText}>Already have an account? </Text>
                            <TouchableOpacity onPress={() => { this.props.navigation.navigate('LoginScreen') }} >
                                <Text style={styles.baseText}>Signin</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </ImageBackground>
            </SafeAreaView>
        );
    }
}

export default RegisterScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        width: WIDTH,
        height: HEIGHT
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
    sineBtn: {
        flexDirection: 'row',
        width: WIDTH / 3,
        backgroundColor: "#FEBC42",
        borderRadius: 100,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 20,
        marginTop: 15
    },
    sineText: {
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
    createtext: {
        marginTop: HEIGHT / 3 - 20,
        marginLeft: 35
    },
})

