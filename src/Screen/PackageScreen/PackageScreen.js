import React, { Component } from 'react';
import {
    View, Text, StyleSheet, FlatList, Dimensions, Image,
    ScrollView, RefreshControl, SafeAreaView, BackHandler, StatusBar, Platform
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getPackageService } from '../../Services/PackageService/PackageService';
import { UserService } from '../../Services/UserService/UserService';
import Loader from '../../Components/Loader/Loader';
const WIDTH = Dimensions.get('window').width;
import * as KEY from '../../context/actions/key';
import * as TYPE from '../../context/actions/type';
import * as COLOR from '../../styles/colors';
import * as IMAGE from '../../styles/image';
import * as FONT from '../../styles/typography';
import axiosConfig from '../../Helpers/axiosConfig';
import AsyncStorage from '@react-native-community/async-storage';
import getCurrency from '../../Services/getCurrencyService/getCurrency';
import { getBranchDetails } from '../../Services/LocalService/LocalService';

class PackageScreen extends Component {
    constructor(props) {
        super(props);
        this.getBranch = null;
        this.state = {
            PackageList: [],
            loader: true,
            refreshing: false,
            currencySymbol: null,
            branchID: null
        };
    }

    wait = (timeout) => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }

    authDefaultUser = (user) => (
        AsyncStorage.setItem(TYPE.DEFAULTUSER, JSON.stringify(user))
    )

    getDefaultUser = async () => {
        var getUser = await AsyncStorage.getItem(TYPE.AUTHUSER);
        if (getUser !== null) {
            var userData = JSON.parse(getUser);
            axiosConfig(userData._id);
            this.setState({ branchID: userData.branchid._id });
            const responseCurrency = getCurrency(userData.branchid.currency);
            this.setState({ currencySymbol: responseCurrency });
            try {
                await this.getPackageList(userData.branchid._id);
            } catch (error) {
                console.log(`error`, error);
            }
        } else {
            axiosConfig(this.getBranch?.property?.authkey);
            try {
                const response = await UserService(this.getBranch?.property?.authkey);
                if (response.data != null && response.data != 'undefind' && response.status == 200) {
                    this.authDefaultUser(response.data);
                    var getUser = await AsyncStorage.getItem(TYPE.DEFAULTUSER);
                    var userData = JSON.parse(getUser);
                    this.setState({ branchID: userData.branchid._id });
                    const responseCurrency = getCurrency(userData.branchid.currency);
                    this.setState({ currencySymbol: responseCurrency });
                    await this.getPackageList(userData.branchid._id);
                }
            } catch (error) {
                console.log(`error`, error);
            }
        }
    }

    onRefresh = () => {
        this.setState({ refreshing: true })
        this.getPackageList(this.state.branchID);
        this.wait(1000).then(() => this.setState({ refreshing: false }));
    }

    getPackageList = async (id) => {
        try {
            const response = await getPackageService(id);
            if (response.data != null && response.data != 'undefind' && response.status == 200) {
                this.setState({ PackageList: response.data, loader: false })
            }
        } catch (error) {
            console.log(`error`, error);
            this.setState({ loading: false });
        }
    }

    async componentDidMount() {
        const getBranch = await getBranchDetails();
        this.getBranch = getBranch;
        this.getDefaultUser();
    }

    renderPackageList = ({ item }) => (
        <View style={styles().cardView}>
            <TouchableOpacity style={{ alignItems: KEY.CENTER }} onPress={() => this.props.navigation.navigate('PackageDetails', { item })}>
                <Image source={{ uri: (item && item.profilepic ? item.profilepic : this.getBranch?.property?.mobilelogo ? this.getBranch?.property?.mobilelogo : TYPE.DefaultImage) }}
                    style={item && item.profilepic ?
                        { alignItems: KEY.CENTER, height: 150, width: WIDTH - 40, marginTop: 10, borderRadius: 10, resizeMode: KEY.COVER }
                        :
                        { alignItems: KEY.CENTER, height: 160, width: 160, marginTop: 10, borderRadius: 10, resizeMode: KEY.COVER }
                    }
                />
            </TouchableOpacity>
            <View
                style={{ flexDirection: KEY.ROW, justifyContent: KEY.SPACEBETWEEN, marginLeft: 10, marginRight: 10, marginBottom: 10, marginTop: 10 }}>
                <Text style={{ fontSize: 16, color: this.getBranch?.property?.appcolorcode ? this.getBranch.property.appcolorcode : COLOR.DEFALUTCOLOR, fontFamily: FONT.FONT_FAMILY_BOLD, width: WIDTH / 2 }}>{item && item.membershipname}</Text>
                <Text style={{ fontSize: 16, color: this.getBranch?.property?.appcolorcode ? this.getBranch.property.appcolorcode : COLOR.DEFALUTCOLOR, fontFamily: FONT.FONT_FAMILY_BOLD }}>{this.state.currencySymbol + ' ' + (item && item.property && item.property.cost)}</Text>
            </View>
        </View>
    )

    render() {
        const { PackageList, loader, refreshing } = this.state
        return (
            <SafeAreaView style={styles().container}>
                <StatusBar backgroundColor={this.getBranch?.property?.headercolorcode ? this.getBranch.property.headercolorcode : COLOR.HEADERCOLOR} barStyle={Platform.OS === 'ios' ? KEY.DARK_CONTENT : KEY.LIGHT_CONTENT} />
                <View style={styles(this.getBranch?.property?.headercolorcode ? this.getBranch.property.headercolorcode : COLOR.HEADERCOLOR).headerstyle}>
                    <Image source={{ uri: this.getBranch?.property?.mobilelogo ? this.getBranch?.property?.mobilelogo : TYPE.DefaultImage }}
                        style={{ alignItems: KEY.CENTER, height: 90, width: 90, marginLeft: 10, marginTop: 0, borderRadius: 10, resizeMode: KEY.COVER }}
                    />
                    <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, flexDirection: KEY.ROW, marginTop: -60 }}>
                        <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, marginTop: 0 }}>
                            <Text style={{ fontSize: 22, color: COLOR.WHITE, fontFamily: FONT.FONT_FAMILY_BOLD }}>{'Our Packages'}</Text>
                        </View>
                    </View>
                </View>
                {PackageList && PackageList.length != 0 ?
                    <ScrollView
                        refreshControl={<RefreshControl refreshing={refreshing} title="Pull to refresh"
                            tintColor={this.getBranch?.property?.appcolorcode ? this.getBranch.property.appcolorcode : COLOR.BACKGROUNDCOLOR}
                            titleColor={this.getBranch?.property?.appcolorcode ? this.getBranch.property.appcolorcode : COLOR.DEFALUTCOLOR}
                            colors={[this.getBranch?.property?.appcolorcode ? this.getBranch.property.appcolorcode : COLOR.DEFALUTCOLOR]} onRefresh={this.onRefresh} />} showsVerticalScrollIndicator={false}>
                        <View style={{ flexDirection: KEY.ROW, alignItems: KEY.CENTER }}>
                            <FlatList
                                // numColumns={10000}
                                data={PackageList && PackageList}
                                showsVerticalScrollIndicator={false}
                                renderItem={this.renderPackageList}
                                keyExtractor={item => `${item._id}`}
                                contentContainerStyle={{ paddingBottom: 100, alignSelf: KEY.CENTER, marginTop: 0 }}
                            />
                        </View>
                    </ScrollView>
                    :
                    <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                        <Image source={IMAGE.RECORD_ICON} style={{ height: 150, width: 200, marginTop: 100 }} resizeMode={KEY.CONTAIN} />
                        <Text style={{ fontSize: 16, color: COLOR.TAUPE_GRAY, marginTop: 10, fontFamily: FONT.FONT_FAMILY_REGULAR }}>No record found</Text>
                    </View>
                }
                {loader == true ? <Loader /> : null}
            </SafeAreaView>
        );
    }
}

export default PackageScreen;

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