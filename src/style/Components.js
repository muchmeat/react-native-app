/**
 * 组件样式
 * Created by zk on 18/5/30.
 */

import defualt_themes from "./ThemeStyle"

const components = Object.freeze({
    //正在加载图标
    load:{
        view:{
            justifyContent:"center",
            alignItems:"center",
            flex:1
        },
        image:{
            height:32,
            width:32,
            resizeMode: 'contain'
        }
    },
    //提交按钮
    defaultBtn:{
        view:{
            height:80,
            width:defualt_themes.screen.width,
            backgroundColor:defualt_themes.color.backgroundColor,
            alignItems:"center",
            justifyContent:"center"
        },
        touch:{
            width:defualt_themes.screen.width - 40,
            height:50,
            backgroundColor:defualt_themes.color.theme,
            alignItems:"center",
            justifyContent:"center",
            borderRadius:8,
            elevation:0
        },
        text:{
            fontSize:defualt_themes.font.size_L,
            color:defualt_themes.color.fontWithe
        }
    },
    //悬浮菜单
    modalMenu:{
        modal:{
          flex:1
        },
        itemView:{
            width:100,
            height:45,
            backgroundColor:defualt_themes.color.theme,
            justifyContent:"center",
            alignItems:"center"
        },
        text:{
            color:defualt_themes.color.fontWithe
        },
        tip:{
            position:"absolute",
            right:10
        },
        tipTop:{
            width: 0,
            height: 0,
            backgroundColor: 'transparent',
            borderStyle: 'solid',
            borderLeftWidth: 10,
            borderRightWidth: 10,
            borderBottomWidth: 15,
            borderLeftColor: 'transparent',
            borderRightColor: 'transparent',
            borderBottomColor: defualt_themes.color.theme,
            position:"absolute",
            right:10,
            top:-15
        }
    },
    //分组列表头
    groupTitle:{
        view:{
            width:defualt_themes.screen.width,
            height:35,
            backgroundColor:defualt_themes.color.defaultBg,
            justifyContent:"center",
            paddingLeft:20
        },
        text:{
            fontSize:defualt_themes.font.size_S
        }
    },
    groupTitle2:{
        view:{
            marginTop:10,
            backgroundColor:defualt_themes.color.fontWithe,
            width:defualt_themes.screen.width,
            height:45,
            justifyContent:"center",
            paddingLeft:15,
            borderBottomColor:defualt_themes.color.defaultBg,
            borderBottomWidth:2
        },
        text:{
            fontSize:defualt_themes.font.size_M
        }
    },
    //分组列表item
    groupItem:{
        container:{
            // width:defualt_themes.screen.width,
            height:45,
            paddingLeft:15,
            marginBottom:2,
            backgroundColor:defualt_themes.color.backgroundColor,
            flexDirection:"row"
        },
        left:{
            width:120,
            justifyContent:"center",
            alignItems:"flex-start"
        },
        leftText:{
            fontSize:defualt_themes.font.size_M,
            color:defualt_themes.color.fontBlack
        },
        right:{
            flex:1,
            paddingRight:15,
            justifyContent:"center",
            alignItems:"flex-end"
        },
        rightText:{
            fontSize:defualt_themes.font.size_M,
            color:defualt_themes.color.fontGray
        }
    },
    groupItem2:{
        container:{
            // width:defualt_themes.screen.width,
            height:45,
            paddingLeft:15,
            backgroundColor:defualt_themes.color.backgroundColor,
            flexDirection:"row"
        },
        left:{
            width:120,
            justifyContent:"center",
            alignItems:"flex-start"
        },
        leftText:{
            fontSize:defualt_themes.font.size_M,
            color:defualt_themes.color.fontGray
        },
        right:{
            flex:1,
            justifyContent:"center",
            alignItems:"flex-start"
        },
        rightText:{
            fontSize:defualt_themes.font.size_M,
            color:defualt_themes.color.fontGray
        }
    },
    //亲属item
    qsItems:{
        container:{
            height:44,
            width:defualt_themes.screen.width,
            marginBottom:2,
            backgroundColor:defualt_themes.color.backgroundColor,
            flexDirection:"row",
            justifyContent:"flex-start",
            alignItems:"center"
        },
        title:{
            width:120
        },
        titleView:{
            paddingLeft: 10,
            fontWeight:"normal",
            fontSize:defualt_themes.font.size_M,
            color:"#3E3A39"
        },
        titleError:{
            color:"#a94442"
        },
        iconView:{
            width:50,
            justifyContent:"center",
            alignItems:"center"
        },
        icon:{
            height:20,
            width:20
        },
        errorTip:{
            flex:1,
            flexDirection:"row",
            justifyContent:"flex-end"
        },
        errorText:{
            fontSize:13,
            color:"#a94442",
            marginRight:5,
            marginBottom:2
        }
    }
});

module.exports = components;