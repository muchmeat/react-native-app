'use strict';
import * as types from '../constants/timingCheckTypes';

export default function timingCheckReducer(state={}, action) {
  switch (action.type) {
      case types.SETHISTORYLIST:
          return {
              ...state,
              rwdList:action.rwdList,
              isMax:action.isMax
          };
          break
      case types.SETSEARCHNAME:
          return {
              ...state,
              searchName:action.searchName
          };
          break
      case types.SETVALUETIME:
          return {
              ...state,
              valueTime:action.valueTime
          };
          break
      case types.SHOWDATEPICKER:
          return {
              ...state,
              showDatePicker:action.showDatePicker
          };
          break
      case types.TIMINGCHECKSETPICS:
          return {
              ...state,
              zxjg:action.zxjg,
              pics:action.pics
          };
          break
      case types.SETSAVERESULT:
          return {
              ...state,
              saveResult:action.saveResult,
              newXdjc:action.newXdjc
          };
          break
    default:
      return state;
  }
}

