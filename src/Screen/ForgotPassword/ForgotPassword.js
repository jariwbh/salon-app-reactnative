import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, ImageBackground, TouchableOpacity } from 'react-native';

import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen'
import { FontAwesome5, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';



class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            //  <ImageBackground source={require('../../../assets/Images/BG.png')} style={styles.backgroundImage}>
            <View style={styles.container}>
                <View style={styles.forgotview}>
                    <Text style={{ fontSize: hp('4%'), }}> Forgot Password </Text>
                </View>
                <View style={{ marginTop: hp('2%'), marginLeft: hp('7%'), flexDirection: 'row' }} >
                    <Text style={{ fontSize: hp('2%'), }}>Enter new password below</Text>
                </View>
                {/* <View style={{ marginTop: hp('2%'), justifyContent: 'center', alignItems: 'center' }} >
                    <MaterialCommunityIcons name="shield-key-outline" size={60} color="#000000" style={{ paddingLeft: hp('3%') }} />
                </View> */}
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <View style={styles.inputview} >

                        <TextInput
                            style={styles.TextInput}
                            placeholder="Password"
                            type='clear'
                            placeholderTextColor="#ABAFB3"
                            secureTextEntry={true}
                            returnKeyType="done"

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

                        // keyboardType="numeric"
                        // onChangeText={(mobilenumber) => this.setMobileNumber(mobilenumber)}
                        />
                    </View>

                </View>
                <View style={{ marginTop: hp('1%'), flexDirection: 'row', marginRight: hp('7%'), alignItems: 'flex-end', justifyContent: 'flex-end' }} >
                    <Text style={styles.innerText}> Back to </Text>
                    <TouchableOpacity onPress={() => { this.props.navigation.navigate('LoginScreen') }} >
                        <Text style={styles.baseText}>Login</Text>
                    </TouchableOpacity>

                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity style={styles.forBtn} onPress={() => { }}>
                        <Text style={styles.forText}>Save</Text>
                    </TouchableOpacity>
                </View>

            </View>
            // </ImageBackground>
        );
    }
}

export default ForgotPassword;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    // backgroundImage: {
    //     flex: 1,
    //     resizeMode: 'cover'
    // },
    forgotview: {
        marginLeft: hp('5%'),
        marginTop: hp('20%'),
    },
    innerText: {
        color: '#605C5C',
        fontSize: hp('2%'),
    },
    baseText: {
        fontWeight: 'normal',
        color: '#183BAE',
        fontSize: hp('2%'),
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
        margin: hp('3%'),
        alignItems: "center",

    },
    TextInput: {
        fontSize: hp('2%'),
        flex: 1,
        padding: hp('2%'),
    },
    forBtn: {
        flexDirection: 'row',
        width: wp('30%'),
        backgroundColor: "#F6C455",
        borderRadius: wp('7%'),
        height: hp('6%'),
        alignItems: "center",
        justifyContent: "center",
        marginTop: hp('2%'),

    },
    forText: {
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