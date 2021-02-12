import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, TextInput, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp, } from 'react-native-responsive-screen'
import { Rating, AirbnbRating } from 'react-native-ratings';

class StaffDetails extends Component {
    constructor(props) {
        super(props);
        this.staffDetails = this.props.route.params.item;
        this.state = {
            staffDetails: this.staffDetails
        };
    }

    render() {
        const { staffDetails } = this.state
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false} >
                    <View style={{ marginBottom: hp('10%') }} >
                        <View style={{ margin: hp('2%'), justifyContent: 'center', alignItems: 'center' }} >
                            <Image source={{ uri: staffDetails.property.profilepic ? staffDetails.property.profilepic : 'https://bootdey.com/img/Content/avatar/avatar6.png' }}
                                style={{ alignItems: 'center', height: 100, width: 100, marginTop: hp('2%'), borderRadius: hp('20%'), borderColor: '#FFFFFF', borderWidth: hp('1%') }}
                            />
                        </View>
                        <View>
                            <Text style={{ flex: 1, fontSize: hp('3%'), color: '#000000', textAlign: 'center' }}>{staffDetails.property.fullname}</Text>
                            <View style={styles.listview}>
                                <Text style={{ fontSize: hp('3%'), color: '#000000', textAlign: 'center', marginTop: hp('2%'), }}>{staffDetails.property.mobile_number}</Text>
                                <Text style={{ fontSize: hp('3%'), color: '#000000', textAlign: 'center', marginTop: hp('1%'), }}>{staffDetails.property.email}</Text>
                                <View style={{ marginTop: hp('2%'), }}>
                                    <Rating readonly startingValue="{5}" ratingCount={5} />
                                </View>
                                <View style={{ marginTop: hp('2%'), marginLeft: hp('1%'), marginRight: hp('1%') }}>
                                    <Text style={{ fontSize: hp('2%'), color: '#000000', textAlign: 'center', }}>{staffDetails.property.description}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

export default StaffDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    listview: {
        flexDirection: 'column',
        borderRadius: hp('2%'),
        backgroundColor: "#FFFFFF",
        shadowOpacity: 0.5,
        shadowRadius: 2,
        shadowOffset: {
            height: 0,
            width: 0,
        },
        elevation: 2,
        marginTop: hp('2%'),
        width: wp('90%'),
        height: hp('50%'),
        marginLeft: hp('2.5%'),
        marginBottom: hp('2%'),
    }
})