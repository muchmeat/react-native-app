/**
 * 选择图片
 * Created by ruixin on 16/7/9.
 */
import React, {Component} from "react";
import {
    Dimensions,
    Image,
    View,
    TouchableOpacity
} from "react-native";
import Svg from "react-native-svg";
import imagePicker from "react-native-image-picker";
let WIDTH = Dimensions.get("window").width;
import themeStyle from "../../../../../../example/style/ThemeStyle";
import IconLib from "../../../../../../../assets/svg/IconLib";

export default class ImagePicker extends Component {
    constructor(props) {
        super(props);
    }

    componentWillUnmount() {
        this.timeout && clearTimeout(this.timeout);
    }

    /**
     * 弹出照片选择器
     * @param isLimited 是否限制拍照
     * @private
     */
    _selectPhotoTapped(isLimited = false) {
        const options = {
            quality: 1,
            maxWidth: 540,
            maxHeight: 720,
            allowsEditing: false,
            storageOptions: {
                skipBackup: true
            },
            title: null,
            takePhotoButtonTitle: '打开摄像头',
            chooseFromLibraryButtonTitle: '从手机相册选择',
            cancelButtonTitle: '取消',
            type: this.props.type
        };
        if (isLimited) {
            options.takePhotoButtonTitle = null;
            options.chooseFromLibraryButtonTitle = null;
            options.cancelButtonTitle = "取消（已达上传照片数量限制）";
        }
        imagePicker.showImagePicker(options, (response) => {
                if (response) {
                    if (response.permission && response.permission == "denied") {
                        this.props.onError("【相机】权限被拒绝");
                    }
                    if (response.code) {
                        // if (this.props.onCameraRender) {
                        //     this.props.onCameraRender(response);
                        // }
                    } else if (response.data) {
                        // let source = {uri: response.data, isStatic: true};
                        if (this.props.afterPick) {
                            this.timeout = setTimeout(()=> {//设置延时解决版本更新后出现 “拍照”操作影响按钮展示的问题
                                this.props.afterPick(response);//调用父级的方法
                            }, 100);
                        }
                    }
                }
            }
        )
    }

    render() {
        let _this = this;
        const {beforePick} = _this.props;
        return (
            <TouchableOpacity activeOpacity={0.5} onPress={()=> {
                _this._selectPhotoTapped(beforePick())
                }}>
                <View style={{height:(WIDTH-15)/4 - 10,
                                width:(WIDTH-15)/4 - 10,
                                borderRadius:5,
                                justifyContent:"center",
                                alignItems:"center",
                                borderColor: themeStyle.lineDp.color,
                                borderWidth:themeStyle.lineDp.width}}>
                    {/*<Image style={{width:((WIDTH-15)/4 - 10)/3,height:((WIDTH-15)/4 - 10)/3}} source={require("../../icon/addPic.png")}/>*/}
                    <Svg width={((WIDTH-15)/4 - 10)/3} height={((WIDTH-15)/4 - 10)/3} viewBox={"0 0 1024 1024"}>{IconLib.IC_ADD}</Svg>
                </View>
            </TouchableOpacity>
        );
    }
}
