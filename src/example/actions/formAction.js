'use strict';

import * as types from '../constants/formTypes';
import FetchUtil from "../../../utils/FetchUtil";
import Global from "../../../utils/Global";

// 访问登录接口 根据返回结果来划分action属于哪个type,然后返回对象,给reducer处理
/**
 * 每当store.dispatch发送过来一个新的 Action，就会自动调用 Reducer，得到新的 State。
 * @returns {function(*)}
 */

export function getFormSetting(id, setResult) {
    setResult(types.GET_ON);
    // FetchUtil.postJsonParams(Global.REQUEST_BASE_URL + "/form/getFormDef", {id: id}, (response) => {
    FetchUtil.postJsonParams(Global.REQUEST_BASE_URL + "/dynamicForm/getAppDynamicFormData", {
        id: "",
        formId: id
    }, (response) => {
        setResult(types.GET_SUCCESS, response.data);
    }, (error) => {
        setResult(types.GET_ERROR);
    }, () => {
        setResult(types.GET_OUTOFTIME);
    })
}

/**
 * 依据主键获取动态表单值与配置
 * @param id
 * @param formId
 * @param needFile
 * @param setResult
 */
export function getFormData(id, formId, setResult) {
    setResult(types.GET_ON);
    FetchUtil.postJsonParams(Global.REQUEST_BASE_URL + "/dynamicForm/getAppDynamicFormData", {
        id: id,
        formId: formId
    }, (response) => {
        setResult(types.GET_SUCCESS_DATA, response.data);
    }, (error) => {
        setResult(types.GET_ERROR);
    }, () => {
        setResult(types.GET_OUTOFTIME);
    })
}

export function setResult(getStatus, data) {
    // alert(new Date().getMilliseconds() + ","+data+ "," + status);
    return dispatch => dispatch({
        type: types.GET_FORM,
        formStatus: getStatus,
        formData: data
    })
}