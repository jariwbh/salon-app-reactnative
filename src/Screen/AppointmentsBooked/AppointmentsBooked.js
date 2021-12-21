import React, { Component } from 'react';
import {
    View, Text, StyleSheet, TextInput, StatusBar,
    TouchableOpacity, ScrollView, SafeAreaView, Platform, Dimensions, Keyboard
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { BookService } from '../../Services/BookService/BookService'
import moment from 'moment';
import Loader from '../../Components/Loader/Loading';
import * as KEY from '../../context/actions/key';
import * as COLOR from '../../styles/colors';
import * as IMAGE from '../../styles/image';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-simple-toast';
const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;
const genderArray = [
    { "key": "male", "value": "male" },
    { "key": "female", "value": "female" }
]
export default class AppointmentsBooked extends Component {
    constructor(props) {
        super(props);
        this.serviceDetails = this.props.route.params.serviceDetails;
        console.log(`this.serviceDetails`, this.serviceDetails);
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
            genderError: null
        }
        this.setFullName = this.setFullName.bind(this);
        this.setUserName = this.setUserName.bind(this);
        this.setMobileNumber = this.setMobileNumber.bind(this);
        this.onPressSubmit = this.onPressSubmit.bind(this);
        this.secondTextInputRef = React.createRef();
        this.TeardTextInputRef = React.createRef();
    }

    componentDidMount() {
        this.getdata()
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
        const reg = /^[0]?[789]\d{9}$/;
        if (!mobilenumber || mobilenumber.length <= 0) {
            return this.setState({ mobilenumberError: 'Mobile Number cannot be empty', mobilenumber: mobilenumber });
        }
        if (!reg.test(mobilenumber)) {
            return this.setState({ mobilenumberError: 'Ooops! We need a valid Mobile Number' });
        }
        return this.setState({ mobilenumber: mobilenumber, mobilenumberError: null })
    }

    setCountry(country) {
        if (!country || country.length <= 0) {
            return this.setState({ countryError: 'country cannot be empty', country: country });
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

    getdata = async () => {
        var getUser = await AsyncStorage.getItem('@authuser')
        if (getUser == null || getUser && getUser.length == 0) {
            setTimeout(() => {
                //this.props.navigation.replace('LoginScreen')
            }, 3000);
        } else {
            const user = JSON.parse(getUser)
            this.setState({
                fullname: user.property.fullname,
                username: user.property.primaryemail,
                mobilenumber: user.property.mobile,
                userID: user.addedby,
                memberID: user._id
            })
        }

    }

    onPressSubmit = () => {
        const { fullname, username, mobilenumber, memberID, } = this.state;
        if (!fullname || !username || !mobilenumber) {
            this.setFullName(fullname)
            this.setUserName(username)
            this.setMobileNumber(mobilenumber)
            return;
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
        }
        //this.setState({ loading: true });
        try {
            // BookService(body).then(response => {
            //     if (response != null) {
            //         this.setState({ loading: false });
            Toast.show('Booking Success', Toast.SHORT);
            //         this.props.navigation.navigate('BookHistory', { response })
            //     }
            // })
        }
        catch (error) {
            this.setState({ loading: false })
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

    render() {
        const { fullname, mobilenumber, username, loading, fullnameError,
            usernameError, mobilenumberError, countryError, country } = this.state;
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor={COLOR.STATUSBARCOLOR} barStyle={KEY.LIGHT_CONTENT} />
                <View style={styles.headerstyle}>
                    <View style={{ justifyContent: KEY.SPACEBETWEEN, alignItems: KEY.CENTER, flexDirection: KEY.ROW, marginTop: 30 }}>
                        <View style={{ flexDirection: KEY.ROW, justifyContent: KEY.FLEX_START, alignItems: KEY.CENTER, marginLeft: 20 }}>
                            <TouchableOpacity onPress={() => this.props.navigation.goBack(null)}>
                                <AntDesign name='arrowleft' color={COLOR.WHITE} size={24} />
                            </TouchableOpacity>
                            <View style={{ justifyContent: KEY.CENTER, marginLeft: WIDTH / 5 }}>
                                <Text style={{ fontSize: 22, color: COLOR.WHITE, fontWeight: 'bold' }}>Booking History</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={KEY.ALWAYS}>
                    <View style={{ alignItems: KEY.CENTER }}>
                        <View style={styles.inputView}>
                            <TextInput
                                style={fullnameError == null ? styles.TextInput : styles.TextInputError}
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
                        <View style={styles.inputView}>
                            <TextInput
                                style={usernameError == null ? styles.TextInput : styles.TextInputError}
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
                        <View style={styles.inputView}>
                            <TextInput
                                style={mobilenumberError == null ? styles.TextInput : styles.TextInputError}
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
                        <View style={styles.inputView}>
                            <TextInput
                                style={countryError == null ? styles.TextInput : styles.TextInputError}
                                defaultValue={country}
                                placeholder="Select Country"
                                type={KEY.CLEAR}
                                placeholderTextColor={COLOR.PLACEHOLDER_COLOR}
                                returnKeyType={KEY.NEXT}
                                onChangeText={(country) => this.setCountry(country)}
                            />
                        </View>
                    </View>
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                        <View style={{ flexDirection: KEY.ROW }}>
                            <Text style={{ fontSize: 16, marginBottom: 3, textTransform: KEY.CAPITALIZE }}>Gender</Text>
                            <Text style={{ marginLeft: 5, fontSize: 16, color: COLOR.ERRORCOLOR, marginTop: 0, marginBottom: 10 }}>{'*'}</Text>
                        </View>
                        <View style={{ flexDirection: KEY.ROW }}>
                            {genderArray.map((item, index) => (
                                <View style={{ flexDirection: KEY.ROW, marginLeft: 15, alignItems: KEY.CENTER }}>
                                    <TouchableOpacity onPress={() => this.onPressSelectGender(item, index)}>
                                        <Ionicons size={30} name={item.selected == true ? "radio-button-on" : "radio-button-off"} color={COLOR.DEFALUTCOLOR} style={{ marginRight: 5 }} />
                                    </TouchableOpacity>
                                    <Text style={{ textTransform: KEY.CAPITALIZE }}>{item.value}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                    <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                        <TouchableOpacity style={styles.book} onPress={() => this.onPressSubmit()} >
                            {this.state.loading === true ? <Loader /> :
                                <Text style={{ fontSize: 18, color: COLOR.WHITE }}>Book Now</Text>
                            }
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                {loading ? <Loader /> : null}
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.BACKGROUNDCOLOR,
    },
    inputView: {
        flexDirection: KEY.ROW,
        backgroundColor: COLOR.WHITE,
        borderRadius: 10,
        shadowOpacity: 0.5,
        shadowRadius: 3,
        shadowOffset: {
            height: 0,
            width: 0,
        },
        elevation: 2,
        borderColor: COLOR.WHITE,
        width: WIDTH - 40,
        height: 50,
        margin: 10,
        alignItems: KEY.CENTER,
    },
    TextInput: {
        fontSize: 14,
        flex: 1,
        padding: 10,
        borderColor: COLOR.WHITE,
        paddingLeft: 15
    },
    TextInputError: {
        backgroundColor: COLOR.WHITE,
        borderRadius: 10,
        shadowOpacity: 0.5,
        shadowRadius: 3,
        shadowOffset: {
            height: 0,
            width: 0,
        },
        elevation: 2,
        borderColor: COLOR.ERRORCOLOR,
        width: WIDTH - 40,
        height: 50,
        alignItems: KEY.CENTER,
        borderWidth: 1,
        paddingLeft: 15
    },
    book: {
        flexDirection: KEY.ROW,
        backgroundColor: COLOR.DEFALUTCOLOR,
        marginTop: 20,
        width: WIDTH - 40,
        height: 50,
        borderRadius: 10,
        alignItems: KEY.CENTER,
        justifyContent: KEY.CENTER,
        marginBottom: 50
    },
    headerstyle: {
        backgroundColor: COLOR.STATUSBARCOLOR,
        width: WIDTH,
        height: 90,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        marginBottom: 20
    }
})