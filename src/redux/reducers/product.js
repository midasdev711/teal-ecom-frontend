import {
  GET_MY_PRODUCT_LISTS,
  GET_MY_PRODUCT_LISTS_ERROR,
  ADD_MERCHANT_PRODUCT,
  ADD_MERCHANT_PRODUCT_ERROR,
  GET_PRODUCT_CATEGORY_LISTS,
  GET_PRODUCT_CATEGORY_LISTS_ERROR,
  GET_PRODUCT_SUB_CATEGORY_LISTS,
  GET_PRODUCT_SUB_CATEGORY_LISTS_ERROR,
  ADD_MERCHANT_PRODUCT_START,
  RESET_PRODUCT_STATUS,
  GET_MERCHANT_PRODUCT_BY_ID_ERROR,
  GET_MERCHANT_PRODUCT_BY_ID_START,
  GET_MERCHANT_PRODUCT_BY_ID_SUCCESS,
} from "../actions/actionTypes";

const initData = {
  status:"",
  loading: false,
  errorMsg: null,
  merchantProductLists: [],
  isGetDetail: false,
  categoriesLists: [],
  subCategoriesLists:[],
  success:false,
  productById:[]
};

export const productReducer = (state = initData, action) => {
  switch (action.type) {
    
    case RESET_PRODUCT_STATUS:
      return {
        ...state,
        status:""
            };
    case GET_MY_PRODUCT_LISTS:
      return {
        ...state,
        merchantProductLists: action.data === null ? [] : action.data,
        errorMsg: null,
     
      };
    case GET_MY_PRODUCT_LISTS_ERROR:
      return {
        ...state,
        UserProductList: [],
        errorMsg: action.errorMsg,
        isGetDetail: false,
      };
    case ADD_MERCHANT_PRODUCT_START:
        return {
          ...state,
          status:"start",
          loading:true,
        
        };  
    case ADD_MERCHANT_PRODUCT:
      console.log('state.merchantProductLists', state.merchantProductLists)
      let cloneData = state.merchantProductLists.slice()
      console.log('cloneData original', cloneData)
      cloneData.push(action.data.upsertProduct)
       console.log('action.data.upsertProduct', action.data.upsertProduct)
       console.log('cloneData', cloneData)
      return {
        ...state,
        status:"success",
        loading:false,
        merchantProductLists:cloneData,
        UserProductList: {
          ...action.data.upsertProduct
        },
        errorMsg: null,
       
      };
    case ADD_MERCHANT_PRODUCT_ERROR:
      return {
        ...state,
        status:"fail",
        UserProductList: [],
        errorMsg: action.errorMsg,
        isGetDetail: false,
      };
    case GET_PRODUCT_CATEGORY_LISTS:
      return {
        ...state,
        categoriesLists: action.data.getAllCategories,
        errorMsg: null,
        isGetDetail: true,
      };
    case GET_PRODUCT_CATEGORY_LISTS_ERROR:
      return {
        ...state,
        errorMsg: action.errorMsg,
        isGetDetail: false,
      };
    case GET_PRODUCT_SUB_CATEGORY_LISTS:
      return {
        ...state,
        subCategoriesLists: action.data.getSubCategories,
        errorMsg: null,
        isGetDetail: true,
      };
    case GET_PRODUCT_SUB_CATEGORY_LISTS_ERROR:
      return {
        ...state,
        errorMsg: action.errorMsg,
        isGetDetail: false,
      };
      case GET_MERCHANT_PRODUCT_BY_ID_START:
        return {
          ...state,
          status:"start",
          loading:true,
         
        };  
    case GET_MERCHANT_PRODUCT_BY_ID_SUCCESS:
      return {
        ...state,
        status:"success",
        loading:false,
        productById: action.data,
        errorMsg: null,
    
      };
    case GET_MERCHANT_PRODUCT_BY_ID_ERROR:
      return {
        ...state,
        status:"fail",
        errorMsg: action.errorMsg,
        merchantProductLists:[],
     
      };   
    default:
      return {
        ...state,
        errorMsg: null,
      };
  }
};
