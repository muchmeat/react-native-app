/**
 * 全局配置项组件
 * Created by zk on 18/5/30.
 */
import {
    Dimensions,
    PixelRatio
} from "react-native";


const default_themes = Object.freeze({
    screen:{
        height:Dimensions.get("window").height,
        width:Dimensions.get("window").width
    },
    color:{
        theme:"#008EFE",
        theme_a:"rgba(0,127,250,0.5)",
        // theme_a:"red",
        defaultBg:"#F5F5F9",
        backgroundColor:"#FFF",
        fontWithe:"#FFF",
        fontBlack:"#3E3A39",
        fontGray:"#888888",
    },
    font:{
        size_L:18,
        size_M:16,
        size_S:14
    },
    line:{
        width:1/PixelRatio.get(),
        color:"#D3D3D3"
    },
    line_b:{
        width:1,
        color:"#000"
    },
    container:{
        flex:1,
        backgroundColor:"#F5F5F9",
    },
    tabBarImage: {
        marginTop: 8,
        height:24
    },
    tabBarIcon: {
        height: 32,
    },
    tabBarLabel: {
        fontSize: 12,
        marginBottom: 8,
        marginTop: 6,
    },
    tabBarItem: {
        height: 56,
    },
    form:{
        LABEL_COLOR : "#9C9C9C",
        INPUT_COLOR : "#9C9C9C",
        ERROR_COLOR : "#a94442",
        HELP_COLOR : "#999999",
        BORDER_COLOR_TINT : "#ddd",
        BORDER_COLOR_GRAY : "#999",
        DISABLED_COLOR : "#777777",
        DISABLED_BACKGROUND_COLOR : "#eeeeee",
        FONT_SIZE : 16,
        ERROR_SIZE : 14,
        FONT_WEIGHT : "normal",
    }
});

module.exports = default_themes;