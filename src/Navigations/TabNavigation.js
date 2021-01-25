import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { MaterialCommunityIcons, FontAwesome5 } from 'react-native-vector-icons'
//-------HomeStackScreen
import HomeScreen from "../Screen/HomeScreen/HomeScreen";
import ServiceDetails from "../Screen/ServiceDetails/ServiceDetails"
import ServiceListScreen from '../Screen/ServiceListScreen/ServiceListScreen'
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
            <HomeStack.Screen name="ServiceDetails" component={ServiceDetails} />
            <HomeStack.Screen name="AppointmentsBooked" component={AppointmentsBooked} />
            <HomeStack.Screen name="ServiceListScreen" component={ServiceListScreen} />
            <HomeStack.Screen name="StaffDetails" component={StaffDetails} />
        </HomeStack.Navigator>
    );
}

// const AppStack = createStackNavigator();
// function AppStackScreen({ navigation }) {
//     return (
//         <AppStack.Navigator initialRouteName="AppScreen" headerMode='screen' >
//             <AppStack.Screen name="AppScreen" options={{
//                 title: 'BookeAppointments', headerStyle: {
//                     backgroundColor: '#FFFFFF',
//                     elevation: 0,
//                     shadowOpacity: 0,
//                     borderBottomWidth: 0,
//                 }, headerLeft: () =>
//                     <MenuIcon onPress={() => navigation.navigate("AppointmentsBooked")} />,

//             }}
//                 component={AppScreen} />
//         </AppStack.Navigator>
//     );
// }


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