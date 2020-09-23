import {
  // articles
  ACTION_CREATED_NEW_POST,
  ERROR_CREATED_NEW_POST,
  ACTION_GET_LIST_ARTICLES,
  ERROR_GET_LIST_ARTICLES,
  ACTION_GET_DETAIL_ARTICLE,
  CLEAR_ARTICLE_DETAIL,
  ERROR_GET_DETAIL_ARTICLE,
  ACTION_DELETED_ARTICLE_SUCCESS,
  ERROR_DELETED_ARTICLE,
  UPDATE_ARTICLE,
  ACTION_UPDATED_ARTICLE,
  ERROR_UPDATED_ARTICLE,
  ACTION_DELETED_ACTICLES_MULTI,
  ERROR_DELETED_ARTICLES_MULTI,
  ACTION_GET_LIST_ARTTICLES_DELETED,
  ERROR_GET_LIST_ARTICLES_DELETED,
  ACTION_CREATE_DRAFT_ARTICLE,
  ERROR_CREATE_DRAFT_ARTICLE,
  ACTION_GET_LIST_DRAFT_ARTICLES,
  ERROR_GET_LST_DRAFT_ARTICLES,
} from "../actions/actionTypes";

const initData = {
  articlesData: [],
  isCreated: false,
  articleDetail: null,
  msgErr: null,
  isDeleted: false,
  updateArticleDetail: null,
  postSaveState: '',
  isDeletedMulti: false,
  articlesDeleted: [],
  articlesDraft: [],
  isCreatedDraft: false,
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
        articleDetail: {
          ...action.data
        },
        msgErr: null,
        postSaveState: 'saved',
        isDeleted: false,
      };
    case CLEAR_ARTICLE_DETAIL:
      return {
        ...state,
        articleDetail: null
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

    case UPDATE_ARTICLE: 
    return {
      ...state,
      postSaveState: 'saving...'
    }
    case ACTION_UPDATED_ARTICLE:
      return {
        ...state,
        updateArticleDetail: {
          ...action.data.upsertArticle
        },
        postSaveState: 'saved',
        msgErr: null,
      };
    case ERROR_UPDATED_ARTICLE:
      return {
        ...state,
        postSaveState: 'Failed to save',
        msgErr: action.msgErr,
      };
    case ACTION_GET_LIST_ARTTICLES_DELETED:
      return {
        ...state,
        articlesDeleted: action.data,
        isDeletedMulti: false,
        msgErr: null,
      };
    case ERROR_GET_LIST_ARTICLES_DELETED:
      return {
        ...state,
        articlesDeleted: [],
        isDeletedMulti: false,
        msgErr: action.msgErr,
      };
    case ACTION_DELETED_ACTICLES_MULTI:
      return {
        ...state,
        isDeletedMulti: true,
        msgErr: null,
      };
    case ERROR_DELETED_ARTICLES_MULTI:
      return {
        ...state,
        isDeletedMulti: false,
        msgErr: action.msgErr,
      };
    case ACTION_GET_LIST_DRAFT_ARTICLES:
      return {
        ...state,
        articlesDraft: action.data,
        isCreatedDraft: false,
        msgErr: null,
      };
    case ERROR_GET_LST_DRAFT_ARTICLES:
      return {
        ...state,
        articlesDraft: [],
        msgErr: action.msgErr,
      };
    case ACTION_CREATE_DRAFT_ARTICLE:
      return {
        ...state,
        articleDetail: action.data.upsertArticle,
        isCreatedDraft: true,
        msgErr: null,
      };
    case ERROR_CREATE_DRAFT_ARTICLE:
      return {
        ...state,
        isCreatedDraft: false,
        msgErr: action.msgErr,
      };
    default:
      return {
        ...state,
        msgErr: null,
      };
  }
};
