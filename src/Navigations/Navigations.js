// import * as React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import TabNavigation from './TabNavigation';
// import LoginScreen from "../Screen/LoginScreen/LoginScreen";
// import ForgotPassword from "../Screen/ForgotPassword/ForgotPassword";
// import RegisterScreen from "../Screen/RegisterScreen/RegisterScreen";
// import SplashScreen from '../Screen/SplashScreen/splashScreen';
// import ForgotPasswordMain from '../Screen/ForgotPassword/ForgotPasswordMain';
// import ForgotPasswordOTP from '../Screen/ForgotPassword/ForgotPasswordOTP';
// import StartupScreen from '../Screen/LoginScreen/StartupScreen';
// import SelectBranchScreen from '../Screen/SplashScreen/SelectBranchScreen';

// const Stack = createStackNavigator();

// export default NavigationsApp = () => {
//     return (
//         <NavigationContainer>
//             <Stack.Navigator headerMode='none' initialRouteName='splashScreen'>
//                 <Stack.Screen name='splashScreen' component={SplashScreen} />
//                 <Stack.Screen name="SelectBranchScreen" component={SelectBranchScreen} />
//                 <Stack.Screen name='StartupScreen' component={StartupScreen} />
//                 <Stack.Screen name="LoginScreen" component={LoginScreen} />
//                 <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
//                 <Stack.Screen name="ForgotPasswordMain" component={ForgotPasswordMain} />
//                 <Stack.Screen name="ForgotPasswordOTP" component={ForgotPasswordOTP} />
//                 <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
//                 <Stack.Screen name="TabNavigation" component={TabNavigation} />
//             </Stack.Navigator>
//         </NavigationContainer>
//     );
// };.

import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Entypo from "react-native-vector-icons/Entypo";
import AsyncStorage from '@react-native-community/async-storage';
//-------HomeStackScreen
import HomeScreen from "../Screen/HomeScreen/HomeScreen";
import ServiceDetails from "../Screen/ServiceDetails/ServiceDetails"
import ServiceListScreen from '../Screen/ServiceListScreen/ServiceListScreen'
import AppointmentsBooked from "../Screen/AppointmentsBooked/AppointmentsBooked";
import StaffDetails from "../Screen/StaffDetails/StaffDetails"
import BookHistory from "../Screen/BookHistory/BookHistory"
import AppointmentSchdule from "../Screen/AppointmentsBooked/AppointmentSchdule";
//-------ProfileStackScreen
import MyProfileScreen from '../Screen/MyProfileScreen/MyProfileScreen';
import UpdateProfileScreen from '../Screen/MyProfileScreen/UpdateProfile';
//------SupportStackScreen
import SupportScreen from '../Screen/SupportScreen/SupportScreen';
//------ProductStackScreen
import ProductListScreen from '../Screen/ShopScreen/ProductListScreen';
import ProductDetailScreen from '../Screen/ShopScreen/ProductDetailScreen';
//------PackageStackScreen
import PackageScreen from '../Screen/PackageScreen/PackageScreen';
import PackageDetails from '../Screen/PackageScreen/PackageDetails';

import LoginScreen from "../Screen/LoginScreen/LoginScreen";
import ForgotPassword from "../Screen/ForgotPassword/ForgotPassword";
import RegisterScreen from "../Screen/RegisterScreen/RegisterScreen";
import SplashScreen from '../Screen/SplashScreen/splashScreen';
import ForgotPasswordMain from '../Screen/ForgotPassword/ForgotPasswordMain';
import ForgotPasswordOTP from '../Screen/ForgotPassword/ForgotPasswordOTP';
import StartupScreen from '../Screen/LoginScreen/StartupScreen';
import SelectBranchScreen from '../Screen/SplashScreen/SelectBranchScreen'

import * as KEY from '../context/actions/key';
import * as TYPE from '../context/actions/type';
import * as COLOR from '../styles/colors';
import * as IMAGE from '../styles/image';
import { getBranchDetails } from '../Services/LocalService/LocalService';
import ClassScheduleScreen from '../Screen/ClassSchedule/ClassScheduleScreen';

const ProfileStack = createStackNavigator();
function ProfileStackScreen({ navigation }) {
    return (
        <ProfileStack.Navigator initialRouteName="MyProfile" headerMode='none'>
            <ProfileStack.Screen name="MyProfile" options={{
                title: '',
                headerShown: false
            }}
                component={MyProfileScreen} />

            <ProfileStack.Screen name="UpdateProfile" options={{
                title: '',
                headerShown: false
            }}
                component={UpdateProfileScreen} />

            <ProfileStack.Screen name="AuthStackScreen" options={{
                title: '',
                headerShown: false
            }}
                component={AuthStackScreen} />

        </ProfileStack.Navigator>
    );
}

