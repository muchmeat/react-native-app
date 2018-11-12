/**
 * Created by hechao
 * on 2018/11/6.
 */
import {
    Dimensions,
    PixelRatio
} from "react-native";
import styles from "./ThemeStyle";
import components from "./Components";
const mainPageStyle = Object.freeze({
    touchText: {marginTop: 5, textAlign: 'center', color: "#444", fontSize: 12,},
    contentContainerStyle: {
        justifyContent: 'space-between',
        alignItems: 'center', // 必须设置,否则换行不起作用
        paddingHorizontal: 5
    },
    leftElementStyle:{
        height: 18,
        width: 45,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FE922F",
        borderRadius: 10
    },
    containerStyle:{
        height: 45,
        borderBottomWidth: 1 / PixelRatio.get(),
        borderBottomColor: styles.line.color
    },
    rightElementStyle:{justifyContent: "center", alignItems: "center"},
    listText:{fontSize: 12, color: "#FFF"},
    subtitleStyle:{fontSize: 14, color: "#444"},
    titleStyle:{paddingLeft: 15, paddingTop: 10, paddingBottom: 15}
});

module.exports = mainPageStyle;