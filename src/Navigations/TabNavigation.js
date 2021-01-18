import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { MaterialCommunityIcons, FontAwesome5 } from 'react-native-vector-icons'
//-------HomeStackScreen
import HomeScreen from "../Screen/HomeScreen/HomeScreen";
import AppointmentScreen from '../Screen/AppointmentScreen/AppointmentScreen'
import AppointmentBooking from '../Screen/AppointmentBooking/AppointmentBooking'
import AppointmentsBooked from "../Screen/AppointmentsBooked/AppointmentsBooked";
import StaffDetails from "../Screen/StaffDetails/StaffDetails"
import BookHistory from "../Screen/BookHistory/BookHistory"
//-------ProfileStackScreen
import MyProfileScreen from '../Screen/MyProfileScreen/MyProfileScreen';
import UpdateProfile from '../Screen/MyProfileScreen/UpdateProfile';

const ProfileStack = createStackNavigator();
function ProfileStackScreen() {
    return (
        <ProfileStack.Navigator initialRouteName="MyProfile" headerMode='none'>
            <ProfileStack.Screen name="MyProfile" component={MyProfileScreen} />
            <ProfileStack.Screen name="UpdateProfile" component={UpdateProfile} />
        </ProfileStack.Navigator>
    );
}


const HomeStack = createStackNavigator();
function HomeStackScreen() {
    return (
        <HomeStack.Navigator initialRouteName="HomeScreen" headerMode='none'>
            <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
            <HomeStack.Screen name="AppointmentsBooked" component={AppointmentsBooked} />
            <HomeStack.Screen name="AppointmentScreen" component={AppointmentScreen} />
            <HomeStack.Screen name="AppointmentBooking" component={AppointmentBooking} />
            <HomeStack.Screen name="StaffDetails" component={StaffDetails} />
        </HomeStack.Navigator>
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
            }}
        >
            <Tab.Screen name="Home" component={HomeStackScreen} />
            {/* <Tab.Screen name="AppointmentScreen" component={AppointmentScreen} /> */}
            <Tab.Screen name="Book" component={BookHistory} />
            <Tab.Screen name="Profile" component={ProfileStackScreen} />
        </Tab.Navigator>
    );
}