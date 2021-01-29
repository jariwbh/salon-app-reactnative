import React, { Component } from 'react';
import { View, Text, TextInput, FlatList, ScrollView, StyleSheet, TouchableOpacity, Image, Pressable } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp, } from 'react-native-responsive-screen'
import { FontAwesome5 } from '@expo/vector-icons';
import { CategoryByAppointmentService } from '../../Services/CategoryService/CategoryService'
import Loader from '../../Components/Loader/Loader'
const serviceicon = 'https://res.cloudinary.com/dnogrvbs2/image/upload/v1610428971/userimage_qif8wv.jpg'

export default class AppointmentScreen extends Component {
    constructor(props) {
        super(props);
        this.CategoryID = this.props.route.params.item._id;
        this.searchserviceList = [];
        this.state = {
            AppointmentService: [],
            loader: true
        };
    }

    getAppointmentList() {
        let id = this.CategoryID
        CategoryByAppointmentService(id).then(response => {
            this.setState({ AppointmentService: response })
            this.searchserviceList = response;
            this.wait(1000).then(() => this.setState({ loader: false }));
        })
    }

    componentDidMount() {
        this.getAppointmentList();
    }

    wait = (timeout) => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }

    searchFilterFunction(text) {
        this.setState({ loader: true });
        const newData = this.searchserviceList.filter(item => {
            const itemData = `${item.title.toUpperCase()}`
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        return this.wait(1000).then(() => this.setState({ loader: false, AppointmentService: newData }));
    };

    renderAppointmentList = ({ item }) => (
        <TouchableOpacity style={styles.listview} onPress={() => this.props.navigation.navigate('ServiceDetails', { item })}>
            <TouchableOpacity style={{ marginTop: hp('2%'), marginLeft: hp('1%'), }} onPress={() => { this.props.navigation.navigate('ServiceDetails', { item }) }}>
                <Image source={{ uri: item.gallery[0] ? (item.gallery[0] ? item.gallery[0].attachment : serviceicon) : serviceicon }}
                    style={{ borderRadius: hp('15%'), width: 90, height: 90, }}
                />
            </TouchableOpacity>
            <View style={{ marginTop: hp('5%'), marginLeft: hp('1%'), flex: 0.9 }}>
                <Text style={{ fontSize: hp('3%'), color: '#212121' }}>{item.title}</Text>
                <Text style={{ fontSize: hp('2%'), color: '#313131' }}>₹ {item.charges}</Text>
            </View>
        </TouchableOpacity>
    )

    render() {
        const { AppointmentService, loader } = this.state
        return (
            <View style={styles.container}>
                <View style={styles.statusbar}>
                    <TextInput
                        style={styles.statInput}
                        placeholder="Type here to search"
                        type='clear'
                        placeholderTextColor="#737373"
                        returnKeyType="done"
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={(value) => this.searchFilterFunction(value)}
                    />
                    <TouchableOpacity >
                        <FontAwesome5 name="search" size={24} color='#808080' style={{ alignItems: "flex-end", justifyContent: 'flex-end', marginRight: hp('2%') }} />
                    </TouchableOpacity>
                </View>
                {(AppointmentService == null) || (AppointmentService && AppointmentService.length == 0) ?
                    (loader == false ?
                        <Text style={{ textAlign: 'center', fontSize: hp('2.5%'), color: '#747474', marginTop: hp('10%') }}>No Service Available</Text>
                        : <Loader />
                    )
                    :
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={{ flexDirection: 'column', flex: 1, marginTop: hp('2%') }}>
                            <FlatList
                                data={AppointmentService}
                                renderItem={this.renderAppointmentList}
                                keyExtractor={item => `${item._id}`}
                            />
                        </View>
                        <View style={{ marginBottom: hp('12%') }}></View>
                    </ScrollView>
                }
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
        borderColor: '#737373',
        shadowOpacity: 0.5,
        shadowRadius: 2,
        shadowOffset: {
            height: 0,
            width: 0,
        },
        elevation: 2,
        marginTop: hp('1%'),
        width: wp('90%'),
        height: hp('6.5%'),
        marginLeft: hp('2.5%'),
        alignItems: "center",
        justifyContent: 'center',
    },
    statInput: {
        fontSize: hp('2.5%'),
        flex: 1,
        marginLeft: hp('2%'),
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
        marginTop: hp('2%'),
        width: wp('90%'),
        height: hp('20%'),
        marginLeft: hp('2.5%'),
        justifyContent: 'space-around',
        marginBottom: hp('1%')
    },
})