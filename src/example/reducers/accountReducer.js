'use strict';
import * as types from '../constants/accountTypes';

let init = {
    token: null,
    user: null
}
export default function accountReducer(state = init, action) {
    switch (action.type) {
        case types.SET_ACCOUNT:
            return {
                ...state,
                token: action.token,
                user: action.user
            };
            break
        case types.CLEAR_ACCOUNT:
            return {
                ...state,
                token: null,
                user: null
            };
            break
        case types.GET_ACCOUNT_TOKEN:
            return {
                ...state,
                token: action.token
            };
            break
        case types.GET_ACCOUNT_USER:
            return {
                ...state,
                user: action.user
            };
            break
        default:
            return state;
    }
}

