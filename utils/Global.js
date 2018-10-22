/**
 * 全局配置项组件
 * Created by ruixin on 16/7/14.
 */
import React, {Component} from 'react';

export default class Global extends Component {

    // static REQUEST_BASE_URL = 'https://www.ruixin.net:9443/jdytpt/app'; //130外网
    static REQUEST_BASE_URL = 'http://172.28.1.28:8089/jdytpt/app'; //测试地址
    // static REQUEST_BASE_URL = 'http://10.125.6.237:8090/app'; //请求地址  本机运行
    // static REQUEST_BASE_URL = 'http://qq1091286607.qicp.io:20133/app'; //花生壳
    // static REQUEST_BASE_URL = 'http://192.168.191.1:8090/jdytpt/app'; //请求地址  本机运行
}