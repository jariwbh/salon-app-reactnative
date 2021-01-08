import React, { Component } from 'react';
import { View, Text, TextInput, FlatList, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp, } from 'react-native-responsive-screen'
import { FontAwesome5 } from '@expo/vector-icons';
import { Rating } from 'react-native-elements';
import { AppointmentListService } from '../../Services/CategoryService/CategoryService'

export default class AppointmentScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            AppointmentList: []
        };
    }
    getAppointmentList() {
        AppointmentListService().then(response => {
            //   console.log({ AppointmentList: response });
            this.setState({ AppointmentList: response })

        })
    }
    componentDidMount() {
        this.getAppointmentList();
    }

    renderAppointmentList = ({ item }) => (
        <View style={styles.listview}>
            <TouchableOpacity style={{ marginTop: hp('2%'), marginLeft: hp('1%'), }} onPress={() => { this.props.navigation.navigate('AppointmentBooking') }}>
                <Image source={{ uri: (item.gallery[0] ? item.gallery[0].attachment : 'https://www.icon0.com/static2/preview2/stock-photo-photo-icon-illustration-design-70325.jpg') }} style={{ borderRadius: hp('7%'), width: wp('27%'), height: hp('15%'), }}
                />
            </TouchableOpacity>
            <TouchableOpacity style={{ marginTop: hp('6%'), marginLeft: hp('1%'), flex: 0.9 }}>
                <Text style={{ fontSize: hp('3%'), color: '#212121' }}>{item.title}</Text>
                <Text style={{ fontSize: hp('2%'), color: '#313131' }}>₹ {item.charges}</Text>

            </TouchableOpacity>
        </View>
    )

    render() {
        const { AppointmentList } = this.state
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
                        <FlatList
                            data={AppointmentList}
                            renderItem={this.renderAppointmentList}
                            keyExtractor={item => `${item._id}`}
                        />
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
        justifyContent: 'center',


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