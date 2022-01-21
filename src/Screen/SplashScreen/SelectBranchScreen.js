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
    TouchableOpacity, RefreshControl
} from 'react-native';
import { BranchService } from '../../Services/BranchService/BranchService';
import { UserService } from '../../Services/UserService/UserService';
import * as TYPE from '../../context/actions/type';
import * as KEY from '../../context/actions/key';
import * as COLOR from '../../styles/colors';
import * as IMAGE from '../../styles/image';
import * as FONT from '../../styles/typography';
import Loader from '../../Components/Loader/Loader';
import axiosConfig from '../../Helpers/axiosConfig';
import AsyncStorage from '@react-native-community/async-storage';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const SelectBranchScreen = (props) => {
    const [loading, setLoading] = useState(false);
    const [branchList, setBranchList] = useState([]);
    const [refreshing, setrefreshing] = useState(false);

    useEffect(() => {
        getDefaultUser();
        setLoading(true);
    }, [])

    useEffect(() => {
    }, [loading, branchList, refreshing])

    //TIME OUT FUNCTION
    const wait = (timeout) => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }

    //get pull to refresh function
    const onRefresh = () => {
        setrefreshing(true);
        getBranch();
        wait(3000).then(() => setrefreshing(false));
    }

    const authDefaultUser = (key, user) => (
        AsyncStorage.setItem(key, JSON.stringify(user))
    )

    //GET BRANCHLIST LIST 
    const getBranch = async () => {
        try {
            const response = await BranchService();
            if (response.data != null && response.data != 'undefind' && response.status == 200) {
                setBranchList(response.data);
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
        }
    }

    //MANAGE USER AND SET AUTHKEY
    const getDefaultUser = async () => {
        axiosConfig(TYPE.USERKEY);
        try {
            const response = await UserService(TYPE.USERKEY);
            if (response.data != null && response.data != 'undefind' && response.status == 200) {
                authDefaultUser(TYPE.DEFAULTUSER, response.data);
                await getBranch();
            }
        } catch (error) {
            console.log(`error`, error);
        }
    }

    //RENDER BRANCHLIST
    const renderBranchList = ({ item }) => (
        <TouchableOpacity style={styles.cardView} onPress={() => onPressSelectBranch(item)}>
            <View
                style={{ flexDirection: KEY.ROW, alignItems: KEY.CENTER, justifyContent: KEY.SPACEBETWEEN, marginLeft: 20 }}>
                <Image source={item?.branchlogo ? { uri: item?.branchlogo } : TYPE.DefaultImage}
                    resizeMode={KEY.STRETCH}
                    style={{ height: 100, width: 100 }} />
                <View style={{ flexDirection: KEY.COLUMN, marginLeft: 20 }}>
                    <Text style={styles.titleText}>{item?.branchname}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )

    //SELECT BRANCH TO CALL FUNCTION
    const onPressSelectBranch = (val) => {
        authDefaultUser(KEY.AUTHUSERBRANCH, val);
        return props.navigation.replace('TabNavigation');
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.BACKGROUNDCOLOR }}>
            <StatusBar backgroundColor={COLOR.STATUSBARCOLOR} barStyle={KEY.LIGHT_CONTENT} />
            <View style={styles.headerstyle}>
                <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, flexDirection: KEY.ROW, marginTop: -15 }}>
                    <Image source={{ uri: TYPE.DefaultImage }}
                        style={{ tintColor: COLOR.WHITE, alignItems: KEY.CENTER, height: 120, width: 120, resizeMode: KEY.COVER }}
                    />
                </View>
            </View>
            <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, marginTop: 15 }}>
                <Text style={{ fontSize: 22, color: COLOR.DEFALUTCOLOR, fontWeight: 'bold' }}>{'Select Your Location'}</Text>
            </View>
            <View style={{ marginTop: 5 }} />
            <FlatList
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 50, marginTop: 20 }}
                data={branchList}
                renderItem={renderBranchList}
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
                contentContainerStyle={{ paddingBottom: 20, alignSelf: KEY.CENTER, marginTop: 0 }}
                keyExtractor={item => item._id}
                ListFooterComponent={() => (
                    branchList && branchList.length > 0 ?
                        <></>
                        :
                        <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                            <Image source={IMAGE.RECORD_ICON} style={{ height: 150, width: 200, marginTop: 50 }} resizeMode={KEY.CONTAIN} />
                            <Text style={{ fontSize: FONT.FONT_SIZE_16, color: COLOR.TAUPE_GRAY, marginTop: 10 }}>No record found</Text>
                        </View>
                )}
            />
            {
                loading ? <Loader /> : null
            }
        </SafeAreaView>
    )
}

export default SelectBranchScreen;

const styles = StyleSheet.create({
    view: {
        backgroundColor: COLOR.WHITE,
        flexDirection: KEY.ROW,
        justifyContent: KEY.CENTER,
        alignItems: KEY.CENTER
    },
    headerstyle: {
        backgroundColor: COLOR.STATUSBARCOLOR,
        width: WIDTH,
        height: 90,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        marginBottom: 0
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
    titleText: {
        fontSize: FONT.FONT_SIZE_16,
        fontWeight: FONT.FONT_WEIGHT_BOLD,
        width: WIDTH / 2,
        color: COLOR.BLACK
    },
    cardView: {
        borderRadius: 15,
        marginTop: 10,
        marginBottom: 10,
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
        width: WIDTH - 30,
        height: 130
    }
});
