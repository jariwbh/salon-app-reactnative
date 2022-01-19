import React, { useState, useEffect } from 'react';
import {
    Dimensions,
    SafeAreaView,
    View,
    Image,
    Text,
    ScrollView,
    StatusBar
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

const SupportScreen = (props) => {
    const [supportMobile, setSupportMobile] = useState(null);
    const [supportEmail, setSupportEmail] = useState(null);

    useEffect(() => {
        getMemberDeatilsLocalStorage();
    }, []);

    useEffect(() => {
    }, [supportMobile, supportEmail])


    //GET MEMBER DATA IN MOBILE LOCAL STORAGE
    const getMemberDeatilsLocalStorage = async () => {
        var getAuthUser = await AsyncStorage.getItem(TYPE.AUTHUSER);
        var getDefaultUser = await AsyncStorage.getItem(TYPE.DEFAULTUSER);
        if (getAuthUser !== null) {
            var userData = JSON.parse(getAuthUser);
            setSupportMobile(userData.branchid.supportnumber);
            setSupportEmail(userData.branchid.supportemail);
        } else {
            var userData = JSON.parse(getDefaultUser);
            setSupportMobile(userData.branchid.supportnumber);
            setSupportEmail(userData.branchid.supportemail);
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.BACKGROUNDCOLOR }}>
            <StatusBar backgroundColor={COLOR.STATUSBARCOLOR} barStyle={KEY.LIGHT_CONTENT} />
            <View style={styles.headerstyle}>
                <Image source={{ uri: TYPE.DefaultImage }}
                    style={{ tintColor: COLOR.WHITE, alignItems: KEY.CENTER, height: 80, width: 80, marginLeft: 10, marginTop: 0, borderRadius: 10, resizeMode: KEY.COVER }}
                />
                <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, flexDirection: KEY.ROW, marginTop: -60 }}>
                    <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, marginTop: 0 }}>
                        <Text style={{ fontSize: 22, color: COLOR.WHITE, fontWeight: 'bold' }}>{'Our Packages'}</Text>
                    </View>
                </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={KEY.ALWAYS}>
                <View style={styles.containView}>
                    <Image source={IMAGE.CONSULT_TALK_ICON} resizeMode={KEY.CONTAIN} style={{ height: 100, width: 100 }} />
                    <Text style={styles.textHeader}>We are here to help you</Text>
                    <Text style={styles.textSub}>Contact Us</Text>
                    <View style={{ marginTop: 10, justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                        <Text style={{ color: COLOR.BLACK, fontSize: FONT.FONT_SIZE_16 }}>Call us - {supportMobile}</Text>
                        <Text style={{ color: COLOR.BLACK, fontSize: FONT.FONT_SIZE_16 }}>Mail us - {supportEmail}</Text>
                    </View>
                </View>
                <View style={styles.addressView}>
                    <Ionicons name='location-sharp' color={COLOR.DEFALUTCOLOR} size={24} />
                    <Text style={{ color: COLOR.DEFALUTCOLOR, fontSize: FONT.FONT_SIZE_18 }}>LEGIAN</Text>
                    <Text style={{ color: COLOR.BLACK, fontSize: FONT.FONT_SIZE_16 }}>Jl. Sunset Road, Legian, Kuta,</Text>
                    <Text style={{ color: COLOR.BLACK, fontSize: FONT.FONT_SIZE_16 }}>Kabupaten Badung, Bali</Text>
                    <Text style={{ color: COLOR.BLACK, fontSize: FONT.FONT_SIZE_16 }}>80361</Text>
                    <Text style={{ color: COLOR.BLACK, fontSize: FONT.FONT_SIZE_16 }}>Call us - +62 811 388 2240</Text>
                </View>
                <View style={styles.addressView}>
                    <Ionicons name='location-sharp' color={COLOR.DEFALUTCOLOR} size={24} />
                    <Text style={{ color: COLOR.DEFALUTCOLOR, fontSize: FONT.FONT_SIZE_18 }}>UBUD</Text>
                    <Text style={{ color: COLOR.BLACK, fontSize: FONT.FONT_SIZE_16 }}>Jl. 8 Monkey Forest Road,</Text>
                    <Text style={{ color: COLOR.BLACK, fontSize: FONT.FONT_SIZE_16 }}>Ubud, Bali</Text>
                    <Text style={{ color: COLOR.BLACK, fontSize: FONT.FONT_SIZE_16 }}>Call us - +62 811 388 2241</Text>
                </View>
                <View style={{ marginBottom: 100 }} />
            </ScrollView>
        </SafeAreaView>
    );
}
export default SupportScreen;




