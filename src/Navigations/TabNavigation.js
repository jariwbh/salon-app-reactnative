import React, { useEffect, useState } from 'react';
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

import * as KEY from '../context/actions/key';
import * as TYPE from '../context/actions/type';
import * as COLOR from '../styles/colors';
import * as IMAGE from '../styles/image';

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

const Tab = createBottomTabNavigator();
export default function TabNavigation() {
    const [myCartVisible, setMyCartVisible] = useState(false);

    useEffect(() => {
        MenuPermission();
    }, []);

    useEffect(() => {
    }, [myCartVisible]);

    //CHECK MENU PERMISSION FUNCTION
    const MenuPermission = async () => {
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
                    }
                },
            })}
            tabBarOptions={{
                style: {
                    backgroundColor: COLOR.WHITE,
                    borderTopRightRadius: 21,
                    borderTopLeftRadius: 21,
                    position: 'absolute',
                },
                activeTintColor: COLOR.DEFALUTCOLOR,
                inactiveTintColor: '#808B96',
                keyboardHidesTabBar: true,
                backBehavior: "history",
                showLabel: false
            }}
        >
            <Tab.Screen name="Home" component={HomeStackScreen} />
            {
                myCartVisible &&
                <Tab.Screen name="Book" component={BookHistoryStackScreen} />
            }

            <Tab.Screen name="Package" component={PackageStackScreen} />
            {/* <Tab.Screen name="Product" component={ProductStackScreen} /> */}
            <Tab.Screen name="Support" component={SupportStackScreen} />
            <Tab.Screen name="Profile" component={ProfileStackScreen} />
        </Tab.Navigator>
    );
}