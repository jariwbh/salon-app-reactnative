import React, { Component } from 'react';
import {
    View, Text, StyleSheet, TextInput, StatusBar,
    TouchableOpacity, ScrollView, SafeAreaView, Platform, Dimensions, Keyboard
} from 'react-native';
import { getAllCountryService } from '../../Services/LookupService/LookupService';
import { BookService } from '../../Services/BookService/BookService';
import AsyncStorage from '@react-native-community/async-storage';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';
import Loader from '../../Components/Loader/Loader';
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import Toast from 'react-native-simple-toast';
import * as COLOR from '../../styles/colors';
import * as IMAGE from '../../styles/image';
import moment from 'moment';
import { getBranchDetails } from '../../Services/LocalService/LocalService';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;
const genderArray = [
    { "key": "male", "value": "male" },
    { "key": "female", "value": "female" }
]

export default class AppointmentsBooked extends Component {
    constructor(props) {
        super(props);
        this.getBranch = null;
        this.serviceDetails = this.props.route.params.serviceDetails;
        this.getBranch = null;
        this.state = {
            userID: null,
            memberID: null,
            fullname: null,
            fullnameError: null,
            username: null,
            usernameError: null,
            mobilenumber: null,
            mobilenumberError: null,
            country: null,
            countryError: null,
            loading: false,
            gender: null,
            genderError: null,
            specialRequest: null,
            acceptPolicy: false,
            countryList: null,
            memberInfo: null
        }
        this.setFullName = this.setFullName.bind(this);
        this.setUserName = this.setUserName.bind(this);
        this.setCountry = this.setCountry.bind(this);
        this.setMobileNumber = this.setMobileNumber.bind(this);
        this.onPressSubmit = this.onPressSubmit.bind(this);
        this.secondTextInputRef = React.createRef();
        this.TeardTextInputRef = React.createRef();
    }

    async componentDidMount() {
        const getBranch = await getBranchDetails();
        this.getBranch = getBranch;
        this.setState({ loading: true });
        this.getCountryList();
        this.getdata();
    }

    setFullName(fullname) {
        if (!fullname || fullname.length <= 0) {
            return this.setState({ fullnameError: 'User Name cannot be empty', fullname: fullname });
        }
        return this.setState({ fullname: fullname, fullnameError: null })
    }

    setUserName(email) {
        const re = /\S+@\S+\.\S+/;
        if (!email || email.length <= 0) {
            return this.setState({ usernameError: 'Email cannot be empty', username: email });
        }
        if (!re.test(email)) {
            return this.setState({ usernameError: 'Ooops! We need a valid email address' });
        }
        return this.setState({ username: email, usernameError: null })
    }

