import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, ToastAndroid, SafeAreaView } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import Loader from '../../Components/Loader/Loader';
const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

export default class MyProfileScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            companyData: null,
            userProfile: null,
            loader: true,
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
            }, 3000);
        } else {
            var userData;
            userData = JSON.parse(getUser)
            this.setState({
                loader: false,
                companyData: userData,
                userProfile: userData.profilepic
            });
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
        if (Platform.OS === 'android') {
            ToastAndroid.show("Log Out Success", ToastAndroid.SHORT);
        } else {
            alert('Log Out Success');
        }
        this.props.navigation.replace('LoginScreen');
    }

    render() {
        const { companyData, userProfile, loader } = this.state;
        return (
            <SafeAreaView style={styles.container}>
                {companyData === null ?
                    <Loader />
                    : <>
                        <Image style={styles.avatar} source={{ uri: userProfile && userProfile !== null ? userProfile : "https://res.cloudinary.com/dnogrvbs2/image/upload/v1610428971/userimage_qif8wv.jpg" }} />
                        <View style={{ marginLeft: 230, marginTop: -20 }}>
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
                                    <Entypo name="edit" size={20} color="#737373" style={{ padding: 8, paddingLeft: 16 }} />
                                    <Text style={styles.textContainer}> Update Profile</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.buttonContainer} onPress={() => this.onPressLogout()}>
                                    <Entypo name="log-out" size={20} color="#737373" style={{ padding: 8, paddingLeft: 16 }} />
                                    <Text style={styles.textContainer}> Log out</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </>
                }
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 100,
        alignSelf: 'center',
        marginTop: 10
    },
    body: {
        marginTop: 15,
    },
    bodyContent: {
        flex: 1,
        alignItems: 'center',
        paddingBottom: 40
    },
    name: {
        fontSize: 28,
        color: "#737373",
        fontWeight: 'bold',
        textTransform: 'capitalize'
    },
    buttonContainer: {
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
        borderColor: '#FFFFFF',
        width: WIDTH - 60,
        height: 50,
        margin: 20,
        alignItems: "center"
    },
    textContainer: {
        padding: 20,
        fontSize: 20,
        color: '#737373'
    }
})


