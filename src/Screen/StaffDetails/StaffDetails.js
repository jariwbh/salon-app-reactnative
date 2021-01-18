import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, TextInput, Image, TouchableOpacity } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp, } from 'react-native-responsive-screen'
import { FontAwesome5 } from '@expo/vector-icons';
import { staffService } from '../../Services/UserService/UserService';

class StaffDetails extends Component {
    constructor(props) {
        super(props);
        this.userID = this.props.route.params.item;
        this.state = {
            staffDetails: []
        };
    }

    getstaffDetails() {
        let id = this.userID
        console.log(id);
        staffService(id).then(response => {
            console.log({ staffDetails: response });
            this.setState({ staffDetails: response })
        })
    }
    componentDidMount() {
        this.getstaffDetails();
    }

    renderstaffDetails = ({ item }) => (
        <View style={styles.listview} >
            <TouchableOpacity style={{ margin: hp('2%') }} onPress={() => this.props.navigation.navigate('StaffDetails', { item })}>
                <Image source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar6.png' }}
                    style={{ alignItems: 'center', height: hp('15%'), width: wp('30%'), marginTop: hp('2%'), borderRadius: hp('20%'), borderColor: '#FFFFFF', borderWidth: hp('1%') }}
                />
            </TouchableOpacity>
            <View>
                <Text style={{ flex: 1, fontSize: hp('3%'), color: '#FEBC42', textAlign: 'center' }}>{item.property.fullname}</Text>
                <Text style={{ flex: 1, fontSize: hp('3%'), color: '#FEBC42', textAlign: 'center' }}>{item.property.username}</Text>
            </View>

        </View>
    )
    render() {
        const { staffDetails } = this.state
        return (
            <View style={styles.container}>
                <View style={styles.statusbar}>
                    <TextInput
                        style={styles.statInput}
                        placeholder="Type here to search"
                        type='clear'
                        placeholderTextColor="#D3D4DA"
                        returnKeyType="done"
                        autoCapitalize="none"
                        autoCorrect={false}
                    // onChangeText={(value) => this.searchFilterFunction(value)}
                    />
                    <FontAwesome5 name="search" size={24} color='#000000' style={{ alignItems: "flex-end", justifyContent: 'flex-end', marginRight: hp('2%') }} />
                </View>
                <ScrollView
                    Vertical={true}
                    showsVerticalScrollIndicator={false}
                >
                    <FlatList
                        data={staffDetails}
                        renderItem={this.renderstaffDetails}
                        keyExtractor={item => `${item._id}`}
                    />
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
        height: hp('20%'),
        marginLeft: hp('2.5%'),

    },
})