/**
 * 资源标注Action
 */
import * as types from '../constants/resourceTaggingTypes';
import Global from "../../../utils/Global";
import FetchUtil from "../../../utils/FetchUtil";
import {dispatch} from "../../base/tcom/tcomb";

/**
 * 分页查询发起采集记录
 */
export function getRwdList(option, list, setRwdList, callBack) {
    FetchUtil.postJsonParams(Global.REQUEST_BASE_URL + "/cjrw/getAppResourceTaggingListPage", option, (result) => {
        let rwdList = list.concat(result.data.rows);
        setRwdList(rwdList, result.data.total == rwdList.length);
        if (callBack) {
            callBack();
        }
    }, (error) => {
        console.log(JSON.stringify(error));
    }, () => {
    });
}

export function setRwdList(list, bool) {
    return {
        type: types.SETRWDLIST,
        rwdList: list,
        isMax: bool
    }
}

/**
 * 设置某个采集任务的总条数
 * @param list
 * @returns {{type: string, rwdList: *}}
 */
export function setRwdListTotal(list) {
    return {
        type: types.SETRWDLISTTOTAL,
        rwdList: list
    }
}
