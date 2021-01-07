import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Image, ScrollView } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp, } from 'react-native-responsive-screen'
import { FontAwesome5 } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

class HomeScreen extends Component {
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
                    <View style={{ flexDirection: 'row', }}>
                        <ScrollView
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                        >
                            <View style={{ flexDirection: 'column' }}>
                                <TouchableOpacity style={styles.slider} onPress={() => { this.props.navigation.navigate('AppointmentScreen') }}>
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
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: hp('2%'), }}>
                        <View style={{ flex: 1, height: 1, backgroundColor: '#FEBC42' }} />
                        <View>
                            <Text style={{ width: wp('25%'), textAlign: 'center', fontSize: hp('3%'), color: '#FEBC42' }}>featured</Text>
                        </View>
                        <View style={{ flex: 1, height: 1, backgroundColor: '#FEBC42' }} />
                    </View>
                    <View style={{ flexDirection: 'row', }}>
                        <ScrollView
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                        >
                            <View style={{ flexDirection: 'column', flex: 1 }}>
                                <TouchableOpacity style={{ margin: hp('2%') }}>
                                    <Image source={require('../../../assets/image/Layer1.png')} style={{ alignItems: 'center', height: hp('25%'), width: wp('65%'), marginTop: hp('2%'), borderRadius: hp('2%') }}
                                    />
                                </TouchableOpacity>
                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
                                    <Text style={{ fontSize: hp('3%'), color: '#313131' }}>Frankie Barber</Text>
                                    <Text style={{ fontSize: hp('3%'), color: '#313131' }}>$ 20</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'column' }}>
                                <TouchableOpacity style={{ margin: hp('2%') }}>
                                    <Image source={require('../../../assets/image/Layer2.png')} style={{ alignItems: 'center', height: hp('25%'), width: wp('65%'), marginTop: hp('2%'), borderRadius: hp('2%') }}
                                    />
                                </TouchableOpacity>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                    <Text style={{ fontSize: hp('3%'), color: '#313131' }}>Frankie Barber</Text>
                                    <Text style={{ fontSize: hp('3%'), color: '#313131' }}>$ 20</Text>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: hp('2%'), }}>
                        <View style={{ flex: 1, height: 1, backgroundColor: '#FEBC42' }} />
                        <View>
                            <Text style={{ width: wp('34%'), textAlign: 'center', fontSize: hp('3%'), color: '#FEBC42' }}>Professiona</Text>
                        </View>
                        <View style={{ flex: 1, height: 1, backgroundColor: '#FEBC42' }} />
                    </View>
                    <View style={{ flexDirection: 'row', marginBottom: hp('5%') }}>
                        <ScrollView
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                        >
                            <View style={{ flexDirection: 'column' }}>
                                <TouchableOpacity style={{ margin: hp('2%') }}>
                                    <Image source={require('../../../assets/image/Lay3.png')} style={{ alignItems: 'center', height: hp('15%'), width: wp('30%'), marginTop: hp('2%'), borderRadius: hp('20%'), borderColor: '#FFFFFF', borderWidth: hp('1%') }}
                                    />
                                </TouchableOpacity>
                                <View style={{}}>
                                    <Text style={{ flex: 1, fontSize: hp('3%'), color: '#FEBC42', textAlign: 'center' }}>Tony Lopez</Text>

                                </View>
                            </View>
                            <View style={{ flexDirection: 'column' }}>
                                <TouchableOpacity style={{ margin: hp('2%') }}>
                                    <Image source={require('../../../assets/image/Lay1.png')} style={{ alignItems: 'center', height: hp('15%'), width: wp('30%'), marginTop: hp('2%'), borderRadius: hp('20%'), borderColor: '#FFFFFF', borderWidth: hp('1%') }}
                                    />
                                </TouchableOpacity>
                                <View >
                                    <Text style={{ flex: 1, fontSize: hp('3%'), color: '#FEBC42', textAlign: 'center' }}>Alonso Justin </Text>

                                </View>
                            </View>
                            <View style={{ flexDirection: 'column' }}>
                                <TouchableOpacity style={{ margin: hp('2%') }}>
                                    <Image source={require('../../../assets/image/Lay2.png')} style={{ alignItems: 'center', height: hp('15%'), width: wp('30%'), marginTop: hp('2%'), borderRadius: hp('20%'), borderColor: '#FFFFFF', borderWidth: hp('1%') }}
                                    />
                                </TouchableOpacity>
                                <View >
                                    <Text style={{ flex: 1, fontSize: hp('3%'), color: '#FEBC42', textAlign: 'center' }}>Jason Garcia</Text>

                                </View>
                            </View>
                        </ScrollView>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

export default HomeScreen;

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
    slider: {
        backgroundColor: "#FEBC42",
        borderRadius: hp('10'),
        width: wp('21%'),
        height: hp('11%'),
        marginTop: hp('3%'),
        margin: hp('2%'),
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

})