const HomeStack = createStackNavigator();
function HomeStackScreen({ navigation }) {
    return (
        <HomeStack.Navigator initialRouteName="HomeScreen" headerMode='none'>
            <HomeStack.Screen name="HomeScreen" component={HomeScreen}
                options={{
                    title: '',
                    headerShown: false
                }} />

            <HomeStack.Screen name="ServiceListScreen" options={{
                title: '',
                headerShown: false
            }} component={ServiceListScreen} />

            <HomeStack.Screen name="ServiceDetails" options={{
                title: '',
                headerShown: false
            }} component={ServiceDetails} />

            <HomeStack.Screen name="AppointmentsBooked" options={{
                title: '',
                headerShown: false
            }} component={AppointmentsBooked} />

            <HomeStack.Screen name="StaffDetails" options={{
                title: '',
                headerShown: false
            }} component={StaffDetails} />

            <HomeStack.Screen name="BookHistory" options={{
                title: '',
                headerShown: false
            }} component={BookHistory} />

            <HomeStack.Screen name="AppointmentSchdule" options={{
                title: '',
                headerShown: false
            }} component={AppointmentSchdule} />

            <HomeStack.Screen name="AuthStackScreen" component={AuthStackScreen}
                options={{
                    title: '',
                    headerShown: false
                }} />

        </HomeStack.Navigator>
    );
}

const BookHistoryStack = createStackNavigator();
function BookHistoryStackScreen({ navigation }) {
    return (
        <BookHistoryStack.Navigator initialRouteName="BookHistory" headerMode='none' >
            <BookHistoryStack.Screen name="BookHistory" options={{
                title: '',
                headerShown: false
            }}
                component={BookHistory} />
        </BookHistoryStack.Navigator>
    );
}

const ProductStack = createStackNavigator();
function ProductStackScreen({ navigation }) {
    return (
        <ProductStack.Navigator initialRouteName="ProductListScreen" headerMode='none' >
            <ProductStack.Screen name="ProductListScreen" options={{
                title: '',
                headerShown: false
            }}
                component={ProductListScreen} />
            <ProductStack.Screen name="ProductDetailScreen" options={{
                title: '',
                headerShown: false
            }}
                component={ProductDetailScreen} />
        </ProductStack.Navigator>
    );
}

const PackageStack = createStackNavigator();
function PackageStackScreen({ navigation }) {
    return (
        <PackageStack.Navigator initialRouteName="PackageScreen" headerMode='none' >
            <PackageStack.Screen name="PackageScreen" options={{
                title: 'Packages',
                headerShown: false
            }}
                component={PackageScreen} />
            <PackageStack.Screen name="PackageDetails" options={{
                title: 'Package Details',
                headerShown: false
            }}
                component={PackageDetails} />
        </PackageStack.Navigator>
    );
}

const SupportStack = createStackNavigator();
function SupportStackScreen({ navigation }) {
    return (
        <SupportStack.Navigator initialRouteName="SupportScreen" headerMode='none' >
            <SupportStack.Screen name="SupportScreen" options={{
                title: '',
                headerShown: false
            }}
                component={SupportScreen} />
        </SupportStack.Navigator>
    );
}

const ClassScheduleStack = createStackNavigator();
function ClassStackScreen({ navigation }) {
    return (
        <ClassScheduleStack.Navigator initialRouteName="ClassScheduleScreen" headerMode='none' >
            <ClassScheduleStack.Screen name="ClassScheduleScreen" options={{
                title: '',
                headerShown: false
            }}
                component={ClassScheduleScreen} />
        </ClassScheduleStack.Navigator>
    );
}

