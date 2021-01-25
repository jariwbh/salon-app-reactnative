import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, TextInput, Image, TouchableOpacity } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp, } from 'react-native-responsive-screen'

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
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false} >
                    <View style={styles.listview} >
                        <TouchableOpacity style={{ margin: hp('2%') }} >
                            <Image source={{ uri: staffDetails.property.profilepic ? staffDetails.property.profilepic : 'https://bootdey.com/img/Content/avatar/avatar6.png' }}
                                style={{ alignItems: 'center', height: hp('15%'), width: wp('30%'), marginTop: hp('2%'), borderRadius: hp('20%'), borderColor: '#FFFFFF', borderWidth: hp('1%') }}
                            />
                        </TouchableOpacity>
                        <View>
                            <Text style={{ flex: 1, fontSize: hp('3%'), color: '#000000', textAlign: 'center' }}>{staffDetails.property.fullname}</Text>
                            <Text style={{ flex: 1, fontSize: hp('3%'), color: '#000000', textAlign: 'center' }}>{staffDetails.property.mobile_number}</Text>
                            <Text style={{ flex: 1, fontSize: hp('3%'), color: '#000000', textAlign: 'center' }}>{staffDetails.property.email}</Text>
                            <Text style={{ flex: 1, fontSize: hp('3%'), color: '#000000', textAlign: 'center' }}>{staffDetails.property.description}</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

export default StaffDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    statusbar: {
        flexDirection: 'row',
        backgroundColor: "#fff",
        borderColor: '#FFFFFF',
        shadowOpacity: 0.5,
        shadowRadius: 3,
        shadowOffset: {
            height: 0,
            width: 0,
        },
        elevation: 2,
        marginTop: hp('5%'),
        width: wp('90%'),
        height: hp('6.5%'),
        marginLeft: hp('2.5%'),
        alignItems: "center",
        justifyContent: 'center',
    },
    statInput: {
        fontSize: hp('2.5%'),
        flex: 1,
        padding: hp('2%'),
        alignItems: "center",
    },
    listview: {
        flexDirection: 'row',
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
    },
})