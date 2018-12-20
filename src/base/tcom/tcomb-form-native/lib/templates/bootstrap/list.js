import IconLib from "../../../../../../../assets/svg/IconLib";
import Icon from "react-native-vector-icons/FontAwesome";
import Icon5 from "react-native-vector-icons/FontAwesome5";
import Svg from "react-native-svg";

let React = require("react");
import OpenFile from 'react-native-doc-viewer';
import ImagePicker from "../components/ImagePicker";
import themeStyle from "../../../../../../../src/example/style/ThemeStyle";
import formStyle from "../../stylesheets/formStyle";
import {Avatar} from "react-native-elements";
import {NavigationActions} from "react-navigation";
import Global from "../../../../../../../utils/Global";

let {View, Text, TouchableHighlight, NativeModules, ToastAndroid} = require("react-native");

function renderRow(locals) {
    if (locals.value && locals.value.length && locals.items) {
        console.warn("locals");
        console.warn(locals);
        let rows = [];
        for (let i = 0; i < locals.value.length; i++) {
            let item = locals.value[i];
            if (locals.mode === "filePicker") {
                let icon;
                //类型
                if ("BMP,JPG,JPEG,PNG,GIF".indexOf(item.type.toUpperCase()) !== -1) {
                    icon = <Svg height={20} width={20} viewBox={"0 0 1024 1024"}>{IconLib.FILE_IMG}</Svg>;
                } else if ("DOCX,DOC".indexOf(item.type.toUpperCase()) !== -1) {
                    icon = <Svg height={20} width={20} viewBox={"0 0 1024 1024"}>{IconLib.FILE_DOCX}</Svg>;
                } else if ("XLSX,XLS".indexOf(item.type.toUpperCase()) !== -1) {
                    icon = <Svg height={20} width={20} viewBox={"0 0 1024 1024"}>{IconLib.FILE_EXCEL}</Svg>;
                } else if ("PDF".indexOf(item.type.toUpperCase()) !== -1) {
                    icon = <Svg height={20} width={20} viewBox={"0 0 1024 1024"}>{IconLib.FILE_PDF}</Svg>;
                } else if ("PPT".indexOf(item.type.toUpperCase()) !== -1) {
                    icon = <Svg height={20} width={20} viewBox={"0 0 1024 1024"}>{IconLib.FILE_PPT}</Svg>;
                } else if ("AVI,WMV,MPEG,MP4,MKV,FLV,RMVB".indexOf(item.type.toUpperCase()) !== -1) {
                    icon = <Svg height={20} width={20} viewBox={"0 0 1024 1024"}>{IconLib.FILE_VIDEO}</Svg>;
                } else if ("TXT,TEXT".indexOf(item.type.toUpperCase()) !== -1) {
                    icon = <Svg height={20} width={20} viewBox={"0 0 1024 1024"}>{IconLib.FILE_TEXT}</Svg>;
                } else if ("MP3".indexOf(item.type.toUpperCase()) !== -1) {
                    icon = <Svg height={20} width={20} viewBox={"0 0 1024 1024"}>{IconLib.FILE_MP3}</Svg>;
                } else {
                    icon = <Icon5 name={"file"} size={20} color={themeStyle.color.theme}/>;
                }
                rows.push(<View key={guid()}
                                style={[formStyle.list.fileRow, i === 0 ? formStyle.list.fileBottomLine : null]}>
                    <View style={{flex: 1}}>
                        <TouchableHighlight activeOpacity={0.8} underlayColor='transparent' onPress={() => {
                            //没有id表示附件未保存，保存则有id，图片使用base64处理，
                            if (null == item.id) {
                                OpenFile.openDoc([{
                                    url: item.path, // Local "file://" + filepath
                                    fileName: item.fileName,
                                    cache: false,
                                    fileType: item.type
                                }], (error, url) => {
                                    if (error) {
                                        ToastAndroid.show("打开文件失败", ToastAndroid.SHORT)
                                    }
                                })
                            } else {
                                if (("AVI,WMV,MPEG,MP4,MKV,FLV,RMVB".indexOf(item.type.toUpperCase()) !== -1)) {
                                    locals.navigation.dispatch(
                                        NavigationActions.navigate({
                                            routeName: "VideoPlay",
                                            params: {uri: Global.FILE_BYTE_URL +  item.id}
                                        })
                                    )
                                } else {
                                    OpenFile.openDocb64([{
                                        // base64: Global.FILE_BASE64_URL + item.id,
                                        base64: item.data,
                                        fileName: item.fileName,
                                        fileType: item.type,
                                        cache: false /*Use Cache Folder Android*/
                                    }], (error, url) => {
                                        if (error) {
                                            console.warn(error);
                                            console.warn(url);
                                            ToastAndroid.show("打开文件失败", ToastAndroid.SHORT)
                                        }
                                    })
                                }
                            }
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
            } else {
                rows.push(
                    <View key={guid()} style={formStyle.list.imagePicker}>
                        <Avatar size={formStyle.list.avatar}
                                source={{uri: 'data:image/png;base64,' + item.data}}
                                onPress={() => {
                                    OpenFile.openDocb64([{
                                        // url:"file://" + item.path, // Local "file://" + filepath
                                        base64: item.data, // Local "file://" + filepath
                                        fileName: item.fileName,
                                        cache: false,
                                        fileType: item.fileName ? item.fileName.split(".")[1] : "jpg"
                                    }], (error, url) => {
                                        if (error) {
                                            ToastAndroid.show("打开文件失败", ToastAndroid.SHORT)
                                        }
                                    })
                                }}
                                onLongPress={() => locals.onChange(item, new Date().toDateString(), locals.path, "remove", i)}
                                activeOpacity={0.4}
                        />
                    </View>
                );
            }
        }
        return rows;
    } else {
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

    let notNull = isMaybe ? <View style={{width: 10}}/> :
        <View style={{width: 10}}><Text style={formStyle.notNull}>*</Text></View>;

    let limit;
    if (locals.value && locals.value.length && locals.value.length === locals.limit) {
        limit = <Text style={formStyle.list.limit.max}>{" (" + locals.value.length + "/" + locals.limit + ")"}</Text>;
    } else {
        limit = <Text style={{
            color: themeStyle.form.HELP_COLOR,
            paddingLeft: 5
        }}>{" (" + locals.value.length + "/" + locals.limit + ")"}</Text>;
    }

    if (locals.value && locals.value.length) {
        controlLabelStyle = formStyle.label.hasValue;
    }

    let label = locals.label ? (
        <View style={{flexDirection: "row", justifyContent: "flex-start", alignItems: "center"}}>
            {notNull}
            <Text style={controlLabelStyle}>{locals.label}{limit}</Text>
        </View>
    ) : null;

    let left = 125;
    let error =
        locals.hasError ? (
            <View style={[formStyle.list.error.view, {paddingLeft: left}]}>
                <Svg height="14" width="14" viewBox="0 0 1024 1024">
                    {IconLib.FORM_ERROR}
                </Svg>
                <View style={formStyle.list.error.textView}>
                    <Text accessibilityLiveRegion="polite" style={errorBlockStyle}>
                        {locals.error ? locals.error : (locals.label ? locals.label.replace("*", "") + "不能为空" : "不能为空")}
                    </Text>
                </View>
            </View>
        ) : <View/>;

    let rows = renderRow(locals);
    let list = formStyle.list;
    if (locals.mode === "imagePicker") {
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
    } else {
        let fileType = "*/*";
        switch (locals.fileType) {
            case "images":
                fileType = "image/*";
                break;
            case "videos":
                fileType = "video/*";
                break;
            case "audios":
                fileType = "audio/*";
                break;
            case "doc":
                fileType = "application/msword;application/vnd.ms-excel;text/plain;application/vnd.ms-powerpoint;application/pdf;text/plain";
                break;
            case "compress":
                fileType = "application/x-gzip;*/rar;*/7z;*/gz;*/arj;*/z";
                break;
        }
        return (<View style={formGroupStyle}>
            <View style={list.contain}>
                <View style={{flexDirection: "row"}}>
                    <View style={list.fileLab}>
                        {label}
                    </View>
                    <TouchableHighlight style={list.touch} activeOpacity={0.8} underlayColor='transparent'
                                        onPress={() => {
                                            if (locals.value.length >= locals.limit) {
                                                ToastAndroid.show("已超出附件数量限制", ToastAndroid.SHORT);
                                                return;
                                            }
                                            NativeModules.DocPickerModule.openFilePicker({
                                                width: 300,
                                                height: 300,
                                                cropping: false,
                                                cropperCircleOverlay: false,
                                                compressImageMaxWidth: 480,
                                                compressImageMaxHeight: 640,
                                                compressImageQuality: 0.5,
                                                compressVideoPreset: 'MediumQuality'
                                            }, fileType).then((data) => {
                                                let _data = {
                                                    fileSize: data.fileSize,
                                                    fileName: data.name + "." + data.extension,
                                                    path: data.path,
                                                    type: data.extension
                                                };
                                                locals.onChange(_data, new Date().toDateString(), locals.path, "add");
                                            }).catch(e => {
                                                if (e.code.indexOf("CANCEL") === -1) {
                                                    ToastAndroid.show("不支持的文件类型", ToastAndroid.SHORT);
                                                }
                                            });
                                        }}>
                        <Svg height={22} width={22} viewBox={"0 0 1024 1024"}>{IconLib.FILE_SELECT}</Svg>
                    </TouchableHighlight>
                </View>
                {error}
                {rows ? rows : null}
            </View>
        </View>);
    }
}

function guid() {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }

    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

module.exports = list;
