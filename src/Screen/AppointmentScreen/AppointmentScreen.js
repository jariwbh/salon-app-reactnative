import React, { Component } from 'react';
import { View, Text, TextInput, FlatList, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp, } from 'react-native-responsive-screen'
import { FontAwesome5 } from '@expo/vector-icons';
import { CategoryByAppointmentService } from '../../Services/CategoryService/CategoryService'
import Loading from '../../Components/Loader/Loading'

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
        console.log(id);
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
        this.wait(1000).then(() => this.setState({ loader: false, AppointmentService: newData }));
    };
    renderAppointmentList = ({ item }) => (
        // <View style={{ alignItems: 'center', marginBottom: hp('3%'), flex: 1 }}>
        <View style={styles.listview} >
            <TouchableOpacity style={{ marginTop: hp('2%'), marginLeft: hp('1%'), }} onPress={() => { this.props.navigation.navigate('AppointmentBooking', { item }) }}>
                <Image source={{ uri: (item.gallery[0] ? item.gallery[0].attachment : 'https://www.icon0.com/static2/preview2/stock-photo-photo-icon-illustration-design-70325.jpg') }} style={{ borderRadius: hp('7%'), width: wp('27%'), height: hp('15%'), }}
                />
            </TouchableOpacity>
            <TouchableOpacity style={{ marginTop: hp('6%'), marginLeft: hp('1%'), flex: 0.9 }}>
                <Text style={{ fontSize: hp('3%'), color: '#212121' }}>{item.title}</Text>
                <Text style={{ fontSize: hp('2%'), color: '#313131' }}>₹ {item.charges}</Text>

            </TouchableOpacity>
        </View>
        // </View>

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
                        placeholderTextColor="#D3D4DA"
                        returnKeyType="done"
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={(value) => this.searchFilterFunction(value)}
                    />
                    <FontAwesome5 name="search" size={24} color='#000000' style={{ alignItems: "flex-end", justifyContent: 'flex-end', marginRight: hp('2%') }} />
                </View>
                {(AppointmentService == null) || (AppointmentService && AppointmentService.length == 0) ?
                    (loader == false ?
                        <Text style={{ textAlign: 'center', fontSize: hp('2%'), color: '#747474', marginTop: hp('10%') }}>No Resort Available</Text>
                        : <Loading />
                    )
                    :
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={{ flexDirection: 'column', flex: 1 }}>
                            <FlatList
                                data={AppointmentService}
                                renderItem={this.renderAppointmentList}
                                keyExtractor={item => `${item._id}`}
                            />
                        </View>
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
        borderColor: '#FFFFFF',
        shadowOpacity: 0.5,
        shadowRadius: 3,
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
        marginTop: hp('2%'),
        width: wp('90%'),
        height: hp('20%'),
        marginLeft: hp('2.5%'),
        justifyContent: 'space-around',


    },
})