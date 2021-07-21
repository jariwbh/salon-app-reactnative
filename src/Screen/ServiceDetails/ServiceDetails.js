import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import HTML from 'react-native-render-html';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default class ServiceDetails extends Component {
    constructor(props) {
        super(props);
        this.serviceDetails = this.props.route.params.item;
        this.state = {
            serviceID: this.serviceDetails._id,
            serviceImage: this.serviceDetails.gallery[0].attachment,
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
                <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'always'}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 50 }}>
                        <Image source={{ uri: serviceImage }} style={{ width: WIDTH - 20, height: HEIGHT / 3 }}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: -30, marginLeft: 20, marginRight: 20 }}>
                        <Text style={{ fontSize: 18 }}>{servicetitle}</Text>
                        <Text style={{ fontSize: 18 }}>₹ {servicecharges} </Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                        <View style={{ flex: 1, height: 1, backgroundColor: '#FEBC42' }} />
                        <View>
                            <Text style={{ width: 100, textAlign: 'center', fontSize: 16, color: '#FEBC42' }}>Details</Text>
                        </View>
                        <View style={{ flex: 1, height: 1, backgroundColor: '#FEBC42' }} />
                    </View>
                    <View style={{ flex: 1, marginTop: 5, marginLeft: 10, marginRight: 10, marginBottom: 140 }}>
                        <HTML source={{ html: servicedescription }} />
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity style={styles.book} onPress={() => { this.props.navigation.navigate('AppointmentsBooked', { serviceDetails }) }}>
                            <FontAwesome5 name="check-circle" size={24} color='#FFFFFF' style={{ margin: 5 }} />
                            <Text style={{ fontSize: 16, color: '#FFFFFF' }}>Book Now</Text>
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
        backgroundColor: "#fff",
    },
    book: {
        flexDirection: 'row',
        backgroundColor: "#FEBC42",
        marginTop: -120,
        width: WIDTH / 2 + 30,
        height: 50,
        alignItems: "center",
        justifyContent: 'center'
    }
})


