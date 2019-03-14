'use strict';
import * as types from '../constants/collectionTaskTypes';
let init = {
    dynamicFormList:[]
}


export default function collectionTaskReducer(state=init, action) {
  switch (action.type) {
      case types.SETDYNAMICFORMLIST:
          return {
              ...state,
              dynamicFormList:action.dynamicFormList,
              isMax:action.isMax
          };
          break
      case types.CLEARDYNAMICFORMLIST:
          return {
              ...state,
              dynamicFormList:[],
              isMax:false
          };
          break
    default:
      return state;
  }
}

