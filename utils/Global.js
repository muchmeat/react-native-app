/**
 * 全局配置项组件
 * Created by ruixin on 16/7/14.
 */
import React, {Component} from 'react';
import {NativeModules, ToastAndroid} from "react-native";
import OpenFile from "react-native-doc-viewer";

let baseUrl = "http://172.28.1.208:8082/zybzzxt/";
// let baseUrl = "http://192.168.20.219:9010/zybzzxt/";
export default class Global extends Component {

    static REQUEST_BASE_URL = baseUrl; //测试地址
    static DTTB_IMAGE_URL = baseUrl + '/medias/style/plat/image/dttb/'; //动态图标地址
    static FILE_BYTE_URL = baseUrl + '/attachment/getImage?id='; //获取文件流地址
    static FILE_BASE64_URL = baseUrl + '/attachment/getFileBase64?id='; //获取文件base64地址

    /**
     * 网络请求打开文件
     * @param id 附件id
     * @param fileName 文件名
     * @param fileType 文件类型
     * @returns {Promise<void>}
     */
    static async openFile(id, fileName, fileType) {
        let reCall = await NativeModules.OpenHTTPFileModule.download(Global.FILE_BYTE_URL + id, fileName, fileType);
        if (reCall.code === "1") {
            OpenFile.openDoc([{
                url: "file://" + reCall.path,
                fileName: fileName,
                cache: false,
                fileType: fileType
            }], () => {
            })
        } else if (reCall.code === "0") {
            ToastAndroid.show("打开文件失败", ToastAndroid.SHORT)
        }
    }
}