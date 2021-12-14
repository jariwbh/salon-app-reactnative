import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import HTML from 'react-native-render-html';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const serviceicon = 'https://res.cloudinary.com/dnogrvbs2/image/upload/v1610428971/userimage_qif8wv.jpg'
import * as KEY from '../../context/actions/key';
import * as COLOR from '../../styles/colors';
import * as IMAGE from '../../styles/image';
import Loader from '../../Components/Loader/Loader';

export default class ServiceDetails extends Component {
    constructor(props) {
        super(props);
        this.serviceDetails = this.props.route.params.item;
        this.state = {
            serviceID: this.serviceDetails._id,
            serviceImage: this.serviceDetails.gallery && this.serviceDetails.gallery[0] && this.serviceDetails.gallery[0].attachment ? this.serviceDetails.gallery[0].attachment : serviceicon,
            servicetitle: this.serviceDetails.title,
            servicecharges: this.serviceDetails.charges,
            servicedescription: this.serviceDetails.description,
            serviceDetails: this.serviceDetails
        };
    }

    render() {
        const { serviceID, serviceImage, servicetitle, servicecharges, servicedescription, serviceDetails } = this.state
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={KEY.ALWAYS}>
                    <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, marginBottom: 50 }}>
                        <Image source={{ uri: serviceImage }} style={{ width: WIDTH - 20, height: HEIGHT / 3 }}
                        />
                    </View>
                    <View style={{ flexDirection: KEY.ROW, justifyContent: KEY.SPACEBETWEEN, marginTop: -30, marginLeft: 20, marginRight: 20 }}>
                        <Text style={{ fontSize: 18, color: COLOR.BLACK, width: WIDTH / 2 }}>{servicetitle}</Text>
                        <Text style={{ fontSize: 18, color: COLOR.BLACK }}>₹ {servicecharges} </Text>
                    </View>

                    <View style={{ flex: 1, marginTop: 10, marginLeft: 10, marginRight: 10, marginBottom: 140 }}>
                        <HTML source={{ html: servicedescription }} />
                    </View>
                    <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                        <TouchableOpacity style={styles.book} onPress={() => { this.props.navigation.navigate('AppointmentsBooked', { serviceDetails }) }}>
                            <FontAwesome5 name="check-circle" size={24} color={COLOR.WHITE} style={{ margin: 5 }} />
                            <Text style={{ fontSize: 16, color: COLOR.WHITE }}>Book Now</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.DEFAULTLIGHT
    },
    book: {
        flexDirection: KEY.ROW,
        backgroundColor: COLOR.DEFALUTCOLOR,
        marginTop: -150,
        width: WIDTH / 2 + 50,
        height: 50,
        borderRadius: 30,
        alignItems: KEY.CENTER,
        justifyContent: KEY.CENTER,
        marginBottom: 50
    }
})


