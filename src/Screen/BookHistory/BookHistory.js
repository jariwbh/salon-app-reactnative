import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, FlatList, RefreshControl, SafeAreaView } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp, } from 'react-native-responsive-screen'
import moment from 'moment'
import Loading from '../../Components/Loader/Loader'
import { BookHistoryService } from '../../Services/BookHistoryService/BookHistoryService'
import AsyncStorage from '@react-native-community/async-storage'

class BookHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            _id: null,
            BookHistoryService: [],
            refreshing: false,
            loader: true,
        }
    }

    BookHistoryService(id) {
        BookHistoryService(id).then(response => {
            this.setState({ BookHistoryService: response.data })
            this.wait(1000).then(() => this.setState({ loader: false }));
        })
    }

    getdata = async () => {
        var getUser = await AsyncStorage.getItem('@authuser')
        if (getUser == null) {
            setTimeout(() => {
                this.props.navigation.replace('LoginScreen')
            }, 5000);
        } else {
            this.userid = JSON.parse(getUser)
            this.BookHistoryService(this.userid._id)
            this.setState({ _id: this.userid._id })
        }
    }

    wait = (timeout) => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }

    onRefresh = () => {
        const { _id } = this.state;
        this.setState({ refreshing: true })
        this.BookHistoryService(_id)
        this.wait(3000).then(() => this.setState({ refreshing: false }));
    }

    componentDidMount() {
        this.getdata();
    }

    renderBookHistoryService = ({ item }) => (
        <View style={styles.servicename}>
            <View style={{ margin: hp('2%') }}>
                <Image source={{ uri: item.refid.gallery[0].attachment }}
                    style={{ alignItems: 'center', height: hp('16%'), width: wp('32%'), marginTop: hp('0%'), borderRadius: hp('2%') }} />
            </View>
            <View style={{ marginLeft: hp('2%') }}>
                <Text style={{ fontSize: hp('1.5%') }}>Booking ID : #{item.prefix + '-' + item.number}</Text>
                <Text style={{ fontSize: hp('2.5%') }}>{item.refid.title}</Text>
                <Text style={{ fontSize: hp('2%') }}>{moment(item.appointmentdate).format('LL')}</Text>
                <Text style={{ fontSize: hp('2%') }}>₹ {item.refid.charges}</Text>
                {item.status == "requested" &&
                    <Text style={{ fontSize: hp('2%'), textTransform: 'capitalize', color: '#3788D8' }}>{item.status}</Text>
                }
                {item.status == "confirmed" &&
                    <Text style={{ fontSize: hp('2%'), textTransform: 'capitalize', color: '#9C27B0' }}>{item.status}</Text>
                }
                {item.status == "checkout" &&
                    <Text style={{ fontSize: hp('2%'), textTransform: 'capitalize', color: '#4CAF50' }}>{item.status}</Text>
                }
                {item.status == "cancel" &&
                    <Text style={{ fontSize: hp('2%'), textTransform: 'capitalize', color: '#F44336' }}>{item.status}</Text>
                }
                {item.status == "noshow" &&
                    <Text style={{ fontSize: hp('2%'), textTransform: 'capitalize', color: '#FF9800' }}>{item.status}</Text>
                }
            </View>
        </View>
    );

    render() {
        const { BookHistoryService, refreshing, loader } = this.state;
        this.wait(3000).then(() => this.setState({ refreshing: false }));
        return (
            <SafeAreaView style={styles.container}>
                {(BookHistoryService == null) || (BookHistoryService && BookHistoryService.length == 0)
                    ?
                    (loader == false ?
                        <View style={{ alignItems: "center", justifyContent: 'center', marginTop: ('30%') }}>
                            <Text style={{ alignItems: "center", justifyContent: 'center', fontSize: hp('2%'), color: '#595959' }}>Data Not Available</Text>
                        </View>
                        : <View style={{ marginTop: hp('15%') }}><Loading /></View>
                    )
                    :
                    <ScrollView refreshControl={<RefreshControl refreshing={refreshing} title="Pull to refresh" tintColor="#FEBC42" titleColor="#FEBC42" colors={["#FEBC42"]} onRefresh={this.onRefresh} />} showsVerticalScrollIndicator={false}>
                        <View style={{ alignItems: "center", marginTop: hp('2%'), marginBottom: hp('7%') }}>
                            <FlatList
                                data={BookHistoryService}
                                renderItem={this.renderBookHistoryService}
                                keyExtractor={item => `${item._id}`}
                            />
                        </View>
                    </ScrollView>
                }
            </SafeAreaView>
        );
    }
}

export default BookHistory;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    servicename: {
        aspectRatio: 2.5,
        width: wp("100%"),
        flexDirection: 'row',
        marginBottom: hp('2%'),
        alignItems: "center",
        position: 'relative',
        backgroundColor: "#fff",
        borderColor: '#fff',
        shadowOpacity: 2,
        shadowRadius: 3,
        shadowOffset: {
            height: 0,
            width: 0,
        },
        elevation: 2,
    }
})