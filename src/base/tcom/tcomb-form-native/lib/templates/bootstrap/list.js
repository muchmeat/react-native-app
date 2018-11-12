import IconLib from "../../../../../../../assets/svg/IconLib";
import Icon from "react-native-vector-icons/FontAwesome";
import Icon5 from "react-native-vector-icons/FontAwesome5";
import Svg from "react-native-svg";
let React = require("react");
import ImagePicker from "../components/ImagePicker";
import themeStyle from "../../../../../../../src/example/style/ThemeStyle";
import formStyle from "../../stylesheets/formStyle";
import {Avatar} from "react-native-elements";

let { View,Text, TouchableHighlight,NativeModules} = require("react-native");

function renderRow(locals) {
    if(locals.value && locals.value.length && locals.items){
        let rows = [];
        for(let i=0;i<locals.value.length;i++){
            let item = locals.value[i];
            if(locals.mode==="filePicker") {
                let icon;
                //类型
                if("BMP,JPG,JPEG,PNG,GIF".indexOf(item.type.toUpperCase()) !== -1){
                    icon = <Icon5 name={"file-image"} size={24} color={themeStyle.color.theme}/>;
                }else if("DOCX".indexOf(item.type.toUpperCase()) !== -1){
                    icon = <Icon5 name={"file-word"} size={24} color={themeStyle.color.theme}/>;
                }else if("XLSX".indexOf(item.type.toUpperCase()) !== -1){
                    icon = <Icon5 name={"file-excel"} size={24} color={themeStyle.color.theme}/>;
                }else if("PDF".indexOf(item.type.toUpperCase()) !== -1){
                    icon = <Icon5 name={"file-pdf"} size={24} color={themeStyle.color.theme}/>;
                }else if("PDF".indexOf(item.type.toUpperCase()) !== -1){
                    icon = <Icon5 name={"file-pdf"} size={24} color={themeStyle.color.theme}/>;
                }else if("PDF".indexOf(item.type.toUpperCase()) !== -1){
                    icon = <Icon5 name={"file-video"} size={24} color={themeStyle.color.theme}/>;
                }else if("AVI,WMV,MPEG,MP4,MKV,FLV,RMVB".indexOf(item.type.toUpperCase()) !== -1){
                    icon = <Icon5 name={"file-video"} size={24} color={themeStyle.color.theme}/>;
                }else {
                    icon = <Icon5 name={"file"} size={24} color={themeStyle.color.theme}/>;
                }
                rows.push(<View key={guid()} style={formStyle.list.fileRow}>
                    <View style={{flex: 1}}>
                        <TouchableHighlight activeOpacity={0.8} underlayColor='transparent' onPress={() => {
                        }}>
                            <View style={formStyle.list.imageView}>
                                {icon}
                                <View style={formStyle.list.nameView}>
                                    <Text numberOfLines={1} style={formStyle.list.nameText}>{item.fileName}</Text>
                                </View>
                            </View>
                        </TouchableHighlight>
                    </View>
                    <TouchableHighlight activeOpacity={0.8} underlayColor='transparent' onPress={() => {
                        locals.onChange(item, new Date().toDateString(), locals.path, "remove", i);
                    }}>
                        <View style={formStyle.list.imageClear}>
                            <Svg height="20" width="20" viewBox="0 0 1024 1024">{IconLib.IC_CLEAR}</Svg>
                        </View>
                    </TouchableHighlight>
                </View>);
            }else {
                rows.push(
                    <View key={guid()} style={formStyle.list.imagePicker}>
                        <Avatar size={formStyle.list.avatar}
                            source={{uri: 'data:image/png;base64,' + item.data}}
                            onPress={() => {
                            }}
                            onLongPress={() => locals.onChange(item, new Date().toDateString(), locals.path, "remove", i)}
                            activeOpacity={0.4}
                        />
                    </View>
                );
            }
        }
        return rows;
    }else {
        return null;
    }
}

function list(locals) {

  if (locals.hidden) {
    return null;
  }
  let isMaybe = locals.isMaybe;
  let formGroupStyle = formStyle.formGroup.normal;
  let controlLabelStyle = formStyle.label.normal;
  let errorBlockStyle = formStyle.errorBlock;

    let notNull = isMaybe ? <Text/>: (
        <Text style={{color:"red"}}>*  </Text>
    );

    let limit;
    if(locals.value && locals.value.length && locals.value.length === locals.limit){
        limit = <Text style={formStyle.list.limit.max}>{" ("+locals.value.length +"/"+locals.limit+")"}</Text>;
    }else {
        limit = <Text style={formStyle.list.limit.normal}>{" ("+locals.value.length +"/"+locals.limit+")"}</Text>;
    }

    let label = locals.label ? (
        <Text style={controlLabelStyle}>{notNull}{locals.label}{limit}</Text>
    ) : null;

    let left = locals.mode === "imagePicker" ? 15 :125;
    let error =
        locals.hasError ? (
            <View style={[formStyle.list.error.view,{paddingLeft:left}]}>
                <Svg height="14" width="14" viewBox="0 0 1024 1024">
                    {IconLib.FORM_ERROR}
                </Svg>
                <View style={formStyle.list.error.textView}>
                    <Text accessibilityLiveRegion="polite" style={errorBlockStyle}>
                        {locals.error ? locals.error : (locals.label ? locals.label.replace("*","") + "不能为空" : "不能为空")}
                    </Text>
                </View>
            </View>
        ) : <View/>;

    let rows = renderRow(locals);
    let list = formStyle.list;
    if(locals.mode === "imagePicker"){
        return (<View style={formGroupStyle}>
            <View style={list.contain}>
                <View style={list.imageLab}>{label}</View>
                <View style={list.imageContain}>
                    {rows ? rows : null}
                    {locals.value && locals.value.length && locals.value.length === locals.limit ? null :
                        <View style={list.imagePicker}>
                            <ImagePicker beforePick={() => {
                                return locals.limit ? locals.items.length >= locals.limit : true;
                            }}
                                 afterPick={(response) => {
                                     locals.onChange(response, new Date().toDateString(), locals.path, "add");
                                 }}
                            />
                        </View>
                    }
                </View>
                {error}
            </View>
        </View>);
    }else {

        return (<View style={formGroupStyle}>
            <View style={list.contain}>
                <View style={{flexDirection:"row"}}>
                    <View style={list.fileLab}>
                        {label}
                    </View>
                    <TouchableHighlight style={list.touch} activeOpacity={0.8} underlayColor='transparent' onPress={()=>{
                        NativeModules.DocPickerModule.openFilePicker({
                            width: 300,
                            height: 300,
                            cropping: false,
                            cropperCircleOverlay: false,
                            compressImageMaxWidth: 480,
                            compressImageMaxHeight: 640,
                            compressImageQuality: 0.5,
                            compressVideoPreset: 'MediumQuality'
                        }).then((data)=>{
                            let _data = {fileSize:data.fileSize,fileName:data.name + "." + data.extension,path:data.path,type:data.extension};
                            locals.onChange(_data, new Date().toDateString(), locals.path, "add");
                        }).catch(e=>console.warn(e));
                    }}>
                        <Icon size={24} color={themeStyle.color.theme} name={"folder-open"}/>
                    </TouchableHighlight>
                </View>
                {rows ? rows : null}
                {error}
            </View>
        </View>);
    }
}

function guid() {
    function S4() {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    }
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

module.exports = list;
