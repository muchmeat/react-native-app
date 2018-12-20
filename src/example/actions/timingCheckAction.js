import * as types from '../constants/timingCheckTypes';
import Global from "../../../utils/Global";
import FetchUtil from "../../../utils/FetchUtil";
import {dispatch} from "../../base/tcom/tcomb";

/**
 * 分页查询发起采集记录
 */
export function getHistoryList(option,list,setHistoryList) {
    // FetchUtil.postJsonEntity(Global.REQUEST_BASE_URL + "/xdjc/getHistoryList",option,(result)=>{
    //     let xdjcHistoryList = list.concat(result.list);
    //     setHistoryList(xdjcHistoryList,result.list.length != option.pageSize);
    // },(error)=>{
    // },()=>{
    // });
    console.log("getHistoryList");
    console.log(option);
    FetchUtil.postJsonParams(Global.REQUEST_BASE_URL + "/rwd/getAppRwdListPage",option,(result)=>{
        console.log(result);
        let rwdList = list.concat(result.data.rows);
        setHistoryList(rwdList,result.data.rows.length != option.pageSize);
    },(error)=>{
        alert(JSON.stringify(error));
    },()=>{
    });
}

export function setRwdList(list,bool) {
    return {
        type: types.SETHISTORYLIST,
        rwdList:list,
        isMax:bool
    }
}

export function setSearchName(name) {
    return {
        type: types.SETSEARCHNAME,
        searchName:name,
    }
}

export function showDatePicker(bool) {
    return {
        type: types.SHOWDATEPICKER,
        showDatePicker:bool
    }
}

export function setValueTime(time) {
    return {
        type: types.SETVALUETIME,
        valueTime:time
    }
}

export function getPics(search,setPics) {
        setPics("0");
    FetchUtil.postJsonStr(Global.REQUEST_BASE_URL + "/picture/getPics",search,(result)=>{
        setPics("1",result.pics);
    },(error)=>{
        setPics("2");
    },()=>{
        setPics("3");
    })
}

export function setPics(zxjg,list) {
    return {
        type: types.TIMINGCHECKSETPICS,
        zxjg:zxjg,
        pics:list
    }
}


export function saveXdjc(entity, setSaveResult) {
    FetchUtil.postJsonEntity(Global.REQUEST_BASE_URL + "/xdjc/saveXdjc",entity,(data)=>{
        if(data.zxjg){
            setSaveResult("1",data.newXdjc);
        } else if(data.result.sfzddr === "1"){  //支队导入
            setSaveResult("4",data.result);
        } else{  //该时间段已经存在录入记录
            setSaveResult("5");
        }
    },(error)=>{
        setSaveResult("2");
    },()=>{
        setSaveResult("3");
    })
}

export function setSaveResult(zxjg,entity) {
    return dispatch=>dispatch({
        type: types.SETSAVERESULT,
        saveResult:zxjg,
        newXdjc:entity
    });
}
