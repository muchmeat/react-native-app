'use strict';
import * as types from '../constants/userListTypes';

export default function userListReducer(state = {}, action) {
    switch (action.type) {
        case types.SETUSERLIST:
            return {
                ...state,
                userList: action.userList,
                isMax: action.isMax
            };
            break
        case types.SETCHECKEDUSERLIST:
            return {
                ...state,
                checkedUserList: action.checkedUserList
            };
            break
        default:
            return state;
    }
}

