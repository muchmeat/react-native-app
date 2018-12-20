import React, {Component} from 'react';
import {
    View,
    Platform,
    StyleSheet,
    Alert, ToastAndroid
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {NavigationActions, withNavigation} from 'react-navigation';
import RNFetchBlob from "react-native-fetch-blob";
import t from "tcomb-form-native";
import AudioSound from "../base/components/AudioSound";

import styles from '@src/example/style/ThemeStyle';
import RxForm from '@src/base/components/RxForm';
import {isTel} from '@utils/common';
import DefualtBtn from '@src/base/components/DefualtBtn';
import VideoBtn from '@src/base/components/VideoBtn';
import MIMEEnums from "@utils/enums/MIMEEnums";
import FileUtil from '@utils/FileUtil';


export default class VideoForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // videoSource: {uri: 'http://172.28.1.208:8080/jweq/medias/uploadDir/video3.mp4'},
            videoSource: null,
            videoSourcePath: null,
            videoStatus: 1,
            rate: 1,
            volume: 1,
            muted: false,
            resizeMode: 'contain',
            duration: 0.0,
            currentTime: 0.0,
            paused: true
        };
    }

    static navigationOptions = {
        title: '表单',
    };

    componentWillMount() {
        let _this = this;
        console.log("componentWillMount");
        let pgjg = t.enums({
            "1": "良好",
            "2": "不配合"
        }, 'pgjg');
        let thfs = t.enums({
            "1": "见面谈话",
            "2": "通讯工具通话"
        }, 'thfs');
        let jfmd = t.enums({
            "1": "康复情况",
            "2": "复吸调查",
            "3": "其它",
        }, 'jfmd');
        let cxfs = t.enums({
            "1": "步行/骑行",
            "2": "自驾",
            "3": "其它",
        }, 'cxfs');
        let jslxfs = t.refinement(t.String, function (v) {
            if (!v || v.indexOf("-") === -1 || v.indexOf(";") === -1)
                return false;
            let vs = v.split(";");
            let vs1 = vs[0].split("-");
            let vs2 = vs[1].split("-");
            return vs1[0] && isTel(vs1[1]) && vs2[0] && isTel(vs2[1]);
        });
        _this.setState({
            rows: t.struct({
                zp: t.list(t.String),
                thry: t.String,
                thdd: t.String,
                sfjzd: t.Boolean,
                cxfs: cxfs,
                fycc: t.maybe(t.String),
                thrq: t.Date,
                thsj: t.Date,
                thfs: thfs,
                jfmd: jfmd,
                jslxfs: jslxfs,
                pgjg: pgjg,
                fj: t.list(t.String),
                pynr: t.String
            }),
            options: {
                fields: {
                    zp: {
                        label: "现场照片",
                        navigation: _this.props.navigation,
                        mode: "imagePicker",
                        limit: 4,
                    },
                    thry: {
                        label: '谈话人员',
                        placeholder: ' 输入谈话人员',
                        maxLength: 50,
                        onSubmitEditing: () => _this.refs.RxForm.refs.form.getComponent('thdd').refs.input.focus()
                    },
                    thdd: {
                        label: '谈话地点',
                        placeholder: ' 输入谈话地点',
                        maxLength: 100,
                        onSubmitEditing: () => _this.refs.RxForm.refs.form.getComponent('fycc').refs.input.focus()
                    },
                    sfjzd: {
                        label: '是否居住地'
                    },
                    cxfs: {
                        label: '出行方式'
                    },
                    fycc: {
                        label: '费用产出',
                        maxLength: 100,
                        onSubmitEditing: () => _this.refs.RxForm.refs.form.getComponent('jslxfs').refs.input.focus()
                    },
                    thrq: {
                        label: "谈话日期",
                        mode: "date",
                        maximumDate: new Date()
                    },
                    thsj: {
                        label: "谈话时间",
                        mode: "datetime"
                    },
                    thfs: {
                        label: "谈话方式",
                    },
                    jfmd: {
                        label: "家访目的",
                    },
                    jslxfs: {
                        label: "家属联系方式",
                        error: "请输入“姓名-联系电话;姓名-联系电话”格式",
                        onSubmitEditing: () => _this.refs.RxForm.refs.form.getComponent('pynr').refs.input.focus()
                    },
                    pgjg: {
                        label: "评估结果",
                    },
                    fj: {
                        label: "文档",
                        navigation: _this.props.navigation,
                        mode: "filePicker",
                        limit: 4,
                    },
                    pynr: {
                        label: "评语内容",
                        mode: "textarea",
                        placeholder: ' 输入评语内容',
                        maxLength: 500,
                        onSubmitEditing: () => _this._commit()
                    }
                }
            },
            values: {}
        })
    }

    componentDidMount() {
    }

    _commit() {
        let _this = this;
        // let val = _this.refs.RxForm._commit();
        debugger
        let videoSourcePath = _this.state.videoSourcePath;
        let audioPath = _this.refs.AudioSound.state.audioPath;
        let pathArray = [];
        if (null != videoSourcePath && FileUtil.existsFile(videoSourcePath)) {
            pathArray.push(videoSourcePath);
        }
        if (FileUtil.existsFile(audioPath)) {
            pathArray.push(audioPath);
        }
        if (0 != pathArray.length) {
            _this.uploadFile(pathArray);
            _this.setState({
                videoSourcePath: null
            })
        }
    }

    /**
     * 录制或者播放视频按钮
     * @private
     */
    _videoBtnClick() {
        let videoSource = this.state.videoSource;
        console.warn("videoSource");
        console.warn(videoSource);
        if (null == videoSource) {
            this._video();
        } else {
            this.props.navigation.navigate('VideoScreen', {videoSource: videoSource});
        }
    }

    /**
     * 删除视频按钮
     * @private
     */
    _videoBtnCancelClick() {
        if (null == this.state.videoSourcePath) {
            ToastAndroid.show("无视频", ToastAndroid.SHORT);
            return;
        }
        Alert.alert('删除视频', '确认删除视频吗?',
            [
                {
                    text: "是", onPress: () => {
                        FileUtil.deleteFile(this.state.videoSourcePath)
                        this.setState({
                            videoSourcePath: null,
                            videoSource: null,
                            videoStatus: 1
                        });
                    }
                },
                {text: "否"}
            ])
        ;
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    render() {
        let _this = this;
        return (
            <View style={styles.container}>
                <RxForm ref="RxForm" rows={_this.state.rows} options={_this.state.options} values={this.state.values}/>
                <AudioSound ref="AudioSound"/>
                <VideoBtn text={this.state.videoStatus == 1 ? '录制视频' : '播放视频'} click={() => {
                    _this._videoBtnClick();
                }} cancelClick={() => {
                    _this._videoBtnCancelClick();
                }}/>
                <DefualtBtn text={"提  交"} click={() => {
                    _this._commit();
                }}/>
            </View>
        )
    }

    componentWillUnmount() {

    }

    /**
     * 摄像
     */
    _video() {
        let photoOptions = {
            //底部弹出框选项
            title: '请选择',
            cancelButtonTitle: '取消',
            takePhotoButtonTitle: '录像',
            chooseFromLibraryButtonTitle: '选择相册',
            mediaType: "video",
            quality: 1,
            videoQuality: "high",
            durationLimit: 10,
            allowsEditing: true,
            noData: false,
            storageOptions: {
                skipBackup: true
                // path:'images'
            },
            permissionDenied: {
                title: "需要相机权限才能拍摄"
            }
        };
        ImagePicker.launchCamera(photoOptions, (response) => {
            // Same code as in above section!
            console.log('response：');
            console.log(response);
            debugger
            let source = {uri: response.uri};
            this.setState({
                videoSource: source,
                videoSourcePath: response.path,
                videoStatus: 2
            });
            if (Platform.OS === 'android') {
                source = {uri: response.uri, isStatic: true}
            } else {
                source = {uri: response.uri.replace('file://', ''), isStatic: true}
            }
            console.log('source：');
            console.log(source);
            if (response.didCancel) {
                return
            }
        });
    }


    /**
     * 上传文件
     */
    uploadFile(pathArray) {
        //172.28.1.208
        // path:"/storage/emulated/0/DCIM/100MEDIA/VIDEO0013.mp4"
        // uri:"content://media/external/video/media/10046"
        let requestData = [
            // elements without property `filename` will be sent as plain text
            {name: 'name', data: 'user'},
            {
                name: 'info', data: JSON.stringify({
                    mail: 'example@example.com',
                    tel: '12345678'
                })
            }
        ];
        for (let path of pathArray) {
            if (null != path) {
                let type = path.substr(path.lastIndexOf(".") + 1).toLowerCase();
                let filename = path.substr(path.lastIndexOf("/") + 1);
                let name = path.substring(path.lastIndexOf("/") + 1, path.lastIndexOf("."));
                //todo mime type 枚举
                let item = {
                    name: name,
                    filename: filename,
                    type: MIMEEnums.getCode(type),
                    // data: RNFetchBlob.wrap(RNFetchBlob.fs.asset(path))
                    data: RNFetchBlob.wrap(path)
                };
                console.warn(item);
                requestData.push(item);
            }
        }

        RNFetchBlob.fetch('POST', 'http://172.28.1.208:8080/jweq/attachment/uploadFile', {
            // Authorization : "Bearer access-token",
            // otherHeader : "foo",
            'Content-Type': 'multipart/form-data',
        }, requestData).uploadProgress((written, total) => {
            console.log('uploaded', written / total)
        }).then((resp) => {
            alert(JSON.stringify(resp));
        }).catch((err) => {
            alert(err);
        })
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F5F9",
        // justifyContent: 'flex-start',
        alignItems: 'center'
    },
    fullScreen: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    image: {
        height: 198,
        width: 300,
        alignSelf: 'center',
    }
});
