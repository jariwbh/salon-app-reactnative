import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen'

export default class AppointmentsBooked extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{ alignItems: 'center', marginTop: hp('5%') }}>
                    <Text style={{ fontSize: hp('3%'), fontWeight: 'bold' }}> Appointment Booked </Text>
                </View>
                <View style={{ alignItems: 'center', marginTop: hp('2%') }}>
                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.TextInput}
                            placeholder="Name"
                            type='clear'
                            placeholderTextColor="#ABAFB3"
                            returnKeyType="next"
                        />
                    </View>
                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.TextInput}
                            placeholder="Phone_No"
                            type='clear'
                            placeholderTextColor="#ABAFB3"
                            returnKeyType="next"
                        />
                    </View>
                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.TextInput}
                            placeholder="YYYY-MM-DD"
                            type='clear'
                            placeholderTextColor="#ABAFB3"
                            returnKeyType="next"
                        />
                    </View>
                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.TextInput}
                            placeholder="HH-MM"
                            type='clear'
                            placeholderTextColor="#ABAFB3"
                            returnKeyType="next"
                        />
                    </View>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity style={styles.book} onPress={() => { this.props.navigation.navigate('AppointmentsBooked') }}>
                        {/* <FontAwesome5 name="check-circle" size={24} color='#FFFFFF' style={{ margin: hp('1%'), }} /> */}
                        <Text style={{ fontSize: hp('3%'), color: '#FFFFFF' }}>Book</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: "#fff",
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
        marginTop: hp('10%'),
        width: wp('60%'),
        height: hp('6.5%'),
        alignItems: "center",
        justifyContent: 'center'
    }
})