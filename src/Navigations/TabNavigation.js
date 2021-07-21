import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
//-------HomeStackScreen
import HomeScreen from "../Screen/HomeScreen/HomeScreen";
import ServiceDetails from "../Screen/ServiceDetails/ServiceDetails"
import ServiceListScreen from '../Screen/ServiceListScreen/ServiceListScreen'
import AppointmentsBooked from "../Screen/AppointmentsBooked/AppointmentsBooked";
import StaffDetails from "../Screen/StaffDetails/StaffDetails"
import BookHistory from "../Screen/BookHistory/BookHistory"
//-------ProfileStackScreen
import MyProfileScreen from '../Screen/MyProfileScreen/MyProfileScreen';
import UpdateProfileScreen from '../Screen/MyProfileScreen/UpdateProfile';
import BackButton from '../Components/BackButton/BackButton'

const ProfileStack = createStackNavigator();
function ProfileStackScreen({ navigation }) {
    return (
        <ProfileStack.Navigator initialRouteName="MyProfile" headerMode='screen'>
            <ProfileStack.Screen name="MyProfile" options={{
                title: 'Profile', headerStyle: {
                    backgroundColor: '#FFFFFF',
                    elevation: 0,
                    shadowOpacity: 0,
                    borderBottomWidth: 0,
                }, headerLeft: () =>
                    <BackButton onPress={() => navigation.navigate("HomeScreen")} />,
                headerTintColor: '#000000',
                headerTitleAlign: 'center',
            }}
                component={MyProfileScreen} />

            <ProfileStack.Screen name="UpdateProfile" options={{
                title: 'Profile', headerStyle: {
                    backgroundColor: '#FFFFFF',
                    elevation: 0,
                    shadowOpacity: 0,
                    borderBottomWidth: 0,
                }, headerLeft: () =>
                    <BackButton onPress={() => navigation.navigate("MyProfile")} />,
                headerTintColor: '#000000',
                headerTitleAlign: 'center',
            }}
                component={UpdateProfileScreen} />
        </ProfileStack.Navigator>
    );
}

const HomeStack = createStackNavigator();
function HomeStackScreen({ navigation }) {
    return (
        <HomeStack.Navigator initialRouteName="HomeScreen" headerMode='screen'>
            <HomeStack.Screen name="HomeScreen" component={HomeScreen}
                options={{
                    title: '',
                    headerShown: false
                }} />

            <HomeStack.Screen name="ServiceListScreen" options={{
                title: 'Services', headerStyle: {
                    backgroundColor: '#FFFFFF',
                    elevation: 0,
                    shadowOpacity: 0,
                    borderBottomWidth: 0,
                }, headerLeft: () => <BackButton onPress={() => navigation.navigate("HomeScreen")} />,
                headerTintColor: '#000000',
                headerTitleAlign: 'center',
            }} component={ServiceListScreen} />

            <HomeStack.Screen name="ServiceDetails" options={{
                title: 'Service Details', headerStyle: {
                    backgroundColor: '#FFFFFF',
                    elevation: 0,
                    shadowOpacity: 0,
                    borderBottomWidth: 0,
                }, headerLeft: () => <BackButton onPress={() => navigation.navigate("HomeScreen")} />,
                headerTintColor: '#000000',
                headerTitleAlign: 'center',
            }} component={ServiceDetails} />

            <HomeStack.Screen name="AppointmentsBooked" options={{
                title: 'Book Appointment', headerStyle: {
                    backgroundColor: '#FFFFFF',
                    elevation: 0,
                    shadowOpacity: 0,
                    borderBottomWidth: 0,
                }, headerLeft: () => <BackButton onPress={() => navigation.navigate("ServiceDetails")} />,
                headerTintColor: '#000000',
                headerTitleAlign: 'center',
            }} component={AppointmentsBooked} />

            <HomeStack.Screen name="StaffDetails" options={{
                title: 'Staff Detail', headerStyle: {
                    backgroundColor: '#FFFFFF',
                    elevation: 0,
                    shadowOpacity: 0,
                    borderBottomWidth: 0,
                }, headerLeft: () => <BackButton onPress={() => navigation.navigate("HomeScreen")} />,
                headerTintColor: '#000000',
                headerTitleAlign: 'center',
            }} component={StaffDetails} />

            <HomeStack.Screen name="BookHistory" options={{
                title: 'Book History', headerStyle: {
                    backgroundColor: '#FFFFFF',
                    elevation: 0,
                    shadowOpacity: 0,
                    borderBottomWidth: 0,
                }, headerLeft: () => <BackButton onPress={() => navigation.navigate("HomeScreen")} />,
                headerTintColor: '#000000',
                headerTitleAlign: 'center',
            }} component={BookHistory} />
        </HomeStack.Navigator>
    );
}

const BookHistoryStack = createStackNavigator();
function BookHistoryStackScreen({ navigation }) {
    return (
        <BookHistoryStack.Navigator initialRouteName="BookHistory" headerMode='screen' >
            <BookHistoryStack.Screen name="BookHistory" options={{
                title: 'Book history', headerStyle: {
                    backgroundColor: '#FFFFFF',
                    elevation: 0,
                    shadowOpacity: 0,
                    borderBottomWidth: 0,
                }, headerLeft: () =>
                    <BackButton onPress={() => navigation.navigate("HomeScreen")} />,
                headerTintColor: '#000000',
                headerTitleAlign: 'center',
            }}
                component={BookHistory} />
        </BookHistoryStack.Navigator>
    );
}

const Tab = createBottomTabNavigator();
export default function TabNavigation() {
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
                    }
                },
            })}
            tabBarOptions={{
                style: {
                    backgroundColor: '#FFFFFF',
                    borderTopRightRadius: 21,
                    borderTopLeftRadius: 21,
                    position: 'absolute',
                },
                activeTintColor: '#FFBA00',
                inactiveTintColor: '#808B96',
                keyboardHidesTabBar: true,
                backBehavior: "history",
                showLabel: false
            }}
        >
            <Tab.Screen name="Home" component={HomeStackScreen} />
            <Tab.Screen name="Book" options={{ unmountOnBlur: true }} component={BookHistoryStackScreen} />
            <Tab.Screen name="Profile" component={ProfileStackScreen} />
        </Tab.Navigator>
    );
}