import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigation from './TabNavigation';
import LoginScreen from "../Screen/LoginScreen/LoginScreen";
import ForgotPassword from "../Screen/ForgotPassword/ForgotPassword";
import RegisterScreen from "../Screen/RegisterScreen/RegisterScreen";
// import HomeScreen from "../Screen/HomeScreen/HomeScreen";


const Stack = createStackNavigator();



export default NavigationsApp = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator headerMode='none' initialRouteName='LoginScreen'>
                <Stack.Screen name="LoginScreen" component={LoginScreen} />
                <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
                <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
                <Stack.Screen name="TabNavigation" component={TabNavigation} />

            </Stack.Navigator>

        </NavigationContainer>
    );
};