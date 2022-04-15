import React, { Component } from 'react';
import {
    View, Text, StyleSheet, Image, TextInput, TouchableOpacity,
    ScrollView, SafeAreaView, Dimensions, StatusBar, Platform, number
} from 'react-native';
import { getAllCountryService } from '../../Services/LookupService/LookupService';
import { UpdateUserService } from '../../Services/UserService/UserService';
import AsyncStorage from '@react-native-community/async-storage';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Loader from '../../Components/Loader/Loader';
import Loading from '../../Components/Loader/Loading';
const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;
import * as KEY from '../../context/actions/key';
import * as COLOR from '../../styles/colors';
import * as IMAGE from '../../styles/image';
import * as FONT from '../../styles/typography';
import Toast from 'react-native-simple-toast';
import { Picker } from '@react-native-picker/picker';
import { getBranchDetails } from '../../Services/LocalService/LocalService';

class UpdateProfile extends Component {
    constructor(props) {
        super(props);
        this.getBranch = null;
        this.companyData = this.props.route.params.companyData;
        this.state = {
            _id: this.companyData._id,
            fullname: this.companyData.property.fullname,
            fullnameError: null,
            username: this.companyData.property.primaryemail,
            usernameError: null,
            mobilenumber: this.companyData.property.mobile,
            mobilenumberError: null,
            country: null,
            countryList: null,
            whatsappnumber: this.companyData.property.whatsappnumber.number,
            userProfile: this.companyData.profilepic,
            profileName: this.companyData.fullname,
            memberName: this.companyData.username,
            loading: false,
            loader: true,
        }
        this.setFullName = this.setFullName.bind(this);
        this.setUserName = this.setUserName.bind(this);
        this.setMobileNumber = this.setMobileNumber.bind(this);
        this.setCountry = this.setCountry.bind(this);
        this.setwhatsappnumber = this.setwhatsappnumber(this);
        this.onPressSubmit = this.onPressSubmit.bind(this);
        this.secondTextInputRef = React.createRef();
        this.TeardTextInputRef = React.createRef();
    }


