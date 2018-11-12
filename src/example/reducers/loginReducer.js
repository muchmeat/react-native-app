'use strict';
import * as types from '../constants/loginTypes';

const initialState = {
    status: 0,            //0 未登录 1 正在登陆 2 登陆成功 3 登录失败(账号密码错误) 4 登录失败 5 网络请求超时
    topFocus: false,
    bottomFocus: false,
    user: null,
};

export default function loginIn(state=initialState, action) {
  switch (action.type) {
      case types.LOGIN:
        if(action.user)
            return {
                ...state,
                status: action.status,
                user:action.user,
                zzList:action.zzList,
            };
        else
            return {
                ...state,
                status: action.status
            };
        break;
      case types.LOGIN_INIT:
      return {
          ...state,
          status: 0,
          topFocus: false,
          bottomFocus: false
      };
      break;
    case types.LOGIN_TOP_FOCUSE:
        return {
            ...state,
            topFocus:action.topFocus,
        };
        break;
    case types.LOGIN_BOTTOM_FOCUSE:
        return {
            ...state,
            bottomFocus:action.bottomFocus,
        };
        break;
    default:
      return state;
  }
}

