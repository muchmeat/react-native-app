"use strict";

import { Platform,PixelRatio } from "react-native";
import themeStyle from "../../../../src/style/ThemeStyle"

let formBack = "#FFF";

const formStyle = Object.freeze({
    notNull:{
        color:"red"
    },
    label:{
        normal: {
            flex:1,
            // color: themeStyle.form.LABEL_COLOR,
            color: themeStyle.color.fontGray,
            fontSize: themeStyle.form.FONT_SIZE,
            fontWeight: themeStyle.form.FONT_WEIGHT
        }
    },
    formGroup: {
        normal: {
            backgroundColor:formBack,
        },
        error: {
            backgroundColor:formBack,
            paddingBottom: 2,
        }
    },
    error:{
        flex:1,
        flexDirection:"row",
        justifyContent:"flex-start",
        alignItems:"center",
        paddingBottom:5,
        paddingLeft:5
    },
    errorView:{
        flex:1,
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
            height:90,backgroundColor:"#fff",borderTopColor:"#CCC",borderTopWidth:1,borderBottomColor:"#999",borderBottomWidth:1,justifyContent:"flex-start"
        },
        textFont:{
            flex:1,
            color: themeStyle.form.INPUT_COLOR,
            fontSize: themeStyle.form.FONT_SIZE,
            height: 55,
            paddingVertical: Platform.OS === "ios" ? 7 : 0,
            paddingHorizontal: 7,
            fontWeight: themeStyle.form.FONT_WEIGHT
        },
        textAreaFont:{
            height:90,width:themeStyle.screen.width,flexDirection:"column",alignItems:"flex-start",paddingBottom:20
        },
        textAreaError:{
            position:"absolute",bottom:0,width:themeStyle.screen.width,flexDirection:"row",justifyContent:"space-between"
        },
        textAreaErrorFont:{
            paddingRight:15
        },
        textInput:{
            flexDirection:"row",borderBottomWidth:1,borderColor:"#999"
        },
        textInputLabel:{
            backgroundColor:formBack,width:120,height:55,flexDirection:"row",justifyContent:"flex-end",alignItems:"center"
        },
        textInputRight:{
            flex:1,backgroundColor:"#fff",flexDirection:"column"
        },
        textInputView:{
            flex:1,flexDirection:"row"
        },
        clear:{
            height:55,width:40,justifyContent:"center",alignItems:"center"
        }
    },
    checkbox:{
        view:{
            flexDirection:"row",borderBottomWidth:1,borderColor:"#999"
        },
        label:{
            backgroundColor:formBack,width:120,height:55,flexDirection:"row",justifyContent:"flex-end",alignItems:"center"
        },
        textView:{
            paddingLeft:10,alignItems:"center",justifyContent:"center"
        },
        text:{
            fontSize:16,color:"#9C9C9C"
        },
        checkbox: {
            flex:1,
            marginBottom: 0
        }
    },
    picker:{
        view:{
            flexDirection:"row",borderBottomWidth:1,borderColor:"#999"
        },
        label:{
            width:120,height:55,flexDirection:"row",justifyContent:"flex-end",alignItems:"center"
        },
        pickerView:{
            flex:1,flexDirection:"column",paddingLeft:7
        },
        normal: Platform.select({
            android: {
                flex:1,
                height:55,
                paddingLeft: 7,
                color: themeStyle.form.INPUT_COLOR,
            },
            ios: {}
        }),
        pickerContainer: {
            normal: {
                marginBottom: 1,
                borderRadius: 4,
                borderColor: themeStyle.form.BORDER_COLOR,
                borderWidth: 1/PixelRatio.get()
            },
            error: {
                marginBottom: 4,
                borderRadius: 4,
                borderColor: themeStyle.form.ERROR_COLOR,
                borderWidth: 1
            },
            open: {
                // Alter styles when select container is open
            }
        },
    }
});

module.exports = formStyle;