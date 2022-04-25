import React, { Component } from 'react';
import {
    View, Text, ScrollView, StyleSheet, Dimensions, StatusBar,
    TouchableOpacity, Image, SafeAreaView, FlatList, Linking, Platform
} from 'react-native';
import { ClassService, GroupclasseService } from '../../Services/ClassService/ClassService';
import { getBranchDetails } from '../../Services/LocalService/LocalService';
import getCurrency from '../../Services/getCurrencyService/getCurrency';
import AsyncStorage from '@react-native-community/async-storage';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Loader from '../../Components/Loader/Loader';
import * as TYPE from '../../context/actions/type';
import { Calendar } from 'react-native-calendars';
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import Toast from 'react-native-simple-toast';
import * as COLOR from '../../styles/colors';
import * as IMAGE from '../../styles/image';
import moment from 'moment';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default class ClassScheduleScreen extends Component {
    constructor(props) {
        super(props);
        this.getBranch = null;
        this.currentDate = null;
        this.memberID = null;
        this.state = {
            classTimeSlots: [],
            loading: true,
            currencySymbol: null,
            selectedDay: null,
            currentDay: null
        };
        this.onChangeMonth = this.onChangeMonth.bind(this);
        this._unsubscribeSiFocus = this.props.navigation.addListener('focus', (e) => {
            this.onPressSelectedDay({ dateString: moment().format('YYYY-MM-DD') });
        });
    }

    //CELENDER IN SELECT DAY TO CALL FUNCTION
    onPressSelectedDay = (day) => {
        var today = new Date(day.dateString);
        today.setHours(0, 0, 0, 0);
        let markedDates = {};
        this.currentDate = day.dateString;
        markedDates[day.dateString] = { selected: true, marked: false, selectedColor: COLOR.DEFALUTCOLOR }
        this.setState({ selectedDay: markedDates, loading: true })
        try {
            ClassService(today).then(response => {
                if (response.data && response.data != undefined) {
                    response.data.forEach(element => {
                        if (element.attendee.members.length > 0) {
                            element.attendee.members.forEach(ele => {
                                if (ele.memberid && ele.memberid._id === this.memberID) {
                                    element.bookavailabe = false;
                                } else {
                                    element.bookavailabe = true;
                                }
                            })
                        } else if (element.attendee.waitings.length > 0) {
                            element.attendee.waitings.forEach(ele => {
                                if (ele.memberid && ele.memberid._id === this.memberID) {
                                    element.bookavailabe = false;
                                } else {
                                    element.bookavailabe = true;
                                }
                            })
                        } else {
                            element.bookavailabe = true;
                        }
                    });
                }
                this.setState({ classTimeSlots: response.data, loading: false });
            })
        } catch (error) {
            console.log(`error`, error);
        }
    }

    async componentDidMount() {
        const getBranch = await getBranchDetails();
        this.getBranch = getBranch;
        this.currentDate = moment().format('YYYY-MM-DD');
        this.getDefaultUser();
        this.onPressSelectedDay({ dateString: moment().format('YYYY-MM-DD') });
    }

    //GET LOGIN USER LOCAL STORAGE FETCH DATA
    getDefaultUser = async () => {
        try {
            var getUser = await AsyncStorage.getItem(TYPE.AUTHUSER);
            if (getUser !== null) {
                var userData = JSON.parse(getUser);
                this.memberID = userData._id
                const responseCurrency = getCurrency(userData.branchid.currency);
                this.setState({ currencySymbol: responseCurrency });
            } else {
                var getUser = await AsyncStorage.getItem(TYPE.DEFAULTUSER);
                var userData = JSON.parse(getUser);
                const responseCurrency = getCurrency(userData.branchid.currency);
                this.setState({ currencySymbol: responseCurrency });
            }
        } catch (error) {
            console.log(`error`, error);
        }
    }

    //BOOK BUTTON CALL TO FUNATION
    onPressToBookNow = async (item) => {
        let toDayDate = moment().format('YYYY-MM-DD');
        if (toDayDate > moment(this.currentDate).format('YYYY-MM-DD')) {
            Toast.show('Please select valid date');
            return;
        }
        this.setState({ loading: true });
        let arralist = [];
        try {
            if (item.attendee && item.attendee.waitings && item.attendee.waitings.length > 0) {
                item.attendee.waitings.forEach(element => {
                    arralist.push(
                        {
                            "memberid": element.memberid._id,
                            "onModel": "Member"
                        }
                    );
                });
                arralist.push({
                    "onModel": "Member",
                    "memberid": this.memberID
                })
            } else {
                arralist.push({
                    "onModel": "Member",
                    "memberid": this.memberID
                })
            }
            let body = { 'waitings': arralist };
            const response = await GroupclasseService(item.attendee._id, body);
            if (response.data != null && response.data != 'undefind' && response.status == 200) {
                this.setState({ loading: false });
                this.props.navigation.replace("TabNavigation");
                return Toast.show('Your class schedule Booked.');
            }
        } catch (error) {
            console.log(`error`, error);
            arralist = [];
            this.setState({ loading: false });
            Toast.show('Something went wrong. Please try again letter');
        }
    }

    //RENDER CLASS SCHEDULE 
    renderclassTimeSlots = ({ item, index }) => (
        <View style={{ alignItems: KEY.CENTER, justifyContent: KEY.CENTER }} key={index}>
            <View style={styles(this.getBranch?.property?.appcolorcode ? this.getBranch.property.appcolorcode : COLOR.DEFALUTCOLOR).cardView}>
                <View style={styles(this.getBranch?.property?.appcolorcode ? this.getBranch.property.appcolorcode : COLOR.DEFALUTCOLOR).filledBox}>
                    <Text style={{ fontSize: FONT.FONT_SIZE_28, fontFamily: FONT.FONT_FAMILY_BOLD, color: COLOR.WHITE }}>{moment(item.appointmentdate).format('DD')}</Text>
                    <Text style={{ fontSize: FONT.FONT_SIZE_16, fontFamily: FONT.FONT_FAMILY_BOLD, color: COLOR.WHITE }}>{moment(item.appointmentdate).format('MMM')}</Text>
                </View>
                <View style={{ flexDirection: KEY.ROW, marginLeft: 0, padding: 5 }}>
                    <View style={{ flexDirection: KEY.COLUMN, marginLeft: 5, padding: 5 }}>
                        <Text style={styles(this.getBranch?.property?.appcolorcode ? this.getBranch.property.appcolorcode : COLOR.DEFALUTCOLOR).rectangleTitleText}>{(item && item.refid && item.refid.title)}</Text>
                        <Text style={styles(this.getBranch?.property?.appcolorcode ? this.getBranch.property.appcolorcode : COLOR.DEFALUTCOLOR).rectangleSubText}>Start Time : {(item && item.timeslot && item.timeslot.starttime)}</Text>
                        <Text style={styles(this.getBranch?.property?.appcolorcode ? this.getBranch.property.appcolorcode : COLOR.DEFALUTCOLOR).rectangleSubText}>End Time : {(item && item.timeslot && item.timeslot.endtime)}</Text>
                    </View>
                    {
                        item.bookavailabe &&
                        <TouchableOpacity style={styles(this.getBranch?.property?.appcolorcode ? this.getBranch.property.appcolorcode : COLOR.DEFALUTCOLOR).book} onPress={() => this.onPressToBookNow(item)} >
                            <Text style={{ fontSize: 12, color: COLOR.WHITE, marginLeft: 15, marginRight: 15, fontFamily: FONT.FONT_FAMILY_REGULAR }}>Book Now</Text>
                        </TouchableOpacity>
                    }
                </View>
            </View>
        </View>
    )

    //CHANGE MONTH TO CALL FUNATION
    async onChangeMonth(val) {
        if (Number(moment().format('M')) == val.month && Number(moment().format('YYYY')) === val.year) {
            this.onPressSelectedDay({ dateString: moment(this.currentDate).format('YYYY-MM-DD') });
        } else {
            this.onPressSelectedDay({ dateString: moment().format('YYYY-MM-DD') });
        }
        this.setState({ loading: false });
    }

    render() {
        const { selectedDay, classTimeSlots, loading } = this.state;
        return (
            <SafeAreaView style={styles().container}>
                <StatusBar backgroundColor={this.getBranch?.property?.headercolorcode ? this.getBranch.property.headercolorcode : COLOR.HEADERCOLOR} barStyle={Platform.OS === 'ios' ? KEY.DARK_CONTENT : KEY.LIGHT_CONTENT} />
                <View style={styles(this.getBranch?.property?.headercolorcode ? this.getBranch.property.headercolorcode : COLOR.HEADERCOLOR).headerstyle}>
                    <View style={{ justifyContent: KEY.SPACEBETWEEN, alignItems: KEY.CENTER, flexDirection: KEY.ROW, marginTop: 30 }}>
                        <View style={{ flexDirection: KEY.ROW, justifyContent: KEY.FLEX_START, alignItems: KEY.CENTER, marginLeft: 20 }}>
                            <TouchableOpacity onPress={() => this.props.navigation.goBack(null)}>
                                <AntDesign name='arrowleft' color={COLOR.WHITE} size={24} />
                            </TouchableOpacity>
                            <View style={{ justifyContent: KEY.CENTER, marginLeft: WIDTH / 5 }}>
                                <Text style={{ fontSize: 22, color: COLOR.WHITE, fontFamily: FONT.FONT_FAMILY_BOLD }}>Class Schedule</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={KEY.ALWAYS}>
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
                                todayTextColor: this.getBranch?.property?.appcolorcode ? this.getBranch.property.appcolorcode : COLOR.DEFALUTCOLOR,
                            }}
                            style={{ backgroundColor: COLOR.BACKGROUNDCOLOR }}
                            markedDates={selectedDay}
                            onDayPress={(day) => this.onPressSelectedDay(day)}
                            onMonthChange={(month) => this.onChangeMonth(month)}
                            markingType={'custom'}
                            hideExtraDays={true}
                        />
                        <Text style={{ marginTop: 10, textAlign: KEY.CENTER, fontSize: 16, color: this.getBranch?.property?.appcolorcode ? this.getBranch.property.appcolorcode : COLOR.DEFALUTCOLOR, fontFamily: FONT.FONT_FAMILY_BOLD }}>Available Class Schedule on {moment(this.currentDate).format('DD MMMM YYYY')}</Text>
                        <FlatList
                            data={classTimeSlots}
                            showsVerticalScrollIndicator={false}
                            renderItem={this.renderclassTimeSlots}
                            keyExtractor={(item) => item.starttime}
                            contentContainerStyle={{ paddingBottom: 80, alignSelf: KEY.CENTER }}
                            ListFooterComponent={() => (
                                classTimeSlots && classTimeSlots.length > 0 ?
                                    <></>
                                    :
                                    <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                                        <Image source={IMAGE.RECORD_ICON} style={{ height: 150, width: 200, marginTop: 30 }} resizeMode={KEY.CONTAIN} />
                                        <Text style={{ fontSize: 16, color: COLOR.TAUPE_GRAY, marginTop: 10, fontFamily: FONT.FONT_FAMILY_REGULAR }}>No Class Schedule available</Text>
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

const styles = (colorcode) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.BACKGROUNDCOLOR
    },
    headerstyle: {
        backgroundColor: colorcode,
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
        width: WIDTH - 20
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
        fontFamily: FONT.FONT_FAMILY_BOLD,
        fontSize: FONT.FONT_SIZE_16,
        color: COLOR.BLACK,
        marginTop: 2,
        width: WIDTH / 2
    },
    rectangleTitleText: {
        fontFamily: FONT.FONT_FAMILY_BOLD,
        fontSize: FONT.FONT_SIZE_16,
        color: COLOR.BLACK,
        marginTop: 2,
        textTransform: KEY.CAPITALIZE,
        width: WIDTH / 3
    },
    rectangleSubText: {
        fontFamily: FONT.FONT_FAMILY_REGULAR,
        fontSize: FONT.FONT_SIZE_14,
        color: COLOR.BLACK,
        marginTop: 2,
        //width: WIDTH / 2
    },
    book: {
        backgroundColor: colorcode,
        //width: 80,
        height: 30,
        borderRadius: 30,
        alignItems: KEY.CENTER,
        justifyContent: KEY.CENTER,
        //margin: 15,
        marginTop: 20,
        marginLeft: 20
    },
    snackbar: {
        flex: 1,
        justifyContent: KEY.SPACEBETWEEN,
    },
})
