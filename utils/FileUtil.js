/**
 * File工具类
 */
import React, {Component} from 'react';
// import FileSystem from 'react-native-filesystem';
import RNFS from 'react-native-fs';
import Sound from 'react-native-sound';
import {Alert} from "react-native";


export default class FileUtil extends Component {

    /**
     * 删除文件
     * @param path
     */
    static async deleteFile(path) {
        RNFS.unlink(path);
        // await FileSystem.delete(path);
    }

    /**
     * 文件是否存在
     * @param path
     */
    static async existsFile(path) {
        await RNFS.exists(path).then((result) => {
            console.log(result);
            return result;
        }).catch((err) => {
            console.log(err.message);
            return false;
        });
        return RNFS.exists(path);
    }

    /**
     * 播放音频
     * @param audioPath
     * @param responseHandler 回调函数，以箭头函数的方式传递
     */
    static playAudio(audioPath, responseHandler) {
        const callback = (error, sound) => {
            console.log(error);
            console.log(sound);
            if (error) {
                Alert.alert('error', error.message);
                console.log('failed to load the sound', error);
                return;
            }
            sound.play((success) => {
                if (success) {
                    if (responseHandler) {
                        responseHandler();
                    }
                    console.log('successfully finished playing');
                } else {
                    console.log('playback failed due to audio decoding errors');
                }
                sound.release();
            });
        };
        const sound = new Sound(audioPath, "", error => callback(error, sound));
    }

}