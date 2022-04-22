import React, { Component } from 'react';
import {
    View, Text, TextInput, FlatList, StatusBar, StyleSheet, RefreshControl,
    TouchableOpacity, Image, Dimensions, SafeAreaView, Keyboard, ScrollView, Platform,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { CategoryByAppointmentService } from '../../Services/CategoryService/CategoryService'
import Loader from '../../Components/Loader/Loader';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
import * as KEY from '../../context/actions/key';
import * as TYPE from '../../context/actions/type';
import * as COLOR from '../../styles/colors';
import * as IMAGE from '../../styles/image';
import * as FONT from '../../styles/typography';
import AsyncStorage from '@react-native-community/async-storage';
import getCurrency from '../../Services/getCurrencyService/getCurrency';
import axiosConfig from '../../Helpers/axiosConfig';
import { getBranchDetails } from '../../Services/LocalService/LocalService';

export default class AppointmentScreen extends Component {
    constructor(props) {
        super(props);
        this.getBranch = null;
        this.CategoryID = this.props.route.params.item._id;
        this.categoryDetails = this.props.route.params.item;
        this.searchserviceList = [];
        this.state = {
            AppointmentService: [],
            loader: true,
            refreshing: false,
            currencySymbol: null
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

    async componentDidMount() {
        const getBranch = await getBranchDetails();
        this.getBranch = getBranch;
        this.getAppointmentList();
        this.getDefaultUser();
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
        <TouchableOpacity style={styles().listview} onPress={() => this.props.navigation.navigate('ServiceDetails', { item })}>
            <TouchableOpacity style={{ marginLeft: 5 }} onPress={() => { this.props.navigation.navigate('ServiceDetails', { item }) }}>
                <Image source={{ uri: item.gallery[0] ? (item.gallery[0] ? item.gallery[0].attachment : this.getBranch?.property?.mobilelogo) : this.getBranch?.property?.mobilelogo }}
                    style={{ borderRadius: 100, width: 90, height: 90, }}
                />
            </TouchableOpacity>
            <View style={{ marginLeft: 5, flex: 0.9 }}>
                <Text style={{ fontSize: 18, color: COLOR.BLACK, fontFamily: FONT.FONT_FAMILY_REGULAR }}>{item.title}</Text>
                <Text style={{ fontSize: 14, color: COLOR.BLACK, fontFamily: FONT.FONT_FAMILY_REGULAR }}> {this.state.currencySymbol + item.charges}</Text>
            </View>
        </TouchableOpacity>
    )

    onRefresh = () => {
        this.setState({ refreshing: true })
        this.getAppointmentList();
        this.wait(1000).then(() => this.setState({ refreshing: false }));
    }

    getDefaultUser = async () => {
        var getUser = await AsyncStorage.getItem(TYPE.AUTHUSER);
        if (getUser !== null) {
            var userData = JSON.parse(getUser);
            axiosConfig(userData._id);
            const responseCurrency = getCurrency(userData.branchid.currency);
            this.setState({ currencySymbol: responseCurrency });
        } else {
            axiosConfig(this.getBranch?.property?.authkey);
            var getUser = await AsyncStorage.getItem(TYPE.DEFAULTUSER);
            var userData = JSON.parse(getUser);
            const responseCurrency = getCurrency(userData.branchid.currency);
            this.setState({ currencySymbol: responseCurrency });
        }
    }

    render() {
        const { AppointmentService, loader, refreshing } = this.state
        return (
            <SafeAreaView style={styles().container}>
                <StatusBar backgroundColor={this.getBranch?.property?.headercolorcode ? this.getBranch.property.headercolorcode : COLOR.STATUSBARCOLOR} barStyle={Platform.OS === 'ios' ? KEY.DARK_CONTENT : KEY.LIGHT_CONTENT} />
                <View style={styles(this.getBranch?.property?.headercolorcode ? this.getBranch.property.headercolorcode : COLOR.HEADERCOLOR).headerstyle}>
                    <View style={{ justifyContent: KEY.SPACEBETWEEN, alignItems: KEY.CENTER, flexDirection: KEY.ROW, marginTop: 30 }}>
                        <View style={{ flexDirection: KEY.ROW, justifyContent: KEY.FLEX_START, alignItems: KEY.CENTER, marginLeft: 20 }}>
                            <TouchableOpacity onPress={() => this.props.navigation.goBack(null)}>
                                <AntDesign name='arrowleft' color={COLOR.WHITE} size={24} />
                            </TouchableOpacity>
                            <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, marginLeft: WIDTH * 0.2 }}>
                                <Text style={{ fontSize: 22, color: COLOR.WHITE, fontFamily: FONT.FONT_FAMILY_BOLD }}>Our Services</Text>
                            </View>
                        </View>
                    </View>
                    <Text style={{ fontSize: 22, color: COLOR.WHITE, fontFamily: FONT.FONT_FAMILY_BOLD, textAlign: KEY.CENTER }}>({this.categoryDetails && this.categoryDetails.property && this.categoryDetails.property.name})</Text>
                </View>
                <ScrollView
                    refreshControl={<RefreshControl refreshing={refreshing} title="Pull to refresh"
                        tintColor={COLOR.DEFALUTCOLOR}
                        titleColor={COLOR.DEFALUTCOLOR}
                        colors={[COLOR.DEFALUTCOLOR]} onRefresh={this.onRefresh} />}
                    showsVerticalScrollIndicator={false}>
                    <View style={{ alignItems: KEY.CENTER, justifyContent: KEY.CENTER }}>
                        {this.searchserviceList && this.searchserviceList.length != 0 &&
                            <View style={styles(this.getBranch?.property?.appcolorcode ? this.getBranch.property.appcolorcode : COLOR.DEFALUTCOLOR).statusbar}>
                                <TextInput
                                    style={styles().statInput}
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
                                contentContainerStyle={{ paddingBottom: 50, alignSelf: KEY.CENTER }}
                                ListFooterComponent={() => (
                                    AppointmentService && AppointmentService.length > 0 ?
                                        <></>
                                        :
                                        <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                                            <Image source={IMAGE.RECORD_ICON} style={{ height: 150, width: 200, marginTop: 100 }} resizeMode={KEY.CONTAIN} />
                                            <Text style={{ fontSize: 16, color: COLOR.TAUPE_GRAY, marginTop: 10, fontFamily: FONT.FONT_FAMILY_REGULAR }}>No record found</Text>
                                        </View>
                                )}
                            />
                        </View>
                    </View>
                </ScrollView>
                {loader ? <Loader /> : null}
            </SafeAreaView>
        );
    }
}

const styles = (colorcode) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.BACKGROUNDCOLOR
    },
    statusbar: {
        flexDirection: KEY.ROW,
        backgroundColor: COLOR.WHITE,
        borderColor: colorcode,
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
        alignItems: KEY.CENTER,
        fontFamily: FONT.FONT_FAMILY_REGULAR,
        color: COLOR.BLACK
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
    },
    headerstyle: {
        backgroundColor: colorcode,
        width: WIDTH,
        height: 100,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        marginBottom: 20
    }
})