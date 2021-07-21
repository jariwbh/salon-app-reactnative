import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { StatusBar, SafeAreaView } from 'react-native';
import axiosConfig from '../../Helpers/axiosConfig';
const AUTHUSER = '@authuser';

function SplashScreen(props) {
  useEffect(() => {
    // check AuthController use to Login Or Not Login
    async function AuthController() {
      var getUser = await AsyncStorage.getItem(AUTHUSER)
      var userData = JSON.parse(getUser);
      if (userData) {
        //set header auth user key
        let token = userData._id;
        axiosConfig(token);
        return props.navigation.navigate('TabNavigation')
      } else {
        return props.navigation.navigate('LoginScreen')
      }
    }
    AuthController();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }} >
      <StatusBar barStyle='light-content' />
    </SafeAreaView>
  );
}

export default SplashScreen;
