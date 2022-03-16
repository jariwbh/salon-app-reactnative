import React, { useState, useEffect } from 'react';
import {
    Dimensions,
    SafeAreaView,
    Image,
    ScrollView,
    StatusBar,
    View, Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Linking
} from 'react-native';
import getCurrency from '../../Services/getCurrencyService/getCurrency';
import RenderHTML from "react-native-render-html";
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import * as COLOR from '../../styles/colors';
import * as IMAGE from '../../styles/image';
import * as TYPE from '../../context/actions/type';
import axiosConfig from '../../Helpers/axiosConfig';
import AsyncStorage from '@react-native-community/async-storage';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { getBranchDetails } from '../../Services/LocalService/LocalService';
const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const ProductDetailScreen = (props) => {
    const [loading, setLoading] = useState(false);
    const [getBranch, setgetBranch] = useState(null);
    const [currencySymbol, setCurrencySymbol] = useState(null);
    const [supportEmail, setSupportEmail] = useState(null);
    const productDeatil = props.route.params.item;
    const html = `${productDeatil?.sale?.description}`;

    useEffect(() => {
        getMemberDeatilsLocalStorage();
        setLoading(true);
    }, [])

    useEffect(() => {
    }, [loading, currencySymbol, getBranch, supportEmail])

    //GET MEMBER DATA IN MOBILE LOCAL STORAGE
    const getMemberDeatilsLocalStorage = async () => {
        const getBranchdata = await getBranchDetails();
        setgetBranch(getBranchdata);
        var getAuthUser = await AsyncStorage.getItem(TYPE.AUTHUSER);
        if (getAuthUser !== null) {
            var userData = JSON.parse(getAuthUser);
            axiosConfig(userData._id);
            const response = getCurrency(userData.branchid.currency);
            setCurrencySymbol(response);
            setSupportEmail(userData.branchid.supportemail);
        } else {
            axiosConfig(getBranch?.property?.authkey);
            const response = getCurrency(getBranch.currency);
            setCurrencySymbol(response);
            setSupportEmail(getBranch?.supportemail);
        }
    }

    //ONPRESS TO ADD CART ITEMS
    const AddToCartClick = () => {
        const url = `mailto:${supportEmail}`
        Linking.openURL(url);
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.WHITE }}>
            <StatusBar backgroundColor={COLOR.STATUSBARCOLOR} barStyle={KEY.LIGHT_CONTENT} />
            <View style={styles.headerstyle}>
                <View style={{ justifyContent: KEY.SPACEBETWEEN, alignItems: KEY.CENTER, flexDirection: KEY.ROW, marginTop: 30 }}>
                    <View style={{ flexDirection: KEY.ROW, justifyContent: KEY.FLEX_START, alignItems: KEY.CENTER, marginLeft: 20 }}>
                        <TouchableOpacity onPress={() => props.navigation.goBack(null)}>
                            <AntDesign name='arrowleft' color={COLOR.WHITE} size={24} />
                        </TouchableOpacity>
                        <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, marginLeft: WIDTH / 5 }}>
                            <Text style={{ fontSize: 22, color: COLOR.WHITE, fontFamily: FONT.FONT_FAMILY_BOLD }}>Product Details</Text>
                        </View>
                    </View>
                </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={KEY.ALWAYS}>
                <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, marginTop: 10 }}>
                    <Image source={{
                        uri: productDeatil && productDeatil.imagegallery[0] && productDeatil.imagegallery[0].attachment ?
                            productDeatil?.imagegallery[0]?.attachment :
                            getBranch?.property?.mobilelogo ? getBranch.property.mobilelogo : TYPE.DefaultImage
                    }}
                        resizeMode={KEY.CONTAIN}
                        style={{ width: WIDTH, height: HEIGHT / 3 }} />
                </View>
                <View style={{ marginTop: 15, width: WIDTH - 30, marginLeft: 10 }}>
                    <Text style={{ color: COLOR.BLACK, fontSize: FONT.FONT_SIZE_16, fontFamily: FONT.FONT_FAMILY_REGULAR }}>Brand Name</Text>
                    <Text style={{ color: COLOR.DEFALUTCOLOR, marginTop: 15, marginLeft: 5, fontSize: FONT.FONT_SIZE_16, fontFamily: FONT.FONT_FAMILY_REGULAR }}>{productDeatil?.itemname}</Text>
                    <View style={{ flexDirection: KEY.ROW, padding: 5 }} >
                        <Text style={{ fontSize: FONT.FONT_SIZE_18, color: COLOR.BLACK, fontFamily: FONT.FONT_FAMILY_REGULAR }}>{currencySymbol + ' ' + productDeatil?.sale?.rate}</Text>
                        {
                            productDeatil?.sale.discounttype == "Percentage" &&
                            <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.DEFALUTCOLOR, fontFamily: FONT.FONT_FAMILY_REGULAR }}> ({productDeatil?.sale?.discount + '%' + ' OFF'})</Text>
                        }
                        {
                            productDeatil?.sale.discounttype == "Fixed" &&
                            <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.DEFALUTCOLOR, fontFamily: FONT.FONT_FAMILY_REGULAR }}> ({productDeatil?.sale?.discount + ' ' + currencySymbol + 'OFF'})</Text>
                        }
                    </View>
                    <Text style={{ marginTop: 10, color: COLOR.BLACK, fontSize: FONT.FONT_SIZE_16, fontFamily: FONT.FONT_FAMILY_REGULAR }}>PRODUCT DETAIL</Text>
                    {productDeatil?.sale?.description ?
                        <RenderHTML contentWidth={WIDTH - 60} source={{ html }} baseStyle={{ fontSize: FONT.FONT_SIZE_14, color: COLOR.BLACK, width: WIDTH - 60, marginBottom: 20, marginTop: 5 }} />
                        :
                        <Text style={{ marginTop: 20, fontSize: FONT.FONT_SIZE_16, color: COLOR.TAUPE_GRAY, fontFamily: FONT.FONT_FAMILY_REGULAR }} >No Detail Available </Text>
                    }
                </View>
                <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                    <TouchableOpacity onPress={() => AddToCartClick(productDeatil)}
                        style={{
                            justifyContent: KEY.CENTER,
                            marginTop: 20,
                            marginBottom: 100,
                            borderRadius: 30,
                            backgroundColor: COLOR.DEFALUTCOLOR,
                            width: WIDTH / 2,
                            height: 50,
                            alignItems: KEY.CENTER,
                        }}>
                        <Text style={{ fontFamily: FONT.FONT_FAMILY_BOLD, color: COLOR.WHITE, fontSize: FONT.FONT_SIZE_18 }}>ORDER NOW</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
export default ProductDetailScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.BACKGROUNDCOLOR
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

