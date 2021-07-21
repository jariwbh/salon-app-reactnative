import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigation from './TabNavigation';
import LoginScreen from "../Screen/LoginScreen/LoginScreen";
import ForgotPassword from "../Screen/ForgotPassword/ForgotPassword";
import RegisterScreen from "../Screen/RegisterScreen/RegisterScreen";
import SplashScreen from '../Screen/SplashScreen/splashScreen';
import ForgotPasswordMain from '../Screen/ForgotPassword/ForgotPasswordMain';
import ForgotPasswordOTP from '../Screen/ForgotPassword/ForgotPasswordOTP';

const Stack = createStackNavigator();

export default NavigationsApp = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator headerMode='none' initialRouteName='splashScreen'>
                <Stack.Screen name='splashScreen' component={SplashScreen} />
                <Stack.Screen name="LoginScreen" component={LoginScreen} />
                <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
                <Stack.Screen name="ForgotPasswordMain" component={ForgotPasswordMain} />
                <Stack.Screen name="ForgotPasswordOTP" component={ForgotPasswordOTP} />
                <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
                <Stack.Screen name="TabNavigation" component={TabNavigation} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};