// acticles
export const ACTION_GET_LIST_ARTICLES = "ACTION_GET_LIST_ARTICLES";
export const ERROR_GET_LIST_ARTICLES = "ERROR_GET_LIST_ARTICLES";

export const ACTION_CREATED_NEW_POST = "ACTION_CREATED_NEW_POST";
export const ERROR_CREATED_NEW_POST = "ERROR_CREATED_NEW_POST";

export const ACTION_DELETED_ARTICLE_SUCCESS = "ACTION_DELETED_ARTICLE_SUCCESS";
export const ERROR_DELETED_ARTICLE = "ERROR_DELETED_ARTICLE";

export const ACTION_GET_DETAIL_ARTICLE = "ACTION_GET_DETAIL_ARTICLE";
export const ERROR_GET_DETAIL_ARTICLE = "ERROR_GET_DETAIL_ARTICLE";
export const CLEAR_ARTICLE_DETAIL = 'CLEAR_ARTICLE_DETAIL'

export const UPDATE_ARTICLE = "UPDATE_ARTICLE";
export const ACTION_UPDATED_ARTICLE = "ACTION_UPDATED_ARTICLE";
export const ERROR_UPDATED_ARTICLE = "ERROR_UPDATED_ARTICLE";

export const ACTION_DELETED_ACTICLES_MULTI = "ACTION_DELETED_ACTICLES_MULTI";
export const ERROR_DELETED_ARTICLES_MULTI = "ERROR_DELETED_ARTICLES_MULTI";

export const ACTION_GET_LIST_ARTTICLES_DELETED =
  "ACTION_GET_LIST_ARTTICLES_DELETED";
export const ERROR_GET_LIST_ARTICLES_DELETED =
  "ERROR_GET_LIST_ARTICLES_DELETED";

export const ACTION_GET_LIST_DRAFT_ARTICLES = 'ACTION_GET_LIST_DRAFT_ARTICLES'
export const ERROR_GET_LST_DRAFT_ARTICLES = 'ERROR_GET_LST_DRAFT_ARTICLES'

export const ACTION_CREATE_DRAFT_ARTICLE = 'ACTION_CREATE_DRAFT_ARTICLE'
export const ERROR_CREATE_DRAFT_ARTICLE = 'ERROR_CREATE_DRAFT_ARTICLE'

  // users
export const SET_USER_EMAIL = "SET_USER_EMAIL";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAILED = "SIGNUP_FAILED";
export const GET_USER_WITH_ID_SUCCESS = "GET_USER_WITH_ID_SUCCESS";
export const GET_USER_WITH_ID_FAILED = "GET_USER_WITH_ID_FAILED";

// products

export const GET_MY_PRODUCT_LISTS  = "GET_MY_PRODUCT_LISTS"
export const GET_MY_PRODUCT_LISTS_ERROR  = "GET_MY_PRODUCT_LISTS_ERROR"

export const ADD_MERCHANT_PRODUCT  = "ADD_MERCHANT_PRODUCT"
export const ADD_MERCHANT_PRODUCT_ERROR  = "ADD_MERCHANT_PRODUCT_ERROR"



export default {
  // articles
  ACTION_GET_LIST_ARTICLES,
  ERROR_GET_LIST_ARTICLES,

  ACTION_CREATED_NEW_POST,
  ERROR_CREATED_NEW_POST,

  ACTION_DELETED_ARTICLE_SUCCESS,
  ERROR_DELETED_ARTICLE,

  ACTION_GET_DETAIL_ARTICLE,
  CLEAR_ARTICLE_DETAIL,
  ERROR_GET_DETAIL_ARTICLE,

  UPDATE_ARTICLE,
  ACTION_UPDATED_ARTICLE,
  ERROR_UPDATED_ARTICLE,

  ACTION_GET_LIST_ARTTICLES_DELETED,
  ERROR_GET_LIST_ARTICLES_DELETED,

  ACTION_DELETED_ACTICLES_MULTI,
  ERROR_DELETED_ARTICLES_MULTI,

  ACTION_GET_LIST_DRAFT_ARTICLES,
  ERROR_GET_LST_DRAFT_ARTICLES,

  ACTION_CREATE_DRAFT_ARTICLE,
  ERROR_CREATE_DRAFT_ARTICLE,

  // users
  SET_USER_EMAIL,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  SIGNUP_SUCCESS,
  SIGNUP_FAILED,
  GET_USER_WITH_ID_SUCCESS,
  GET_USER_WITH_ID_FAILED,

  //products
  GET_MY_PRODUCT_LISTS,
  GET_MY_PRODUCT_LISTS_ERROR,
  ADD_MERCHANT_PRODUCT,
  ADD_MERCHANT_PRODUCT_ERROR,  
};