    wait = (timeout) => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }

    setFullName(fullname) {
        if (!fullname || fullname.length <= 0) {
            return this.setState({ fullnameError: 'User Name cannot be empty', fullname: null });
        }
        return this.setState({ fullname: fullname, fullnameError: null })
    }

    setUserName(email) {
        const re = /\S+@\S+\.\S+/;
        if (!email || email.length <= 0) {
            return this.setState({ usernameError: 'Email cannot be empty', username: null });
        }
        if (!re.test(email)) {

            return this.setState({ usernameError: 'Ooops! We need a valid email address' });
        }
        return this.setState({ username: email, usernameError: null })
    }

    setMobileNumber(mobilenumber) {
        //const reg = /^[0]?[789]\d{9}$/;
        if (!mobilenumber || mobilenumber.length <= 0) {
            return this.setState({ mobilenumberError: 'Mobile Number cannot be empty', mobilenumber: null });
        }
        // if (!reg.test(mobilenumber)) {
        //     return this.setState({ mobilenumberError: 'Ooops! We need a valid Mobile Number' });
        // }
        return this.setState({ mobilenumber: mobilenumber, mobilenumberError: null })
    }
    setCountry(country) {
        if (!country || country.length <= 0) {
            return this.setState({ countryError: 'country cannot be empty', country: null });
        }
        return this.setState({ country: country, countryError: null })
    }
    setwhatsappnumber(whatsappnumber) {
        if (!whatsappnumber || whatsappnumber.length <= 0) {
            return this.setState({ whatsappnumberError: 'Whatapp Number cannot be empty', whatsappnumber: null });
        }
        return this.setState({
            whatsappnumber: whatsappnumber, whatsappnumberError: null
        })
    }

    authenticateUser = (user) => {
        AsyncStorage.setItem(KEY.AUTHUSER, JSON.stringify(user));
    }

    onPressSubmit = async () => {
        const { fullname, username, mobilenumber, _id, memberName, country, whatsappnumber } = this.state;
        if (!fullname || !username || !mobilenumber) {
            this.setFullName(fullname)
            this.setUserName(username)
            this.setMobileNumber(mobilenumber)
            this.setCountry(country);
            this.setwhatsappnumber(whatsappnumber);
            return;
        }

        this.companyData.property.fullname = fullname;
        this.companyData.property.primaryemail = username;
        this.companyData.property.mobile = mobilenumber;
        this.companyData.property.whatsappnumber.number = whatsappnumber;

        const body = {
            _id: _id,
            property: this.companyData.property
            //, country: country, whatsappnumber: whatsappnumber
        }
        this.setState({ loading: true })
        try {
            await UpdateUserService(body).then(response => {
                if (response != null) {
                    this.authenticateUser(response.data)
                    Toast.show('Your Profile Update', Toast.SHORT);
                    this.props.navigation.replace('MyProfile');
                }
            })
        }
        catch (error) {
            this.setState({ loading: false })
            Toast.show('Your Profile Not Update', Toast.SHORT);
        }
    }

    async componentDidMount() {
        const getBranch = await getBranchDetails();
        this.getBranch = getBranch;
        this.wait(1000).then(() => this.setState({ loader: false }));
        this.getCountryList();
    }

    getCountryList = async () => {
        try {
            const response = await getAllCountryService();
            if (response.data != null && response.data != 'undefind' && response.status == 200) {
                this.setState({ loading: false, countryList: response.data[0].data });
            }
        } catch (error) {
            this.setState({ loading: false });
        }
    }

    render() {
        const { fullname, username, mobilenumber, userProfile, profileName, loader,
            loading, fullnameError, usernameError, mobilenumberError, countryList, countryError, country, whatsappnumber, whatsappnumberError, } = this.state;
        return (
            <SafeAreaView style={styles().container}>
                <StatusBar backgroundColor={this.getBranch?.property?.headercolorcode ? this.getBranch.property.headercolorcode : COLOR.STATUSBARCOLOR} barStyle={Platform.OS === 'ios' ? KEY.DARK_CONTENT : KEY.LIGHT_CONTENT} />
                <View style={styles(this.getBranch?.property?.headercolorcode ? this.getBranch.property.headercolorcode : COLOR.HEADERCOLOR).headerstyle}>
                    <View style={{ justifyContent: KEY.SPACEBETWEEN, alignItems: KEY.CENTER, flexDirection: KEY.ROW, marginTop: 30 }}>
                        <View style={{ flexDirection: KEY.ROW, justifyContent: KEY.CENTER, alignItems: KEY.CENTER, marginLeft: 20 }}>
                            <TouchableOpacity onPress={() => this.props.navigation.goBack(null)}>
                                <AntDesign name='arrowleft' color={COLOR.WHITE} size={24} />
                            </TouchableOpacity>
                            <View style={{ justifyContent: KEY.CENTER, marginLeft: WIDTH / 4 }}>
                                <Text style={{ fontSize: 22, color: COLOR.WHITE, fontFamily: FONT.FONT_FAMILY_BOLD }}>My Profile</Text>
                            </View>
                        </View>
                    </View>
                </View>
                {this.userData === null ?
                    <Loader />
                    : <>
                        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={KEY.ALWAYS}>
                            <Image style={styles().avatar} source={{ uri: userProfile && userProfile !== null ? userProfile : "https://res.cloudinary.com/dnogrvbs2/image/upload/v1610428971/userimage_qif8wv.jpg" }} />
                            <View style={styles().body}>
                                <View style={{
                                    flex: 1, flexDirection: 'column', alignItems: KEY.CENTER
                                }}>
                                    <View style={styles().bodyContent}>
                                        <Text style={styles().name}>{profileName && profileName}</Text>
                                    </View>
                                    <View style={{ marginLeft: 25, marginRight: 25 }}>
                                        <View style={{ flexDirection: KEY.ROW }}>
                                            <Text style={{
                                                fontSize: 16, marginBottom: 3, textTransform: KEY.CAPITALIZE, marginLeft: 20,
                                                color: COLOR.BLACK, fontFamily: FONT.FONT_FAMILY_REGULAR
                                            }}>Username</Text>
                                            <Text style={{
                                                marginLeft: 5, fontSize: 16, color: COLOR.ERRORCOLOR,
                                                marginTop: 0, marginBottom: 10, fontFamily: FONT.FONT_FAMILY_REGULAR
                                            }}>{'*'}</Text>
                                        </View>
                                        <View style={styles().inputView}>
                                            <TextInput
                                                style={fullnameError == null ? styles().TextInput : styles().TextInputError}
                                                label="Name"
                                                defaultValue={fullname}
                                                placeholder="User Name"
                                                type='clear'
                                                placeholderTextColor="#ABAFB3"
                                                returnKeyType="next"
                                                blurOnSubmit={false}
                                                onSubmitEditing={() => { this.secondTextInputRef.current.focus() }}
                                                onChangeText={(fullname) => this.setFullName(fullname)}
                                            />
                                        </View>
                                    </View>
                                    <View style={{ marginLeft: 25, marginRight: 25 }}>
                                        <View style={{ flexDirection: KEY.ROW }}>
                                            <Text style={{
                                                fontSize: 16, marginBottom: 3, textTransform: KEY.CAPITALIZE, marginLeft: 20,
                                                color: COLOR.BLACK, fontFamily: FONT.FONT_FAMILY_REGULAR
                                            }}>Email Id</Text>
                                            <Text style={{
                                                marginLeft: 5, fontSize: 16, color: COLOR.ERRORCOLOR,
                                                marginTop: 0, marginBottom: 10, fontFamily: FONT.FONT_FAMILY_REGULAR
                                            }}>{'*'}</Text>
                                        </View>
                                        <View style={styles().inputView}>
                                            <TextInput
                                                style={usernameError == null ? styles().TextInput : styles().TextInputError}
                                                defaultValue={username}
                                                placeholder="Email Id"
                                                type='clear'
                                                placeholderTextColor="#ABAFB3"
                                                autoCapitalize="none"
                                                autoCompleteType="email"
                                                textContentType="emailAddress"
                                                keyboardType="email-address"
                                                returnKeyType="next"
                                                blurOnSubmit={false}
                                                onSubmitEditing={() => { this.TeardTextInputRef.current.focus() }}
                                                ref={this.secondTextInputRef}
                                                onChangeText={(username) => this.setUserName(username)}
                                            />
                                        </View>
                                    </View>
                                    <View style={{ marginLeft: 25, marginRight: 25 }}>
                                        <View style={{ flexDirection: KEY.ROW }}>
                                            <Text style={{
                                                fontSize: 16, marginBottom: 3, textTransform: KEY.CAPITALIZE, marginLeft: 20,
                                                color: COLOR.BLACK, fontFamily: FONT.FONT_FAMILY_REGULAR
                                            }}>Mobile Number</Text>
                                            <Text style={{
                                                marginLeft: 5, fontSize: 16, color: COLOR.ERRORCOLOR,
                                                marginTop: 0, marginBottom: 10, fontFamily: FONT.FONT_FAMILY_REGULAR
                                            }}>{'*'}</Text>
                                        </View>
                                        <View style={styles().inputView} >

                                            <TextInput
                                                style={mobilenumberError == null ? styles().TextInput : styles().TextInputError}
                                                defaultValue={mobilenumber}
                                                placeholder="Mobile Number"
                                                type='clear'
                                                placeholderTextColor="#ABAFB3"
                                                keyboardType="numeric"
                                                returnKeyType="done"
                                                ref={this.TeardTextInputRef}
                                                onSubmitEditing={() => this.onPressSubmit()}
                                                onChangeText={(mobilenumber) => this.setMobileNumber(mobilenumber)}
                                            />
                                        </View>
                                    </View>
                                    <View style={{ marginLeft: 25, marginRight: 25 }}>
                                        <View style={{ flexDirection: KEY.ROW }}>
                                            <Text style={{
                                                fontSize: 16, marginBottom: 10, textTransform: KEY.CAPITALIZE, marginLeft: 20,
                                                color: COLOR.BLACK, fontFamily: FONT.FONT_FAMILY_REGULAR
                                            }}>Whatsaap Number</Text>
                                            {/* <Text style={{
                                                marginLeft: 5, fontSize: 16, color: COLOR.ERRORCOLOR,
                                                marginTop: 0, marginBottom: 10, fontFamily: FONT.FONT_FAMILY_REGULAR
                                            }}>{'*'}</Text> */}
                                        </View>
                                        <View style={styles().inputView} >

                                            <TextInput
                                                style={whatsappnumberError == null ? styles().TextInput : styles().TextInputError}
                                                defaultValue={whatsappnumber}
                                                placeholder="Mobile Number"
                                                type='clear'
                                                placeholderTextColor="#ABAFB3"
                                                keyboardType="numeric"
                                                returnKeyType="done"
                                                ref={this.TeardTextInputRef}
                                                onSubmitEditing={() => this.onPressSubmit()}
                                                onChangeText={(whatsappnumber) => this.setwhatsappnumber(whatsappnumber)}
                                            />
                                        </View>
                                    </View>



                                    {
                                        Platform.OS === 'android' ?
                                            <View style={{ marginLeft: 25, marginRight: 25 }}>
                                                <View style={{ flexDirection: KEY.ROW }}>
                                                    <Text style={{
                                                        fontSize: 16, marginBottom: 3, textTransform: KEY.CAPITALIZE, marginLeft: 20,
                                                        color: COLOR.BLACK, fontFamily: FONT.FONT_FAMILY_REGULAR
                                                    }}>Country</Text>
                                                    {/* <Text style={{
                                                        marginLeft: 5, fontSize: 16, color: COLOR.ERRORCOLOR,
                                                        marginTop: 0, marginBottom: 10, fontFamily: FONT.FONT_FAMILY_REGULAR
                                                    }}>{'*'}</Text> */}
                                                </View>
                                                <TextInput
                                                    style={countryError == null ? styles().inputTextView : styles().inputTextViewError}
                                                    type={KEY.CLEAR}
                                                    returnKeyType={KEY.Done}
                                                    placeholderTextColor={COLOR.PLACEHOLDER_COLOR}
                                                />
                                                <Picker style={{ marginTop: -60, marginRight: 20 }}
                                                    selectedValue={country}
                                                    onValueChange={(itemValue, itemIndex) => this.setCountry(itemValue)}>
                                                    {
                                                        countryList && countryList.length > 0 ?
                                                            countryList.map((item) => (
                                                                <Picker.Item label={item.name} value={item.code} />
                                                            ))
                                                            : <Picker.Item label={'No data'} value={'No data'} />
                                                    }
                                                </Picker>
                                            </View>
                                            :
                                            <View style={{ marginLeft: 20, marginRight: 20 }}>
                                                <View style={{ flexDirection: KEY.ROW }}>
                                                    <Text style={{
                                                        fontSize: 16, marginBottom: 3, textTransform: KEY.CAPITALIZE, marginLeft: 20,
                                                        color: COLOR.BLACK, fontFamily: FONT.FONT_FAMILY_REGULAR
                                                    }}>Country</Text>
                                                    {/* <Text style={{
                                                        marginLeft: 5, fontSize: 16, color: COLOR.ERRORCOLOR,
                                                        marginTop: 0, marginBottom: 10, fontFamily: FONT.FONT_FAMILY_REGULAR
                                                    }}>{'*'}</Text> */}
                                                </View>
                                                <Picker style={{ marginTop: -60, marginRight: 20 }}
                                                    selectedValue={country}
                                                    onValueChange={(itemValue, itemIndex) => this.setCountry(itemValue)}>
                                                    {
                                                        countryList && countryList.length > 0 ?
                                                            countryList.map((item) => (
                                                                <Picker.Item label={item.name} value={item.code} />
                                                            ))
                                                            : <Picker.Item label={'No data'} value={'No data'} />
                                                    }
                                                </Picker>
                                            </View>
                                    }

                                    <TouchableOpacity style={styles(this.getBranch?.property?.appcolorcode ? this.getBranch.property.appcolorcode : COLOR.STATUSBARCOLOR,).update_Btn} onPress={() => this.onPressSubmit()}>
                                        {loading == true ? <Loading /> : <Text style={styles().update_text} >Update Profile</Text>}
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{ marginBottom: WIDTH * 0.1 }} />
                        </ScrollView>
                    </>}
                {loader == true ? <Loader /> : null}
            </SafeAreaView >
        );
    }
}