    setMobileNumber(mobilenumber) {
        // const reg = /^[0]?[789]\d{9}$/;
        if (!mobilenumber || mobilenumber.length <= 0) {
            return this.setState({ mobilenumberError: 'Mobile Number cannot be empty', mobilenumber: mobilenumber });
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

    resetScreen() {
        this.setState({
            fullname: null,
            fullnameError: null,
            username: null,
            usernameError: null,
            mobilenumber: null,
            mobilenumberError: null
        })
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

    getdata = async () => {
        var getUser = await AsyncStorage.getItem(KEY.AUTHUSER)
        if (getUser != null || getUser && getUser.length > 0) {
            const memberInfo = JSON.parse(getUser);
            this.setState({
                fullname: memberInfo.property.fullname,
                username: memberInfo.property.primaryemail,
                mobilenumber: memberInfo.property.mobile,
                userID: memberInfo.addedby,
                memberID: memberInfo._id,
                memberInfo: memberInfo
            })
        }
    }

    onPressSubmit = async () => {
        const { fullname, username, mobilenumber, memberID, memberInfo,
            country, gender, specialRequest } = this.state;
        if (!fullname || !username || !mobilenumber) {
            this.setFullName(fullname);
            this.setUserName(username);
            this.setMobileNumber(mobilenumber);
            this.setCountry(country);
            return;
        }

        if (gender == null) {
            return Toast.show('Please select gender', Toast.SHORT);
        }

        if (memberInfo == null || memberInfo == undefined) {
            Toast.show('Please Sign in After Booked Appointment', Toast.SHORT);
            return this.props.navigation.replace('LoginScreen');
        }

        const body = {
            attendee: memberID,
            appointmentdate: this.serviceDetails.selectedtime.date,
            onModel: "Member",
            refid: this.serviceDetails._id,
            //host: userID,
            charges: this.serviceDetails.charges,
            duration: this.serviceDetails.duration,
            timeslot: {
                day: this.serviceDetails.selectedtime.day,
                starttime: this.serviceDetails.selectedtime.starttime,
                endtime: this.serviceDetails.selectedtime.endtime
            },
            property: {
                country: country,
                gender: gender,
                fullname: fullname,
                primaryemail: username,
                mobilenumber: mobilenumber,
                specialRequest: specialRequest
            }
        }

        this.setState({ loading: true });
        try {
            const response = await BookService(body);
            if (response.data != null && response.data != 'undefind' && response.status == 200) {
                this.setState({ loading: false });
                Toast.show('Booking Success', Toast.SHORT);
                this.props.navigation.navigate('BookHistory', { response })
            }
        } catch (error) {
            this.setState({ loading: false });
            Toast.show('Booking Failed', Toast.SHORT);
        }
    }

    // Select sub category change to get data with color
    onPressSelectGender = async (item, index) => {
        this.setState({ gender: item.value });
        const reArrangeArray = genderArray.map((item) => {
            item.selected = false;
            return item;
        });
        reArrangeArray[index].selected = true;
        this.setState({ genderArray: reArrangeArray });
    }

    setSpecialRequest = (desc) => {
        this.setState({ specialRequest: desc });
    }

    render() {
        const { fullname, mobilenumber, username, loading, fullnameError, countryList,
            usernameError, mobilenumberError, countryError, country, specialRequest } = this.state;
        return (
            <SafeAreaView style={styles().container}>
                <StatusBar backgroundColor={this.getBranch?.property?.appcolorcode ? this.getBranch.property.appcolorcode : COLOR.STATUSBARCOLOR} barStyle={KEY.LIGHT_CONTENT} />
                <View style={styles(this.getBranch?.property?.appcolorcode ? this.getBranch.property.appcolorcode : COLOR.STATUSBARCOLOR).headerstyle}>
                    <View style={{ justifyContent: KEY.SPACEBETWEEN, alignItems: KEY.CENTER, flexDirection: KEY.ROW, marginTop: 30 }}>
                        <View style={{ flexDirection: KEY.ROW, justifyContent: KEY.FLEX_START, alignSelf: KEY.CENTER, alignItems: KEY.CENTER, marginLeft: 20 }}>
                            <TouchableOpacity onPress={() => this.props.navigation.goBack(null)}>
                                <AntDesign name='arrowleft' color={COLOR.WHITE} size={24} />
                            </TouchableOpacity>
                            <View style={{ justifyContent: KEY.CENTER }}>
                                <Text style={{
                                    fontSize: 22, color: COLOR.WHITE,
                                    fontFamily: FONT.FONT_FAMILY_BOLD, marginLeft: WIDTH * 0.1
                                }}>Book Appointment</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={KEY.ALWAYS}>
                    <View style={{ marginTop: 10, marginLeft: 20, marginRight: 20 }}>
                        <View style={{ flexDirection: KEY.ROW }}>
                            <Text style={{
                                fontSize: 16, marginBottom: 3, color: COLOR.BLACK,
                                fontFamily: FONT.FONT_FAMILY_REGULAR, textTransform: KEY.CAPITALIZE
                            }}>Full Name</Text>
                            <Text style={{
                                marginLeft: 5, fontSize: 16,
                                color: COLOR.ERRORCOLOR, fontFamily: FONT.FONT_FAMILY_REGULAR, marginBottom: 10
                            }}>{'*'}</Text>
                        </View>
                        <TextInput
                            style={fullnameError == null ? styles().inputTextView : styles().inputTextViewError}
                            defaultValue={fullname}
                            placeholder="Full Name"
                            type={KEY.CLEAR}
                            placeholderTextColor={COLOR.PLACEHOLDER_COLOR}
                            returnKeyType={KEY.NEXT}
                            blurOnSubmit={false}
                            onSubmitEditing={() => { this.secondTextInputRef.current.focus() }}
                            onChangeText={(fullname) => this.setFullName(fullname)}
                        />
                    </View>
                    <View style={{ marginTop: 10, marginLeft: 20, marginRight: 20 }}>
                        <View style={{ flexDirection: KEY.ROW }}>
                            <Text style={{
                                fontSize: 16, marginBottom: 3, textTransform: KEY.CAPITALIZE,
                                color: COLOR.BLACK, fontFamily: FONT.FONT_FAMILY_REGULAR
                            }}>Email</Text>
                            <Text style={{
                                marginLeft: 5, fontSize: 16, color: COLOR.ERRORCOLOR,
                                fontFamily: FONT.FONT_FAMILY_REGULAR, marginBottom: 10
                            }}>{'*'}</Text>
                        </View>
                        <TextInput
                            style={usernameError == null ? styles().inputTextView : styles().inputTextViewError}
                            placeholder="Email"
                            type={KEY.CLEAR}
                            placeholderTextColor={COLOR.PLACEHOLDER_COLOR}
                            returnKeyType={KEY.NEXT}
                            defaultValue={username}
                            blurOnSubmit={false}
                            onSubmitEditing={() => { this.TeardTextInputRef.current.focus() }}
                            ref={this.secondTextInputRef}
                            onChangeText={(email) => this.setUserName(email)}
                        />
                    </View>
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                        <View style={{ flexDirection: KEY.ROW }}>
                            <Text style={{
                                fontSize: 16, marginBottom: 3, textTransform: KEY.CAPITALIZE,
                                color: COLOR.BLACK, fontFamily: FONT.FONT_FAMILY_REGULAR
                            }}>Gender</Text>
                            <Text style={{
                                marginLeft: 5, fontSize: 16, color: COLOR.ERRORCOLOR,
                                marginTop: 0, marginBottom: 10, fontFamily: FONT.FONT_FAMILY_REGULAR
                            }}>{'*'}</Text>
                        </View>
                        <View style={{ flexDirection: KEY.ROW }}>
                            {genderArray.map((item, index) => (
                                <View style={{ flexDirection: KEY.ROW, marginLeft: 15, alignItems: KEY.CENTER }}>
                                    <TouchableOpacity onPress={() => this.onPressSelectGender(item, index)}>
                                        <Ionicons size={30} name={item.selected == true ? "radio-button-on" : "radio-button-off"} color={this.getBranch?.property?.appcolorcode ? this.getBranch.property.appcolorcode : COLOR.DEFALUTCOLOR} style={{ marginRight: 5 }} />
                                    </TouchableOpacity>
                                    <Text style={{ textTransform: KEY.CAPITALIZE, color: COLOR.BLACK, fontFamily: FONT.FONT_FAMILY_REGULAR }}>{item.value}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                    <View style={{ marginTop: 15, marginLeft: 20, marginRight: 20 }}>
                        <View style={{ flexDirection: KEY.ROW }}>
                            <Text style={{
                                fontSize: 16, marginBottom: 3, textTransform: KEY.CAPITALIZE,
                                color: COLOR.BLACK, fontFamily: FONT.FONT_FAMILY_REGULAR
                            }}>Country</Text>
                            <Text style={{
                                marginLeft: 5, fontSize: 16, color: COLOR.ERRORCOLOR,
                                marginTop: 0, marginBottom: 10, fontFamily: FONT.FONT_FAMILY_REGULAR
                            }}>{'*'}</Text>
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
                    <View style={{ marginTop: 10, marginLeft: 20, marginRight: 20 }}>
                        <View style={{ flexDirection: KEY.ROW }}>
                            <Text style={{
                                fontSize: 16, marginBottom: 3, textTransform: KEY.CAPITALIZE,
                                color: COLOR.BLACK, fontFamily: FONT.FONT_FAMILY_REGULAR
                            }}>Contact Number</Text>
                            <Text style={{
                                marginLeft: 5, fontSize: 16, color: COLOR.ERRORCOLOR,
                                marginTop: 0, marginBottom: 10, fontFamily: FONT.FONT_FAMILY_REGULAR
                            }}>{'*'}</Text>
                        </View>
                        <TextInput
                            style={mobilenumberError == null ? styles().inputTextView : styles().inputTextViewError}
                            defaultValue={mobilenumber}
                            placeholder="Contact Number"
                            type={KEY.CLEAR}
                            placeholderTextColor={COLOR.PLACEHOLDER_COLOR}
                            returnKeyType={KEY.NEXT}
                            keyboardType="numeric"
                            ref={this.TeardTextInputRef}
                            onChangeText={(mobilenumber) => this.setMobileNumber(mobilenumber)}
                        />
                    </View>

                    <View style={{ marginTop: 10, marginLeft: 20, marginRight: 20 }}>
                        <View style={{ flexDirection: KEY.ROW }}>
                            <Text style={{
                                fontSize: 16, marginBottom: 10, fontFamily: FONT.FONT_FAMILY_REGULAR,
                                color: COLOR.BLACK, textTransform: KEY.CAPITALIZE
                            }}>Special Request</Text>
                        </View>
                        <TextInput placeholder='Special Request'
                            multiline={true}
                            numberOfLines={3}
                            style={styles().textDescription}
                            type={KEY.CLEAR}
                            returnKeyType={KEY.DONE}
                            placeholderTextColor={COLOR.PLACEHOLDER_COLOR}
                            defaultValue={specialRequest}
                            onChangeText={(desc) => this.setSpecialRequest(desc)}
                        />
                    </View>
                    <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                        <TouchableOpacity style={styles(this.getBranch?.property?.appcolorcode ? this.getBranch.property.appcolorcode : COLOR.DEFALUTCOLOR).book} onPress={() => this.onPressSubmit()} >
                            <Text style={{ fontSize: 18, color: COLOR.WHITE, fontFamily: FONT.FONT_FAMILY_REGULAR }}>Book Now</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginBottom: 30 }} />
                </ScrollView>
                {loading ? <Loader /> : null}
            </SafeAreaView>
        );
    }
}

const styles = (colorcode) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.BACKGROUNDCOLOR,
    },
    textDescription: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLOR.BLACK,
        alignItems: KEY.CENTER,
        marginBottom: 10,
        width: WIDTH - 40,
        height: 100,
        color: COLOR.BLACK,
        fontSize: FONT.FONT_SIZE_14,
        paddingLeft: 15,
    },
    inputTextView: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLOR.BLACK,
        alignItems: KEY.CENTER,
        marginBottom: 10,
        width: WIDTH - 40,
        height: 45,
        color: COLOR.BLACK,
        fontSize: FONT.FONT_SIZE_14,
        paddingLeft: 15,
        fontFamily: FONT.FONT_FAMILY_REGULAR
    },
    inputTextViewError: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLOR.ERRORCOLOR,
        alignItems: KEY.CENTER,
        marginBottom: 10,
        width: WIDTH - 40,
        height: 45,
        color: COLOR.BLACK,
        fontSize: FONT.FONT_SIZE_14,
        paddingLeft: 15,
        fontFamily: FONT.FONT_FAMILY_REGULAR
    },
    book: {
        flexDirection: KEY.ROW,
        backgroundColor: colorcode,
        marginTop: 20,
        width: WIDTH - 40,
        height: 50,
        borderRadius: 10,
        alignItems: KEY.CENTER,
        justifyContent: KEY.CENTER,
        marginBottom: 50
    },
    headerstyle: {
        backgroundColor: colorcode,
        width: WIDTH,
        height: 90,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        marginBottom: 20
    }
})