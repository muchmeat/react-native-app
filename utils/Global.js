/**
 * 全局配置项组件
 * Created by ruixin on 16/7/14.
 */
import React, {Component} from 'react';

let baseUrl = "http://172.28.1.208:8082/zybzzxt/";
export default class Global extends Component {

    // static REQUEST_BASE_URL = 'http://192.168.0.125:8087/plat'; //测试地址
    static REQUEST_BASE_URL = baseUrl; //测试地址
    static DTTB_IMAGE_URL = baseUrl + '/medias/style/plat/image/dttb/'; //动态图标地址
    static FILE_BYTE_URL = baseUrl + '/attachment/getImage?id='; //获取文件流地址
    static FILE_BASE64_URL = baseUrl + '/attachment/getFileBase64?id='; //获取文件base64地址
    // static REQUEST_BASE_URL = 'http://192.168.0.125:8087/plat/'; //测试地址
}