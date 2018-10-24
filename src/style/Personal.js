/**
 * 个人信息 样式
 * Created by zk on 18/5/30.
 */

import defualt_themes from "./ThemeStyle";
import components from "./Components";

const personal = Object.freeze({
    container:{
        flex:1,
        backgroundColor:defualt_themes.color.defaultBg,
        justifyContent:"center",
        alignItems:"center"
    },
    header:{
        width:defualt_themes.screen.width,
        height:60,
        backgroundColor:defualt_themes.color.theme,
        justifyContent:"center",
        alignItems:"center"
    },
    headerFont:{
        color:defualt_themes.color.fontWithe,
        fontSize:defualt_themes.font.size_L
    },
    headerTouch:{
        position:"absolute",
        right:10,
        top:10
    },
    headerView:{
        width:50,
        height:50,
        justifyContent:"center",
        alignItems:"center"
    },
    group:{
        width:defualt_themes.screen.width,
    },
    group2:{
        paddingLeft:15,
        paddingRight:15,
        // width:defualt_themes.screen.width - 20,
    },
    zzItem:{
        container:{
            ...components.groupItem.container,
            // paddingLeft:0
        },
        turnRight:{
            height:components.groupItem.container.height,
            width:30,
            justifyContent:"center",
            alignItems:"center",
        }
    },
    tjhyzz:{
        flex:1,
        backgroundColor:defualt_themes.color.defaultBg,
        paddingTop:15
    },
    detail:{
        container:{
            flex:1,
            backgroundColor:defualt_themes.color.defaultBg,
            paddingTop:5
        },
        imgRow:{
            flex:1,
            height:80,
            flexDirection:"row",
            justifyContent:"flex-start",
            alignItems:"center",
            backgroundColor:defualt_themes.color.backgroundColor,
            marginBottom:2
        },
        left:{
            paddingLeft:15,
            width:120,
            justifyContent:"center",
            alignItems:"flex-start"
        },
        leftText:{
            fontSize:defualt_themes.font.size_M,
            color:defualt_themes.color.fontBlack
        }
    }
});

module.exports = personal;