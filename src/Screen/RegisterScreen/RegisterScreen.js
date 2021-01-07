
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, TextInput, } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { heightPercentageToDP as hp, widthPercentageToDP as wp, } from 'react-native-responsive-screen'
// import { RegisterService } from '../../Services/RegisterService/RegisterService';
// import { FontAwesome5, AntDesign, Fontisto } from '@expo/vector-icons';





class RegisterScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    }

    render() {
        return (
            //   <ImageBackground source={require('../../../assets/Images/BG.png')} style={styles.backgroundImage}>
            <View style={styles.container}>
                <View style={styles.sineupview}>
                    <Text style={{ fontSize: hp('4%'), }}>Create Account </Text>
                </View>
                <ScrollView
                    Vertical={true}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <View style={styles.inputview}>
                            <TextInput
                                style={styles.TextInput}
                                placeholder="Fist Name"
                                type='clear'
                                placeholderTextColor="#ABAFB3"
                                returnKeyType="next"

                            // onChangeText={(fullname) => this.setFullName(fullname)}
                            />
                        </View>
                        <View style={styles.inputview}>
                            <TextInput
                                style={styles.TextInput}
                                placeholder="Last Name"
                                type='clear'
                                placeholderTextColor="#ABAFB3"
                                returnKeyType="next"

                            // onChangeText={(fullname) => this.setFullName(fullname)}
                            />
                        </View>
                        <View style={styles.inputview}>
                            <TextInput
                                style={styles.TextInput}
                                placeholder="User Name"
                                type='clear'
                                placeholderTextColor="#ABAFB3"
                                returnKeyType="next"

                            // onChangeText={(fullname) => this.setFullName(fullname)}
                            />
                        </View>
                        <View style={styles.inputview}>

                            <TextInput
                                style={styles.TextInput}
                                placeholder="Email"
                                type='clear'
                                placeholderTextColor="#ABAFB3"
                                returnKeyType="next"

                            // onChangeText={(email) => this.setEmail(email)}
                            />

                        </View>
                        <View style={styles.inputview} >

                            <TextInput
                                style={styles.TextInput}
                                placeholder="Password"
                                type='clear'
                                placeholderTextColor="#ABAFB3"
                                secureTextEntry={true}
                                returnKeyType="done"
                                keyboardType="numeric"
                            // keyboardType="numeric"
                            // onChangeText={(mobilenumber) => this.setMobileNumber(mobilenumber)}
                            />
                        </View>
                        <View style={styles.inputview} >

                            <TextInput
                                style={styles.TextInput}
                                placeholder="Confrim Password"
                                type='clear'
                                placeholderTextColor="#ABAFB3"
                                secureTextEntry={true}
                                returnKeyType="done"
                                keyboardType="numeric"
                            // keyboardType="numeric"
                            // onChangeText={(mobilenumber) => this.setMobileNumber(mobilenumber)}
                            />
                        </View>
                    </View>

                    <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                        <TouchableOpacity style={styles.sineBtn} onPress={() => { this.props.navigation.navigate('TabNavigation') }} >
                            <Text style={styles.sineText}>Sign Up</Text>

                        </TouchableOpacity>
                    </View>
                    <View style={{ marginTop: hp('5%'), justifyContent: 'center', flexDirection: 'row' }} >
                        <Text style={styles.innerText}> Don't have an account? </Text>
                        <TouchableOpacity onPress={() => { this.props.navigation.navigate('LoginScreen') }} >
                            <Text style={styles.baseText}>Signin</Text>
                        </TouchableOpacity>

                    </View>
                </ScrollView>
            </View>
            // </ImageBackground>

        );
    }
}

export default RegisterScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover'
    },
    sineupview: {
        marginLeft: hp('5%'),
        marginTop: hp('2%'),
    },
    inputview: {
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
        margin: hp('2.5%'),
        alignItems: "center",

    },
    TextInput: {
        fontSize: hp('2%'),
        flex: 1,
        padding: hp('2%'),
    },
    sineBtn: {
        flexDirection: 'row',
        width: wp('30%'),
        backgroundColor: "#F6C455",
        borderRadius: wp('7%'),
        height: hp('6%'),
        alignItems: "center",
        justifyContent: "center",
    },
    sineText: {
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

