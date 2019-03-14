/**
 * 用户列表Action
 */
import * as types from '../constants/userListTypes';
import Global from "../../../utils/Global";
import FetchUtil from "../../../utils/FetchUtil";
import {dispatch} from "../../base/tcom/tcomb";
import {indexOfArray} from "../../base/tcom/tcomb-form-native/lib/util";

/**
 * 分页查询用户
 */
export function getUserList(option, list, setUserList, callBack) {
    FetchUtil.postJsonParams(Global.REQUEST_BASE_URL + "/user/getAppSysUserListPage", option, (result) => {
        // console.warn("list" + list.length);
        let userList = list.concat(result.data.rows);
        // console.warn("userList" + userList.length);
        setUserList(userList, result.data.total == userList.length);
        if (callBack) {
            callBack();
        }
    }, (error) => {
        console.log(JSON.stringify(error));
    }, () => {
    });
}

/**
 * 设置用户集合
 * @param list
 * @param bool
 * @returns {{type: string, rwdList: *, isMax: *}}
 */
export function setUserList(list, bool) {
    return {
        type: types.SETUSERLIST,
        userList: list,
        isMax: bool
    }
}

/**
 * 设置选中的用户集合
 * @param list
 * @param item
 * @returns {{type: string, checkedUserList: T[] | string}}
 */
export function setCheckedUserList(list, item) {
    let newList = [];
    if (item.checked) {
        newList = list.concat(item);
    } else {
        let i = indexOfArray(list, item.ID, "ID");
        list.splice(i, 1);
        newList = list;
    }
    return {
        type: types.SETCHECKEDUSERLIST,
        checkedUserList: newList
    }
}

