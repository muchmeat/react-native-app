/**
 * 录音与播放
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Platform,
    ToastAndroid,
    Dimensions,
    Alert
} from 'react-native';
import Sound from 'react-native-sound';
import {AudioRecorder, AudioUtils} from 'react-native-audio';
import {Button} from 'react-native-elements';

import DateUtil from '@utils/DateUtil';
import FileUtil from '@utils/FileUtil';

export default class AudioSound extends Component {

    state = {
        currentTime: 0.0,
        recording: false,
        paused: false,
        stoppedRecording: false,
        finished: false,
        play: false,
        audioPath: AudioUtils.DocumentDirectoryPath + this.getAacName(),//生成的录音
        hasPermission: undefined,
    };

    prepareRecordingPath(audioPath) {
        AudioRecorder.prepareRecordingAtPath(audioPath, {
            SampleRate: 22050,
            Channels: 1,
            AudioQuality: "Low",
            AudioEncoding: "aac",
            AudioEncodingBitRate: 32000
        });
    }

    /**
     * 获取录音文件名
     * @returns {string}
     */
    getAacName() {
        return "/" + DateUtil.getYMDHms() + ".aac";
    }

    componentDidMount() {
        AudioRecorder.requestAuthorization().then((isAuthorised) => {
            this.setState({hasPermission: isAuthorised});

            if (!isAuthorised) return;

            this.prepareRecordingPath(this.state.audioPath);

            AudioRecorder.onProgress = (data) => {
                this.setState({currentTime: Math.floor(data.currentTime)});
            };

            AudioRecorder.onFinished = (data) => {
                console.log("data" + JSON.stringify(data));
                // Android callback comes in the form of a promise instead.
                if (Platform.OS === 'ios') {
                    this._finishRecording(data.status === "OK", data.audioFileURL, data.audioFileSize);
                }
            };
        });
    }

    _renderButton(title, onPress, active) {
        var style = (active) ? styles.activeButtonText : styles.buttonText;
        return (
            <TouchableHighlight style={styles.button} onPress={onPress}>
                <Text style={style}>
                    {title}
                </Text>
            </TouchableHighlight>
        );
    }

    /**
     * 播放
     * @param onPress
     * @param active
     * @returns {*}
     * @private
     */
    _renderPlayButton(onPress, active) {
        var style = (active) ? styles.activeTouch : styles.touch;
        return (
            <Button title={"播放"}
                    buttonStyle={style}
                    titleStyle={styles.text}
                    onPress={onPress}/>
        );
    }

    /**
     * 录音与停止
     * @param onPress
     * @param active
     * @returns {*}
     * @private
     */
    _renderChangeButton(onPress, active) {
        var style = (active) ? styles.activeTouch : styles.touch;
        var title = this.state.recording ? "停止" : "录音";
        return (
            <Button title={title}
                    buttonStyle={style}
                    titleStyle={styles.text}
                    onPress={onPress}/>
        );
    }

    /**
     *
     * @param onPress
     * @private
     */
    _renderDeleteButton(onPress) {
        return (
            <Button title={'删除'}
                    buttonStyle={styles.touch}
                    titleStyle={styles.text}
                    onPress={onPress}/>
        )
    }

    /**
     * 录音与停止
     * @param onPress
     * @param active
     * @returns {*}
     * @private
     */
    _renderChangeButton2(onPress, active) {
        var style = (active) ? styles.activeButtonText : styles.buttonText;
        var title = this.state.recording ? "停止" : "录音";
        return (
            <TouchableHighlight style={styles.button} onPress={onPress}>
                <Text style={style}>
                    {title}
                </Text>
            </TouchableHighlight>
        );
    }

    _renderPauseButton(onPress, active) {
        var style = (active) ? styles.activeButtonText : styles.buttonText;
        var title = this.state.paused ? "重录" : "暂停";
        return (
            <TouchableHighlight style={styles.button} onPress={onPress}>
                <Text style={style}>
                    {title}
                </Text>
            </TouchableHighlight>
        );
    }

    //模拟器安卓版本不支持
    async _pause() {
        if (!this.state.recording) {
            console.warn('Can\'t pause, not recording!');
            return;
        }
        try {
            const filePath = await AudioRecorder.pauseRecording();
            console.error("filePath:" + filePath);
            this.setState({paused: true});
        } catch (error) {
            console.error(error);
        }
    }

    async _resume() {
        if (!this.state.paused) {
            console.warn('Can\'t resume, not paused!');
            return;
        }
        try {
            await AudioRecorder.resumeRecording();
            this.setState({paused: false});
        } catch (error) {
            console.error(error);
        }
    }

    async _delete() {
        if (this.state.recording) {
            ToastAndroid.show("无法删除，正在录音", ToastAndroid.SHORT);
            console.log('Can\'t delete, recording!');
            return;
        }
        if (this.state.play) {
            ToastAndroid.show("无法删除，正在播放", ToastAndroid.SHORT);
            console.log('Can\'t delete, playing!');
            return;
        }
        if (!this.state.stoppedRecording) {
            ToastAndroid.show("无录音", ToastAndroid.SHORT);
            return;
        }
        //todo  react-native-fs组件返回不了boolean，而是一个promise
        var flag = await FileUtil.existsFile(this.state.audioPath);
        console.log("flag");
        if (!flag) {
            ToastAndroid.show("无录音", ToastAndroid.SHORT);
            console.log('no file');
            return;
        }
        Alert.alert('删除录音', '确认删除录音吗?',
            [
                {
                    text: "是", onPress: () => {
                        FileUtil.deleteFile(this.state.audioPath);
                    }
                },
                {text: "否"}
            ])
    }

    async _stop() {
        if (!this.state.recording) {
            console.warn('Can\'t stop, not recording!');
            return;
        }

        this.setState({stoppedRecording: true, recording: false, paused: false});

        try {
            const filePath = await AudioRecorder.stopRecording();
            console.warn(filePath);
            if (Platform.OS === 'android') {
                this._finishRecording(true, filePath);
            }
            return filePath;
        } catch (error) {
            console.error(error);
        }
    }

    async _playTest() {
        FileUtil.playAudio("http://172.28.1.208:8080/jweq/medias/uploadDir/20181126163444.aac");
    }

    /**
     * 播放
     * @returns {Promise<void>}
     * @private
     */
    async _play() {
        if (this.state.recording) {
            await this._stop();
        }
        if (!this.state.stoppedRecording) {
            ToastAndroid.show("无录音", ToastAndroid.SHORT);
            return;
        }
        var flag = await FileUtil.existsFile(this.state.audioPath);
        if (!flag) {
            ToastAndroid.show("无录音", ToastAndroid.SHORT);
            return;
        }
        this.setState({
            play: true
        });

        FileUtil.playAudio(this.state.audioPath, () => {
            this.setState({play: false})
        });

    }

    /**
     * 录音
     * @returns {Promise<void>}
     * @private
     */
    async _record() {
        if (this.state.recording) {
            ToastAndroid.show("正在录音", ToastAndroid.SHORT);
            console.warn('Already recording!');
            return;
        }

        if (!this.state.hasPermission) {
            ToastAndroid.show("无法录音，请授予权限", ToastAndroid.SHORT);
            console.warn('Can\'t record, no permission granted!');
            return;
        }

        if (this.state.stoppedRecording) {
            this.prepareRecordingPath(this.state.audioPath);
        }

        this.setState({recording: true, paused: false, play: false});

        try {
            const filePath = await AudioRecorder.startRecording();
            console.warn(filePath);
        } catch (error) {
            console.error(error);
        }
    }

    _finishRecording(didSucceed, filePath, fileSize) {
        this.setState({finished: didSucceed});
        console.log(`Finished recording of duration ${this.state.currentTime} seconds at path: ${filePath} and size of ${fileSize || 0} bytes`);
    }

    render() {
        return (
            <View style={styles.container}>
                {this._renderChangeButton(() => {
                    this.state.recording ? this._stop() : this._record()
                }, this.state.recording)}
                {this._renderPlayButton(() => {
                    this._play();
                }, this.state.play)}
                {this._renderDeleteButton(() => {
                    this._delete();
                })}
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        height: 50,
        backgroundColor: "#008EFE",
        alignItems: "center",
        marginVertical: 5,
        marginHorizontal: 20,
        borderRadius: 8,
        justifyContent: "space-around",
        flexDirection: "row"
    },
    buttonColor: {color: "#D2B48C"},
    activeButtonColor: {color: "#B81F00"},

    touch: {
        backgroundColor: "#D2B48C",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
        elevation: 0
    },
    activeTouch: {
        backgroundColor: "#B81F00",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
        elevation: 0
    },
    controls: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        flexDirection: "row"
    },
    progressText: {
        paddingTop: 5,
        color: "#fff"
    },
    button: {
        padding: 5
    },
    disabledButtonText: {
        color: '#eee'
    },
    buttonText: {
        fontSize: 18,
        color: "#fff"
    },
    activeButtonText: {
        fontSize: 18,
        color: "#B81F00"
    },
    view: {
        height: 80,
        width: Dimensions.get("window").width,
        backgroundColor: "#FFF",
        alignItems: "center",
        marginBottom: 0,
        justifyContent: "center"
    },
    text: {
        fontSize: 18,
        color: "#FFF"
    }

});

// export default AudioSound;
