import React, { Component } from 'react'
import {
    View, Text, StyleSheet, Image, Dimensions, TouchableOpacity,
    StatusBar, ToastAndroid, SafeAreaView, ImageBackground
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import Loader from '../../Components/Loader/Loader';
const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;
import * as KEY from '../../context/actions/key';
import * as COLOR from '../../styles/colors';
import * as IMAGE from '../../styles/image';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default class MyProfileScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            companyData: null,
            userProfile: null,
            loader: true,
            showLogin: false
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
            this.setState({ showLogin: true });
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
            //  alert('Log Out Success');
        }
        this.props.navigation.replace('LoginScreen');
    }

    onPressSignUp = () => {
        this.props.navigation.navigate('RegisterScreen');
    }

    onPressLogin = () => {
        this.props.navigation.navigate('LoginScreen');
    }

    render() {
        const { companyData, userProfile, loader, showLogin } = this.state;
        return (
            !showLogin
                ?
                <SafeAreaView style={styles.container}>
                    <StatusBar backgroundColor={COLOR.STATUSBARCOLOR} barStyle={KEY.LIGHT_CONTENT} />
                    <View style={styles.headerstyle}>
                        <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, flexDirection: KEY.ROW, marginTop: 30 }}>
                            <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, }}>
                                <Text style={{ fontSize: 22, color: COLOR.WHITE, fontWeight: 'bold' }}>My Profile</Text>
                            </View>
                        </View>
                    </View>
                    {companyData === null ?
                        <Loader />
                        : <>
                            <Image style={styles.avatar} source={{ uri: userProfile && userProfile !== null ? userProfile : "https://res.cloudinary.com/dnogrvbs2/image/upload/v1610428971/userimage_qif8wv.jpg" }} />
                            <View style={{ marginLeft: 230, marginTop: -20 }}>
                                <TouchableOpacity onPress={() => this.onPressUpdateProfile()}>
                                    <MaterialCommunityIcons name='circle-edit-outline' size={25} color={COLOR.MENU_TEXT_COLOR} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.body}>
                                <View style={styles.bodyContent}>
                                    <Text style={styles.name}>{companyData && companyData.fullname}</Text>
                                </View>
                                <View style={{
                                    flex: 1, flexDirection: KEY.COLUMN, alignItems: KEY.CENTER, marginTop: 10
                                }}>
                                    <TouchableOpacity style={styles.buttonContainer} onPress={() => this.onPressUpdateProfile()}>
                                        <Entypo name="edit" size={20} color={COLOR.MENU_TEXT_COLOR} style={{ padding: 8, paddingLeft: 16 }} />
                                        <Text style={styles.textContainer}>Update Profile</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.buttonContainer} onPress={() => this.onPressLogout()}>
                                        <Entypo name="log-out" size={20} color={COLOR.MENU_TEXT_COLOR} style={{ padding: 8, paddingLeft: 16 }} />
                                        <Text style={styles.textContainer}>Log out</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </>
                    }
                </SafeAreaView>
                :
                <SafeAreaView style={styles.container}>
                    <StatusBar backgroundColor={COLOR.STATUSBARCOLOR} barStyle={KEY.LIGHT_CONTENT} />
                    <ImageBackground source={IMAGE.BACKGROUND_IMAGE} tintColor={COLOR.DEFALUTCOLOR} style={styles.backgroundImage}>
                        <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, marginTop: 50 }}>
                            <Image style={styles.imageLogo} resizeMode={KEY.COVER} source={IMAGE.LOGO} />
                        </View>
                    </ImageBackground>
                    <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, marginTop: HEIGHT / 6 }}>
                        <TouchableOpacity style={styles.update_Btn} onPress={() => this.onPressSignUp()}>
                            <Text style={styles.update_text} >Sign Up</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.update_Btn} onPress={() => this.onPressLogin()}>
                            <Text style={styles.update_text} >Login Now</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.BACKGROUNDCOLOR
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 100,
        alignSelf: KEY.CENTER,
        marginTop: 10
    },
    body: {
        marginTop: 15,
    },
    bodyContent: {
        flex: 1,
        alignItems: KEY.CENTER,
        paddingBottom: 40
    },
    name: {
        fontSize: 22,
        color: COLOR.MENU_TEXT_COLOR,
        fontWeight: 'bold',
        textTransform: KEY.CAPITALIZE
    },
    buttonContainer: {
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
        margin: 10,
        alignItems: KEY.CENTER
    },
    textContainer: {
        marginLeft: 10,
        fontSize: 20,
        color: COLOR.MENU_TEXT_COLOR
    },
    headerstyle: {
        backgroundColor: COLOR.STATUSBARCOLOR,
        width: WIDTH,
        height: 90,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        marginBottom: 20
    },
    backgroundImage: {
        marginTop: -20,
        width: WIDTH,
        height: HEIGHT / 3,
    },
    imageLogo: {
        justifyContent: KEY.CENTER,
        alignItems: KEY.CENTER,
        height: 150,
        width: 220
    },
    update_Btn: {
        flexDirection: KEY.ROW,
        backgroundColor: COLOR.DEFALUTCOLOR,
        marginTop: 10,
        borderRadius: 100,
        width: WIDTH / 2,
        height: 45,
        alignItems: KEY.CENTER,
        justifyContent: KEY.CENTER
    },
    update_text: {
        color: COLOR.WHITE,
        fontWeight: 'bold',
        fontSize: 18,
    },
})


