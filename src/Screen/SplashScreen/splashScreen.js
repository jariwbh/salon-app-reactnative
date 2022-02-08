import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
  StatusBar, View,
  SafeAreaView, Image,
  ImageBackground, Dimensions
} from 'react-native';
import { AUTHUSER, DefaultImage, SPLASHSCREENIAMGE, STARTUP } from '../../context/actions/type';
import axiosConfig from '../../Helpers/axiosConfig';
import styles from './Styles'
import * as KEY from '../../context/actions/key';
import * as IMAGE from '../../styles/image';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

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
        source={{ uri: SPLASHSCREENIAMGE }} style={styles.imageStyle} >
        <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, marginTop: HEIGHT / 3 }}>
          <Image style={styles.imageLogo} resizeMode={KEY.COVER} source={{ uri: DefaultImage }} />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

export default SplashScreen;

