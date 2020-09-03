import {
  SET_USER_EMAIL,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  SIGNUP_FAILED,
  SIGNUP_SUCCESS,
  GET_USER_WITH_ID_FAILED,
  GET_USER_WITH_ID_SUCCESS,
} from "../actions/actionTypes";

const initData = {
  email: null,
  loading: false,
  errorMsg: null,
  token: null,
  isLogin: false,
  userData: null,
  isSignup: false,
  isGetDetail: true,
};

export const usersReducer = (state = initData, action) => {
  switch (action.type) {
    case SET_USER_EMAIL:
      return {
        ...state,
        email: action.data,
        errorMsg: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLogin: true,
        userData: action.data,
        errorMsg: null,
      };
    case LOGIN_FAILED:
      return {
        ...state,
        isLogin: false,
        errorMsg: action.errorMsg,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isSignup: true,
        userData: action.data,
        errorMsg: null,
      };
    case SIGNUP_FAILED:
      return {
        ...state,
        isSignup: false,
        errorMsg: action.errorMsg,
      };
    case GET_USER_WITH_ID_SUCCESS:
      return {
        ...state,
        userData: action.data,
        errorMsg: null,
        isGetDetail: true,
      };
    case GET_USER_WITH_ID_FAILED:
      return {
        ...state,
        userData: null,
        errorMsg: action.errorMsg,
        isGetDetail: false,
      };
    default:
      return {
        ...state,
        errorMsg: null,
      };
  }
};
