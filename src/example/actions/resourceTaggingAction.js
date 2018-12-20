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
export function getRwdList(option,list,setRwdList) {
    FetchUtil.postJsonParams(Global.REQUEST_BASE_URL + "/rwd/getAppRwdListPage",option,(result)=>{
        let rwdList = list.concat(result.data.rows);
        setRwdList(rwdList,result.data.rows.length != option.pageSize);
    },(error)=>{
        alert(JSON.stringify(error));
    },()=>{
    });
}

export function setRwdList(list,bool) {
    return {
        type: types.SETRWDLIST,
        rwdList:list,
        isMax:bool
    }
}
