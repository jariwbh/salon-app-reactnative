import React, { useState, useEffect } from 'react';
import {
    Dimensions,
    SafeAreaView,
    View,
    Image,
    Text,
    TouchableOpacity,
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
                <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, flexDirection: KEY.ROW, marginTop: 30 }}>
                    <View style={{ justifyContent: KEY.CENTER }}>
                        <Text style={{ fontSize: 22, color: COLOR.WHITE, fontWeight: 'bold' }}>{TYPE.APPNAME}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.containView}>
                <Image source={IMAGE.CONSULT_TALK_ICON} resizeMode={KEY.CONTAIN} style={{ height: 100, width: 100 }} />
                <Text style={styles.textHeader}>We are here to help you</Text>
                <Text style={styles.textSub}>Contact Us</Text>
                <View style={{ marginTop: 10, justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                    <Text style={{ color: COLOR.BLACK, fontSize: FONT.FONT_SIZE_16 }}>Call us - {supportMobile}</Text>
                    <Text style={{ color: COLOR.BLACK, fontSize: FONT.FONT_SIZE_16 }}>Mail us - {supportEmail}</Text>
                </View>
            </View>
        </SafeAreaView>
    );
}
export default SupportScreen;




