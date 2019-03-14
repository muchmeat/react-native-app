"use strict";

import {PixelRatio, Platform} from "react-native";
import themeStyle from "../../../../../example/style/ThemeStyle"

let formBack = "#FFF";

const formStyle = Object.freeze({
    helpColor:{
      color:themeStyle.form.HELP_COLOR,
    },
    notNull:{
        color:"red",
        paddingTop:3
    },
    label:{
        normal: {
            flex:1,
            color: themeStyle.form.INPUT_COLOR,
            fontSize: themeStyle.form.FONT_SIZE,
        },
        hasValue:{
            flex:1,
            color: themeStyle.form.LABEL_COLOR,
            fontSize: themeStyle.form.FONT_SIZE,
        }
    },
    formGroup: {
        normal: {
            backgroundColor:formBack,
            borderBottomColor:themeStyle.lineDp.color,
            borderBottomWidth:themeStyle.lineDp.width
        },
        error: {
            backgroundColor:formBack,
            paddingBottom: 2,
        }
    },
    error:{
        // flex:1,
        flexDirection:"row",
        justifyContent:"flex-start",
        alignItems:"center",
        paddingBottom:5,
        paddingLeft:5
    },
    errorView:{
        // flex:1,
        paddingLeft:5
    },
    errorText:{
        marginRight:5,
        fontSize: themeStyle.form.ERROR_SIZE,
        color: themeStyle.form.ERROR_COLOR
    },
    errorBlock: {
        marginRight:5,
        fontSize: themeStyle.form.ERROR_SIZE,
        color: themeStyle.form.ERROR_COLOR
    },
    notEditable: {
        fontSize: themeStyle.form.FONT_SIZE,
        height: 36,
        paddingVertical: Platform.OS === "ios" ? 7 : 0,
        paddingHorizontal: 7,
        borderRadius: 4,
        color: themeStyle.form.DISABLED_COLOR,
    },
    textBox:{
        labelView:{
            height:55,
            flexDirection:"row",
            justifyContent:"flex-start",
            alignItems:"center"
        },
        inputView:{
            height:90,
            backgroundColor:"#fff",
            borderTopWidth:themeStyle.linePx.width,
            borderColor:themeStyle.lineDp.color,
            borderBottomWidth:themeStyle.lineDp.width,
            justifyContent:"flex-start"
        },
        textFont:{
            flex:1,
            color: themeStyle.form.INPUT_COLOR,
            fontSize: themeStyle.form.FONT_SIZE,
            height: 55,
            paddingVertical: Platform.OS === "ios" ? 7 : 0,
            paddingHorizontal: 5,
            // fontWeight: themeStyle.form.FONT_WEIGHT
        },
        textFontLocate:{
            display:"none",
        },
        textAreaFont:{
            height:90,width:themeStyle.screen.width,flexDirection:"column",alignItems:"flex-start",paddingBottom:20,paddingRight:20
        },
        textAreaError:{
            position:"absolute",bottom:0,width:themeStyle.screen.width,flexDirection:"row",justifyContent:"space-between",paddingLeft:120
        },
        textAreaErrorFont:{
            paddingRight:20,
            color:themeStyle.form.HELP_COLOR
        },
        textInput:{
            flexDirection:"row",
            backgroundColor:formBack,
            borderBottomColor:themeStyle.lineDp.color,
            borderBottomWidth:themeStyle.lineDp.width
        },
        textInputLabel:{
            width:120,height:55,flexDirection:"row",justifyContent:"flex-end",alignItems:"center"
        },
        textInputRight:{
            flex:1,flexDirection:"column"
        },
        textInputView:{
            flex:1,flexDirection:"row"
        },
        clear:{
            height:55,width:45,justifyContent:"center",alignItems:"center"
        },
        locateButton:{
            // flex:1,
            height:40,
            width:150,
            marginVertical:5,
            backgroundColor:'#18B4FF',
            justifyContent:'center',
            alignItems:'center',
            borderRadius:30
        },
        locateText:{
            fontSize:16,
            color:'#fff'
        }
    },
    checkbox:{
        view:{
            flexDirection:"row",
            borderColor:themeStyle.form.BORDER_COLOR_GRAY
        },
        label:{
            width:120,height:55,flexDirection:"row",justifyContent:"flex-end",alignItems:"center"
        },
        textView:{
            paddingLeft:5,alignItems:"center",justifyContent:"center"
        },
        text:{
            fontSize:16,color:themeStyle.form.INPUT_COLOR
        },
        checkbox: {
            flex:1,
        }
    },
    picker:{
        view:{
            flexDirection:"row",
            borderColor:themeStyle.form.BORDER_COLOR_GRAY
        },
        label:{
            width:120,height:55,flexDirection:"row",justifyContent:"flex-end",alignItems:"center"
        },
        pickerView:{
            flex:1,flexDirection:"column",
            paddingLeft:5
        },
        normal: Platform.select({
            android: {
                flex:1,
                height:55,
                // paddingLeft: 7,
                color: themeStyle.form.INPUT_COLOR,
            },
            ios: {}
        }),
        pickerText:{
            color: themeStyle.form.INPUT_COLOR,
            fontSize: themeStyle.form.FONT_SIZE,
            paddingRight: 5,
        },
        pickerContainer: {
            normal: {
                marginBottom: 1,
                borderRadius: 4,
                borderBottomColor:themeStyle.linePx.color,
                borderBottomWidth:themeStyle.linePx.width
            },
            error: {
                marginBottom: 4,
                borderRadius: 4,
                borderColor: themeStyle.form.ERROR_COLOR,
                borderWidth:themeStyle.lineDp.width
            },
            open: {
                // Alter styles when select container is open
            }
        },
        modal:{
            flex:1,backgroundColor:"rgba(0,0,0,0.6)",justifyContent:"center", alignItems:"center"
        },
        modalView:{
            backgroundColor:"#FFF",
            width:themeStyle.screen.width - 80,
            marginVertical:60,
            justifyContent:"center",
            alignItems:"flex-start",
        },
        tabView:{
            height:45,width:themeStyle.screen.width,paddingLeft:20,flexDirection:"row",justifyContent:"flex-start",alignItems:"center"
        },
        tabText:{
            fontSize:themeStyle.font.size_M,
        },
        defText:{
            fontSize:themeStyle.font.size_M,
        },
        checkColor:themeStyle.color.clickLine,
        checkNot:themeStyle.color.fontGray,
        btnView:{
            height:50,
            width:themeStyle.screen.width - 80,
            flexDirection:"row",
            justifyContent:"flex-start",
            alignItems:"center",
            borderTopWidth:themeStyle.linePx.width,
            borderColor:themeStyle.linePx.color,
        },
        btn:{
            flex:1,justifyContent:"center",alignItems:"center"
        },
        cancel:{
            fontSize:themeStyle.font.size_M,
            color:themeStyle.color.fontGray
        },
        makeSure:{
            fontSize:themeStyle.font.size_M,
            color:themeStyle.color.clickLine
        }
    },
    list: {
        contain:{
            flexDirection:"column",
            borderColor:themeStyle.form.BORDER_COLOR_GRAY
        },
        imageView: {
            flex: 1,
            height: 40,
            paddingLeft:15,
            width: themeStyle.screen.width * 0.8,
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center"
        },
        nameView:{
            flex: 1,
            marginLeft: 10
        },
        nameText:{
            fontSize:themeStyle.font.size_M
        },
        imageClear:{
            marginRight: 12, height: 40, justifyContent: "center", alignItems: "center"
        },
        imagePicker:{
            marginVertical: 10,
            marginHorizontal: 5
        },
        avatar: (themeStyle.screen.width - 15) / 4 - 10,
        limit:{
            normal:{
                color: themeStyle.form.LABEL_COLOR,
                // fontSize: themeStyle.from.ERROR_SIZE,
                fontSize: 14,
                // fontWeight: themeStyle.form.FONT_WEIGHT
            },
            max:{
                color: themeStyle.form.ERROR_COLOR,
                // fontSize: themeStyle.from.ERROR_SIZE,
                // fontSize: 14,
                // fontWeight: themeStyle.form.FONT_WEIGHT,
            }
        },
        error:{
            view:{
                flex:1,flexDirection:"row",justifyContent:"flex-start",alignItems:"center",paddingBottom:5,
            },
            textView:{
                flex:1,paddingLeft:5
            }
        },
        imageLab:{
            height:55,flexDirection:"row",justifyContent:"flex-start",alignItems:"center"
        },
        fileLab:{
            width:120,height:55,flexDirection:"row",justifyContent:"flex-end",alignItems:"center"
        },
        fileSelect:{
            flex:1,flexDirection:"row",justifyContent:"flex-end", alignItems:"center"
        },
        imageContain:{flexDirection:"row",flexWrap:'wrap'},
        touch:{
            flexDirection:"row",
            justifyContent:"flex-end",
            alignItems:"center",
            paddingRight:12
        },
        fileRow:{
            flexDirection: "row",
            borderBottomColor:themeStyle.linePx.color,
            borderBottomWidth:themeStyle.linePx.width
        },
        fileBottomLine:{
            borderTopWidth:themeStyle.linePx.width,
            borderTopColor:themeStyle.linePx.color,
        }
    }
});

module.exports = formStyle;