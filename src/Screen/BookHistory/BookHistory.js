import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, FlatList, RefreshControl, SafeAreaView, Dimensions } from 'react-native';
import moment from 'moment'
import Loading from '../../Components/Loader/Loader'
import { BookHistoryService } from '../../Services/BookHistoryService/BookHistoryService'
import AsyncStorage from '@react-native-community/async-storage'
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

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
            }, 3000);
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
        this.wait(1000).then(() => this.setState({ refreshing: false }));
    }

    componentDidMount() {
        this.getdata();
    }

    renderBookHistoryService = ({ item }) => (
        <View style={styles.servicename}>
            <View style={{ margin: 10 }}>
                <Image source={{ uri: item.refid.gallery[0].attachment }}
                    style={{ alignItems: 'center', height: 130, width: 150, borderRadius: 10 }} />
            </View>
            <View style={{ marginLeft: 10, flex: 0.8 }}>
                <Text style={{ fontSize: 10 }}>Booking ID : #{item.prefix + '-' + item.number}</Text>
                <Text style={{ fontSize: 16 }}>{item.refid.title}</Text>
                <Text style={{ fontSize: 14 }}>{moment(item.appointmentdate).format('LL')}</Text>
                <Text style={{ fontSize: 14 }}>₹ {item.refid.charges}</Text>
                {item.status == "requested" &&
                    <Text style={{ fontSize: 14, textTransform: 'capitalize', color: '#3788D8' }}>{item.status}</Text>
                }
                {item.status == "confirmed" &&
                    <Text style={{ fontSize: 14, textTransform: 'capitalize', color: '#9C27B0' }}>{item.status}</Text>
                }
                {item.status == "checkout" &&
                    <Text style={{ fontSize: 14, textTransform: 'capitalize', color: '#4CAF50' }}>{item.status}</Text>
                }
                {item.status == "cancel" &&
                    <Text style={{ fontSize: 14, textTransform: 'capitalize', color: '#F44336' }}>{item.status}</Text>
                }
                {item.status == "noshow" &&
                    <Text style={{ fontSize: 14, textTransform: 'capitalize', color: '#FF9800' }}>{item.status}</Text>
                }
                {item.status == "deleted" &&
                    <Text style={{ fontSize: 14, textTransform: 'capitalize', color: '#FF9800' }}>{'cancel'}</Text>
                }
            </View>
        </View>
    );

    render() {
        const { BookHistoryService, refreshing, loader } = this.state;
        this.wait(1000).then(() => this.setState({ refreshing: false }));
        return (
            <SafeAreaView style={styles.container}>
                {(BookHistoryService == null) || (BookHistoryService && BookHistoryService.length == 0)
                    ?
                    (loader == false ?
                        <View style={{ alignItems: "center", justifyContent: 'center', marginTop: 100 }}>
                            <Text style={{ alignItems: "center", justifyContent: 'center', fontSize: 14, color: '#595959' }}>Data Not Available</Text>
                        </View>
                        : <View style={{ marginTop: HEIGHT / 2 - 80 }}><Loading /></View>
                    )
                    :
                    <ScrollView refreshControl={<RefreshControl refreshing={refreshing} title="Pull to refresh" tintColor="#FEBC42" titleColor="#FEBC42" colors={["#FEBC42"]} onRefresh={this.onRefresh} />} showsVerticalScrollIndicator={false}>
                        <View style={{ alignItems: "center", marginTop: 14, marginBottom: 50 }}>
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
        flex: 1
    },
    servicename: {
        aspectRatio: 2.5,
        width: WIDTH,
        flexDirection: 'row',
        marginBottom: 15,
        alignItems: "center",
        position: 'relative',
        backgroundColor: "#fff",
        borderColor: '#fff',
        shadowOpacity: 0,
        shadowRadius: 0,
        shadowOffset: {
            height: 0,
            width: 0,
        },
        elevation: 3
    }
})