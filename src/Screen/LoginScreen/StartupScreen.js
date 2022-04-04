import React, { useEffect, useState } from 'react';
import {
    View, StatusBar, SafeAreaView, Image, TouchableOpacity,
    ImageBackground, Dimensions, StyleSheet, Text, Platform
} from 'react-native';
import * as KEY from '../../context/actions/key';
import * as COLOR from '../../styles/colors';
import * as FONT from '../../styles/typography';
import * as IMAGE from '../../styles/image';
import AsyncStorage from '@react-native-community/async-storage';
const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const StartupScreen = (props) => {

    const checkStartUP = (val) => (
        AsyncStorage.setItem(KEY.STARTUP, JSON.stringify(val))
    )

    const onPressStartUp = async () => {
        checkStartUP(true);
        return props.navigation.replace('SelectBranchScreen');
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.BACKGROUNDCOLOR }} >
            <StatusBar hidden={false}
                translucent={true}
                backgroundColor={KEY.TRANSPARENT}
                barStyle={Platform.OS === 'ios' ? KEY.DARK_CONTENT : KEY.LIGHT_CONTENT} />
            <ImageBackground
                source={IMAGE.STARTUP} resizeMode={KEY.COVER} style={styles.imageStyle} />
            <View style={{ alignItems: KEY.CENTER, marginTop: 30 }}>
                <TouchableOpacity style={styles.loginBtn} onPress={() => onPressStartUp()} >
                    <Text style={styles.loginText}>Get Started</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
export default StartupScreen;

const styles = StyleSheet.create({
    imageStyle: {
        height: HEIGHT - 100,
        width: WIDTH,
        justifyContent: KEY.CENTER,
        borderBottomRightRadius: 150,
        overflow: "hidden"
    },
    imageLogo: {
        justifyContent: KEY.CENTER,
        height: 200,
        width: 200
    },
    loginBtn: {
        flexDirection: KEY.ROW,
        width: WIDTH / 2,
        backgroundColor: COLOR.DEFALUTCOLOR,
        borderRadius: 100,
        height: 45,
        alignItems: KEY.CENTER,
        justifyContent: KEY.CENTER,
        marginRight: 20
    },
    loginText: {
        color: COLOR.WHITE,
        fontSize: 16,
        fontFamily: FONT.FONT_FAMILY_REGULAR
    },
})