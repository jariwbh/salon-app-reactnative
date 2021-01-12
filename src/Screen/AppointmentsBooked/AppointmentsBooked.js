import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp, } from 'react-native-responsive-screen'
import AsyncStorage from '@react-native-community/async-storage';
import { BookService } from '../../Services/BookService/BookService'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
import { ScrollView } from 'react-native-gesture-handler';

export default class AppointmentsBooked extends Component {
    constructor(props) {
        super(props);
        this.serviceDetails = this.props.route.params.serviceID;
        this.state = {
            userID: null,
            memberID: null,
            userData: null,
            fullname: null,
            fullnameError: null,
            username: null,
            usernameError: null,
            mobilenumber: null,
            mobilenumberError: null,
            serviceDate: null,
            serviceDateError: null,
            serviceTime: null,
            serviceTimeError: null,
            isDatePickerVisible: false,
            isTimePickerVisibility: false,
            // serviceID: this.props.route.params.serviceID._id,
            // charges: this.props.route.params.serviceID.charges,
            // duration: this.props.route.params.serviceID.duration,
        }
        this.setFullName = this.setFullName.bind(this);
        this.setUserName = this.setUserName.bind(this);
        this.setMobileNumber = this.setMobileNumber.bind(this);
        this.setServiceDate = this.setServiceDate.bind(this);
        this.setServiceTime = this.setServiceTime.bind(this);
        this.onPressSubmit = this.onPressSubmit.bind(this);
    }

    showDatePicker = () => {
        this.setState({ isDatePickerVisible: true });
    };

    hideDatePicker = () => {
        this.setState({ isDatePickerVisible: false });
    };

    handleConfirmDate = (date) => {
        this.setState({ serviceDate: moment(date).format('YYYY-MM-DD') });
        this.hideDatePicker();
    };

    showTimePicker = () => {
        this.setState({ isTimePickerVisibility: true });
    };

    hideTimePicker = () => {
        this.setState({ isTimePickerVisibility: false });
    };

    handleConfirmTime = (time) => {
        this.setState({ serviceTime: moment(time).format('HH:mm') });
        this.hideTimePicker();
    };

    getdata = async () => {
        var getUser = await AsyncStorage.getItem('@authuser')
        const user = JSON.parse(getUser)
        this.setState({
            fullname: user.property.fullname,
            username: user.property.username,
            mobilenumber: user.property.mobile_number,
            userID: user.addedby,
            memberID: user._id
        })
    }

    componentDidMount() {
        this.getdata()
    }

    setFullName(fullname) {
        if (!fullname || fullname.length <= 0) {
            return this.setState({ fullnameError: 'User Name cannot be empty' });
        }
        return this.setState({ fullname: fullname, fullnameError: null })
    }

    setUserName(email) {
        const re = /\S+@\S+\.\S+/;
        if (!email || email.length <= 0) {
            return this.setState({ usernameError: 'Email cannot be empty' });
        }
        if (!re.test(email)) {
            return this.setState({ usernameError: 'Ooops! We need a valid email address' });
        }
        return this.setState({ username: email, usernameError: null })
    }

    setMobileNumber(mobilenumber) {
        const reg = /^[0]?[789]\d{9}$/;
        if (!mobilenumber || mobilenumber.length <= 0) {
            return this.setState({ mobilenumberError: 'Mobile Number cannot be empty' });
        }
        if (!reg.test(mobilenumber)) {
            return this.setState({ mobilenumberError: 'Ooops! We need a valid Mobile Number' });
        }
        return this.setState({ mobilenumber: mobilenumber, mobilenumberError: null })
    }

    setServiceDate(serviceDate) {
        if (!serviceDate || serviceDate.length <= 0) {
            return this.setState({ serviceDateError: 'service Date cannot be empty' });
        }
        return this.setState({ serviceDate: serviceDate, serviceDateError: null })
    }

    setServiceTime(serviceTime) {
        if (!serviceTime || serviceTime.length <= 0) {
            return this.setState({ serviceTimeError: 'Service Time cannot be empty' });
        }
        return this.setState({ serviceTime: serviceTime, serviceTimeError: null })
    }
    resetScreen() {
        this.setState({
            fullname: null,
            fullnameError: null,
            mobilenumber: null,
            mobilenumberError: null,
            serviceDate: null,
            serviceDateError: null,
            serviceTime: null,
            serviceTimeError: null,

        })
    }

