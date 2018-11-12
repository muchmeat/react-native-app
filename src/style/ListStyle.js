/**
 * 列表 样式
 * Created by zk on 18/5/30.
 */
import {
    Dimensions,
    PixelRatio
} from "react-native";
import defualt_themes from "./ThemeStyle";
import components from "./Components";

const listStyle = Object.freeze({
    line: {
        width: SCREEN_WIDTH - 20,
        marginLeft: 10,
        marginRight: 10,
        borderBottomWidth: 1 / PixelRatio.get(),
        borderBottomColor: "#dedfe0"
    },
    titleStyle: {
        fontSize: 16, color: "#333", paddingBottom: 4
    },
    subtitleStyle: {
        fontSize: 14, color: "#999", paddingTop: 4
    },
    leftElementStyle: {justifyContent: "center", alignItems: "center", height: 50, width: 50, borderRadius: 25},
    imageStyle: {width: 50, height: 50},
    quickContainerStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: "center"
    },
    quickViewStyle: {
        backgroundColor: "#C76A65",
        height: 74,
        alignItems: 'center',
        justifyContent: 'center',
        width: 60,
    },
    quickTextStyle: {
        color: "#FFF",
        fontSize: 14
    }
});

module.exports = listStyle;