import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
  View, StatusBar,
  SafeAreaView, Image,
  ImageBackground, Dimensions,
  ActivityIndicator, Modal,
  Text
} from 'react-native';
import { AUTHUSER, STARTUP } from '../../context/actions/type';
import axiosConfig from '../../Helpers/axiosConfig';
import styles from './Styles'
import * as KEY from '../../context/actions/key';
import * as IMAGE from '../../styles/image';

function SplashScreen(props) {

  useEffect(() => {
    splashScreen();
  }, []);

  async function AuthController() {
    var getStartup = await AsyncStorage.getItem(STARTUP);
    var startup = JSON.parse(getStartup);
    var getUser = await AsyncStorage.getItem(AUTHUSER);
    var userData = JSON.parse(getUser);
    if (userData) {
      //set header auth user key
      let token = userData._id;
      axiosConfig(token);
      // return props.navigation.replace('TabNavigation');
      return props.navigation.replace('SelectBranchScreen');
    } else {
      if (!startup) {
        return props.navigation.replace('StartupScreen');
      } else {
        // return props.navigation.replace('TabNavigation');
        return props.navigation.replace('SelectBranchScreen');
      }
    }
  }

  async function splashScreen() {
    setTimeout(() => {
      AuthController();
    }, 3000);
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

