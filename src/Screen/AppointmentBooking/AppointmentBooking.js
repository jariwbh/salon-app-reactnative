import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen'
import { FontAwesome5 } from '@expo/vector-icons';

export default class AppointmentBooking extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }


    render() {
        return (
            <View style={styles.container}>
                <View style={styles.statusbar}>
                    <TextInput
                        style={styles.statInput}
                        placeholder="Type here to search"
                        type='clear'
                        placeholderTextColor="#D3D4DA"
                        returnKeyType="next"
                    />
                    <FontAwesome5 name="search" size={24} color='#000000' style={{ alignItems: "flex-end", justifyContent: 'flex-end', marginRight: hp('2%') }} />
                </View>
                <View style={{ marginTop: hp('3%'), justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={require('../../../assets/image/Layer51.png')} style={{ width: wp('90%'), height: hp('40%'), }}
                    />
                </View>
                <View style={{ flexDirection: 'row', }}>
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    >
                        <View style={{ flexDirection: 'column' }}>
                            <TouchableOpacity style={styles.sliderview} >
                                <Image source={require('../../../assets/image/Shape1.png')} style={{ alignItems: 'center', height: hp('7%'), width: wp('12%'), marginTop: hp('1%') }}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: hp('2%'), color: '#43434C' }}>Massage</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'column' }}>
                            <TouchableOpacity style={styles.sliderview} >
                                <Image source={require('../../../assets/image/Shape2.png')} style={{ alignItems: 'center', height: hp('7%'), width: wp('12%'), marginTop: hp('1.5%') }}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: hp('2%'), color: '#43434C' }}>Hair Cut</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'column' }}>
                            <TouchableOpacity style={styles.sliderview} >
                                <Image source={require('../../../assets/image/Shape3.png')} style={{ alignItems: 'center', height: hp('7%'), width: wp('12%'), marginTop: hp('2%') }}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: hp('2%'), color: '#43434C' }}>Gym</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'column' }}>
                            <TouchableOpacity style={styles.sliderview}>
                                <Image source={require('../../../assets/image/Shape4.png')} style={{ alignItems: 'center', height: hp('7%'), width: wp('12%'), marginTop: hp('2%') }}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: hp('2%'), color: '#43434C' }}>Tatoo</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'column' }}>
                            <TouchableOpacity style={styles.sliderview} >
                                <Image source={require('../../../assets/image/Shape5.png')} style={{ alignItems: 'center', height: hp('7%'), width: wp('12%'), marginTop: hp('2%') }}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: hp('2%'), color: '#43434C' }}>Facial</Text>
                            </TouchableOpacity>
                        </View>

                    </ScrollView>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity style={styles.book} onPress={() => { this.props.navigation.navigate('AppointmentsBooked') }}>
                        <FontAwesome5 name="check-circle" size={24} color='#FFFFFF' style={{ margin: hp('1%'), }} />
                        <Text style={{ fontSize: hp('3%'), color: '#FFFFFF' }}>Book Now</Text>
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
    statusbar: {

        flexDirection: 'row',
        backgroundColor: "#fff",
        shadowOpacity: 0.5,
        shadowRadius: 2,
        shadowOffset: {
            height: 0,
            width: 0,
        },
        elevation: 2,
        marginTop: hp('5%'),
        width: wp('90%'),
        height: hp('6.5%'),
        marginLeft: hp('2.5%'),
        alignItems: "center",
        justifyContent: 'center'

    },
    statInput: {
        fontSize: hp('2.5%'),
        flex: 1,
        padding: hp('2%'),
        alignItems: "center",
    },
    sliderview: {
        borderRadius: hp('10'),
        borderColor: '#43434C',
        borderWidth: hp('0.1%'),
        marginTop: hp('3%'),
        width: wp('21%'),
        height: hp('11%'),
        margin: hp('1%'),
        alignItems: "center",
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


