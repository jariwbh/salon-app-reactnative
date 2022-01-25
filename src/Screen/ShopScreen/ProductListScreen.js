import React, { useState, useEffect } from 'react';
import {
    Dimensions,
    SafeAreaView,
    Image,
    ScrollView,
    StatusBar,
    View, Text,
    FlatList,
    StyleSheet, TextInput,
    TouchableOpacity, RefreshControl
} from 'react-native';
import Loader from '../../Components/Loader/Loader';
import { CategoryService } from '../../Services/ProductService/CategoryService';
import { InventoryService } from '../../Services/ProductService/InventoryService';
import getCurrency from '../../Services/getCurrencyService/getCurrency';
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import * as COLOR from '../../styles/colors';
import * as IMAGE from '../../styles/image';
import * as TYPE from '../../context/actions/type';
import axiosConfig from '../../Helpers/axiosConfig';
import AsyncStorage from '@react-native-community/async-storage';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const ProductListScreen = (props) => {
    const [loading, setLoading] = useState(false);
    const [getBranch, setgetBranch] = useState(null);
    const [catagoryList, setCatagoryList] = useState([]);
    const [productList, setProductList] = useState([]);
    const [productListCategoryWise, setProductListCatagoryWise] = useState(null);
    const [refreshing, setrefreshing] = useState(false);
    const [currencySymbol, setCurrencySymbol] = useState(null);
    const [searchProduct, setSearchProduct] = useState([]);

    useEffect(() => {
        setLoading(true);
        getMemberDeatilsLocalStorage();
        getCatagory();
        getProduct();
    }, [])

    useEffect(() => {
    }, [loading, productListCategoryWise, catagoryList,
        productList, getBranch, currencySymbol])

    //TIME OUT FUNCTION
    const wait = (timeout) => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }

    //GET MEMBER DATA IN MOBILE LOCAL STORAGE
    const getMemberDeatilsLocalStorage = async () => {
        var getAuthUser = await AsyncStorage.getItem(TYPE.AUTHUSER);
        if (getAuthUser !== null) {
            var userData = JSON.parse(getAuthUser);
            axiosConfig(userData._id);
            const response = getCurrency(userData.branchid.currency);
            setCurrencySymbol(response);
        } else {
            axiosConfig(getBranch?.property?.authkey);
            const response = getCurrency(getBranch.currency);
            setCurrencySymbol(response);
        }
    }

    //get pull to refresh function
    const onRefresh = () => {
        setrefreshing(true);
        getCatagory();
        getProduct();
        wait(3000).then(() => setrefreshing(false));
    }

    //GET CATAGORY LIST 
    const getCatagory = async () => {
        try {
            const response = await CategoryService();
            if (response.data != null && response.data != 'undefind' && response.status == 200 && response.data.length > 0) {
                let catagory = [];
                catagory = response.data;
                setCatagoryList([{ add: true, selected: true }, ...catagory]);
                setLoading(false);
            } else {
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
        }
    }

    //GET PRODUCT LIST CATAGORY WISE
    const getProduct = async (id) => {
        try {
            const response = await InventoryService(id);
            if (response.data != null && response.data != 'undefind' && response.status == 200) {
                setProductList(response.data);
                setSearchProduct(response.data);
            }
        } catch (error) {
            setLoading(false);
        }
    }

    //RENDER PRODUCTLIST
    const renderProductList = ({ item }) => (
        <>
            <View style={{ flexDirection: KEY.ROW, marginBottom: 10 }}>
                <TouchableOpacity onPress={() => props.navigation.navigate('ProductDetailScreen', { item })}
                    style={{ flexDirection: KEY.ROW, alignItems: KEY.CENTER, justifyContent: 'space-between' }}>
                    <Image source={{ uri: item.imagegallery && item.imagegallery[0] && item.imagegallery[0].attachment ? item?.imagegallery[0]?.attachment : TYPE.DefaultImage }}
                        resizeMode={KEY.STRETCH}
                        style={{ height: 150, width: 150 }} />
                    <View style={{ flexDirection: KEY.COLUMN, marginLeft: 20 }}>
                        <Text style={styles.detailText}>{item?.itemname}</Text>
                        <View style={{ flexDirection: KEY.COLUMN, marginTop: 5 }}>
                            <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.BLACK }}>{currencySymbol + ' ' + item?.sale?.rate} </Text>
                            {
                                item?.sale.discounttype == "Percentage" &&
                                <Text style={{ fontSize: FONT.FONT_SIZE_14, color: COLOR.DEFALUTCOLOR }}> ({item?.sale?.discount + '%' + ' OFF'})</Text>
                            }
                            {
                                item?.sale.discounttype == "Fixed" &&
                                <Text style={{ fontSize: FONT.FONT_SIZE_14, color: COLOR.DEFALUTCOLOR }}> ({item?.sale?.discount + ' ' + currencySymbol + 'OFF'})</Text>
                            }
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={{ borderBottomColor: COLOR.ANTI_FLASH_WHITE, borderBottomWidth: 1 }} />
        </>
    )

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.WHITE }}>
            <StatusBar backgroundColor={COLOR.STATUSBARCOLOR} barStyle={KEY.LIGHT_CONTENT} />
            <View style={styles.headerstyle}>
                <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, flexDirection: KEY.ROW, marginTop: 30 }}>
                    <Text style={{ fontSize: 22, color: COLOR.WHITE, fontWeight: 'bold' }}>Our Products</Text>
                </View>
            </View>

            <FlatList
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 50, marginTop: 20 }}
                data={searchProduct}
                renderItem={renderProductList}
                keyExtractor={item => item._id}
                keyboardShouldPersistTaps={KEY.ALWAYS}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        title="Pull to refresh"
                        tintColor={COLOR.DEFALUTCOLOR}
                        titleColor={COLOR.DEFALUTCOLOR}
                        colors={[COLOR.DEFALUTCOLOR]}
                        onRefresh={onRefresh} />
                }
                contentContainerStyle={{ paddingBottom: 80, alignSelf: KEY.CENTER, marginTop: 0 }}
                keyExtractor={item => item._id}
                ListFooterComponent={() => (
                    searchProduct && searchProduct.length > 0 ?
                        <></>
                        :
                        <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                            <Image source={IMAGE.RECORD_ICON} style={{ height: 150, width: 200, marginTop: 50 }} resizeMode={KEY.CONTAIN} />
                            <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.TAUPE_GRAY, marginTop: 10 }}>No record found</Text>
                        </View>
                )}
            />
            {loading ? <Loader /> : null}
        </SafeAreaView>
    );
}
export default ProductListScreen;

