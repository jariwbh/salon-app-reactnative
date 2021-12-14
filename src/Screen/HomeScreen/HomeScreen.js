import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, Image, ScrollView, RefreshControl, SafeAreaView, BackHandler, StatusBar } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { CategoryService, AppointmentListService } from '../../Services/CategoryService/CategoryService';
import { staffService } from '../../Services/UserService/UserService';
import Loader from '../../Components/Loader/Loader';
const WIDTH = Dimensions.get('window').width;
import * as KEY from '../../context/actions/key';
import * as COLOR from '../../styles/colors';
import * as IMAGE from '../../styles/image';

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
        this.wait(1000).then(() => this.setState({ refreshing: false }));
    }

    getCategoryList() {
        CategoryService().then(response => {
            this.setState({ CategoryList: response.data });
            this.wait(1000).then(() => this.setState({ loader: false }));
        })
    }

    getAppointmentList() {
        AppointmentListService().then(response => {
            const slice = response.data.slice(0, 4)
            this.setState({ AppointmentList: slice })
            this.wait(1000).then(() => this.setState({ loader: false }));
        })
    }

    getstaffList() {
        staffService().then(response => {
            if (response.data != null && response.data != 'undefind' && response.status == 200) {
                const slice = response.data.slice(0, 5)
                this.setState({ staffList: slice })
            }
        })
    }

    componentDidMount() {
        this.getCategoryList();
        this.getAppointmentList();
        this.getstaffList();
    }

    renderCategoryList = ({ item }) => (
        <View style={{ flexDirection: KEY.COLUMN }}>
            <TouchableOpacity style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, margin: 10 }} onPress={() => { this.props.navigation.navigate('ServiceListScreen', { item }) }}>
                {item && item.property && item.property.img && item.property.img[0] ?
                    <Image source={{ uri: (item.property.img && item.property.img[0].attachment) }}
                        style={{ alignItems: KEY.CENTER, height: 80, width: 80, marginTop: 20, borderRadius: 100, borderColor: COLOR.BRIGHT_GRAY, borderWidth: 1 }}
                    />
                    :
                    <Image source={require('../../assets/noimage.png')}
                        style={{ alignItems: KEY.CENTER, height: 80, width: 80, marginTop: 20, borderRadius: 100, borderColor: COLOR.BRIGHT_GRAY, borderWidth: 1 }}
                    />
                }
            </TouchableOpacity>
            <TouchableOpacity style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER, width: 80 }}>
                <Text style={{ fontSize: 14, color: COLOR.BLACK, textTransform: KEY.CAPITALIZE, textAlign: KEY.CENTER }}>{item.property.name}</Text>
            </TouchableOpacity>
        </View>
    )

    renderAppointmentList = ({ item }) => (
        <View style={{ flexDirection: KEY.COLUMN }}>
            <TouchableOpacity style={{ margin: 10 }} onPress={() => this.props.navigation.navigate('ServiceDetails', { item })}>
                <Image source={{ uri: (item.gallery[0] ? item.gallery[0].attachment : 'https://img.icons8.com/ios-glyphs/480/no-image.png') }}
                    style={{ alignItems: KEY.CENTER, height: 150, width: WIDTH - 40, marginTop: 10, borderRadius: 10, resizeMode: KEY.COVER }}
                />
            </TouchableOpacity>
            <View style={{ flexDirection: KEY.ROW, justifyContent: KEY.SPACEBETWEEN, marginLeft: 10, marginRight: 10 }}>
                <Text style={{ fontSize: 16, color: COLOR.BLACK, width: WIDTH / 2 }}>{item.title}</Text>
                <Text style={{ fontSize: 16, color: COLOR.BLACK }}>₹ {item.charges}</Text>
            </View>
        </View>
    )

    // <TouchableOpacity style={{ margin: 15 }} onPress={() => this.props.navigation.navigate('StaffDetails', { item })}>
    renderstaffList = ({ item }) => (
        <View style={{ flexDirection: KEY.COLUMN, marginBottom: 25, alignItems: KEY.CENTER }}>
            <TouchableOpacity style={{ margin: 15 }}>
                <Image source={{ uri: item && item.profilepic ? item.profilepic : 'https://bootdey.com/img/Content/avatar/avatar6.png' }}
                    style={{ alignItems: KEY.CENTER, height: 100, width: 100, marginTop: 10, borderRadius: 100 }}
                />
            </TouchableOpacity>
            <View style={{ width: 100 }}>
                <Text style={{ flex: 1, fontSize: 14, color: COLOR.BLACK, textAlign: KEY.CENTER, marginTop: -5 }}>{item.fullname}</Text>
            </View>
        </View>
    )

    render() {
        const { CategoryList, AppointmentList, staffList, loader, refreshing } = this.state
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor={COLOR.DEFAULTLIGHT} barStyle={KEY.DARK_CONTENT} />
                {CategoryList == null || CategoryList.length == 0 ? <Loader /> :
                    <ScrollView
                        refreshControl={<RefreshControl refreshing={refreshing} title="Pull to refresh" tintColor={COLOR.DEFALUTCOLOR} titleColor={COLOR.DEFALUTCOLOR} colors={[COLOR.DEFALUTCOLOR]} onRefresh={this.onRefresh} />}
                        showsVerticalScrollIndicator={false}>
                        <View style={{ flexDirection: KEY.ROW, marginLeft: 5 }}>
                            <ScrollView
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                            >
                                <FlatList
                                    style={{ flexDirection: KEY.COLUMN }}
                                    numColumns={10000}
                                    data={CategoryList}
                                    renderItem={this.renderCategoryList}
                                    keyExtractor={item => `${item._id}`}
                                />
                            </ScrollView>
                        </View>
                        <View style={{ flexDirection: KEY.ROW, alignItems: KEY.CENTER, marginTop: 12 }}>
                            <View style={{ flex: 1, height: 1, backgroundColor: COLOR.DEFALUTCOLOR }} />
                            <View>
                                <Text style={{ width: 130, textAlign: KEY.CENTER, fontSize: 20, color: COLOR.DEFALUTCOLOR }}>Top Services</Text>
                            </View>
                            <View style={{ flex: 1, height: 1, backgroundColor: COLOR.DEFALUTCOLOR }} />
                        </View>
                        <View style={{ flexDirection: KEY.ROW, alignItems: KEY.CENTER }}>
                            <FlatList
                                // numColumns={10000}
                                data={AppointmentList}
                                showsVerticalScrollIndicator={false}
                                renderItem={this.renderAppointmentList}
                                keyExtractor={item => `${item._id}`}
                                contentContainerStyle={{ paddingBottom: 100, alignSelf: KEY.CENTER, marginTop: 0 }}
                                ListFooterComponent={() => (
                                    AppointmentList && AppointmentList.length > 0 ?
                                        <></>
                                        :
                                        <View style={{ justifyContent: KEY.CENTER, alignItems: KEY.CENTER }}>
                                            <Image source={IMAGE.RECORD_ICON} style={{ height: 150, width: 200, marginTop: 100 }} resizeMode={KEY.CONTAIN} />
                                            <Text style={{ fontSize: 16, color: COLOR.TAUPE_GRAY, marginTop: 10 }}>No record found</Text>
                                        </View>
                                )}
                            />
                        </View>
                        {/* <View style={{ flexDirection: KEY.ROW, alignItems: KEY.CENTER, marginTop: 12 }}>
                            <View style={{ flex: 1, height: 1, backgroundColor: COLOR.DEFALUTCOLOR }} />
                            <View>
                                <Text style={{ width: 150, textAlign: KEY.CENTER, fontSize: 20, color: COLOR.DEFALUTCOLOR }}>Professionals</Text>
                            </View>
                            <View style={{ flex: 1, height: 1, backgroundColor: COLOR.DEFALUTCOLOR }} />
                        </View>
                        <View style={{ flexDirection: KEY.ROW, marginBottom: 25, marginLeft: 10 }}>
                            <ScrollView
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                            >
                                <FlatList
                                    style={{ flexDirection: KEY.ROW }}
                                    numColumns={10000}
                                    data={staffList}
                                    renderItem={this.renderstaffList}
                                    keyExtractor={item => `${item._id}`}
                                />
                            </ScrollView>
                        </View> */}
                    </ScrollView>
                }
                {loader == true ? <Loader /> : null}
            </SafeAreaView>
        );
    }
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.DEFAULTLIGHT
    }
})