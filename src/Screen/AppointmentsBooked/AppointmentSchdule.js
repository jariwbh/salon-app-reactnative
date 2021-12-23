import React, { Component } from 'react';
import {
    View, Text, ScrollView, StyleSheet, Dimensions, StatusBar,
    TouchableOpacity, Image, SafeAreaView, FlatList, Linking
} from 'react-native';
import getCurrency from '../../Services/getCurrencyService/getCurrency';
import AsyncStorage from '@react-native-community/async-storage';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Loader from '../../Components/Loader/Loader';
import * as TYPE from '../../context/actions/type';
import { Calendar } from 'react-native-calendars';
import * as KEY from '../../context/actions/key';
import * as COLOR from '../../styles/colors';
import * as FONT from '../../styles/typography';
import * as IMAGE from '../../styles/image';
import moment from 'moment';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default class AppointmentSchdule extends Component {
    constructor(props) {
        super(props);
        this.serviceDetails = props.route.params.serviceDetails;
        this.currentDate = moment().format('YYYY-MM-DD');
        this.state = {
            timeSlots: [],
            loading: false,
            currencySymbol: null,
            selectedDay: null,
            currentDay: null
        };
    }

    componentDidMount() {
        this.getDefaultUser();
        this.onPressSelectedDay({ dateString: moment().format('YYYY-MM-DD') })
    }

    getDefaultUser = async () => {
        var getUser = await AsyncStorage.getItem(TYPE.AUTHUSER);
        if (getUser !== null) {
            var userData = JSON.parse(getUser);
            const responseCurrency = getCurrency(userData.branchid.currency);
            this.setState({ currencySymbol: responseCurrency });
        } else {
            var getUser = await AsyncStorage.getItem(TYPE.DEFAULTUSER);
            var userData = JSON.parse(getUser);
            const responseCurrency = getCurrency(userData.branchid.currency);
            this.setState({ currencySymbol: responseCurrency });
        }
    }

    setdigit = (val) => {
        var ret;
        if (val <= 9) {
            ret = `0${val}`;
        } else {
            ret = `${val}`;
        }
        return ret;
    }

    generatingTS = (service) => {
        this.setState({ loading: true });
        var timeslotList = [];
        var starttime = service['availability'].starttime; // 06:00
        var endtime = service['availability'].endtime;     // 14:00
        var duration = service['duration'];

        var startmin = starttime.split(":");      // 06:00
        var timehr = parseInt(startmin[0]);       // 06
        var timemin = parseInt(startmin[1]);      // 00
        var totalstartmin = timehr * 60 + timemin;// 360 + 00

        var endmin = endtime.split(":");            // 14:00
        var endtimehr = parseInt(endmin[0]);        // 14
        var endtimemin = parseInt(endmin[1]);       // 00
        var totalendmin = endtimehr * 60 + endtimemin;// 840 + 00

        for (var time = totalstartmin; time < totalendmin;) { //360
            timemin = Number(timemin);            //00
            var start;
            start = this.setdigit(timehr) + ":" + this.setdigit(timemin)
            var end;
            if (duration <= 60) {
                timemin += parseInt(duration);        //60
                if (timemin >= 60) {
                    timehr += 1;                        //07
                    timemin -= 60;                      //00
                }
                end = this.setdigit(timehr) + ":" + this.setdigit(timemin)
            } else {
                end = moment(timehr + ':' + timemin, 'HH:mm');
                end.add(duration, 'm');
                end = end.format("HH:mm");
                var tempstartmin = end.split(":");
                timehr = parseInt(tempstartmin[0]);
                timemin = parseInt(tempstartmin[1]);
            }
            var obj;
            obj = {
                "date": this.currentDate,
                "day": moment(this.currentDate).format('dddd'),
                "starttime": start,
                "endtime": end,
                "displaytext": start + " - " + end,
                "disable": false,
            }
            timeslotList.push(obj);
            time += parseInt(duration);
        }
        this.setState({ loading: false, timeSlots: timeslotList });
        return
    }

    onPressToBookNow = (item) => {
        this.serviceDetails.selectedtime = item;
        let serviceDetails = this.serviceDetails;
        this.props.navigation.navigate('AppointmentsBooked', { serviceDetails });
    }

    onPressSelectedDay = (day) => {
        day = moment(day.dateString).format('YYYY-MM-DD');
        let markedDates = {};
        markedDates[day] = { selected: true, marked: false, selectedColor: COLOR.DEFALUTCOLOR }
        this.setState({ selectedDay: markedDates })
        this.currentDate = day;

        if (moment(day).format('dddd') === 'Sunday' || moment(day).format('dddd') === 'Saturday') {
            this.setState({ timeSlots: [] });
        } else {
            this.generatingTS(this.serviceDetails);
        }
    }

    //ON PRESS TO CALL DIALER TO USE FUNCTION
    onPressCall = () => {
        let mobile = '00628113882240';
        let phoneNumber = mobile;
        if (Platform.OS !== 'android') {
            phoneNumber = `telprompt:${mobile}`;
        }
        else {
            phoneNumber = `tel:${mobile}`;
        }
        Linking.openURL(phoneNumber);
    }

    renderTimeSlots = ({ item, index }) => (
        <View style={{ alignItems: KEY.CENTER, justifyContent: KEY.CENTER }} key={index}>
            <View style={styles.cardView}>
                <View style={styles.filledBox}>
                    <Text style={{ fontSize: FONT.FONT_SIZE_28, fontWeight: FONT.FONT_WEIGHT_BOLD, color: COLOR.WHITE }}>{moment(item.date).format('DD')}</Text>
                    <Text style={{ fontSize: FONT.FONT_SIZE_16, fontWeight: FONT.FONT_WEIGHT_BOLD, color: COLOR.WHITE }}>{moment(item.date).format('MMM')}</Text>
                </View>
                <View style={{ flexDirection: KEY.ROW, marginLeft: 5, padding: 5 }}>
                    <View style={{ flexDirection: KEY.COLUMN, marginLeft: 5, padding: 5 }}>
                        <Text style={styles.rectangleSubText}>Start Time : {(item && item.starttime)}</Text>
                        <Text style={styles.rectangleSubText}>End Time : {(item && item.endtime)}</Text>
                    </View>
                    {
                        moment().format('YYYY-MM-DD') === this.currentDate ?
                            <TouchableOpacity style={styles.book} onPress={() => this.onPressCall()} >
                                <Text style={{ fontSize: 14, color: COLOR.WHITE, marginLeft: 10, marginRight: 10 }}>Call to Book</Text>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity style={styles.book} onPress={() => this.onPressToBookNow(item)} >
                                <Text style={{ fontSize: 14, color: COLOR.WHITE, marginLeft: 15, marginRight: 15 }}>Select</Text>
                            </TouchableOpacity>
                    }
                </View>
            </View>
        </View>
    )

    render() {
        const { selectedDay, timeSlots, loading } = this.state;
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
                                <Text style={{ fontSize: 22, color: COLOR.WHITE, fontWeight: 'bold' }}>Booking Online</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={KEY.ALWAYS}>
                    <View style={{ justifyContent: KEY.CENTER, marginLeft: 20, marginRight: 20 }}>
                        <Text style={{ fontSize: 16, color: COLOR.DEFALUTCOLOR, fontWeight: 'bold' }}>{this.serviceDetails.title}</Text>
                        <Text style={{ fontSize: 16, color: COLOR.DEFALUTCOLOR, fontWeight: 'bold' }}>({(this.serviceDetails.duration + 'mins') + ', ' + this.state.currencySymbol + ' ' + this.serviceDetails.charges})</Text>
                    </View>
                    <View style={{ justifyContent: KEY.CENTER, alignContent: KEY.CENTER }}>
                        <Calendar
                            enableSwipeMonths={true}
                            theme={{
                                textSectionTitleColor: COLOR.BLACK,
                                backgroundColor: COLOR.BACKGROUNDCOLOR,
                                calendarBackground: COLOR.BACKGROUNDCOLOR,
                                arrowColor: COLOR.BLACK,
                                monthTextColor: COLOR.BLACK,
                                indicatorColor: COLOR.BLACK,
                                dayTextColor: COLOR.BLACK,
                                todayTextColor: COLOR.DEFALUTCOLOR,
                            }}
                            style={{ backgroundColor: COLOR.BACKGROUNDCOLOR }}
                            onDayPress={(day) => this.onPressSelectedDay(day)}
                            markedDates={selectedDay}
                            // onMonthChange={(month) => this.onChangeMonth(month)}
                            markingType={'custom'}
                            hideExtraDays={true}
                        />
                        <Text style={{ marginTop: 10, textAlign: KEY.CENTER, fontSize: 16, color: COLOR.DEFALUTCOLOR, fontWeight: 'bold' }}>Available appointments on {moment(this.currentDate).format('DD MMMM YYYY')}</Text>
                        <FlatList
                            data={timeSlots}
                            showsVerticalScrollIndicator={false}
                            renderItem={this.renderTimeSlots}
                            keyExtractor={(item) => item.starttime}
                            contentContainerStyle={{ paddingBottom: 80, alignSelf: KEY.CENTER }}
                            ListFooterComponent={() => (
                                timeSlots && timeSlots.length > 0 ?
                                    <></>
                                    :
                                    <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                                        <Image source={IMAGE.RECORD_ICON} style={{ height: 150, width: 200, marginTop: 30 }} resizeMode={KEY.CONTAIN} />
                                        <Text style={{ fontSize: 16, color: COLOR.TAUPE_GRAY, marginTop: 10 }}>No appointments available</Text>
                                    </View>
                            )}
                        />
                    </View>
                </ScrollView>
                {loading ? <Loader /> : null}
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.BACKGROUNDCOLOR
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
        borderRightColor: COLOR.DEFALUTCOLOR,
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
        width: WIDTH - 20
    },
    filledBox: {
        width: 100,
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
        backgroundColor: COLOR.DEFALUTCOLOR,
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
        //width: WIDTH / 2
    },
    book: {
        backgroundColor: COLOR.DEFALUTCOLOR,
        //width: 80,
        height: 30,
        borderRadius: 30,
        alignItems: KEY.CENTER,
        justifyContent: KEY.CENTER,
        margin: 15,
        marginLeft: 20
    },
    snackbar: {
        flex: 1,
        justifyContent: KEY.SPACEBETWEEN,
    },
})
