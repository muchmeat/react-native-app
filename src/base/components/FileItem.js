/**
 * edited by czq on 2018/12/20.
 */
import React, {Component} from 'react';
import {
    View, TouchableHighlight, Text, ToastAndroid, NativeModules
} from 'react-native';
import Svg from "react-native-svg";
import Icon5 from "react-native-vector-icons/FontAwesome5";
import FontAwesomeEnums from "../../../utils/enums/FontAwesomeEnums";
import MIMEEnums from "../../../utils/enums/MIMEEnums";
import Global from "../../../utils/Global";
import {NavigationActions} from "react-navigation";
import OpenFile from "react-native-doc-viewer";
import IconLib from "../../../assets/svg/IconLib";
import formStyle from "../tcom/tcomb-form-native/lib/stylesheets/formStyle";
import themeStyle from "../../example/style/ThemeStyle";


export default class FileItem extends Component {

    render() {
        const {name, type, id, navigation, data} = this.props;
        let icon;
        //类型
        if ("BMP,JPG,JPEG,PNG,GIF".indexOf(type.toUpperCase()) !== -1) {
            icon = <Svg height={20} width={20} viewBox={"0 0 1024 1024"}>{IconLib.FILE_IMG}</Svg>;
        } else if ("DOCX,DOC".indexOf(type.toUpperCase()) !== -1) {
            icon = <Svg height={20} width={20} viewBox={"0 0 1024 1024"}>{IconLib.FILE_DOCX}</Svg>;
        } else if ("XLSX,XLS".indexOf(type.toUpperCase()) !== -1) {
            icon = <Svg height={20} width={20} viewBox={"0 0 1024 1024"}>{IconLib.FILE_EXCEL}</Svg>;
        } else if ("PDF".indexOf(type.toUpperCase()) !== -1) {
            icon = <Svg height={20} width={20} viewBox={"0 0 1024 1024"}>{IconLib.FILE_PDF}</Svg>;
        } else if ("PPT".indexOf(type.toUpperCase()) !== -1) {
            icon = <Svg height={20} width={20} viewBox={"0 0 1024 1024"}>{IconLib.FILE_PPT}</Svg>;
        } else if ("AVI,WMV,MPEG,MP4,MKV,FLV,RMVB".indexOf(type.toUpperCase()) !== -1) {
            icon = <Svg height={20} width={20} viewBox={"0 0 1024 1024"}>{IconLib.FILE_VIDEO}</Svg>;
        } else if ("TXT,TEXT".indexOf(type.toUpperCase()) !== -1) {
            icon = <Svg height={20} width={20} viewBox={"0 0 1024 1024"}>{IconLib.FILE_TEXT}</Svg>;
        } else if ("MP3".indexOf(type.toUpperCase()) !== -1) {
            icon = <Svg height={20} width={20} viewBox={"0 0 1024 1024"}>{IconLib.FILE_MP3}</Svg>;
        } else {
            icon = <Icon5 name={"file"} size={20} color={themeStyle.color.theme}/>;
        }
        return (<View style={[formStyle.list.fileRow]}>
            <View style={{flex: 1}}>
                <TouchableHighlight activeOpacity={0.8} underlayColor='transparent' onPress={() => {
                    // if ("AVI,WMV,MPEG,MP4,MKV,FLV,RMVB".indexOf(type.toUpperCase()) !== -1) {
                    //     navigation.dispatch(
                    //         NavigationActions.navigate({
                    //             routeName: "VideoPlay",
                    //             params: {uri: Global.FILE_BYTE_URL + id}
                    //         })
                    //     )
                    // } else {
                    //     OpenFile.openDocb64([{
                    //         base64: data,
                    //         fileName: name,
                    //         fileType: type,
                    //         cache: false /*Use Cache Folder Android*/
                    //     }], (error, url) => {
                    //         if (error) {
                    //             ToastAndroid.show("打开文件失败", ToastAndroid.SHORT)
                    //         }
                    //     })
                    //
                    // }
                    Global.openFile(id, name, type);
                }}>
                    <View style={formStyle.list.imageView}>
                        {icon}
                        <View style={formStyle.list.nameView}>
                            <Text numberOfLines={1} style={formStyle.list.nameText}>{name}</Text>
                        </View>
                    </View>
                </TouchableHighlight>
            </View>
        </View>)
    }

}