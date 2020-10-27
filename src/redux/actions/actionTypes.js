// acticles
export const ACTION_GET_LIST_ARTICLES = "ACTION_GET_LIST_ARTICLES";
export const ERROR_GET_LIST_ARTICLES = "ERROR_GET_LIST_ARTICLES";

export const ACTION_CREATED_NEW_POST = "ACTION_CREATED_NEW_POST";
export const ERROR_CREATED_NEW_POST = "ERROR_CREATED_NEW_POST";

export const ACTION_DELETED_ARTICLE_SUCCESS = "ACTION_DELETED_ARTICLE_SUCCESS";
export const ERROR_DELETED_ARTICLE = "ERROR_DELETED_ARTICLE";

export const ACTION_GET_DETAIL_ARTICLE = "ACTION_GET_DETAIL_ARTICLE";
export const ERROR_GET_DETAIL_ARTICLE = "ERROR_GET_DETAIL_ARTICLE";
export const CLEAR_ARTICLE_DETAIL = "CLEAR_ARTICLE_DETAIL";

export const UPDATE_ARTICLE = "UPDATE_ARTICLE";
export const ACTION_UPDATED_ARTICLE = "ACTION_UPDATED_ARTICLE";
export const ERROR_UPDATED_ARTICLE = "ERROR_UPDATED_ARTICLE";

export const ACTION_DELETED_ACTICLES_MULTI = "ACTION_DELETED_ACTICLES_MULTI";
export const ERROR_DELETED_ARTICLES_MULTI = "ERROR_DELETED_ARTICLES_MULTI";

export const ACTION_GET_LIST_ARTTICLES_DELETED =
  "ACTION_GET_LIST_ARTTICLES_DELETED";
export const ERROR_GET_LIST_ARTICLES_DELETED =
  "ERROR_GET_LIST_ARTICLES_DELETED";

export const ACTION_GET_LIST_DRAFT_ARTICLES = "ACTION_GET_LIST_DRAFT_ARTICLES";
export const ERROR_GET_LST_DRAFT_ARTICLES = "ERROR_GET_LST_DRAFT_ARTICLES";

export const ACTION_CREATE_DRAFT_ARTICLE = "ACTION_CREATE_DRAFT_ARTICLE";
export const ERROR_CREATE_DRAFT_ARTICLE = "ERROR_CREATE_DRAFT_ARTICLE";

// users
export const SET_USER_EMAIL = "SET_USER_EMAIL";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAILED = "SIGNUP_FAILED";
export const GET_USER_WITH_ID_SUCCESS = "GET_USER_WITH_ID_SUCCESS";
export const GET_USER_WITH_ID_FAILED = "GET_USER_WITH_ID_FAILED";

export const GET_PRODUCTS = "GET_PRODUCTS";
export const ACTION_GET_PRODUCTS = "ACTION_GET_PRODUCTS";
export const ERROR_GET_PRODUCTS = "ERROR_GET_PRODUCTS";

//order
export const ACTION_GET_ORDERS = "ACTION_GET_ORDERS";
export const ERROR_GET_ORDERS = "ERROR_GET_ORDERS";

//customer
export const ADD_CUSTOMER_START = "ADD_CUSTOMER_START";
export const ADD_CUSTOMER = "ADD_CUSTOMER";
export const ADD_CUSTOMER_ERROR = "ADD_CUSTOMER_ERROR";
export const ACTION_GET_CUSTOMERS = "ACTION_GET_CUSTOMERS";
export const ERROR_GET_CUSTOMERS = "ERROR_GET_CUSTOMERS";
export const RESET_CUSTOMER_STATUS = "RESET_CUSTOMER_STATUS";
// products

export const GET_MY_PRODUCT_LISTS = "GET_MY_PRODUCT_LISTS";
export const GET_MY_PRODUCT_LISTS_ERROR = "GET_MY_PRODUCT_LISTS_ERROR";

export const ADD_MERCHANT_PRODUCT = "ADD_MERCHANT_PRODUCT";
export const ADD_MERCHANT_PRODUCT_ERROR = "ADD_MERCHANT_PRODUCT_ERROR";
export const ADD_MERCHANT_PRODUCT_START = "ADD_MERCHANT_PRODUCT_START";

export const GET_PRODUCT_CATEGORY_LISTS = "GET_PRODUCT_CATEGORY_LISTS";
export const GET_PRODUCT_CATEGORY_LISTS_ERROR =
  "GET_PRODUCT_CATEGORY_LISTS_ERROR";

