import React, { Component } from 'react';
import {
    View, Text, StyleSheet, FlatList, Dimensions, Image,
    ScrollView, RefreshControl, SafeAreaView, BackHandler, StatusBar
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { CategoryService, AppointmentListService } from '../../Services/CategoryService/CategoryService';
import { staffService, UserService } from '../../Services/UserService/UserService';
import Loader from '../../Components/Loader/Loader';
const WIDTH = Dimensions.get('window').width;
import * as KEY from '../../context/actions/key';
import * as TYPE from '../../context/actions/type';
import * as COLOR from '../../styles/colors';
import * as IMAGE from '../../styles/image';
import { FONT_WEIGHT_BOLD } from '../../styles/typography';
import axiosConfig from '../../Helpers/axiosConfig';
import AsyncStorage from '@react-native-community/async-storage';
import getCurrency from '../../Services/getCurrencyService/getCurrency';

class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            CategoryList: [],
            AppointmentList: [],
            staffList: [],
            loader: true,
            refreshing: false,
            currencySymbol: null
        };
    }

    wait = (timeout) => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }

    authenticateUser = (user) => (
        AsyncStorage.setItem(KEY.AUTHUSER, JSON.stringify(user))
    )

    authDefaultUser = (user) => (
        AsyncStorage.setItem(TYPE.DEFAULTUSER, JSON.stringify(user))
    )

    getDefaultUser = async () => {
        var getUser = await AsyncStorage.getItem(TYPE.AUTHUSER);
        if (getUser !== null) {
            var userData = JSON.parse(getUser);
            axiosConfig(userData._id);
            const responseCurrency = getCurrency(userData.branchid.currency);
            this.setState({ currencySymbol: responseCurrency });
            try {
                await this.getCategoryList();
                await this.getAppointmentList();
                await this.getstaffList();
            } catch (error) {
                console.log(`error`, error);
            }
        } else {
            axiosConfig(TYPE.USERKEY);
            try {
                const response = await UserService(TYPE.USERKEY);
                if (response.data != null && response.data != 'undefind' && response.status == 200) {
                    this.authDefaultUser(response.data);
                    var getUser = await AsyncStorage.getItem(TYPE.DEFAULTUSER);
                    var userData = JSON.parse(getUser);
                    const responseCurrency = getCurrency(userData.branchid.currency);
                    this.setState({ currencySymbol: responseCurrency });
                    await this.getCategoryList();
                    await this.getAppointmentList();
                    await this.getstaffList();
                }
            } catch (error) {
                console.log(`error`, error);
            }
        }
    }

    onRefresh = () => {
        this.setState({ refreshing: true })
        this.getCategoryList();
        this.getAppointmentList();
        this.getstaffList();
        this.wait(1000).then(() => this.setState({ refreshing: false }));
    }

    getCategoryList = async () => {
        try {
            const response = await CategoryService();
            if (response.data != null && response.data != 'undefind' && response.status == 200) {
                this.setState({ CategoryList: response.data });
            }
        } catch (error) {
            console.log(`error 1 `, error);
            this.setState({ loading: false });
        }
    }

    getAppointmentList = async () => {
        try {
            const response = await AppointmentListService();
            if (response.data != null && response.data != 'undefind' && response.status == 200) {
                // const slice = response.data.slice(0, 4)
                this.setState({ AppointmentList: response.data, loader: false })
            }
        } catch (error) {
            console.log(`error 2 `, error);
            this.setState({ loading: false });
        }
    }

    getstaffList = async () => {
        try {
            const response = await staffService();
            if (response.data != null && response.data != 'undefind' && response.status == 200 && response.data.length > 0) {
                const slice = response.data.slice(0, 5)
                this.setState({ staffList: slice })
            }
        } catch (error) {
            this.setState({ loading: false });
        }
    }

    componentDidMount() {
        this.getDefaultUser();
    }

    renderCategoryList = ({ item }) => (
        <View style={{ flexDirection: KEY.COLUMN }}>
            <TouchableOpacity style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, margin: 10 }} onPress={() => { this.props.navigation.navigate('ServiceListScreen', { item }) }}>
                {item && item.property && item.property.img && item.property.img[0] ?
                    <Image source={{ uri: (item.property.img && item.property.img[0].attachment) }}
                        style={{ alignItems: KEY.CENTER, height: 80, width: 80, marginTop: 20, borderRadius: 100, borderColor: COLOR.BRIGHT_GRAY, borderWidth: 1 }}
                    />
                    :
                    <Image source={{ uri: TYPE.DefaultImage }}
                        style={{
                            alignItems: KEY.CENTER, height: 80, width: 80, marginTop: 20,
                            borderRadius: 100, backgroundColor: COLOR.WHITE, borderColor: COLOR.BRIGHT_GRAY, borderWidth: 1
                        }}
                    />
                }
            </TouchableOpacity>
            <TouchableOpacity style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, width: 80 }}>
                <Text style={{ fontSize: 14, color: COLOR.BLACK, textTransform: KEY.CAPITALIZE, textAlign: KEY.CENTER }}>{item.property.name}</Text>
            </TouchableOpacity>
        </View>
    )

    renderAppointmentList = ({ item }) => (
        <View style={styles.cardView}>
            <TouchableOpacity style={{ alignItems: KEY.CENTER }} onPress={() => this.props.navigation.navigate('ServiceDetails', { item })}>
                <Image source={{ uri: (item.gallery[0] ? item.gallery[0].attachment : TYPE.DefaultImage) }}
                    style={item.gallery[0] && item.gallery[0].attachment ?
                        { alignItems: KEY.CENTER, height: 150, width: WIDTH - 40, marginTop: 10, borderRadius: 10, resizeMode: KEY.COVER }
                        :
                        { alignItems: KEY.CENTER, height: 160, width: 160, marginTop: 10, borderRadius: 10, resizeMode: KEY.COVER }
                    }
                />
            </TouchableOpacity>
            <View
                style={{ flexDirection: KEY.ROW, justifyContent: KEY.SPACEBETWEEN, marginLeft: 10, marginRight: 10, marginBottom: 10, marginTop: 10 }}>
                <Text style={{ fontSize: 16, color: COLOR.DEFALUTCOLOR, fontWeight: FONT_WEIGHT_BOLD, width: WIDTH / 2 }}>{item.title}</Text>
                <Text style={{ fontSize: 16, color: COLOR.DEFALUTCOLOR, fontWeight: FONT_WEIGHT_BOLD }}>{this.state.currencySymbol + ' ' + item.charges}</Text>
            </View>
        </View>
    )

    // <TouchableOpacity style={{ margin: 15 }} onPress={() => this.props.navigation.navigate('StaffDetails', { item })}>
    renderstaffList = ({ item }) => (
        <View style={{ flexDirection: KEY.COLUMN, marginBottom: 25, alignItems: KEY.CENTER }}>
            <TouchableOpacity style={{ margin: 15 }}>
                <Image source={{ uri: item && item.profilepic ? item.profilepic : 'https://bootdey.com/img/Content/avatar/avatar6.png' }}
                    style={{ alignItems: KEY.CENTER, height: 100, width: 100, marginTop: 10, borderRadius: 100 }}
                />
            </TouchableOpacity>
            <View style={{ width: 100 }}>
                <Text style={{ flex: 1, fontSize: 14, color: COLOR.BLACK, textAlign: KEY.CENTER, marginTop: -5 }}>{item.fullname}</Text>
            </View>
        </View>
    )

    render() {
        const { CategoryList, AppointmentList, staffList, loader, refreshing } = this.state
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor={COLOR.STATUSBARCOLOR} barStyle={KEY.LIGHT_CONTENT} />
                <View style={styles.headerstyle}>
                    <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, flexDirection: KEY.ROW, marginTop: 30 }}>
                        <View style={{ justifyContent: KEY.CENTER }}>
                            <Text style={{ fontSize: 22, color: COLOR.WHITE, fontWeight: 'bold' }}>{TYPE.APPNAME}</Text>
                        </View>
                    </View>
                </View>
                {CategoryList == null || CategoryList.length == 0 ? <Loader /> :
                    <ScrollView
                        refreshControl={<RefreshControl refreshing={refreshing} title="Pull to refresh" tintColor={COLOR.DEFALUTCOLOR} titleColor={COLOR.DEFALUTCOLOR} colors={[COLOR.DEFALUTCOLOR]} onRefresh={this.onRefresh} />}
                        showsVerticalScrollIndicator={false}>
                        <View style={{ flexDirection: KEY.ROW, marginLeft: 5 }}>
                            <ScrollView
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                            >
                                <FlatList
                                    style={{ flexDirection: KEY.COLUMN }}
                                    numColumns={10000}
                                    data={CategoryList}
                                    renderItem={this.renderCategoryList}
                                    keyExtractor={item => `${item._id}`}
                                />
                            </ScrollView>
                        </View>
                        <View style={{ flexDirection: KEY.ROW, alignItems: KEY.CENTER, marginTop: 12 }}>
                            <View style={{ flex: 1, height: 1, backgroundColor: COLOR.DEFALUTCOLOR }} />
                            <View>
                                <Text style={{ width: 130, textAlign: KEY.CENTER, fontSize: 20, color: COLOR.DEFALUTCOLOR }}>Top Services</Text>
                            </View>
                            <View style={{ flex: 1, height: 1, backgroundColor: COLOR.DEFALUTCOLOR }} />
                        </View>
                        <View style={{ flexDirection: KEY.ROW, alignItems: KEY.CENTER }}>
                            <FlatList
                                // numColumns={10000}
                                data={AppointmentList}
                                showsVerticalScrollIndicator={false}
                                renderItem={this.renderAppointmentList}
                                keyExtractor={item => `${item._id}`}
                                contentContainerStyle={{ paddingBottom: 100, alignSelf: KEY.CENTER, marginTop: 0 }}
                                ListFooterComponent={() => (
                                    AppointmentList && AppointmentList.length > 0 ?
                                        <></>
                                        :
                                        <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                                            <Image source={IMAGE.RECORD_ICON} style={{ height: 150, width: 200, marginTop: 100 }} resizeMode={KEY.CONTAIN} />
                                            <Text style={{ fontSize: 16, color: COLOR.TAUPE_GRAY, marginTop: 10 }}>No record found</Text>
                                        </View>
                                )}
                            />
                        </View>
                        {/* <View style={{ flexDirection: KEY.ROW, alignItems: KEY.CENTER, marginTop: 12 }}>
                            <View style={{ flex: 1, height: 1, backgroundColor: COLOR.DEFALUTCOLOR }} />
                            <View>
                                <Text style={{ width: 150, textAlign: KEY.CENTER, fontSize: 20, color: COLOR.DEFALUTCOLOR }}>Professionals</Text>
                            </View>
                            <View style={{ flex: 1, height: 1, backgroundColor: COLOR.DEFALUTCOLOR }} />
                        </View>
                        <View style={{ flexDirection: KEY.ROW, marginBottom: 25, marginLeft: 10 }}>
                            <ScrollView
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                            >
                                <FlatList
                                    style={{ flexDirection: KEY.ROW }}
                                    numColumns={10000}
                                    data={staffList}
                                    renderItem={this.renderstaffList}
                                    keyExtractor={item => `${item._id}`}
                                />
                            </ScrollView>
                        </View> */}
                    </ScrollView>
                }
                {loader == true ? <Loader /> : null}
            </SafeAreaView>
        );
    }
}

export default HomeScreen;

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
        marginBottom: 0
    },
    cardView: {
        borderRadius: 15,
        marginTop: 10,
        marginBottom: 5,
        flexDirection: KEY.COLUMN,
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
})