import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    View,
    StyleSheet,
    Dimensions,
    Platform,
} from 'react-native';
const { height, width } = Dimensions.get('window');
import * as COLOR from '../../styles/colors';
import * as KEY from '../../context/actions/key';
import { getBranchDetails } from '../../Services/LocalService/LocalService';

const Loader = () => {
    const [getBranch, setgetBranch] = useState(null);

    useEffect(() => {
        getMemberDeatilsLocalStorage();
    }, []);

    useEffect(() => {
    }, [getBranch]);

    //CHECK MENU PERMISSION FUNCTION
    const getMemberDeatilsLocalStorage = async () => {
        const getBranchdata = await getBranchDetails();
        setgetBranch(getBranchdata);
    }
    return (
        <View style={styles().loaderContainer}>
            <View style={styles(getBranch?.property?.appcolorcode ? getBranch.property.appcolorcode : COLOR.DEFALUTCOLOR).indicator}>
                <ActivityIndicator
                    size={KEY.LARGE}
                    color={COLOR.WHITE}
                    style={{
                        left: Platform.OS === KEY.IOS ? 1.3 : 0,
                        top: Platform.OS === KEY.IOS ? 1 : 0,
                    }}
                />
            </View>
        </View>
    );
};

export default Loader;

const styles = colorcode => StyleSheet.create({
    loaderContainer: {
        zIndex: 1,
        elevation: 2,
        height,
        width,
        position: KEY.ABSOLUTE,
        alignItems: KEY.CENTER,
        justifyContent: KEY.CENTER,
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    indicator: {
        backgroundColor: colorcode,
        height: 44,
        width: 44,
        borderRadius: 22,
        display: KEY.FLEX,
        alignItems: KEY.CENTER,
        justifyContent: KEY.CENTER,
        alignContent: KEY.CENTER,
        marginTop: -50
    },
});