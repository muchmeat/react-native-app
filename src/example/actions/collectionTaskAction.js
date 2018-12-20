/**
 * 采集任务Action
 */
import * as types from '../constants/collectionTaskTypes';
import Global from "../../../utils/Global";
import FetchUtil from "../../../utils/FetchUtil";
import {dispatch} from "../../base/tcom/tcomb";

/**
 * 分页查询动态表单采集任务
 */
export function getDynamicFormList(option, list, setDynamicFormList) {
    FetchUtil.postJsonParams(Global.REQUEST_BASE_URL + "/dynamicForm/getAppDynamicFormListPage", option, (result) => {
        // FetchUtil.postJsonParams(Global.REQUEST_BASE_URL + "/rwd/getAppRwdListPage",option,(result)=>{
        let dynamicFormList = list.concat(result.data.rows);
        setDynamicFormList(dynamicFormList, result.data.rows.length != option.pageSize);
    }, (error) => {
        alert(JSON.stringify(error));
        // alert("error:" + JSON.stringify(error));
    }, () => {
    });
}

/**
 * 删除动态表单采集任务
 * @param id
 * @param formId
 * @param list
 * @param index
 * @param setDynamicFormList
 * @param isMax
 */
export function deleteDynamicForm(id, formId, list, index, setDynamicFormList, isMax) {
    FetchUtil.postJsonParams(Global.REQUEST_BASE_URL + "/dynamicForm/deleteAppDynamicForm", {
        id: id,
        formId: formId
    }, (result) => {
        list.splice(index, 1);
        let newArr = [];
        for(let a of list){
            newArr.push(a)
        }
        setDynamicFormList(newArr, isMax);
    }, (error) => {
        alert(JSON.stringify(error));
    }, () => {
    });
}

export function setDynamicFormList(list, bool) {
    return {
        type: types.SETDYNAMICFORMLIST,
        dynamicFormList: list,
        isMax: bool
    }
}

export function clearDynamicFormList() {
    return {
        type: types.CLEARDYNAMICFORMLIST,
        dynamicFormList: [],
        isMax: false
    }
}
