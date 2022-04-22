import React, { useState, useEffect } from 'react';
import {
    Dimensions,
    SafeAreaView,
    View,
    Image,
    Text,
    ScrollView,
    StatusBar,
    Platform,
    TouchableOpacity,
    Linking
} from 'react-native';
import * as KEY from '../../context/actions/key';
import * as FONT from '../../styles/typography';
import * as COLOR from '../../styles/colors';
import * as IMAGE from '../../styles/image';
import styles from './Style';
const WIDTH = Dimensions.get('window').width;
import AsyncStorage from '@react-native-community/async-storage';
import * as TYPE from '../../context/actions/type';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getBranchDetails } from '../../Services/LocalService/LocalService';

const SupportScreen = (props) => {
    const [supportMobile, setSupportMobile] = useState(null);
    const [supportEmail, setSupportEmail] = useState(null);
    const [getBranch, setgetBranch] = useState(null);

    useEffect(() => {
        getMemberDeatilsLocalStorage();
    }, []);

    useEffect(() => {
    }, [supportMobile, supportEmail, getBranch])


    //GET MEMBER DATA IN MOBILE LOCAL STORAGE
    const getMemberDeatilsLocalStorage = async () => {
        const getBranchdata = await getBranchDetails();
        setgetBranch(getBranchdata);
        setSupportMobile(getBranchdata.supportnumber);
        setSupportEmail(getBranchdata.supportemail);
        // var getAuthUser = await AsyncStorage.getItem(TYPE.AUTHUSER);
        // var getDefaultUser = await AsyncStorage.getItem(TYPE.DEFAULTUSER);
        // if (getAuthUser !== null) {
        //     var userData = JSON.parse(getAuthUser);
        //     setSupportMobile(userData.branchid.supportnumber);
        //     setSupportEmail(userData.branchid.supportemail);
        // } else {
        //     var userData = JSON.parse(getDefaultUser);
        //     setSupportMobile(userData.branchid.supportnumber);
        //     setSupportEmail(userData.branchid.supportemail);
        // }
    }

    //GET location
    const location = () => {
        const url = Platform.select({
            ios: `maps:0,0?q=${getBranch && getBranch.property.address}`,
            android: `geo:0,0?q=${getBranch && getBranch.property.address}`,
        })
        Linking.openURL(url);
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.BACKGROUNDCOLOR }}>
            <StatusBar backgroundColor={COLOR.HEADERCOLOR} barStyle={Platform.OS === 'ios' ? KEY.DARK_CONTENT : KEY.LIGHT_CONTENT} />
            <View style={styles(getBranch?.property?.appcolorcode ? getBranch.property.appcolorcode : COLOR.HEADERCOLOR).headerstyle}>
                <Image source={{ uri: getBranch?.property?.mobilelogo ? getBranch?.property?.mobilelogo : TYPE.DefaultImage }}
                    style={{ alignItems: KEY.CENTER, height: 90, width: 90, marginLeft: 10, marginTop: 0, borderRadius: 10, resizeMode: KEY.COVER }}
                />
                <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, flexDirection: KEY.ROW, marginTop: -60 }}>
                    <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, marginTop: 0 }}>
                        <Text style={{ fontSize: 22, color: COLOR.WHITE, fontFamily: FONT.FONT_FAMILY_BOLD }}>{'Support'}</Text>
                    </View>
                </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={KEY.ALWAYS}>
                <View style={styles().containView}>
                    <Image source={IMAGE.CONSULT_TALK_ICON} resizeMode={KEY.CONTAIN} style={{ height: 100, width: 100 }} />
                    <Text style={styles(getBranch?.property?.appcolorcode ? getBranch.property.appcolorcode : COLOR.DEFALUTCOLOR).textHeader}>We are here to help you</Text>
                    <Text style={styles().textSub}>Contact Us</Text>
                    <View style={{ marginTop: 10, justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                        <Text style={{ color: COLOR.BLACK, fontSize: FONT.FONT_SIZE_16, fontFamily: FONT.FONT_FAMILY_REGULAR }}>Call us - {supportMobile}</Text>
                        <Text style={{ color: COLOR.BLACK, fontSize: FONT.FONT_SIZE_16, fontFamily: FONT.FONT_FAMILY_REGULAR }}>Mail us - {supportEmail}</Text>
                    </View>
                </View>
                <View style={styles().addressView}>
                    <TouchableOpacity onPress={() => location()}>
                        <Ionicons name='location-sharp' color={getBranch?.property?.appcolorcode ? getBranch.property.appcolorcode : COLOR.DEFALUTCOLOR} size={24} />
                    </TouchableOpacity>
                    <Text style={{ color: getBranch?.property?.appcolorcode ? getBranch.property.appcolorcode : COLOR.DEFALUTCOLOR, fontSize: FONT.FONT_SIZE_18, fontFamily: FONT.FONT_FAMILY_REGULAR }}>{getBranch && getBranch.property.country}</Text>
                    <Text style={{ color: COLOR.BLACK, fontSize: FONT.FONT_SIZE_16, width: WIDTH / 2, textAlign: KEY.CENTER, fontFamily: FONT.FONT_FAMILY_REGULAR }}>{getBranch && getBranch.property.address}</Text>
                </View>
                <View style={{ marginBottom: 100 }} />
            </ScrollView>
        </SafeAreaView>
    );
}

export default SupportScreen;