const styles = StyleSheet.create({
    view: {
        backgroundColor: COLOR.WHITE,
        flexDirection: KEY.ROW,
        justifyContent: KEY.CENTER,
        alignItems: KEY.CENTER
    },
    btnTab: {
        flexDirection: KEY.ROW,
        justifyContent: KEY.CENTER,
    },
    tabText: {
        fontSize: FONT.FONT_SIZE_16,
        color: COLOR.TAUPE_GRAY,
        padding: 15,
        textTransform: KEY.UPPERCASE
    },
    tabActive: {
        fontWeight: FONT.FONT_WEIGHT_BOLD,
        color: COLOR.DEFALUTCOLOR,
        padding: 15,
        textTransform: KEY.UPPERCASE,
        fontSize: FONT.FONT_SIZE_16,
        borderBottomColor: COLOR.DEFALUTCOLOR,
        borderBottomWidth: 2
    },
    detailText: {
        fontSize: FONT.FONT_SIZE_14,
        width: WIDTH / 2 - 20,
        color: COLOR.BLACK,
    },
    centerView: {
        alignItems: KEY.CENTER,
        justifyContent: KEY.CENTER
    },
    statusbar: {
        flexDirection: KEY.ROW,
        alignItems: KEY.CENTER,
        marginTop: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLOR.GRANITE_GRAY,
        alignItems: KEY.FLEX_START,
        width: WIDTH - 40,
        height: 45,
        color: COLOR.BLACK_OLIVE,
        marginBottom: 10,
        paddingLeft: 15
    },
    inputTextView: {
        fontSize: FONT.FONT_SIZE_14,
        flex: 1
    },
    headerstyle: {
        backgroundColor: COLOR.STATUSBARCOLOR,
        width: WIDTH,
        height: 90,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        marginBottom: 20
    }

});

