import React, { Component } from 'react';
import {
    View, Text, StyleSheet, ScrollView, Image, FlatList,
    RefreshControl, SafeAreaView, Dimensions, StatusBar, TouchableOpacity
} from 'react-native';
import moment from 'moment'
import Loader from '../../Components/Loader/Loader';
import { BookHistoryService } from '../../Services/BookHistoryService/BookHistoryService'
import AsyncStorage from '@react-native-community/async-storage'
import * as TYPE from '../../context/actions/type';
import * as KEY from '../../context/actions/key';
import * as COLOR from '../../styles/colors';
import * as IMAGE from '../../styles/image';
import * as FONT from '../../styles/typography';
import AntDesign from 'react-native-vector-icons/AntDesign';
import getCurrency from '../../Services/getCurrencyService/getCurrency';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

class BookHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            _id: null,
            BookHistoryService: [],
            refreshing: false,
            loader: true,
            currencySymbol: null
        }
    }

    BookHistoryService(id) {
        BookHistoryService(id).then(response => {
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
            var userData = JSON.parse(getUser);
            this.userid = userData;
            const responseCurrency = getCurrency(userData.branchid.currency);
            this.setState({ currencySymbol: responseCurrency });
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
        item.status == 'confirmed' &&
        <View style={styles(COLOR.CONFIRMED_COLOR).cardView}>
            <View style={styles(COLOR.CONFIRMED_COLOR).filledBox}>
                <Text style={{ fontSize: FONT.FONT_SIZE_28, fontWeight: FONT.FONT_WEIGHT_BOLD, color: COLOR.WHITE }}>{moment(item.appointmentdate).format('DD')}</Text>
                <Text style={{ fontSize: FONT.FONT_SIZE_16, fontWeight: FONT.FONT_WEIGHT_BOLD, color: COLOR.WHITE }}>{moment(item.appointmentdate).format('MMM')}</Text>
            </View>
            <View style={{ flexDirection: KEY.COLUMN, marginLeft: 5, padding: 5 }}>
                <Text style={styles().rectangleText}>{item.attendee && item.attendee.fullname}</Text>
                <Text style={styles().rectangleSubText}>{item.refid && item.refid.title}</Text>
                <Text style={styles().rectangleSubText}>{(item.timeslot && item.timeslot.starttime) + ' - ' + (item.timeslot && item.timeslot.endtime)}</Text>
                <View style={{ flexDirection: KEY.ROW, justifyContent: KEY.SPACEBETWEEN }}>
                    <Text style={{ fontSize: FONT.FONT_SIZE_14, color: COLOR.CONFIRMED_COLOR, marginTop: 2, textTransform: KEY.CAPITALIZE }}>{item.status}</Text>
                </View>
            </View>
        </View>
        ||
        item.status == 'cancel' &&
        <View style={styles(COLOR.CANCEL_COLOR).cardView}>
            <View style={styles(COLOR.CANCEL_COLOR).filledBox}>
                <Text style={{ fontSize: FONT.FONT_SIZE_28, fontWeight: FONT.FONT_WEIGHT_BOLD, color: COLOR.WHITE }}>{moment(item.appointmentdate).format('DD')}</Text>
                <Text style={{ fontSize: FONT.FONT_SIZE_16, fontWeight: FONT.FONT_WEIGHT_BOLD, color: COLOR.WHITE }}>{moment(item.appointmentdate).format('MMM')}</Text>
            </View>
            <View style={{ flexDirection: KEY.COLUMN, marginLeft: 5, padding: 5 }}>
                <Text style={styles().rectangleText}>{item.attendee && item.attendee.fullname}</Text>
                <Text style={styles().rectangleSubText}>{item.refid && item.refid.title}</Text>
                <Text style={styles().rectangleSubText}>{(item.timeslot && item.timeslot.starttime) + ' - ' + (item.timeslot && item.timeslot.endtime)}</Text>
                <View style={{ flexDirection: KEY.ROW, justifyContent: KEY.SPACEBETWEEN }}>
                    <Text style={{ fontSize: FONT.FONT_SIZE_14, color: COLOR.CANCEL_COLOR, marginTop: 2, textTransform: KEY.CAPITALIZE }}>{item.status}</Text>
                </View>
            </View>
        </View>
        ||
        item.status == 'noshow' &&
        <View style={styles(COLOR.NOSHOW_COLOR).cardView}>
            <View style={styles(COLOR.NOSHOW_COLOR).filledBox}>
                <Text style={{ fontSize: FONT.FONT_SIZE_28, fontWeight: FONT.FONT_WEIGHT_BOLD, color: COLOR.WHITE }}>{moment(item.appointmentdate).format('DD')}</Text>
                <Text style={{ fontSize: FONT.FONT_SIZE_16, fontWeight: FONT.FONT_WEIGHT_BOLD, color: COLOR.WHITE }}>{moment(item.appointmentdate).format('MMM')}</Text>
            </View>
            <View style={{ flexDirection: KEY.COLUMN, marginLeft: 5, padding: 5 }}>
                <Text style={styles().rectangleText}>{item.attendee && item.attendee.fullname}</Text>
                <Text style={styles().rectangleSubText}>{item.refid && item.refid.title}</Text>
                <Text style={styles().rectangleSubText}>{(item.timeslot && item.timeslot.starttime) + ' - ' + (item.timeslot && item.timeslot.endtime)}</Text>
                <View style={{ flexDirection: KEY.ROW, justifyContent: KEY.SPACEBETWEEN }}>
                    <Text style={{ fontSize: FONT.FONT_SIZE_14, color: COLOR.NOSHOW_COLOR, marginTop: 2, textTransform: KEY.CAPITALIZE }}>{item.status}</Text>
                </View>
            </View>
        </View>
        ||
        item.status == 'requested' &&
        <View style={styles(COLOR.REQUESTED_COLOR).cardView}>
            <View style={styles(COLOR.REQUESTED_COLOR).filledBox}>
                <Text style={{ fontSize: FONT.FONT_SIZE_28, fontWeight: FONT.FONT_WEIGHT_BOLD, color: COLOR.WHITE }}>{moment(item.appointmentdate).format('DD')}</Text>
                <Text style={{ fontSize: FONT.FONT_SIZE_16, fontWeight: FONT.FONT_WEIGHT_BOLD, color: COLOR.WHITE }}>{moment(item.appointmentdate).format('MMM')}</Text>
            </View>
            <View style={{ flexDirection: KEY.COLUMN, marginLeft: 5, padding: 5 }}>
                <Text style={styles().rectangleText}>{item.attendee && item.attendee.fullname}</Text>
                <Text style={styles().rectangleSubText}>{item.refid && item.refid.title}</Text>
                <Text style={styles().rectangleSubText}>{(item.timeslot && item.timeslot.starttime) + ' - ' + (item.timeslot && item.timeslot.endtime)}</Text>
                <View style={{ flexDirection: KEY.ROW, justifyContent: KEY.SPACEBETWEEN }}>
                    <Text style={{ fontSize: FONT.FONT_SIZE_14, color: COLOR.REQUESTED_COLOR, marginTop: 2, textTransform: KEY.CAPITALIZE }}>{item.status}</Text>
                </View>
            </View>
        </View>
        ||
        item.status == 'checkout' &&
        <View style={styles(COLOR.CHECKOUT_COLOR).cardView}>
            <View style={styles(COLOR.CHECKOUT_COLOR).filledBox}>
                <Text style={{ fontSize: FONT.FONT_SIZE_28, fontWeight: FONT.FONT_WEIGHT_BOLD, color: COLOR.WHITE }}>{moment(item.appointmentdate).format('DD')}</Text>
                <Text style={{ fontSize: FONT.FONT_SIZE_16, fontWeight: FONT.FONT_WEIGHT_BOLD, color: COLOR.WHITE }}>{moment(item.appointmentdate).format('MMM')}</Text>
            </View>
            <View style={{ flexDirection: KEY.COLUMN, marginLeft: 5, padding: 5 }}>
                <Text style={styles().rectangleText}>{item.attendee && item.attendee.fullname}</Text>
                <Text style={styles().rectangleSubText}>{item.refid && item.refid.title}</Text>
                <Text style={styles().rectangleSubText}>{(item.timeslot && item.timeslot.starttime) + ' - ' + (item.timeslot && item.timeslot.endtime)}</Text>
                <View style={{ flexDirection: KEY.ROW, justifyContent: KEY.SPACEBETWEEN }}>
                    <Text style={{ fontSize: FONT.FONT_SIZE_14, color: COLOR.CHECKOUT_COLOR, marginTop: 2, textTransform: KEY.CAPITALIZE }}>{item.status}</Text>
                </View>
            </View>
        </View>
    );

    render() {
        const { BookHistoryService, refreshing, loader } = this.state;
        return (
            <SafeAreaView style={styles().container}>
                <StatusBar backgroundColor={COLOR.STATUSBARCOLOR} barStyle={KEY.LIGHT_CONTENT} />
                <View style={styles().headerstyle}>
                    <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, flexDirection: KEY.ROW, marginTop: 30 }}>
                        <Text style={{ fontSize: 22, color: COLOR.WHITE, fontWeight: 'bold' }}>Booking History</Text>
                    </View>
                </View>
                <ScrollView
                    refreshControl={<RefreshControl refreshing={refreshing} title="Pull to refresh" tintColor={COLOR.DEFALUTCOLOR}
                        titleColor={COLOR.DEFALUTCOLOR} colors={[COLOR.DEFALUTCOLOR]} onRefresh={this.onRefresh} />} showsVerticalScrollIndicator={false}>
                    <View style={{ alignItems: KEY.CENTER, marginTop: 0, marginBottom: 0 }}>
                        <FlatList
                            data={this.state.BookHistoryService}
                            showsVerticalScrollIndicator={false}
                            renderItem={this.renderBookHistoryService}
                            keyExtractor={item => `${item._id}`}
                            contentContainerStyle={{ paddingBottom: 80, alignSelf: KEY.CENTER }}
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

const styles = (colorcode) => StyleSheet.create({
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
    },
    cardView: {
        borderRadius: 15,
        marginTop: 10,
        marginBottom: 5,
        borderRightWidth: 10,
        borderRightColor: colorcode,
        flexDirection: KEY.ROW,
        backgroundColor: COLOR.WHITE,
        shadowColor: COLOR.BLACK,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 3,
        width: WIDTH - 20,
    },
    filledBox: {
        width: 100,
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
        backgroundColor: colorcode,
        justifyContent: KEY.CENTER,
        alignItems: KEY.CENTER,
        flexDirection: KEY.COLUMN,
        padding: 5
    },
    rectangleText: {
        fontWeight: FONT.FONT_WEIGHT_BOLD,
        fontSize: FONT.FONT_SIZE_16,
        color: COLOR.BLACK,
        marginTop: 2,
        width: WIDTH / 2
    },
    rectangleSubText: {
        fontSize: FONT.FONT_SIZE_14,
        color: COLOR.BLACK,
        marginTop: 2,
        width: WIDTH / 2
    },
})