const Tab = createBottomTabNavigator();
function TabNavigation() {
    const [myCartVisible, setMyCartVisible] = useState(false);
    const [getBranch, setgetBranch] = useState(null);

    useEffect(() => {
        MenuPermission();
    }, []);

    useEffect(() => {
    }, [myCartVisible, getBranch]);

    //CHECK MENU PERMISSION FUNCTION
    const MenuPermission = async () => {
        const getBranchdata = await getBranchDetails();
        setgetBranch(getBranchdata);
        var getUser = await AsyncStorage.getItem(TYPE.AUTHUSER);
        var userData = JSON.parse(getUser);
        if (userData) {
            setMyCartVisible(true);
        };
    }

    return (
        <Tab.Navigator initialRouteName="Home"
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    if (route.name === 'Home') {
                        return (
                            <Ionicons
                                name={focused ? 'ios-home' : 'ios-home'}
                                size={20}
                                color={color}
                            />
                        );
                    } else if (route.name === 'Book') {
                        return (
                            <FontAwesome5
                                name={focused ? 'hands-helping' : 'hands-helping'}
                                size={20}
                                color={color}
                            />
                        );
                    } else if (route.name === 'Profile') {
                        return (
                            <Ionicons
                                name={focused ? 'ios-person' : 'ios-person'}
                                size={20}
                                color={color}
                            />
                        );
                    } else if (route.name === 'Support') {
                        return (
                            <MaterialIcons
                                name={focused ? 'contact-support' : 'contact-support'}
                                size={20}
                                color={color}
                            />
                        );
                    } else if (route.name === 'Product') {
                        return (
                            <FontAwesome5
                                name={focused ? 'shopping-bag' : 'shopping-bag'}
                                size={20}
                                color={color}
                            />
                        );
                    } else if (route.name === 'Package') {
                        return (
                            <Entypo
                                name={focused ? 'spotify' : 'spotify'}
                                size={20}
                                color={color}
                            />
                        );
                    } else if (route.name === 'Classes') {
                        return (
                            <Entypo
                                name={focused ? 'spotify' : 'spotify'}
                                size={20}
                                color={color}
                            />
                        );
                    }
                },
            })}
            tabBarOptions={{
                style: {
                    backgroundColor: COLOR.WHITE,
                    borderTopRightRadius: 21,
                    borderTopLeftRadius: 21,
                    position: 'absolute'
                },
                labelStyle: { fontSize: 14 },
                activeTintColor: getBranch?.property?.appcolorcode ? getBranch.property.appcolorcode : COLOR.DEFALUTCOLOR,
                inactiveTintColor: COLOR.GRAY_DARK,
                keyboardHidesTabBar: true,
                backBehavior: "initialRoute",
                showLabel: true
            }}
        >
            <Tab.Screen name="Home" component={HomeStackScreen} />
            {
                myCartVisible &&
                <Tab.Screen name="Book" component={BookHistoryStackScreen} />
            }
            {
                myCartVisible &&
                <Tab.Screen name="Classes" component={ClassStackScreen} />
            }
            {
                myCartVisible === false &&
                <Tab.Screen name="Package" component={PackageStackScreen} />
            }
            {/* <Tab.Screen name="Product" component={ProductStackScreen} /> */}
            <Tab.Screen name="Support" component={SupportStackScreen} />
            <Tab.Screen name="Profile" component={ProfileStackScreen} />
        </Tab.Navigator>
    );
}

const AuthStack = createStackNavigator();
function AuthStackScreen({ navigation }) {
    return (
        <AuthStack.Navigator initialRouteName="LoginScreen" headerMode='none'>
            <AuthStack.Screen name="LoginScreen" options={{
                title: '',
                headerShown: false
            }} component={LoginScreen} />

            <AuthStack.Screen name="ForgotPassword" options={{
                title: '',
                headerShown: false
            }} component={ForgotPassword} />

            <AuthStack.Screen name="ForgotPasswordMain" options={{
                title: '',
                headerShown: false
            }} component={ForgotPasswordMain} />

            <AuthStack.Screen name="ForgotPasswordOTP" options={{
                title: '',
                headerShown: false
            }} component={ForgotPasswordOTP} />

            <AuthStack.Screen name="RegisterScreen" options={{
                title: '',
                headerShown: false
            }} component={RegisterScreen} />
        </AuthStack.Navigator>
    );
}

const AuthStackReg = createStackNavigator();
function AuthStackScreenReg({ navigation }) {
    return (
        <AuthStackReg.Navigator initialRouteName="RegisterScreen" headerMode='none'>
            <AuthStackReg.Screen name="LoginScreen" options={{
                title: '',
                headerShown: false
            }} component={LoginScreen} />

            <AuthStackReg.Screen name="ForgotPassword" options={{
                title: '',
                headerShown: false
            }} component={ForgotPassword} />

            <AuthStackReg.Screen name="ForgotPasswordMain" options={{
                title: '',
                headerShown: false
            }} component={ForgotPasswordMain} />

            <AuthStackReg.Screen name="ForgotPasswordOTP" options={{
                title: '',
                headerShown: false
            }} component={ForgotPasswordOTP} />

            <AuthStackReg.Screen name="RegisterScreen" options={{
                title: '',
                headerShown: false
            }} component={RegisterScreen} />
        </AuthStackReg.Navigator>
    );
}

const SplashStack = createStackNavigator();
function SplashStackScreen({ navigation }) {
    return (
        <SplashStack.Navigator initialRouteName="splashScreen" headerMode='none'>
            <SplashStack.Screen name='splashScreen' options={{
                title: '',
                headerShown: false
            }} component={SplashScreen} />

            <SplashStack.Screen name="SelectBranchScreen" options={{
                title: '',
                headerShown: false
            }} component={SelectBranchScreen} />

            <SplashStack.Screen name='StartupScreen' options={{
                title: '',
                headerShown: false
            }} component={StartupScreen} />

            <SplashStack.Screen name='AuthStackScreen' options={{
                title: '',
                headerShown: false
            }} component={AuthStackScreen} />
        </SplashStack.Navigator>
    );
}

const Stack = createStackNavigator();
export default NavigationsApp = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator headerMode='none' initialRouteName='splashScreen'>
                <Stack.Screen name="splashScreen" component={SplashStackScreen} options={{ headerShown: false }} />
                <Stack.Screen name='AuthStackScreen' component={AuthStackScreen} />
                <Stack.Screen name='AuthStackScreenReg' component={AuthStackScreenReg} />
                <Stack.Screen name="TabNavigation" component={TabNavigation} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};