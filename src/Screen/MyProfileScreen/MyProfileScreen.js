import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, ActivityIndicator, TouchableOpacity, ToastAndroid, Alert } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp, } from 'react-native-responsive-screen'
import AsyncStorage from '@react-native-community/async-storage'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import Loader from '../../Components/Loader/Loader';

export default class MyProfileScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            companyData: null,
            userProfile: null,
        }
    }

    wait = (timeout) => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
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
            this.wait(1000).then(() => this.setState({ loader: false, companyData: userData, userProfile: userData.profilepic }));
        }
    }

    onPressUpdateProfile() {
        const { companyData } = this.state;
        if (companyData != null) {
            this.props.navigation.navigate('UpdateProfile', { companyData })
        }
    }

    onPressLogout() {
        AsyncStorage.removeItem('@authuser');
        ToastAndroid.show("Log Out Success!", ToastAndroid.SHORT),
            this.props.navigation.replace('LoginScreen')
    }

    render() {
        const { companyData, userProfile, loader } = this.state;
        return (
            <View style={styles.container}>
                {companyData === null ?
                    <Loader />
                    : <>
                        <Image style={styles.avatar} source={{ uri: userProfile && userProfile !== null ? userProfile : "https://res.cloudinary.com/dnogrvbs2/image/upload/v1610428971/userimage_qif8wv.jpg" }} />
                        <View style={{ marginLeft: hp('32%'), marginTop: hp('-4%') }}>
                            <TouchableOpacity onPress={() => this.onPressUpdateProfile()}>
                                <MaterialCommunityIcons name='circle-edit-outline' size={25} color="#737373" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.body}>
                            <View style={styles.bodyContent}>
                                <Text style={styles.name}>{companyData && companyData.fullname}</Text>
                            </View>
                            <View style={{
                                flex: 1, flexDirection: 'column', alignItems: 'center'
                            }}>
                                <TouchableOpacity style={styles.buttonContainer} onPress={() => this.onPressUpdateProfile()}>
                                    <Entypo name="edit" size={20} color="#737373" style={{ padding: hp('1.5%'), paddingLeft: hp('2.5%'), }} />
                                    <Text style={styles.textContainer}> Update Profile</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.buttonContainer} onPress={() => this.onPressLogout()}>
                                    <Entypo name="log-out" size={20} color="#737373" style={{ padding: hp('1.5%'), paddingLeft: hp('2.5%') }} />
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
        marginTop: wp('10%')
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
        backgroundColor: "#FFFFFF",
        borderRadius: wp('8%'),
        shadowOpacity: 0.5,
        shadowRadius: 3,
        shadowOffset: {
            height: 0,
            width: 0,
        },
        elevation: 2,
        borderColor: '#FFFFFF',
        width: wp('80%'),
        height: hp('8%'),
        margin: hp('3%'),
        alignItems: "center",
    },
    textContainer: {
        padding: hp('1%'),
        fontSize: hp('3%'),
        color: '#737373'
    },
})


