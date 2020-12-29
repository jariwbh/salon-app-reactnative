import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ToastAndroid, } from 'react-native';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen'
import { ScrollView } from 'react-native-gesture-handler';
// import { UpdateUserService } from '../../Services/UserService/UserService';

class UpdateProfile extends Component {
    // constructor(props) {
    //     super(props);
    //     this.companyData = this.props.route.params.companyData;
    //     this.state = {
    //         _id: this.companyData._id,
    //         fullname: this.companyData.property.fullname,
    //         fullnameError: null,
    //         username: this.companyData.property.email,
    //         usernameError: null,
    //         mobilenumber: this.companyData.property.mobile_number,
    //         mobilenumberError: null,
    //         userProfile: this.companyData.branchid.branchlogo,
    //         profileName: this.companyData.fullname,
    //         userMemberName: this.companyData.username
    //     }
    //     this.setFullName = this.setFullName.bind(this);
    //     this.setUserName = this.setUserName.bind(this);
    //     this.setMobileNumber = this.setMobileNumber.bind(this);
    //     this.onPressSubmit = this.onPressSubmit.bind(this);
    // }

    // setFullName(fullname) {
    //     if (!fullname || fullname.length <= 0) {
    //         return this.setState({ fullnameError: 'User Name cannot be empty' });
    //     }
    //     return this.setState({ fullname: fullname, fullnameError: null })
    // }

    // setUserName(email) {
    //     const re = /\S+@\S+\.\S+/;
    //     if (!email || email.length <= 0) {
    //         return this.setState({ usernameError: 'Email cannot be empty' });
    //     }
    //     if (!re.test(email)) {

    //         return this.setState({ usernameError: 'Ooops! We need a valid email address' });
    //     }
    //     return this.setState({ username: email, usernameError: null })
    // }

    // setMobileNumber(mobilenumber) {
    //     const reg = /^[0]?[789]\d{9}$/;
    //     if (!mobilenumber || mobilenumber.length <= 0) {
    //         return this.setState({ mobilenumberError: 'Mobile Number cannot be empty' });
    //     }
    //     if (!reg.test(mobilenumber)) {
    //         return this.setState({ mobilenumberError: 'Ooops! We need a valid Mobile Number' });
    //     }
    //     return this.setState({ mobilenumber: mobilenumber, mobilenumberError: null })
    // }

    // onPressSubmit = async () => {
    //     const { fullname, username, mobilenumber, _id, userMemberName } = this.state;
    //     if (!fullname || !username || !mobilenumber) {
    //         this.setFullName(fullname)
    //         this.setUserName(username)
    //         this.setMobileNumber(mobilenumber)
    //         return;
    //     }

    //     const body = {
    //         _id: _id,
    //         status: "active",
    //         username: userMemberName,
    //         property: {
    //             fullname: fullname,
    //             email: username,
    //             mobile_number: mobilenumber,
    //         }
    //     }

    //     await UpdateUserService(body).then(response => {
    //         console.log('response', response)
    //         if (response != null) {
    //             ToastAndroid.show("Your Profile Update!", ToastAndroid.LONG);
    //             this.props.navigation.navigate('Profile')
    //         }
    //     })
    // }

    render() {
        // const { fullname, username, mobilenumber, userProfile, profileName } = this.state;
        return (
            <View style={styles.container}>
                <Image style={styles.avatar} source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar6.png' }} />
                <View style={styles.body}>
                    <View style={styles.bodyContent}>
                        <Text style={styles.name}>Jon</Text>
                    </View>
                    <ScrollView
                        Vertical={true}
                        showsVerticalScrollIndicator={false}
                    >
                        <View style={{
                            flex: 1, flexDirection: 'column', alignItems: 'center'
                        }}>
                            <View style={styles.inputView}>

                                <TextInput
                                    label="Name"
                                    // defaultValue={fullname}
                                    style={styles.TextInput}
                                    placeholder="User Name"
                                    type='clear'
                                    placeholderTextColor="#ABAFB3"
                                    returnKeyType="next"
                                // onChangeText={(fullname) => this.setFullName(fullname)}
                                />
                            </View>
                            {/* <Text style={{ marginTop: hp('-3%'), marginLeft: wp('-20%'), color: '#ff0000' }}>{this.state.fullnameError && this.state.fullnameError}</Text> */}
                            <View style={styles.inputView}>

                                <TextInput
                                    // defaultValue={username}
                                    style={styles.TextInput}
                                    placeholder="Email Id"
                                    type='clear'
                                    placeholderTextColor="#ABAFB3"
                                    autoCapitalize="none"
                                    autoCompleteType="email"
                                    textContentType="emailAddress"
                                    keyboardType="email-address"
                                    returnKeyType="next"
                                // onChangeText={(username) => this.setUserName(username)}
                                />
                            </View>
                            {/* <Text style={{ marginTop: hp('-3%'), marginLeft: wp('-15%'), color: '#ff0000' }}>{this.state.usernameError && this.state.usernameError}</Text> */}
                            <View style={styles.inputView} >

                                <TextInput
                                    // defaultValue={mobilenumber}
                                    style={styles.TextInput}
                                    placeholder="Mobile Number"
                                    type='clear'
                                    placeholderTextColor="#ABAFB3"
                                    keyboardType="numeric"
                                    returnKeyType="done"
                                    onSubmitEditing={() => this.onPressSubmit()}
                                // onChangeText={(mobilenumber) => this.setMobileNumber(mobilenumber)}
                                />
                            </View>
                            {/* <Text style={{ marginTop: hp('-3%'), marginLeft: wp('-14%'), color: '#ff0000', }}></Text> */}
                            <TouchableOpacity style={styles.update_Btn} >
                                <Text style={styles.update_text} >Update Profile</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </View>
        );
    }
}

export default UpdateProfile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'

    },
    avatar: {
        width: hp('15%'),
        height: hp('15%'),
        borderRadius: wp('20%'),
        alignSelf: 'center',
        marginTop: hp('5%'),
        marginBottom: hp('3%')
    },
    bodyContent: {
        flex: 1,
        alignItems: 'center',
        paddingBottom: hp('8%')
    },
    name: {
        fontSize: hp('4%'),
        color: "#737373",
        fontWeight: 'bold',
        textTransform: 'capitalize'
    },
    inputView: {
        flexDirection: 'row',
        backgroundColor: "#fff",
        borderRadius: wp('8%'),
        shadowOpacity: 0.5,
        shadowRadius: 3,
        shadowOffset: {
            height: 0,
            width: 0,
        },
        elevation: 2,
        borderColor: '#fff',
        width: wp('80%'),
        height: hp('8%'),
        margin: hp('3%'),
        alignItems: "center",
    },
    TextInput: {
        fontSize: hp('2%'),
        flex: 1,
        padding: hp('2%'),
    },
    update_Btn: {
        flexDirection: 'row',
        backgroundColor: "#FEBC42",
        marginTop: hp('10%'),
        width: wp('60%'),
        height: hp('6.5%'),
        alignItems: "center",
        justifyContent: 'center'
    },
    update_text: {
        color: "white",
        fontWeight: 'bold',
        fontSize: hp('3%'),
    },
})

