import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ToastAndroid, ScrollView, SafeAreaView } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { UpdateUserService } from '../../Services/UserService/UserService';
import Loader from '../../Components/Loader/Loader';
import Loading from '../../Components/Loader/Loading';
import AsyncStorage from '@react-native-community/async-storage'

class UpdateProfile extends Component {
    constructor(props) {
        super(props);
        this.companyData = this.props.route.params.companyData;
        this.state = {
            _id: this.companyData._id,
            fullname: this.companyData.property.fullname,
            fullnameError: null,
            username: this.companyData.property.email,
            usernameError: null,
            mobilenumber: this.companyData.property.mobile_number,
            mobilenumberError: null,
            userProfile: this.companyData.branchid.branchlogo,
            profileName: this.companyData.fullname,
            memberName: this.companyData.username,
            loading: false,
        }
        this.setFullName = this.setFullName.bind(this);
        this.setUserName = this.setUserName.bind(this);
        this.setMobileNumber = this.setMobileNumber.bind(this);
        this.onPressSubmit = this.onPressSubmit.bind(this);
        this.secondTextInputRef = React.createRef();
        this.TeardTextInputRef = React.createRef();
    }

    setFullName(fullname) {
        if (!fullname || fullname.length <= 0) {
            return this.setState({ fullnameError: 'User Name cannot be empty', fullname: null });
        }
        return this.setState({ fullname: fullname, fullnameError: null })
    }

    setUserName(email) {
        const re = /\S+@\S+\.\S+/;
        if (!email || email.length <= 0) {
            return this.setState({ usernameError: 'Email cannot be empty', username: null });
        }
        if (!re.test(email)) {

            return this.setState({ usernameError: 'Ooops! We need a valid email address' });
        }
        return this.setState({ username: email, usernameError: null })
    }

    setMobileNumber(mobilenumber) {
        const reg = /^[0]?[789]\d{9}$/;
        if (!mobilenumber || mobilenumber.length <= 0) {
            return this.setState({ mobilenumberError: 'Mobile Number cannot be empty', mobilenumber: null });
        }
        if (!reg.test(mobilenumber)) {
            return this.setState({ mobilenumberError: 'Ooops! We need a valid Mobile Number' });
        }
        return this.setState({ mobilenumber: mobilenumber, mobilenumberError: null })
    }

    authenticateUser = (user) => {
        AsyncStorage.setItem('@authuser', JSON.stringify(user));
    }

    onPressSubmit = async () => {
        const { fullname, username, mobilenumber, _id, memberName } = this.state;
        if (!fullname || !username || !mobilenumber) {
            this.setFullName(fullname)
            this.setUserName(username)
            this.setMobileNumber(mobilenumber)
            return;
        }

        const body = {
            _id: _id,
            status: "active",
            username: memberName,
            property: {
                fullname: fullname,
                email: username,
                mobile_number: mobilenumber,
            }
        }

        this.setState({ loading: true })

        try {
            await UpdateUserService(body).then(response => {
                if (response != null) {
                    console.log('response.data.user', response.data)
                    this.authenticateUser(response.data)
                    ToastAndroid.show("Your Profile Update!", ToastAndroid.LONG);
                    this.props.navigation.replace('MyProfile');
                }
            })
        }
        catch (error) {
            this.setState({ loading: false })
            ToastAndroid.show("Your Profile Not Update!", ToastAndroid.LONG)
        }
    }

    render() {
        const { fullname, username, mobilenumber, userProfile, profileName, loading, fullnameError, usernameError, mobilenumberError } = this.state;
        return (
            <SafeAreaView style={styles.container}>
                {this.userData === null ?
                    <Loader />
                    : <>
                        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'always'}>
                            <Image style={styles.avatar} source={{ uri: userProfile && userProfile !== null ? userProfile : "https://res.cloudinary.com/dnogrvbs2/image/upload/v1610428971/userimage_qif8wv.jpg" }} />
                            <View style={styles.body}>
                                <View style={{
                                    flex: 1, flexDirection: 'column', alignItems: 'center'
                                }}>
                                    <View style={styles.bodyContent}>
                                        <Text style={styles.name}>{profileName && profileName}</Text>
                                    </View>
                                    <View style={styles.inputView}>
                                        <TextInput
                                            style={fullnameError == null ? styles.TextInput : styles.TextInputError}
                                            label="Name"
                                            defaultValue={fullname}
                                            placeholder="User Name"
                                            type='clear'
                                            placeholderTextColor="#ABAFB3"
                                            returnKeyType="next"
                                            blurOnSubmit={false}
                                            onSubmitEditing={() => { this.secondTextInputRef.current.focus() }}
                                            onChangeText={(fullname) => this.setFullName(fullname)}
                                        />
                                    </View>
                                    <View style={styles.inputView}>
                                        <TextInput
                                            style={usernameError == null ? styles.TextInput : styles.TextInputError}
                                            defaultValue={username}
                                            placeholder="Email Id"
                                            type='clear'
                                            placeholderTextColor="#ABAFB3"
                                            autoCapitalize="none"
                                            autoCompleteType="email"
                                            textContentType="emailAddress"
                                            keyboardType="email-address"
                                            returnKeyType="next"
                                            blurOnSubmit={false}
                                            onSubmitEditing={() => { this.TeardTextInputRef.current.focus() }}
                                            ref={this.secondTextInputRef}
                                            onChangeText={(username) => this.setUserName(username)}
                                        />
                                    </View>
                                    <View style={styles.inputView} >
                                        <TextInput
                                            style={mobilenumberError == null ? styles.TextInput : styles.TextInputError}
                                            defaultValue={mobilenumber}
                                            placeholder="Mobile Number"
                                            type='clear'
                                            placeholderTextColor="#ABAFB3"
                                            keyboardType="numeric"
                                            returnKeyType="done"
                                            ref={this.TeardTextInputRef}
                                            onSubmitEditing={() => this.onPressSubmit()}
                                            onChangeText={(mobilenumber) => this.setMobileNumber(mobilenumber)}
                                        />
                                    </View>
                                    <TouchableOpacity style={styles.update_Btn} onPress={() => this.onPressSubmit()}>
                                        {loading == true ? <Loading /> : <Text style={styles.update_text} >Update Profile</Text>}
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </ScrollView>
                    </>}
            </SafeAreaView>
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
        marginTop: hp('2%'),
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
        marginBottom: hp('3%'),
        alignItems: "center",
    },
    TextInput: {
        fontSize: hp('2.5%'),
        flex: 1,
        padding: hp('2%'),
        borderColor: '#FFFFFF'
    },
    TextInputError: {
        fontSize: hp('2.5%'),
        flex: 1,
        padding: hp('2%'),
        backgroundColor: "#FFFFFF",
        borderColor: '#FF0000',
        borderRadius: wp('8%'),
        width: wp('80%'),
        height: hp('8%'),
        alignItems: "center",
        borderWidth: hp('0.1%')
    },
    update_Btn: {
        flexDirection: 'row',
        backgroundColor: "#FEBC42",
        marginTop: hp('2%'),
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

