import { StyleSheet, Dimensions } from 'react-native';
const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

import * as COLOR from '../../styles/colors';
import * as KEY from '../../context/actions/key';

const styles = StyleSheet.create({
    imageStyle: {
        height: "100%",
        width: "100%"
    },
    imageLogo: {
        justifyContent: KEY.CENTER,
        alignItems: KEY.CENTER,
        height: 300,
        width: 300,
        //tintColor: COLOR.WHITE
    },
    msgModalView: {
        marginTop: HEIGHT / 2.5,
        height: 200,
        width: WIDTH,
        borderRadius: 0,
        backgroundColor: COLOR.WHITE,
        alignItems: KEY.CENTER,
        shadowColor: COLOR.BLACK,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },

})

export default styles;