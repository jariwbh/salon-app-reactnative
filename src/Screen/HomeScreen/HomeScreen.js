import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, Image, ScrollView } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp, } from 'react-native-responsive-screen'
import { FontAwesome5 } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { CategoryService, AppointmentListService, } from '../../Services/CategoryService/CategoryService';
import { staffService } from '../../Services/UserService/UserService';



class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            CategoryList: [],
            AppointmentList: [],
            staffList: []

        };
    }
    getCategoryList() {
        CategoryService().then(response => {
            this.setState({ CategoryList: response })

        })
    }
    getAppointmentList() {
        AppointmentListService().then(response => {
            this.setState({ AppointmentList: response })

        })
    }

    getstaffList() {
        staffService().then(response => {
            this.setState({ staffList: response })

        })
    }

    componentDidMount() {
        this.getCategoryList();
        this.getAppointmentList();
        this.getstaffList();
    }

    renderCategoryList = ({ item }) => (

        <View style={{ flexDirection: 'column' }}>
            <TouchableOpacity style={styles.sliderview} onPress={() => { this.props.navigation.navigate('AppointmentScreen', { item }) }}>
                <Image source={{ uri: (item.property.img[0] ? item.property.img[0].attachment : 'https://www.icon0.com/static2/preview2/stock-photo-photo-icon-illustration-design-70325.jpg') }} style={{ alignItems: 'center', height: hp('7%'), width: wp('12%'), marginTop: hp('1%') }}
                />
            </TouchableOpacity>
            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: hp('2%'), color: '#43434C' }}>{item.property.name}</Text>
            </TouchableOpacity>
        </View>
    )

    renderAppointmentList = ({ item }) => (
        <View style={{ flexDirection: 'column', flex: 1 }}>
            <TouchableOpacity style={{ margin: hp('2%') }} onPress={() => this.props.navigation.navigate('AppointmentBooking', { item })}>
                <Image source={{ uri: (item.gallery[0] ? item.gallery[0].attachment : 'https://www.icon0.com/static2/preview2/stock-photo-photo-icon-illustration-design-70325.jpg') }} style={{ alignItems: 'center', height: hp('25%'), width: wp('65%'), marginTop: hp('2%'), borderRadius: hp('2%') }}
                />
            </TouchableOpacity>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
                <Text style={{ fontSize: hp('3%'), color: '#313131' }}>{item.title}</Text>
                <Text style={{ fontSize: hp('3%'), color: '#313131' }}>₹ {item.charges}</Text>
            </View>
        </View>
    )

    renderstaffList = ({ item }) => (
        <View style={{ flexDirection: 'column', marginBottom: hp('5%') }}>
            <TouchableOpacity style={{ margin: hp('2%') }} onPress={() => this.props.navigation.navigate('StaffDetails', { item })}>
                <Image source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar6.png' }}
                    style={{ alignItems: 'center', height: hp('15%'), width: wp('30%'), marginTop: hp('2%'), borderRadius: hp('20%'), borderColor: '#FFFFFF', borderWidth: hp('1%') }}
                />
            </TouchableOpacity>
            <View>
                <Text style={{ flex: 1, fontSize: hp('3%'), color: '#FEBC42', textAlign: 'center' }}>{item.property.fullname}</Text>
            </View>
        </View>
    )

    render() {
        const { CategoryList, AppointmentList, staffList } = this.state
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
                            <FlatList
                                style={{ flexDirection: 'column' }}
                                numColumns={10000}
                                data={CategoryList}
                                renderItem={this.renderCategoryList}
                                keyExtractor={item => `${item._id}`}
                            />
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
                            <FlatList
                                style={{ flexDirection: 'row' }}
                                numColumns={10000}
                                data={AppointmentList}
                                renderItem={this.renderAppointmentList}
                                keyExtractor={item => `${item._id}`}
                            />
                        </ScrollView>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: hp('2%'), }}>
                        <View style={{ flex: 1, height: 1, backgroundColor: '#FEBC42' }} />
                        <View>
                            <Text style={{ width: wp('40%'), textAlign: 'center', fontSize: hp('3%'), color: '#FEBC42' }}>Professionals</Text>
                        </View>
                        <View style={{ flex: 1, height: 1, backgroundColor: '#FEBC42' }} />
                    </View>
                    <View style={{ flexDirection: 'row', marginBottom: hp('5%') }}>
                        <ScrollView
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                        >
                            <FlatList
                                style={{ flexDirection: 'row' }}
                                numColumns={10000}
                                data={staffList}
                                renderItem={this.renderstaffList}
                                keyExtractor={item => `${item._id}`}
                            />
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