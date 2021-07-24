import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, Image, ScrollView, RefreshControl, SafeAreaView, BackHandler, StatusBar } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { CategoryService, AppointmentListService } from '../../Services/CategoryService/CategoryService';
import { staffService } from '../../Services/UserService/UserService';
import Loader from '../../Components/Loader/Loader';
const WIDTH = Dimensions.get('window').width;

class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            CategoryList: [],
            AppointmentList: [],
            staffList: [],
            loader: true,
            refreshing: false,
        };
        this._unsubscribeSiFocus = this.props.navigation.addListener('focus', e => {
            BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
        });

        this._unsubscribeSiBlur = this.props.navigation.addListener('blur', e => {
            BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton,
            );
        });
    }

    wait = (timeout) => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }

    onRefresh = () => {
        this.setState({ refreshing: true })
        this.getCategoryList();
        this.getAppointmentList();
        this.getstaffList();
        this.setState({ refreshing: false });
    }

    getCategoryList() {
        CategoryService().then(response => {
            this.setState({ CategoryList: response.data })
        })
    }

    getAppointmentList() {
        AppointmentListService().then(response => {
            const slice = response.data.slice(0, 4)
            this.setState({ AppointmentList: slice })
        })
    }

    getstaffList() {
        staffService().then(response => {
            this.setState({ staffList: response.data })
        })
    }

    componentDidMount() {
        this.getCategoryList();
        this.getAppointmentList();
        this.getstaffList();
    }

    componentWillUnmount() {
        this._unsubscribeSiFocus();
        this._unsubscribeSiBlur();
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton = () => {
        BackHandler.exitApp()
        return true;
    }

    renderCategoryList = ({ item }) => (
        <View style={{ flexDirection: 'column' }}>
            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', margin: 10 }} onPress={() => { this.props.navigation.navigate('ServiceListScreen', { item }) }}>
                {item && item.property && item.property.img && item.property.img[0] ?
                    <Image source={{ uri: (item.property.img && item.property.img[0].attachment) }}
                        style={{ alignItems: 'center', height: 80, width: 80, marginTop: 20, borderRadius: 100, borderColor: '#EEEEEE', borderWidth: 1 }}
                    />
                    :
                    <Image source={require('../../assets/noimage.png')}
                        style={{ alignItems: 'center', height: 80, width: 80, marginTop: 20, borderRadius: 100, borderColor: '#EEEEEE', borderWidth: 1 }}
                    />
                }
            </TouchableOpacity>
            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', width: 80 }}>
                <Text style={{ fontSize: 14, color: '#43434C', textTransform: 'capitalize', textAlign: 'center' }}>{item.property.name}</Text>
            </TouchableOpacity>
        </View>
    )

    renderAppointmentList = ({ item }) => (
        <View style={{ flexDirection: 'column', flex: 1 }}>
            <TouchableOpacity style={{ margin: 10 }} onPress={() => this.props.navigation.navigate('ServiceDetails', { item })}>
                <Image source={{ uri: (item.gallery[0] ? item.gallery[0].attachment : 'https://img.icons8.com/ios-glyphs/480/no-image.png') }}
                    style={{ alignItems: 'center', height: 150, width: 220, marginTop: 10, borderRadius: 10 }}
                />
            </TouchableOpacity>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
                <Text style={{ fontSize: 16, color: '#313131' }}>{item.title}</Text>
                <Text style={{ fontSize: 16, color: '#313131' }}>₹ {item.charges}</Text>
            </View>
        </View>
    )

    renderstaffList = ({ item }) => (
        <View style={{ flexDirection: 'column', marginBottom: 25, alignItems: 'center' }}>
            <TouchableOpacity style={{ margin: 15 }} onPress={() => this.props.navigation.navigate('StaffDetails', { item })}>
                <Image source={{ uri: item && item.property && item.property.profilepic ? item.property.profilepic : 'https://bootdey.com/img/Content/avatar/avatar6.png' }}
                    style={{ alignItems: 'center', height: 100, width: 100, marginTop: 10, borderRadius: 100 }}
                />
            </TouchableOpacity>
            <View style={{ width: 100 }}>
                <Text style={{ flex: 1, fontSize: 14, color: '#000000', textAlign: 'center', marginTop: -5 }}>{item.fullname}</Text>
            </View>
        </View>
    )

    render() {
        const { CategoryList, AppointmentList, staffList, loader, refreshing } = this.state
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor="#FEBC42" barStyle="dark-content" />
                {CategoryList == null || CategoryList.length == 0 ? <Loader /> :
                    <ScrollView refreshControl={<RefreshControl refreshing={refreshing} title="Pull to refresh" tintColor="#FEBC42" titleColor="#FEBC42" colors={["#FEBC42"]} onRefresh={this.onRefresh} />}
                        showsVerticalScrollIndicator={false}>
                        <View style={{ flexDirection: 'row', marginLeft: 5 }}>
                            <ScrollView
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                            >
                                <FlatList
                                    style={{ flexDirection: 'column' }}
                                    numColumns={10000}
                                    data={CategoryList}
                                    renderItem={this.renderCategoryList}
                                    keyExtractor={item => `${item._id}`}
                                />
                            </ScrollView>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
                            <View style={{ flex: 1, height: 1, backgroundColor: '#FEBC42' }} />
                            <View>
                                <Text style={{ width: 100, textAlign: 'center', fontSize: 20, color: '#FEBC42' }}>Featured</Text>
                            </View>
                            <View style={{ flex: 1, height: 1, backgroundColor: '#FEBC42' }} />
                        </View>
                        <View style={{ flexDirection: 'row', }}>
                            <ScrollView
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                            >
                                <FlatList
                                    style={{ flexDirection: 'row' }}
                                    numColumns={10000}
                                    data={AppointmentList}
                                    renderItem={this.renderAppointmentList}
                                    keyExtractor={item => `${item._id}`}
                                />
                            </ScrollView>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
                            <View style={{ flex: 1, height: 1, backgroundColor: '#FEBC42' }} />
                            <View>
                                <Text style={{ width: 150, textAlign: 'center', fontSize: 20, color: '#FEBC42' }}>Professionals</Text>
                            </View>
                            <View style={{ flex: 1, height: 1, backgroundColor: '#FEBC42' }} />
                        </View>
                        <View style={{ flexDirection: 'row', marginBottom: 25, marginLeft: 10 }}>
                            <ScrollView
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                            >
                                <FlatList
                                    style={{ flexDirection: 'row' }}
                                    numColumns={10000}
                                    data={staffList}
                                    renderItem={this.renderstaffList}
                                    keyExtractor={item => `${item._id}`}
                                />
                            </ScrollView>
                        </View>
                    </ScrollView>
                }
            </SafeAreaView>
        );
    }
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF"
    }
})