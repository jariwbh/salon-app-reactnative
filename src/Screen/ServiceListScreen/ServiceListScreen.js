import React, { Component } from 'react';
import { View, Text, TextInput, FlatList, ScrollView, StyleSheet, TouchableOpacity, Image, Dimensions, SafeAreaView, Keyboard } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { CategoryByAppointmentService } from '../../Services/CategoryService/CategoryService'
import Loader from '../../Components/Loader/Loader';
const serviceicon = 'https://res.cloudinary.com/dnogrvbs2/image/upload/v1610428971/userimage_qif8wv.jpg'
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
import * as KEY from '../../context/actions/key';
import * as COLOR from '../../styles/colors';
import * as IMAGE from '../../styles/image';

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
            this.setState({ AppointmentService: response.data })
            this.searchserviceList = response.data;
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
        const newData = this.searchserviceList.filter(item => {
            const itemData = `${item.title.toUpperCase()}`
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        return this.wait(1000).then(() => this.setState({ AppointmentService: newData }));
    };

    renderAppointmentList = ({ item }) => (
        <TouchableOpacity style={styles.listview} onPress={() => this.props.navigation.navigate('ServiceDetails', { item })}>
            <TouchableOpacity style={{ marginLeft: 5 }} onPress={() => { this.props.navigation.navigate('ServiceDetails', { item }) }}>
                <Image source={{ uri: item.gallery[0] ? (item.gallery[0] ? item.gallery[0].attachment : serviceicon) : serviceicon }}
                    style={{ borderRadius: 100, width: 90, height: 90, }}
                />
            </TouchableOpacity>
            <View style={{ marginLeft: 5, flex: 0.9 }}>
                <Text style={{ fontSize: 18, color: COLOR.BLACK }}>{item.title}</Text>
                <Text style={{ fontSize: 14, color: COLOR.BLACK }}>₹ {item.charges}</Text>
            </View>
        </TouchableOpacity>
    )

    render() {
        const { AppointmentService, loader } = this.state
        return (
            <SafeAreaView style={styles.container}>
                <View style={{ alignItems: KEY.CENTER, justifyContent: KEY.CENTER }}>
                    {this.searchserviceList && this.searchserviceList.length != 0 &&
                        <View style={styles.statusbar}>
                            <TextInput
                                style={styles.statInput}
                                placeholder="Type here to search"
                                type='clear'
                                placeholderTextColor={COLOR.PLACEHOLDER_COLOR}
                                returnKeyType="done"
                                autoCapitalize="none"
                                autoCorrect={false}
                                onChangeText={(value) => this.searchFilterFunction(value)}
                            />
                            <TouchableOpacity onPress={() => Keyboard.dismiss()}>
                                <FontAwesome5 name="search" size={24} color={COLOR.PLACEHOLDER_COLOR}
                                    style={{ alignItems: KEY.FLEX_END, justifyContent: KEY.FLEX_END, marginRight: 15 }} />
                            </TouchableOpacity>
                        </View>
                    }
                    <View style={{ marginTop: 10 }}>
                        <FlatList
                            data={AppointmentService}
                            showsVerticalScrollIndicator={false}
                            renderItem={this.renderAppointmentList}
                            keyExtractor={item => `${item._id}`}
                            contentContainerStyle={{ paddingBottom: 100, alignSelf: KEY.CENTER }}
                            ListFooterComponent={() => (
                                AppointmentService && AppointmentService.length > 0 ?
                                    <></>
                                    :
                                    <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                                        <Image source={IMAGE.RECORD_ICON} style={{ height: 150, width: 200, marginTop: 100 }} resizeMode={KEY.CONTAIN} />
                                        <Text style={{ fontSize: 16, color: COLOR.TAUPE_GRAY, marginTop: 10 }}>No record found</Text>
                                    </View>
                            )}
                        />
                    </View>
                </View>
                {loader ? <Loader /> : null}
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.DEFAULTLIGHT,
    },
    statusbar: {
        flexDirection: KEY.ROW,
        backgroundColor: COLOR.WHITE,
        borderColor: COLOR.DEFALUTCOLOR,
        shadowOpacity: 0.5,
        shadowRadius: 2,
        shadowOffset: {
            height: 0,
            width: 0,
        },
        elevation: 2,
        marginTop: 80,
        width: WIDTH - 40,
        height: 50,
        alignItems: KEY.CENTER,
        justifyContent: KEY.CENTER,
        borderRadius: 10
    },
    statInput: {
        fontSize: 14,
        flex: 1,
        marginLeft: 10,
        alignItems: KEY.CENTER
    },
    listview: {
        flexDirection: KEY.ROW,
        borderRadius: 10,
        backgroundColor: COLOR.WHITE,
        shadowOpacity: 0.5,
        shadowRadius: 2,
        shadowOffset: {
            height: 0,
            width: 0,
        },
        elevation: 2,
        width: WIDTH - 40,
        height: 130,
        marginLeft: 0,
        marginTop: 10,
        justifyContent: KEY.SPACEAROUND,
        marginBottom: 10,
        alignItems: KEY.CENTER
    }
})