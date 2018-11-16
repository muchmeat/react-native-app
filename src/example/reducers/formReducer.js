'use strict';
import * as types from '../constants/formTypes';

export default function formReducer(state={}, action) {
  switch (action.type) {
      case types.GET_FORM:
          return {
              ...state,
              formGetStatus: action.formGetStatus,
              formData:action.formData
          };
          break
    default:
      return state;
  }
}

