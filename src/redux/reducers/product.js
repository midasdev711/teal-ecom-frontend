import {
  GET_MY_PRODUCT_LISTS,
  GET_MY_PRODUCT_LISTS_ERROR,
  ADD_MERCHANT_PRODUCT,
  ADD_MERCHANT_PRODUCT_ERROR,
  GET_PRODUCT_CATEGORY_LISTS,
  GET_PRODUCT_CATEGORY_LISTS_ERROR,
} from "../actions/actionTypes";

const initData = {
  loading: false,
  errorMsg: null,
  UserProductList: [],
  isGetDetail: false,
  categoriesLists: []
};

export const productReducer = (state = initData, action) => {
  switch (action.type) {

    case GET_MY_PRODUCT_LISTS:
      return {
        ...state,
        UserProductList: action.data,
        errorMsg: null,
        isGetDetail: true,
      };
    case GET_MY_PRODUCT_LISTS_ERROR:
      return {
        ...state,
        UserProductList: [],
        errorMsg: action.errorMsg,
        isGetDetail: false,
      };
    case ADD_MERCHANT_PRODUCT:
      return {
        ...state,
        UserProductList: action.data,
        errorMsg: null,
        isGetDetail: true,
      };
    case ADD_MERCHANT_PRODUCT_ERROR:
      return {
        ...state,
        UserProductList: [],
        errorMsg: action.errorMsg,
        isGetDetail: false,
      };
    case GET_PRODUCT_CATEGORY_LISTS:
      return {
        ...state,
        categoriesLists: action.data,
        errorMsg: null,
        isGetDetail: true,
      };
    case GET_PRODUCT_CATEGORY_LISTS_ERROR:
      return {
        ...state,
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
