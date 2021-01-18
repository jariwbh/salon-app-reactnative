import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp, } from 'react-native-responsive-screen'

class BookHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{ alignItems: "center", marginTop: hp('5%') }}>
                    <View style={styles.servicename}>
                        <View style={{ margin: hp('2%') }}>
                            <Image source={{ uri: ('https://www.icon0.com/static2/preview2/stock-photo-photo-icon-illustration-design-70325.jpg') }} style={{ alignItems: 'center', height: hp('15%'), width: wp('30%'), marginTop: hp('0%'), borderRadius: hp('2%') }}
                            />
                        </View>
                        <View>
                            <Text style={{ fontSize: hp('2%') }}>jon</Text>
                            <Text style={{ fontSize: hp('2%') }}>surat</Text>
                            <Text style={{ fontSize: hp('2%') }}>Appoiment service name</Text>
                            <Text style={{ fontSize: hp('2%') }}>Date</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

export default BookHistory;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",

    },
    servicename: {
        aspectRatio: 2.5,
        paddingHorizontal: hp('2%'),
        width: wp("90%"),
        flexDirection: 'row',
        // justifyContent: 'space-between',
        marginBottom: hp('2.5%'),
        borderRadius: wp('6%'),
        alignItems: "center",
        position: 'relative',
        backgroundColor: "#fff",
        borderColor: '#fff',
        shadowOpacity: 0.5,
        shadowRadius: 3,
        shadowOffset: {
            height: 0,
            width: 0,
        },
        elevation: 2,
    },
})