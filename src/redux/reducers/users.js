import {
  SET_USER_EMAIL,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  SIGNUP_FAILED,
  SIGNUP_SUCCESS,
  GET_USER_WITH_ID_FAILED,
  GET_USER_WITH_ID_SUCCESS,
  SEND_USER_INVITATION_ERROR,
  SEND_USER_INVITATION_START,
  SEND_USER_INVITATION_SUCCESS,
  ClEAR_STATUS,
} from "../actions/actionTypes";

const initData = {
  email: null,
  loading: false,
  status: null,
  errorMsg: null,
  token: null,
  isLogin: false,
  userData: null,
  isSignup: false,
  isGetDetail: true,
  invitedUser: null
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
    case SEND_USER_INVITATION_START:
      return {
        ...state,
        loading: true,
        status: "start"
      };
    case SEND_USER_INVITATION_SUCCESS:
      return {
        ...state,
        loading: false,
        status: "success",
        invitedUser: action.data,

      };
    case SEND_USER_INVITATION_ERROR:
      return {
        ...state,
        loading: false,
        status: "fail",
        invitedUser: null,
        errorMsg: action.errorMsg,

      };
    case ClEAR_STATUS:
      return {
        ...state,
        status: null,
      };
    default:
      return {
        ...state,
        errorMsg: null,
      };
  }
};
