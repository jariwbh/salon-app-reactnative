import React, { Component } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen'
import { FontAwesome5 } from '@expo/vector-icons';
import { Rating } from 'react-native-elements';

export default class AppointmentScreen extends Component {
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
                <ScrollView
                    Vertical={true}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={{ flexDirection: 'column', marginBottom: hp('5%'), flex: 1 }}>
                        <View style={styles.listview}>
                            <TouchableOpacity style={{ marginTop: hp('2%'), marginLeft: hp('1%'), }} onPress={() => { this.props.navigation.navigate('AppointmentBooking') }}>
                                <Image source={require('../../../assets/image/Layer51.png')} style={{ borderRadius: hp('7%'), width: wp('27%'), height: hp('15%'), }}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginTop: hp('6%'), marginLeft: hp('1%'), flex: 0.9 }}>
                                <Text style={{ fontSize: hp('2%'), color: '#212121' }}>Body Massage</Text>
                                <Text style={{ fontSize: hp('2%'), color: '#212121' }}>Jason Garcia</Text>
                                <Rating
                                    imageSize={20}
                                    startingValue={3.5}
                                    style={{}}
                                />
                            </TouchableOpacity>
                            {/* <Image source={require('../../../assets/image/badges1.png')} style={{ marginTop: hp('8%'), }} /> */}
                        </View>
                        <View style={styles.listview}>
                            <TouchableOpacity style={{ marginTop: hp('2%'), marginLeft: hp('1%'), }}>
                                <Image source={require('../../../assets/image/Layer52.png')} style={{ borderRadius: hp('7%'), width: wp('27%'), height: hp('15%'), }}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginTop: hp('6%'), marginLeft: hp('1%'), flex: 0.9 }}>
                                <Text style={{ fontSize: hp('2%'), color: '#212121' }}>Prince hair cut</Text>
                                <Text style={{ fontSize: hp('2%'), color: '#212121' }}>Jason Garcia</Text>
                                <Rating
                                    imageSize={20}
                                    startingValue={3.5}
                                    style={{}}
                                />
                            </TouchableOpacity>
                            {/* <Image source={require('../../../assets/image/badges1.png')} style={{ marginTop: hp('8%'), }} /> */}
                        </View>
                        <View style={styles.listview}>
                            <TouchableOpacity style={{ marginTop: hp('2%'), marginLeft: hp('1%'), }}>
                                <Image source={require('../../../assets/image/Layer53.png')} style={{ borderRadius: hp('7%'), width: wp('27%'), height: hp('15%'), }}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginTop: hp('6%'), marginLeft: hp('1%'), flex: 0.9 }}>
                                <Text style={{ fontSize: hp('2%'), color: '#212121' }}>Week Gym</Text>
                                <Text style={{ fontSize: hp('2%'), color: '#212121' }}>Jason Garcia</Text>
                                <Rating
                                    imageSize={20}
                                    startingValue={3.5}
                                    style={{}}
                                />
                            </TouchableOpacity>
                            {/* <Image source={require('../../../assets/image/badges1.png')} style={{ marginTop: hp('8%'), }} /> */}
                        </View>
                        <View style={styles.listview}>
                            <TouchableOpacity style={{ marginTop: hp('2%'), marginLeft: hp('1%'), }}>
                                <Image source={require('../../../assets/image/Layer54.png')} style={{ borderRadius: hp('7%'), width: wp('27%'), height: hp('15%'), }}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginTop: hp('6%'), marginLeft: hp('1%'), flex: 0.9 }}>
                                <Text style={{ fontSize: hp('2%'), color: '#212121', }}>Hair and Makeup</Text>
                                <Text style={{ fontSize: hp('2%'), color: '#212121' }}>Jason Garcia</Text>
                                <Rating
                                    imageSize={20}
                                    startingValue={3.5}
                                    style={{}}
                                />
                            </TouchableOpacity>
                            {/* <Image source={require('../../../assets/image/badges1.png')} style={{ marginTop: hp('8%'), }} /> */}
                        </View>
                        <View style={styles.listview}>
                            <TouchableOpacity style={{ marginTop: hp('2%'), marginLeft: hp('1%'), }}>
                                <Image source={require('../../../assets/image/Layer55.png')} style={{ borderRadius: hp('7%'), width: wp('27%'), height: hp('15%'), }}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginTop: hp('6%'), marginLeft: hp('1%'), flex: 0.9 }}>
                                <Text style={{ fontSize: hp('2%'), color: '#212121' }}>Natural Facial</Text>
                                <Text style={{ fontSize: hp('2%'), color: '#212121' }}>Jason Garcia</Text>
                                <Rating
                                    imageSize={20}
                                    startingValue={3.5}
                                    style={{}}
                                />
                            </TouchableOpacity>
                            {/* <Image source={require('../../../assets/image/badges1.png')} style={{ marginTop: hp('8%'), }} /> */}
                        </View>
                    </View>
                </ScrollView>
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
    listview: {
        flexDirection: 'row',
        borderRadius: hp('2%'),
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
        height: hp('20%'),
        marginLeft: hp('2.5%'),
        justifyContent: 'space-around',

    },
})