    onPressSubmit = () => {
        const { fullname, username, mobilenumber, serviceDate, serviceTime, serviceID, userID, memberID, charges, duration } = this.state;
        if (!fullname || !username || !mobilenumber || !serviceDate || !serviceTime) {
            this.setFullName(fullname)
            this.setUserName(username)
            this.setMobileNumber(mobilenumber)
            this.setServiceDate(serviceDate)
            this.setServiceTime(serviceTime)
            return;
        }
        const body = {
            // attendee: memberID,
            appointmentdate: serviceDate,
            onModel: "Member",
            refid: this.serviceDetails,
            host: userID,
            //  charges: charges,
            //  duration: duration,
            timeslot: {
                starttime: serviceTime
            },
        }

        console.log('body', body)
        // BookService(body).then(response => {
        //     console.log('response', response)
        //     if (response != null) {
        //         ToastAndroid.show("Book Your Service!", ToastAndroid.SHORT);
        //         this.props.navigation.navigate('HomeScreen')
        //         this.resetScreen()
        //     }
        // })

    }
    render() {
        const { fullname, mobilenumber, serviceTime, serviceDate, username, } = this.state;
        return (
            <View style={styles.container}>
                <View style={{ alignItems: 'center', marginTop: hp('5%') }}>
                    <Text style={{ fontSize: hp('3%'), fontWeight: 'bold' }}> Appointment Booked </Text>
                </View>
                <ScrollView>
                    <View style={{ alignItems: 'center', marginTop: hp('2%') }}>
                        <View style={styles.inputView}>
                            <TextInput
                                style={styles.TextInput}
                                defaultValue={fullname}
                                placeholder="Name"
                                type='clear'
                                placeholderTextColor="#ABAFB3"
                                returnKeyType="next"
                                onChangeText={(fullname) => this.setFullName(fullname)}
                            />
                        </View>
                        <Text style={{ marginTop: hp('-3%'), marginRight: hp('2%'), color: '#ff0000' }}>{this.state.fullnameError && this.state.fullnameError}</Text>
                        <View style={styles.inputView}>
                            <TextInput
                                style={styles.TextInput}
                                placeholder="Email"
                                type='clear'
                                placeholderTextColor="#ABAFB3"
                                returnKeyType="next"
                                defaultValue={username}
                                onChangeText={(username) => this.setUserName(username)}
                            />
                        </View>
                        <Text style={{ marginTop: hp('-3%'), marginRight: hp('2%'), color: '#ff0000' }}>{this.state.usernameError && this.state.usernameError}</Text>
                        <View style={styles.inputView}>
                            <TextInput
                                style={styles.TextInput}
                                defaultValue={mobilenumber}
                                placeholder="Phone_No"
                                type='clear'
                                placeholderTextColor="#ABAFB3"
                                returnKeyType="next"
                                keyboardType="numeric"
                                onChangeText={(mobilenumber) => this.setMobileNumber(mobilenumber)}
                            />
                        </View>
                        <Text style={{ marginTop: hp('-3%'), marginRight: hp('2%'), color: '#ff0000' }}>{this.state.mobilenumberError && this.state.mobilenumberError}</Text>
                        <View style={styles.inputView}>
                            <TextInput
                                style={styles.TextInput}
                                defaultValue={serviceDate}
                                placeholder="YYYY-MM-DD"
                                type='clear'
                                placeholderTextColor="#ABAFB3"
                                returnKeyType="next"
                                onTouchStart={this.showDatePicker}
                                onChangeText={(serviceDate) => this.setServiceDate(serviceDate)}
                            />
                            <DateTimePickerModal
                                isVisible={this.state.isDatePickerVisible}
                                mode="date"
                                onConfirm={this.handleConfirmDate}
                                onCancel={this.hideDatePicker}
                            />
                        </View>
                        <Text style={{ marginLeft: hp('1%'), marginTop: hp('-3%'), color: '#ff0000' }}>{this.state.serviceDateError && this.state.serviceDateError}</Text>
                        <View style={styles.inputView}>
                            <TextInput
                                style={styles.TextInput}
                                defaultValue={serviceTime}
                                placeholder="HH-MM"
                                type='clear'
                                placeholderTextColor="#ABAFB3"
                                returnKeyType="next"
                                onTouchStart={this.showTimePicker}
                                onChangeText={(serviceTime) => this.setServiceTime(serviceTime)}
                            />
                            <DateTimePickerModal
                                isVisible={this.state.isTimePickerVisibility}
                                mode="time"
                                onConfirm={this.handleConfirmTime}
                                onCancel={this.hideTimePicker}
                            />
                        </View>
                        <Text style={{ marginLeft: hp('1%'), marginTop: hp('-3%'), color: '#ff0000' }}>{this.state.serviceTimeError && this.state.serviceTimeError}</Text>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity style={styles.book} onPress={() => this.onPressSubmit()} >
                            <Text style={{ fontSize: hp('3%'), color: '#FFFFFF' }}>Book</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    inputView: {
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
    book: {
        flexDirection: 'row',
        backgroundColor: "#FEBC42",
        marginTop: hp('4%'),
        width: wp('60%'),
        height: hp('6.5%'),
        alignItems: "center",
        justifyContent: 'center'
    }
})