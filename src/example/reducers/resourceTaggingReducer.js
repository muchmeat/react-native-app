'use strict';
import * as types from '../constants/resourceTaggingTypes';

export default function resourceTaggingReducer(state={}, action) {
  switch (action.type) {
      case types.SETRWDLIST:
          return {
              ...state,
              rwdList:action.rwdList,
              isMax:action.isMax
          };
          break
    default:
      return state;
  }
}

