import React, { Component } from 'react'
import {
    View, Text, StyleSheet, Image, Dimensions, TouchableOpacity,
    StatusBar, SafeAreaView, ImageBackground, Alert, Platform
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import Loader from '../../Components/Loader/Loader';
const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;
import * as TYPE from '../../context/actions/type';
import * as KEY from '../../context/actions/key';
import * as COLOR from '../../styles/colors';
import * as IMAGE from '../../styles/image';
import * as FONT from '../../styles/typography';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Toast from 'react-native-simple-toast';
import { getBranchDetails } from '../../Services/LocalService/LocalService';
import { MemberService } from '../../Services/UserService/UserService'

export default class MyProfileScreen extends Component {
    constructor(props) {
        super(props);
        this.getBranch = null;
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

    async componentDidMount() {
        const getBranch = await getBranchDetails();
        this.getBranch = getBranch;
        this.getdata()
    }

    getdata = async () => {
        var getUser = await AsyncStorage.getItem(KEY.AUTHUSER)
        if (getUser == null) {
            this.setState({ showLogin: true });
        } else {
            var userData;
            userData = JSON.parse(getUser)
            await this.getMemberDetails(userData._id);
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
            "Logout",
            "Are you sure you want to logout?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Log out", onPress: () => {
                        AsyncStorage.removeItem(KEY.AUTHUSERINFO);
                        AsyncStorage.removeItem(KEY.AUTHUSER);
                        Toast.show('Log Out Success', Toast.SHORT);
                        this.props.navigation.replace('LoginScreen');
                    }
                }
            ]
        );

    }

    onPressSignUp = () => {
        this.props.navigation.replace('AuthStackScreen');
    }

    onPressLogin = () => {
        this.props.navigation.replace('AuthStackScreen');
    }

    authenticateUser = (user) => {
        AsyncStorage.setItem(KEY.AUTHUSER, JSON.stringify(user));
    }

    getMemberDetails = async (id) => {
        try {
            await MemberService(id).then(response => {
                if (response.data != null && response.data != 'undefind' && response.status == 200) {
                    this.setState({
                        loader: false,
                        companyData: response.data,
                        userProfile: response.data.profilepic
                    });
                    this.authenticateUser(response.data);
                }
            })
        }
        catch (error) {
            console.log(`error`, error);
            this.setState({ loading: false })
            Toast.show('Your Profile Not Update', Toast.SHORT);
        }
    }

    render() {
        const { companyData, userProfile, loader, showLogin } = this.state;
        return (
            !showLogin
                ?
                <SafeAreaView style={styles().container}>
                    <StatusBar backgroundColor={this.getBranch?.property?.appcolorcode ? this.getBranch.property.appcolorcode : COLOR.STATUSBARCOLOR} barStyle={Platform.OS === 'ios' ? KEY.DARK_CONTENT : KEY.LIGHT_CONTENT} />
                    <View style={styles(this.getBranch?.property?.appcolorcode ? this.getBranch.property.appcolorcode : COLOR.STATUSBARCOLOR).headerstyle}>
                        <Image source={{ uri: this.getBranch?.property?.mobilelogo ? this.getBranch?.property?.mobilelogo : TYPE.DefaultImage }}
                            style={{ tintColor: COLOR.WHITE, alignItems: KEY.CENTER, height: 90, width: 90, marginLeft: 10, marginTop: 0, borderRadius: 10, resizeMode: KEY.COVER }}
                        />
                        <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, flexDirection: KEY.ROW, marginTop: -60 }}>
                            <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, marginTop: 0 }}>
                                <Text style={{ fontSize: 22, color: COLOR.WHITE, fontFamily: FONT.FONT_FAMILY_BOLD }}>{'My Profile'}</Text>
                            </View>
                        </View>
                    </View>
                    {companyData === null ?
                        <Loader />
                        : <>
                            <Image style={styles().avatar} source={{ uri: userProfile && userProfile !== null ? userProfile : "https://res.cloudinary.com/dnogrvbs2/image/upload/v1610428971/userimage_qif8wv.jpg" }} />
                            <View style={{ marginLeft: 230, marginTop: -20 }}>
                                <TouchableOpacity onPress={() => this.onPressUpdateProfile()}>
                                    <MaterialCommunityIcons name='circle-edit-outline' size={25} color={COLOR.MENU_TEXT_COLOR} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles().body}>
                                <View style={styles().bodyContent}>
                                    <Text style={styles().name}>{companyData && companyData.fullname}</Text>
                                </View>
                                <View style={{
                                    flex: 1, flexDirection: KEY.COLUMN, alignItems: KEY.CENTER, marginTop: 10
                                }}>
                                    <TouchableOpacity style={styles().buttonContainer} onPress={() => this.onPressUpdateProfile()}>
                                        <Entypo name="edit" size={20} color={COLOR.MENU_TEXT_COLOR} style={{ padding: 8, paddingLeft: 16 }} />
                                        <Text style={styles().textContainer}>Update Profile</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles().buttonContainer} onPress={() => this.onPressLogout()}>
                                        <Entypo name="log-out" size={20} color={COLOR.MENU_TEXT_COLOR} style={{ padding: 8, paddingLeft: 16 }} />
                                        <Text style={styles().textContainer}>Log out</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </>
                    }
                </SafeAreaView>
                :
                <SafeAreaView style={styles().container}>
                    <StatusBar backgroundColor={COLOR.HEADERCOLOR} barStyle={KEY.LIGHT_CONTENT} />
                    <ImageBackground source={IMAGE.BACKGROUND_IMAGE} tintColor={COLOR.HEADERCOLOR} style={styles().backgroundImage}>
                        <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, marginTop: 50 }}>
                            <Image style={styles().imageLogo} resizeMode={KEY.COVER} source={this.getBranch?.property?.mobilelogo ? { uri: this.getBranch?.property?.mobilelogo } : { uri: TYPE.DefaultImage }} />
                        </View>
                    </ImageBackground>
                    <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, marginTop: HEIGHT / 6 }}>
                        <TouchableOpacity
                            style={styles(this.getBranch?.property?.appcolorcode ? this.getBranch.property.appcolorcode : COLOR.DEFALUTCOLOR).update_Btn}
                            onPress={() => this.onPressSignUp()}>
                            <Text style={styles().update_text} >Sign Up</Text>
                        </TouchableOpacity>
                        <TouchableOpacity

                            style={styles(this.getBranch?.property?.appcolorcode ? this.getBranch.property.appcolorcode : COLOR.DEFALUTCOLOR).update_Btn}
                            onPress={() => this.onPressLogin()}>
                            <Text style={styles().update_text} >Sign In</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
        )
    }
}

const styles = (colorcode) => StyleSheet.create({
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
        fontFamily: FONT.FONT_FAMILY_BOLD,
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
        color: COLOR.MENU_TEXT_COLOR,
        fontFamily: FONT.FONT_FAMILY_REGULAR
    },
    headerstyle: {
        backgroundColor: colorcode,
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
        height: 160,
        width: 220
    },
    update_Btn: {
        flexDirection: KEY.ROW,
        backgroundColor: colorcode,
        marginTop: 10,
        borderRadius: 100,
        width: WIDTH / 2,
        height: 45,
        alignItems: KEY.CENTER,
        justifyContent: KEY.CENTER
    },
    update_text: {
        color: COLOR.WHITE,
        fontFamily: FONT.FONT_FAMILY_BOLD,
        fontSize: 18,
    },
})


