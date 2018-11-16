'use strict';

import * as types from '../constants/formTypes';
import FetchUtil from "../../../utils/FetchUtil";
import Global from "../../../utils/Global";

// 访问登录接口 根据返回结果来划分action属于哪个type,然后返回对象,给reducer处理
/**
 * 每当store.dispatch发送过来一个新的 Action，就会自动调用 Reducer，得到新的 State。
 * @returns {function(*)}
 */

export function getFormSetting(id,setResult) {
        setResult(types.GET_ON);
    FetchUtil.postJsonParams(Global.REQUEST_BASE_URL+"form/getFormDef",{id:id},(response)=>{
        setResult(types.GET_SECCUSE,response.data);
    },(error)=>{
        setResult(types.GET_ERROR);
    },()=>{
        setResult(types.GET_OUTOFTIME);
    })
}

export function setResult(type, data) {
    return dispatch => dispatch({
        type:types.GET_FORM,
        formGetStatus:type,
        formData:data
    })
}