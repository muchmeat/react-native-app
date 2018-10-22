/**
 * 全局配置项组件
 * Created by zk on 18/5/30.
 */
import {
    Dimensions,
    PixelRatio
} from "react-native";


const defualt_themes = Object.freeze({
    screen:{
        height:Dimensions.get("window").height,
        width:Dimensions.get("window").width
    },
    color:{
        theme:"#007FFA",
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
        backgroundColor:"#F5F5F9"
    }
});

module.exports = defualt_themes;