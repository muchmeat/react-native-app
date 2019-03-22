/**
 * Fetch工具类
 * Created by ruixin on 16/7/12.
 */
import React, {Component} from 'react';
import {AsyncStorage, ToastAndroid} from 'react-native';
import RNFetchBlob from "react-native-fetch-blob";
import MIMEEnums from "@utils/enums/MIMEEnums";
import {getAccount} from "../utils/account";


export default class FetchUtil extends Component {
    static DEFALT_DEADLINE = 15000; //默认请求最大时限为15秒

    /**
     * post JSON
     * @param url
     * @param json
     * @param responseHandler 请求成功处理
     * @param errorHandler 请求异常处理
     * @param rejectHandler 超时处理
     */
    static postJsonStr(url, json, responseHandler, errorHandler, rejectHandler) {
        AsyncStorage.getItem("token", (error, user) => {
            let formData = new FormData();
            let headers = "";
            if (user) {
                headers = user;
            }
            formData.append('data', JSON.stringify(json));
            this.timeoutPromise(this.DEFALT_DEADLINE, fetch(url, {
                method: 'POST',
                headers: {
                    "Authorization": headers
                },
                body: formData
            }), responseHandler, errorHandler, rejectHandler);
        })
    }

    /**
     * post JSON
     * @param url
     * @param json
     * @param responseHandler 请求成功处理
     * @param errorHandler 请求异常处理
     * @param rejectHandler 超时处理
     */
    static postJsonStr1(url, json, responseHandler, errorHandler, rejectHandler) {
        let formData = new FormData();
        formData.append('data', JSON.stringify(json));
        this.timeoutPromise(this.DEFALT_DEADLINE, fetch(url, {
            method: 'POST',
            body: formData
        }), responseHandler, errorHandler, rejectHandler);

    }

    /**
     * 字段接收
     * post JSON
     * @param url
     * @param json
     * @param responseHandler 请求成功处理
     * @param errorHandler 请求异常处理
     * @param rejectHandler 超时处理
     */
    static postJsonParams(url, json, responseHandler, errorHandler, rejectHandler) {
        AsyncStorage.getItem("token", (error, user) => {
            let headers = "";
            if (user) {
                headers = user;
            }
            let formData = new FormData();
            for (let key in json) {
                if (json.hasOwnProperty(key)) {
                    formData.append(key, json[key]);
                }
            }
            this.timeoutPromise(this.DEFALT_DEADLINE, fetch(url, {
                method: 'POST',
                body: formData,
                headers: {
                    "Authorization": headers
                },
            }), responseHandler, errorHandler, rejectHandler);
        })
    }

    /**
     * 包含文件的表单数据处理为array
     * @param url
     * @param json
     * @param responseHandler
     * @param errorHandler
     * @param rejectHandler
     */
    static postForm(url, json, responseHandler, errorHandler, rejectHandler) {
        let requestData = [];
        for (let key in json) {
            if ("formData" === key) {
                let formData = json[key];
                for (let fk in formData) {
                    if (Array.isArray(formData[fk])) {
                        let fileJson = formData[fk];
                        for (let file of fileJson) {
                            let item = {
                                name: fk,
                                filename: file.fileName,
                                type: MIMEEnums.getCode(file.type),
                                // data: RNFetchBlob.wrap(RNFetchBlob.fs.asset(file.path)),
                                data: RNFetchBlob.wrap(file.path)
                            };
                            requestData.push(item);
                        }
                    } else {
                        let item = {
                            name: fk,
                            data: formData[fk]
                        };
                        requestData.push(item);
                    }
                }
            } else {
                let item = {
                    name: key,
                    data: json[key]
                };
                requestData.push(item);
            }
        }
        this.timeoutPromise(this.DEFALT_DEADLINE, RNFetchBlob.fetch('POST', url, {
            // Authorization : "Bearer access-token",
            // otherHeader : "foo",
            'Content-Type': 'multipart/form-data',
        }, requestData), responseHandler, errorHandler, rejectHandler);
    }

    static postFormRNFetch(url, json, responseHandler, errorHandler) {
        AsyncStorage.getItem("token", (error, user) => {
            let headers = "";
            if (user) {
                headers = user;
            }
            let requestData = [];
            for (let key in json) {
                if ("formData" === key) {
                    let formData = json[key];
                    for (let fk in formData) {
                        if (Array.isArray(formData[fk])) {
                            let fileJson = formData[fk];
                            for (let file of fileJson) {
                                let item = {
                                    name: fk,
                                    filename: file.fileName,
                                    type: MIMEEnums.getCode(file.type),
                                    // data: RNFetchBlob.wrap(RNFetchBlob.fs.asset(file.path)),
                                    data: RNFetchBlob.wrap(file.path)
                                };
                                requestData.push(item);
                            }
                        } else {
                            let item = {
                                name: fk,
                                data: formData[fk]
                            };
                            requestData.push(item);
                        }
                    }
                } else {
                    let item = {
                        name: key,
                        data: json[key]
                    };
                    requestData.push(item);
                }
            }
            RNFetchBlob.fetch('POST', url, {
                'Content-Type': 'multipart/form-data',
                Authorization: headers,
            }, requestData).then((resp) => {
                responseHandler(resp);
            }).catch((err) => {
                errorHandler(err);
            })
        })
    }

    /**
     * 实体接收
     * post JSON
     * @param url
     * @param json
     * @param responseHandler 请求成功处理
     * @param errorHandler 请求异常处理
     * @param rejectHandler 超时处理
     */
    static postJsonEntity(url, json, responseHandler, errorHandler, rejectHandler) {
        let _this = this;
        _this.timeoutPromise(this.DEFALT_DEADLINE, fetch(url, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(json)
        }), responseHandler, errorHandler, rejectHandler);
    }

    /**
     * get JSON
     * @param url
     * @param responseHandler 请求成功处理
     * @param errorHandler 请求异常处理
     * @param rejectHandler 超时处理
     */
    static getJson(url, responseHandler, errorHandler, rejectHandler) {
        this.timeoutPromise(this.DEFALT_DEADLINE, fetch(url), responseHandler, errorHandler, rejectHandler);
    }

    /**
     * Promise增加超时处理
     * @param ms
     * @param promise
     * @param responseHandler 请求成功处理
     * @param errorHandler 请求异常处理
     * @param rejectHandler 超时处理
     * @returns {Promise}
     */
    static timeoutPromise(ms, promise, responseHandler, errorHandler, rejectHandler) {
        return new Promise((resolve, reject) => {
            const timeoutId = setTimeout(() => {//超过限定时间处理(超时处理)
                if (rejectHandler) {
                    rejectHandler();
                } else {
                    console.warn(new Error("promise timeout"));
                }
            }, ms);
            promise.then((response) => { //返回结果处理为JSON对象
                clearTimeout(timeoutId);
                return response.json();
            }).then((responseData) => {
                responseHandler(responseData);
            }).catch((error) => {
                clearTimeout(timeoutId);
                if (errorHandler) {
                    errorHandler(error);
                } else {
                    console.warn(error);
                }
            });
        })
    }
}