import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
  View, StatusBar,
  SafeAreaView, Image,
  ImageBackground, Dimensions,
  ActivityIndicator, Modal,
  Text
} from 'react-native';
import { AUTHUSER } from '../../context/actions/type';
import axiosConfig from '../../Helpers/axiosConfig';
import styles from './Styles'
import * as KEY from '../../context/actions/key';
import * as COLOR from '../../styles/colors';
import * as FONT from '../../styles/typography';
import * as IMAGE from '../../styles/image';

function SplashScreen(props) {

  useEffect(() => {
    AuthController()
  }, []);

  async function AuthController() {
    var getUser = await AsyncStorage.getItem(AUTHUSER);
    var userData = JSON.parse(getUser);
    if (userData) {
      //set header auth user key
      let token = userData._id;
      axiosConfig(token);
      return props.navigation.replace('TabNavigation');
    } else {
      return props.navigation.replace('LoginScreen');
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }} >
      <StatusBar hidden={false} translucent={true} backgroundColor={KEY.TRANSPARENT} barStyle={KEY.LIGHT_CONTENT} />
      <ImageBackground
        source={IMAGE.SPLASHIMAGE} resizeMode={KEY.COVER} style={styles.imageStyle} />
    </SafeAreaView>
  );
}
export default SplashScreen;

