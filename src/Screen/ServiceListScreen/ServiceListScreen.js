import React, { Component } from 'react';
import { View, Text, TextInput, FlatList, ScrollView, StyleSheet, TouchableOpacity, Image, Dimensions, SafeAreaView, Keyboard } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { CategoryByAppointmentService } from '../../Services/CategoryService/CategoryService'
import Loader from '../../Components/Loader/Loader'
const serviceicon = 'https://res.cloudinary.com/dnogrvbs2/image/upload/v1610428971/userimage_qif8wv.jpg'
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default class AppointmentScreen extends Component {
    constructor(props) {
        super(props);
        this.CategoryID = this.props.route.params.item._id;
        this.searchserviceList = [];
        this.state = {
            AppointmentService: [],
            loader: true
        };
    }

    getAppointmentList() {
        let id = this.CategoryID
        CategoryByAppointmentService(id).then(response => {
            this.setState({ AppointmentService: response.data })
            this.searchserviceList = response.data;
            this.setState({ loader: false });
        })
    }

    componentDidMount() {
        this.getAppointmentList();
    }

    wait = (timeout) => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }

    searchFilterFunction(text) {
        this.setState({ loader: true });
        const newData = this.searchserviceList.filter(item => {
            const itemData = `${item.title.toUpperCase()}`
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        return this.wait(1000).then(() => this.setState({ loader: false, AppointmentService: newData }));
    };

    renderAppointmentList = ({ item }) => (
        <TouchableOpacity style={styles.listview} onPress={() => this.props.navigation.navigate('ServiceDetails', { item })}>
            <TouchableOpacity style={{ marginLeft: 5 }} onPress={() => { this.props.navigation.navigate('ServiceDetails', { item }) }}>
                <Image source={{ uri: item.gallery[0] ? (item.gallery[0] ? item.gallery[0].attachment : serviceicon) : serviceicon }}
                    style={{ borderRadius: 100, width: 90, height: 90, }}
                />
            </TouchableOpacity>
            <View style={{ marginLeft: 5, flex: 0.9 }}>
                <Text style={{ fontSize: 18, color: '#212121' }}>{item.title}</Text>
                <Text style={{ fontSize: 14, color: '#313131' }}>₹ {item.charges}</Text>
            </View>
        </TouchableOpacity>
    )

    render() {
        const { AppointmentService, loader } = this.state
        return (
            <SafeAreaView style={styles.container}>
                <View style={{ alignItems: "center", justifyContent: 'center' }}>
                    <View style={styles.statusbar}>
                        <TextInput
                            style={styles.statInput}
                            placeholder="Type here to search"
                            type='clear'
                            placeholderTextColor="#737373"
                            returnKeyType="done"
                            autoCapitalize="none"
                            autoCorrect={false}
                            onChangeText={(value) => this.searchFilterFunction(value)}
                        />
                        <TouchableOpacity onPress={() => Keyboard.dismiss()}>
                            <FontAwesome5 name="search" size={24} color='#808080' style={{ alignItems: "flex-end", justifyContent: 'flex-end', marginRight: 15 }} />
                        </TouchableOpacity>
                    </View>

                    {(AppointmentService == null) || (AppointmentService && AppointmentService.length == 0) ?
                        (loader == false ?
                            <Text style={{ textAlign: 'center', fontSize: 16, color: '#747474', marginTop: 50 }}>No Service Available</Text>
                            : <View style={{ marginTop: HEIGHT / 2 }}><Loader /></View>
                        )
                        :
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View style={{ flexDirection: 'column', flex: 1, marginTop: 10 }}>
                                <FlatList
                                    data={AppointmentService}
                                    renderItem={this.renderAppointmentList}
                                    keyExtractor={item => `${item._id}`}
                                />
                            </View>
                            <View style={{ marginBottom: 50 }}></View>
                        </ScrollView>
                    }
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    statusbar: {
        flexDirection: 'row',
        backgroundColor: "#fff",
        borderColor: '#737373',
        shadowOpacity: 0.5,
        shadowRadius: 2,
        shadowOffset: {
            height: 0,
            width: 0,
        },
        elevation: 2,
        marginTop: 15,
        width: WIDTH - 40,
        height: 50,
        alignItems: "center",
        justifyContent: 'center',
        borderRadius: 10
    },
    statInput: {
        fontSize: 14,
        flex: 1,
        marginLeft: 10,
        alignItems: "center"
    },
    listview: {
        flexDirection: 'row',
        borderRadius: 10,
        backgroundColor: "#fff",
        shadowOpacity: 0.5,
        shadowRadius: 2,
        shadowOffset: {
            height: 0,
            width: 0,
        },
        elevation: 2,
        width: WIDTH - 40,
        height: 130,
        marginLeft: 0,
        marginTop: 10,
        justifyContent: 'space-around',
        marginBottom: 10,
        alignItems: 'center'
    },
})