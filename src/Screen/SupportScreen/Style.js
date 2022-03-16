import { Dimensions, StyleSheet } from "react-native";
import * as FONT from '../../styles/typography'
import * as COLOR from '../../styles/colors'
import * as KEY from '../../context/actions/key';
const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const styles = (colorcode) => StyleSheet.create({
    containView: {
        justifyContent: KEY.CENTER,
        alignItems: KEY.CENTER
    },
    addressView: {
        justifyContent: KEY.CENTER,
        alignItems: KEY.CENTER,
        marginTop: 20
    },
    textHeader: {
        fontSize: FONT.FONT_SIZE_24,
        fontFamily: FONT.FONT_FAMILY_BOLD,
        color: colorcode,
        marginTop: 5
    },
    textSub: {
        color: COLOR.BLACK,
        fontSize: FONT.FONT_SIZE_16,
        marginTop: 15,
        fontFamily: FONT.FONT_FAMILY_REGULAR
    },
    headerstyle: {
        backgroundColor: colorcode,
        width: WIDTH,
        height: 90,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        marginBottom: 20
    }
});

export default styles;