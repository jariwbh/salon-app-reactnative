import React, { Component } from 'react';
import {
    View, Text, ScrollView, StyleSheet, Dimensions, StatusBar,
    TouchableOpacity, Image, SafeAreaView
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import HTML from 'react-native-render-html';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
import * as TYPE from '../../context/actions/type';
import * as KEY from '../../context/actions/key';
import * as COLOR from '../../styles/colors';
import * as FONT from '../../styles/typography';
import * as IMAGE from '../../styles/image';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-community/async-storage';
import getCurrency from '../../Services/getCurrencyService/getCurrency';

export default class PackageDetails extends Component {
    constructor(props) {
        super(props);
        this.serviceDetails = this.props.route.params.item;
        this.state = {
            serviceID: this.serviceDetails._id,
            serviceImage: this.serviceDetails && this.serviceDetails.property && this.serviceDetails.property.image && this.serviceDetails.property.image[0] && this.serviceDetails.property.image[0].attachment ? this.serviceDetails.property.image[0].attachment : TYPE.DefaultImage,
            servicetitle: this.serviceDetails.membershipname,
            servicecharges: this.serviceDetails.property && this.serviceDetails.property.cost ? this.serviceDetails.property.cost : 0,
            servicedescription: this.serviceDetails.property && this.serviceDetails.property.description ? this.serviceDetails.property.description : null,
            currencySymbol: null
        };
    }

    componentDidMount() {
        this.getDefaultUser();
    }

    getDefaultUser = async () => {
        var getUser = await AsyncStorage.getItem(TYPE.AUTHUSER);
        if (getUser !== null) {
            var userData = JSON.parse(getUser);
            const responseCurrency = getCurrency(userData.branchid.currency);
            this.setState({ currencySymbol: responseCurrency });
        } else {
            var getUser = await AsyncStorage.getItem(TYPE.DEFAULTUSER);
            var userData = JSON.parse(getUser);
            const responseCurrency = getCurrency(userData.branchid.currency);
            this.setState({ currencySymbol: responseCurrency });
        }
    }

    render() {
        const { serviceID, serviceImage, servicetitle, servicecharges, servicedescription, currencySymbol } = this.state
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor={COLOR.STATUSBARCOLOR} barStyle={KEY.LIGHT_CONTENT} />
                <View style={styles.headerstyle}>
                    <View style={{ justifyContent: KEY.SPACEBETWEEN, alignItems: KEY.CENTER, flexDirection: KEY.ROW, marginTop: 30 }}>
                        <View style={{ flexDirection: KEY.ROW, justifyContent: KEY.FLEX_START, alignItems: KEY.CENTER, marginLeft: 20 }}>
                            <TouchableOpacity onPress={() => this.props.navigation.goBack(null)}>
                                <AntDesign name='arrowleft' color={COLOR.WHITE} size={24} />
                            </TouchableOpacity>
                            <View style={{ justifyContent: KEY.CENTER, marginLeft: WIDTH / 5 }}>
                                <Text style={{ fontSize: 22, color: COLOR.WHITE, fontWeight: 'bold' }}>{'Package Details'}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={KEY.ALWAYS}>
                    <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, marginBottom: 50 }}>
                        <Image source={{ uri: serviceImage }} style={{ width: WIDTH - 20, height: HEIGHT / 3, borderRadius: 10 }}
                        />
                    </View>
                    <View style={{ flexDirection: KEY.ROW, justifyContent: KEY.SPACEBETWEEN, marginTop: -30, marginLeft: 20, marginRight: 20 }}>
                        <Text style={{ fontSize: 18, color: COLOR.DEFALUTCOLOR, width: WIDTH / 2 }}>{servicetitle}</Text>
                        <Text style={{ fontSize: 18, color: COLOR.DEFALUTCOLOR }}>{currencySymbol + ' ' + servicecharges} </Text>
                    </View>
                    <Text style={{ fontSize: FONT.FONT_SIZE_18, color: COLOR.BLACK, marginTop: 10, marginLeft: 20 }}>Description</Text>
                    <View style={{ flex: 1, marginTop: 10, marginLeft: 20, marginRight: 10, marginBottom: 0 }}>
                        {
                            servicedescription &&
                            <HTML source={{ html: servicedescription }} />
                        }
                    </View>
                    <View style={{
                        justifyContent: KEY.SPACEBETWEEN, flexDirection: KEY.ROW,
                        alignItems: KEY.CENTER, marginLeft: 20, marginRight: 20, marginTop: 10
                    }}>
                        <Text style={{ fontSize: FONT.FONT_SIZE_18, color: COLOR.DEFALUTCOLOR }}>Service</Text>
                        <Text style={{ fontSize: FONT.FONT_SIZE_18, color: COLOR.DEFALUTCOLOR }}>Cost</Text>
                    </View>
                    {(this.serviceDetails && this.serviceDetails.services && this.serviceDetails.services.length > 0)
                        ?
                        <View>
                            <View style={{ borderBottomColor: COLOR.BLACK, borderBottomWidth: 1, marginTop: 10, marginLeft: 20, marginRight: 20 }} />
                            {this.serviceDetails.services.map((item) => (
                                <>
                                    <View style={{
                                        justifyContent: KEY.SPACEBETWEEN, flexDirection: KEY.ROW,
                                        alignItems: KEY.CENTER, marginLeft: 20, marginRight: 20, marginTop: 10
                                    }}>
                                        <Text style={{ fontSize: FONT.FONT_SIZE_14, color: COLOR.BLACK, width: WIDTH / 2 }}>{item.serviceid.title}</Text>
                                        <Text style={{ fontSize: FONT.FONT_SIZE_14, color: COLOR.BLACK }}>{currencySymbol + ' ' + item.serviceid.charges}</Text>
                                    </View>
                                    <View style={{ borderBottomColor: COLOR.BLACK, borderBottomWidth: 1, marginTop: 10, marginLeft: 20, marginRight: 20 }} />
                                </>
                            ))}
                            <View style={{ marginBottom: 150 }} />
                        </View>
                        :
                        null
                    }
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.BACKGROUNDCOLOR
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
    },
    headerstyle: {
        backgroundColor: COLOR.STATUSBARCOLOR,
        width: WIDTH,
        height: 90,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        marginBottom: 20
    },
    viewdrop: {
        justifyContent: KEY.SPACEBETWEEN,
        alignItems: KEY.CENTER,
        flexDirection: KEY.ROW,
        height: 50,
        marginTop: 10,
        marginBottom: 10,
        width: WIDTH - 30,
        backgroundColor: COLOR.WHITE,
        borderRadius: 5,
        marginLeft: 15,
        shadowColor: COLOR.BLACK,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
    },
    viewdropSecond: {
        justifyContent: KEY.SPACEBETWEEN,
        alignItems: KEY.CENTER,
        flexDirection: KEY.ROW,
        marginTop: 15,
        width: WIDTH - 30,
        backgroundColor: COLOR.WHITE,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        height: 45,
        marginLeft: 15,
        shadowColor: COLOR.BLACK,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
    },
    subView: {
        marginTop: 0,
        width: WIDTH - 30,
        backgroundColor: COLOR.WHITE,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        height: 110,
        marginLeft: 15,
        shadowColor: COLOR.BLACK,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        marginBottom: 5,
        elevation: 2,
    },
    listSection: {
        backgroundColor: COLOR.WHITE,
        width: WIDTH - 30,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        marginBottom: 10
    },
    listAccordion: {
        backgroundColor: COLOR.WHITE,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,

    },
    gridContainer: {
        width: 220,
    },
    rowStyle: {
        flexDirection: KEY.ROW,
        alignItems: KEY.CENTER,
        justifyContent: KEY.SPACEAROUND,
    },
    cellStyle: {
        flex: 1,
        margin: 10,
    }
})


