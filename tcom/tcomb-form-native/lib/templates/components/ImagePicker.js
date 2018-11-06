/**
 * 选择图片
 * Created by ruixin on 16/7/9.
 */
import React, {Component} from "react";
import {
    View,
    TouchableHighlight,
} from "react-native";
import imagePicker from "react-native-image-picker";
import Svg from "react-native-svg";


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
        const {style,beforePick,svgWidth,svgHeight,svgBtm} = _this.props;
        return (
            <TouchableHighlight
                underlayColor='#fff'
                activeOpacity={0.5}
                style={style}
                onPress={()=>{
                    _this._selectPhotoTapped(beforePick());
                }}>
                <View>
                    <Svg height={svgWidth} width={svgHeight} viewBox="0 0 1024 1024">{svgBtm}</Svg>
                </View>
            </TouchableHighlight>
        );
    }
}
