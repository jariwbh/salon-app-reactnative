import { Dimensions, StyleSheet } from "react-native";
import * as FONT from '../../styles/typography'
import * as COLOR from '../../styles/colors'
import * as KEY from '../../context/actions/key';
const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
    containView: {
        justifyContent: KEY.CENTER,
        alignItems: KEY.CENTER
    },
    textHeader: {
        fontSize: FONT.FONT_SIZE_24,
        fontWeight: FONT.FONT_WEIGHT_BOLD,
        color: COLOR.DEFALUTCOLOR,
        marginTop: 5
    },
    textSub: {
        color: COLOR.BLACK,
        fontSize: FONT.FONT_SIZE_16,
        marginTop: 15
    },
    headerstyle: {
        backgroundColor: COLOR.STATUSBARCOLOR,
        width: WIDTH,
        height: 90,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        marginBottom: 20
    }
});

export default styles;