export const GET_PRODUCT_SUB_CATEGORY_LISTS = "GET_PRODUCT_SUB_CATEGORY_LISTS";
export const GET_PRODUCT_SUB_CATEGORY_LISTS_ERROR =
  "GET_PRODUCT_SUB_CATEGORY_LISTS_ERROR";

export const RESET_PRODUCT_STATUS = "RESET_PRODUCT_STATUS";

export const GET_MERCHANT_PRODUCT_BY_ID_START =
  "GET_MERCHANT_PRODUCT_BY_ID_START";
export const GET_MERCHANT_PRODUCT_BY_ID_SUCCESS =
  "GET_MERCHANT_PRODUCT_BY_ID_SUCCESS";
export const GET_MERCHANT_PRODUCT_BY_ID_ERROR =
  "GET_MERCHANT_PRODUCT_BY_ID_ERROR";

export const DELETE_MERCHANT_PRODUCT_START = "DELETE_MERCHANT_PRODUCT_START";
export const DELETE_MERCHANT_PRODUCT_SUCCESS =
  "DELETE_MERCHANT_PRODUCT_SUCCESS";
export const DELETE_MERCHANT_PRODUCT_ERROR = "DELETE_MERCHANT_PRODUCT_ERROR";

export const RESET_ORDER_STATUS = "RESET_ORDER_STATUS";
export const ADD_ORDER_START = "ADD_ORDER_START";
export const ADD_ORDER = "ADD_ORDER";
export const ADD_ORDER_ERROR = "ADD_ORDER_ERROR";

export const EDIT_MERCHANT_PRODUCT_START = "EDIT_MERCHANT_PRODUCT_START";
export const EDIT_MERCHANT_PRODUCT_SUCCESS = "EDIT_MERCHANT_PRODUCT_SUCCESS";
export const EDIT_MERCHANT_PRODUCT_ERROR = "EDIT_MERCHANT_PRODUCT_ERROR";

//campaign
export const ADD_CAMPAIGN_START = "ADD_CAMPAIGN_START";
export const ADD_CAMPAIGN = "ADD_CAMPAIGN";
export const ADD_CAMPAIGN_ERROR = "ADD_CAMPAIGN_ERROR";
export const ACTION_GET_CAMPAIGN = "ACTION_GET_CAMPAIGN";
export const ERROR_GET_CAMPAIGN = "ERROR_GET_CAMPAIGN";
export const EDIT_CAMPAIGN_START = "EDIT_CAMPAIGN_START";
export const EDIT_CAMPAIGN_ERROR = "EDIT_CAMPAIGN_ERROR";
export const EDIT_CAMPAIGN = "EDIT_CAMPAIGN";
export const DELETE_CAMPAIGN = "DELETE_CAMPAIGN";
export const DELETE_CAMPAIGN_ERROR="DELETE_CAMPAIGN_ERROR"


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
  GET_PRODUCTS,
  ACTION_GET_PRODUCTS,
  ERROR_GET_PRODUCTS,
  //products
  GET_MY_PRODUCT_LISTS,
  GET_MY_PRODUCT_LISTS_ERROR,
  ADD_MERCHANT_PRODUCT,
  ADD_MERCHANT_PRODUCT_ERROR,
  ADD_MERCHANT_PRODUCT_START,
  GET_PRODUCT_CATEGORY_LISTS,
  GET_PRODUCT_CATEGORY_LISTS_ERROR,
  GET_PRODUCT_SUB_CATEGORY_LISTS,
  GET_PRODUCT_SUB_CATEGORY_LISTS_ERROR,
  GET_MERCHANT_PRODUCT_BY_ID_ERROR,
  GET_MERCHANT_PRODUCT_BY_ID_START,
  GET_MERCHANT_PRODUCT_BY_ID_SUCCESS,
  DELETE_MERCHANT_PRODUCT_ERROR,
  DELETE_MERCHANT_PRODUCT_START,
  DELETE_MERCHANT_PRODUCT_SUCCESS,
  EDIT_MERCHANT_PRODUCT_ERROR,
  EDIT_MERCHANT_PRODUCT_START,
  EDIT_MERCHANT_PRODUCT_SUCCESS,

  ADD_CUSTOMER_START,
  ADD_CUSTOMER,
  ADD_CUSTOMER_ERROR,
  ACTION_GET_CUSTOMERS,
  ERROR_GET_CUSTOMERS,
  RESET_CUSTOMER_STATUS,

  //campaign
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

  RESET_ORDER_STATUS,
  ADD_ORDER_START,
  ADD_ORDER,
  ADD_ORDER_ERROR,
};
