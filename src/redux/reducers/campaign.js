import {
  ADD_CAMPAIGN_START,
  ADD_CAMPAIGN,
  ADD_CAMPAIGN_ERROR,
  ACTION_GET_CAMPAIGN,
  ERROR_GET_CAMPAIGN,
  EDIT_CAMPAIGN_START,
  EDIT_CAMPAIGN_ERROR,
  EDIT_CAMPAIGN,
  DELETE_CAMPAIGN,
  DELETE_CAMPAIGN_ERROR,
} from "../actions/actionTypes";

const initData = {
  campaignData: [],
  isCreated: false,
  msgErr: null,
  isDeleted: false,
  lastAddedData: {},
  loading: false,
};

export const campaignReducer = (state = initData, action) => {
  switch (action.type) {
    case ADD_CAMPAIGN_START:
      return {
        ...state,
        status: "start",
        loading: true,
      };

    case ADD_CAMPAIGN:
      return {
        ...state,
        status: "success",
        loading: false,
        lastAddedData: action.data,
        errorMsg: null,
      };
    case ADD_CAMPAIGN_ERROR:
      return {
        ...state,
        status: "fail",
        campaignData: [],
        errorMsg: action.errorMsg,
        isGetDetail: false,
      };
    case EDIT_CAMPAIGN_START:
      return {
        ...state,
        status: "start",
        loading: true,
      };

    case EDIT_CAMPAIGN:
      return {
        ...state,
        status: "success",
        loading: false,
        errorMsg: null,
      };
    case EDIT_CAMPAIGN_ERROR:
      return {
        ...state,
        status: "fail",
        campaignData: [],
        errorMsg: action.errorMsg,
        isGetDetail: false,
      };

    case ACTION_GET_CAMPAIGN:
      return {
        ...state,
        campaignData: action.data === null ? [] : action.data,
        isCreated: false,
        msgErr: null,
        isDeleted: false,
      };
    case ERROR_GET_CAMPAIGN:
      return {
        ...state,
        msgErr: action.msgErr,
      };
    case DELETE_CAMPAIGN:
      return {
        ...state,
        status: "success",
        loading: false,
        errorMsg: null,
      };
    case DELETE_CAMPAIGN_ERROR:
      return {
        ...state,
        status: "fail",
        campaignData: [],
        errorMsg: action.errorMsg,
        isGetDetail: false,
      };
    default:
      return {
        ...state,
        msgErr: null,
      };
  }
};
