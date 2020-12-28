import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from "../Screen/LoginScreen/LoginScreen";
import ForgotPassword from "../Screen/ForgotPassword/ForgotPassword";
import RegisterScreen from "../Screen/RegisterScreen/RegisterScreen";
import HomeScreen from "../Screen/HomeScreen/HomeScreen";
import AppointmentScreen from '../Screen/AppointmentScreen/AppointmentScreen'
import AppointmentBooking from '../Screen/AppointmentBooking/AppointmentBooking'
import AppointmentsBooked from "../Screen/AppointmentsBooked/AppointmentsBooked";
const Stack = createStackNavigator();



export default NavigationsApp = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator headerMode='none' >

                <Stack.Screen name="LoginScreen" component={LoginScreen} />
                <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
                <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
                <Stack.Screen name="HomeScreen" component={HomeScreen} />
                <Stack.Screen name="AppointmentScreen" component={AppointmentScreen} />
                <Stack.Screen name="AppointmentBooking" component={AppointmentBooking} />
                <Stack.Screen name="AppointmentsBooked" component={AppointmentsBooked} />
            </Stack.Navigator>

        </NavigationContainer>
    );
};