export default UpdateProfile;

const styles = colorcode => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.BACKGROUNDCOLOR
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 100,
        alignSelf: KEY.CENTER,
        marginTop: 20
    },
    bodyContent: {
        flex: 1,
        alignItems: KEY.CENTER,
        paddingBottom: 40,
        marginTop: 10
    },
    name: {
        fontSize: 22,
        color: COLOR.MENU_TEXT_COLOR,
        fontFamily: FONT.FONT_FAMILY_BOLD,
        textTransform: KEY.CAPITALIZE
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
        marginBottom: 18,
        alignItems: KEY.CENTER,
        marginTop: -5
    },
    TextInput: {
        fontSize: 16,
        flex: 1,
        padding: 15,
        borderColor: COLOR.WHITE,
        fontFamily: FONT.FONT_FAMILY_REGULAR,
        color: COLOR.BLACK,

    },
    TextInputError: {
        fontSize: 16,
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
    update_Btn: {
        marginBottom: HEIGHT * 0.3,
        flexDirection: KEY.ROW,
        backgroundColor: colorcode,
        marginTop: 35,
        borderRadius: 100,
        width: WIDTH / 2 + 20,
        height: 50,
        alignItems: KEY.CENTER,
        justifyContent: KEY.CENTER,

    },
    update_text: {
        color: COLOR.WHITE,
        fontFamily: FONT.FONT_FAMILY_BOLD,
        fontSize: 18,

    },
    headerstyle: {
        backgroundColor: colorcode,
        width: WIDTH,
        height: 90,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        marginBottom: 20
    },
    inputTextView: {
        borderRadius: 100,
        backgroundColor: COLOR.WHITE,
        borderColor: COLOR.BLACK,
        alignItems: KEY.CENTER,
        marginBottom: 10,
        width: WIDTH - 60,
        height: 50,
        color: COLOR.BLACK,
        fontSize: 16,
        //paddingLeft: 15,
        fontFamily: FONT.FONT_FAMILY_REGULAR,
        padding: 15,
        //marginTop: 10

    },
    inputTextViewError: {
        borderRadius: 10,
        borderColor: COLOR.ERRORCOLOR,
        alignItems: KEY.CENTER,
        marginBottom: 10,
        width: WIDTH - 60,
        height: 50,
        color: COLOR.BLACK,
        fontSize: 16,
        //paddingLeft: 15,
        fontFamily: FONT.FONT_FAMILY_REGULAR,

    },
})

