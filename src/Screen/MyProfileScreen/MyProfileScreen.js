import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, ActivityIndicator, TouchableOpacity, ToastAndroid, Alert } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp, } from 'react-native-responsive-screen'
import AsyncStorage from '@react-native-community/async-storage'

export default class MyProfileScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            companyData: null,
            userProfile: null,
        }
    }

    componentDidMount() {
        this.getdata()
    }

    getdata = async () => {
        var getUser = await AsyncStorage.getItem('@authuser')
        if (getUser == null) {
            setTimeout(() => {
                this.props.navigation.replace('LoginScreen')
            }, 5000);
        } else {
            var userData;
            userData = JSON.parse(getUser)
            this.setState({
                companyData: userData,
                userProfile: userData.profilepic
            })
        }
    }


    onPressUpdateProfile() {
        const { companyData } = this.state;
        if (companyData != null) {
            this.props.navigation.navigate('UpdateProfile', { companyData })
        }
    }

    onPressLogout() {
        Alert.alert(
            "Confirmation required",
            "Do you really want to logout?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Yes", onPress: () => {
                        ToastAndroid.show("Log Out Success!", ToastAndroid.SHORT),
                            AsyncStorage.removeItem('@authuser');
                        this.props.navigation.replace('LoginScreen')
                    }
                }
            ],
            { cancelable: false }
        );
    }

    render() {
        const { companyData, userProfile } = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.header}></View>
                {companyData === null ?
                    <ActivityIndicator size="large" color="#AAAAAA" style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }} />
                    : <>
                        <Image style={styles.avatar} source={{ uri: userProfile && userProfile !== null ? userProfile : "https://res.cloudinary.com/dnogrvbs2/image/upload/v1610428971/userimage_qif8wv.jpg" }} />
                        <View style={styles.body}>
                            <View style={styles.bodyContent}>
                                <Text style={styles.name}>{companyData && companyData.fullname}</Text>
                            </View>
                            <View style={{
                                flex: 1, flexDirection: 'column', alignItems: 'center'
                            }}>
                                <TouchableOpacity style={styles.buttonContainer} onPress={() => this.onPressUpdateProfile()}>

                                    <Text style={styles.textContainer}> Update Profile</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.buttonContainer} onPress={() => this.onPressLogout()}>

                                    <Text style={styles.textContainer}> Log out</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </>
                }
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'

    },
    avatar: {
        width: hp('20%'),
        height: hp('20%'),
        borderRadius: wp('20%'),
        alignSelf: 'center',
        marginTop: wp('20%')
    },
    body: {
        marginTop: hp('3%'),
    },
    bodyContent: {
        flex: 1,
        alignItems: 'center',
        paddingBottom: hp('7%')
    },
    name: {
        fontSize: hp('4%'),
        color: "#737373",
        fontWeight: 'bold',
        textTransform: 'capitalize'
    },
    buttonContainer: {
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
    textContainer: {
        padding: hp('1%'),
        fontSize: hp('3%'),
        color: '#ABAFB3'
    },


})


