import React, { Component } from 'react';
import {
    View, Text, StyleSheet, ScrollView, Image, FlatList,
    RefreshControl, SafeAreaView, Dimensions, StatusBar, TouchableOpacity
} from 'react-native';
import moment from 'moment'
import Loader from '../../Components/Loader/Loader';
import { BookHistoryService } from '../../Services/BookHistoryService/BookHistoryService'
import AsyncStorage from '@react-native-community/async-storage'
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const serviceicon = 'https://res.cloudinary.com/dnogrvbs2/image/upload/v1610428971/userimage_qif8wv.jpg'
import * as KEY from '../../context/actions/key';
import * as COLOR from '../../styles/colors';
import * as IMAGE from '../../styles/image';
import * as FONT from '../../styles/typography';
import AntDesign from 'react-native-vector-icons/AntDesign';

class BookHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            _id: null,
            BookHistoryService: [],
            refreshing: false,
            loader: true,
        }
    }

    BookHistoryService(id) {
        BookHistoryService(id).then(response => {
            console.log(`response.data`, response.data);
            this.setState({ BookHistoryService: response.data })
            this.wait(1000).then(() => this.setState({ loader: false }));
        })
    }

    getdata = async () => {
        var getUser = await AsyncStorage.getItem('@authuser')
        if (getUser == null) {
            setTimeout(() => {
                this.props.navigation.replace('LoginScreen')
            }, 3000);
        } else {
            this.userid = JSON.parse(getUser)
            this.BookHistoryService(this.userid._id)
            this.setState({ _id: this.userid._id })
        }
    }

    wait = (timeout) => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }

    onRefresh = () => {
        const { _id } = this.state;
        this.setState({ refreshing: true })
        this.BookHistoryService(_id)
        this.wait(1000).then(() => this.setState({ refreshing: false }));
    }

    componentDidMount() {
        this.getdata();
    }

    renderBookHistoryService = ({ item }) => (
        <View style={styles.servicename}>
            <View style={{ margin: 10 }}>
                <Image source={{ uri: item.refid && item.refid.gallery && item.refid.gallery[0] && item.refid.gallery[0].attachment ? item.refid.gallery[0].attachment : serviceicon }}
                    style={{ alignItems: KEY.CENTER, height: 130, width: 150, borderRadius: 10 }} />
            </View>
            <View style={{ marginLeft: 10, flex: 0.8 }}>
                <Text style={{ fontSize: 10 }}>Booking ID : #{item.prefix + '-' + item.number}</Text>
                <Text style={{ fontSize: 16 }}>{item.refid.title}</Text>
                <Text style={{ fontSize: 14 }}>{moment(item.appointmentdate).format('LL')}</Text>
                <Text style={{ fontSize: 14 }}>₹ {item.refid.charges}</Text>
                {item.status == "requested" &&
                    <Text style={{ fontSize: 14, textTransform: KEY.CAPITALIZE, color: '#3788D8' }}>{item.status}</Text>
                }
                {item.status == "confirmed" &&
                    <Text style={{ fontSize: 14, textTransform: KEY.CAPITALIZE, color: '#9C27B0' }}>{item.status}</Text>
                }
                {item.status == "checkout" &&
                    <Text style={{ fontSize: 14, textTransform: KEY.CAPITALIZE, color: '#4CAF50' }}>{item.status}</Text>
                }
                {item.status == "cancel" &&
                    <Text style={{ fontSize: 14, textTransform: KEY.CAPITALIZE, color: '#F44336' }}>{item.status}</Text>
                }
                {item.status == "noshow" &&
                    <Text style={{ fontSize: 14, textTransform: KEY.CAPITALIZE, color: '#FF9800' }}>{item.status}</Text>
                }
                {item.status == "deleted" &&
                    <Text style={{ fontSize: 14, textTransform: KEY.CAPITALIZE, color: '#FF9800' }}>{'cancel'}</Text>
                }
            </View>
        </View>
    );

    render() {
        const { BookHistoryService, refreshing, loader } = this.state;
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor={COLOR.STATUSBARCOLOR} barStyle={KEY.LIGHT_CONTENT} />
                <View style={styles.headerstyle}>
                    <View style={{ justifyContent: KEY.SPACEBETWEEN, alignItems: KEY.CENTER, flexDirection: KEY.ROW, marginTop: 30 }}>
                        <View style={{ flexDirection: KEY.ROW, justifyContent: KEY.FLEX_START, alignItems: KEY.CENTER, marginLeft: 20 }}>
                            <TouchableOpacity onPress={() => this.props.navigation.goBack(null)}>
                                <AntDesign name='arrowleft' color={COLOR.WHITE} size={24} />
                            </TouchableOpacity>
                            <View style={{ justifyContent: KEY.CENTER, marginLeft: WIDTH / 5 }}>
                                <Text style={{ fontSize: 22, color: COLOR.WHITE, fontWeight: 'bold' }}>Booking History</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <ScrollView
                    refreshControl={<RefreshControl refreshing={refreshing} title="Pull to refresh" tintColor={COLOR.DEFALUTCOLOR}
                        titleColor={COLOR.DEFALUTCOLOR} colors={[COLOR.DEFALUTCOLOR]} onRefresh={this.onRefresh} />} showsVerticalScrollIndicator={false}>
                    <View style={{ alignItems: KEY.CENTER, marginTop: 0, marginBottom: 50 }}>
                        <FlatList
                            data={this.state.BookHistoryService}
                            showsVerticalScrollIndicator={false}
                            renderItem={this.renderBookHistoryService}
                            keyExtractor={item => `${item._id}`}
                            contentContainerStyle={{ paddingBottom: 100, alignSelf: KEY.CENTER }}
                            ListFooterComponent={() => (
                                BookHistoryService && BookHistoryService.length > 0 ?
                                    <></>
                                    :
                                    <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                                        <Image source={IMAGE.RECORD_ICON} style={{ height: 150, width: 200, marginTop: 100 }} resizeMode={KEY.CONTAIN} />
                                        <Text style={{ fontSize: 16, color: COLOR.TAUPE_GRAY, marginTop: 10 }}>No record found</Text>
                                    </View>
                            )}
                        />
                    </View>
                </ScrollView>
                {loader ? <Loader /> : null}
            </SafeAreaView>
        );
    }
}

export default BookHistory;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.BACKGROUNDCOLOR
    },
    servicename: {
        aspectRatio: 2.5,
        width: WIDTH,
        flexDirection: KEY.ROW,
        marginBottom: 15,
        alignItems: KEY.CENTER,
        //position: 'relative',
        backgroundColor: COLOR.WHITE,
        borderColor: COLOR.WHITE,
        shadowOpacity: 0,
        shadowRadius: 0,
        shadowOffset: {
            height: 0,
            width: 0,
        },
        elevation: 3
    },
    headerstyle: {
        backgroundColor: COLOR.STATUSBARCOLOR,
        width: WIDTH,
        height: 90,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        marginBottom: 20
    }
})