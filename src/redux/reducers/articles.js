import {
  // articles
  ACTION_CREATED_NEW_POST,
  ERROR_CREATED_NEW_POST,
  ACTION_GET_LIST_ARTICLES,
  ERROR_GET_LIST_ARTICLES,
  ACTION_GET_DETAIL_ARTICLE,
  ERROR_GET_DETAIL_ARTICLE,
  ACTION_DELETED_ARTICLE_SUCCESS,
  ERROR_DELETED_ARTICLE,
  ACTION_UPDATED_ARTICLE,
  ERROR_UPDATED_ARTICLE,
} from "../actions/actionTypes";

const initData = {
  articlesData: [],
  isCreated: false,
  articleDetail: null,
  msgErr: null,
  isDeleted: false,
  isUpdated: false,
};

export const articlesReducer = (state = initData, action) => {
  switch (action.type) {
    case ACTION_GET_LIST_ARTICLES:
      return {
        ...state,
        articlesData: action.data,
        isCreated: false,
        msgErr: null,
        isDeleted: false,
      };
    case ERROR_GET_LIST_ARTICLES:
      return {
        ...state,
        msgErr: action.msgErr,
      };
    case ACTION_CREATED_NEW_POST:
      return {
        ...state,
        isCreated: true,
        msgErr: null,
      };
    case ERROR_CREATED_NEW_POST:
      return {
        ...state,
        isCreated: false,
        msgErr: action.msgErr,
      };
    case ACTION_GET_DETAIL_ARTICLE:
      return {
        ...state,
        isDeleted: false,
        articleDetail: action.data,
        msgErr: null,
        isDeleted: false,
      };
    case ERROR_GET_DETAIL_ARTICLE:
      return {
        ...state,
        articleDetail: null,
        msgErr: action.msgErr,
      };
    case ACTION_DELETED_ARTICLE_SUCCESS:
      return {
        ...state,
        isDeleted: true,
      };
    case ERROR_DELETED_ARTICLE:
      return {
        ...state,
        isDeleted: false,
        msgErr: action.msgErr,
      };
    case ACTION_UPDATED_ARTICLE:
      return {
        ...state,
        isUpdated: true,
        msgErr: null,
      };
    case ERROR_UPDATED_ARTICLE:
      return {
        ...state,
        isUpdated: false,
        msgErr: action.msgErr,
      };
    default:
      return {
        ...state,
        msgErr: null,
      };
  }
};
