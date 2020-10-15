import { apolloClient } from '../../graphql';
import { 
    GET_MY_PRODUCT_LISTS_QUERY,
    ADD_MERCHANT_PRODUCT_MUTATION,
    GET_PRODUCT_CATEGORY_LISTS_QUERY,
    GET_PRODUCT_SUB_CATEGORY_LISTS_QUERY,
    GET_MERCHANT_PRODUCT_BY_ID_QUERY,
   
 } from '../../graphql/products.query';

import {
    GET_MY_PRODUCT_LISTS,
    GET_MY_PRODUCT_LISTS_ERROR,
    ADD_MERCHANT_PRODUCT,
    ADD_MERCHANT_PRODUCT_ERROR,
    ADD_MERCHANT_PRODUCT_START,
    GET_PRODUCT_CATEGORY_LISTS,
    GET_PRODUCT_CATEGORY_LISTS_ERROR,
    GET_PRODUCT_SUB_CATEGORY_LISTS,
    GET_PRODUCT_SUB_CATEGORY_LISTS_ERROR,
    RESET_PRODUCT_STATUS,
    GET_MERCHANT_PRODUCT_BY_ID_ERROR,
    GET_MERCHANT_PRODUCT_BY_ID_START,
    GET_MERCHANT_PRODUCT_BY_ID_SUCCESS,
   } from './actionTypes';

export const getUserProductLists = (userId) => {
    console.log('userId', userId)
    return dispatch => {
        
        return apolloClient
            .query({
                query: GET_MY_PRODUCT_LISTS_QUERY,
                variables:{ID:userId} 
            })
           
            .then(res => {
                console.log("M P Lists",res);
                if (res.data) {
                    dispatch({
                        type: GET_MY_PRODUCT_LISTS,
                        data: res.data.getProductByMerchant,
                    });
                }
            })
            .catch(err => {
                console.log(err);
                dispatch({
                    type: GET_MY_PRODUCT_LISTS_ERROR,
                    errorMsg: err.message,
                });
            });
    };
};
export const AddMerchantProduct = (datas) => {
   
    return dispatch => {
        dispatch({
            type: ADD_MERCHANT_PRODUCT_START,
                   })
        return apolloClient
            .mutate({
                mutation: ADD_MERCHANT_PRODUCT_MUTATION,
                variables: datas,
              })
            .then(res => {
                console.log(res);
                if (res.data) {
                    dispatch({
                        type: ADD_MERCHANT_PRODUCT,
                        data: res.data,
                    });
                }
            })
            .catch(err => {
                console.log(err);
                dispatch({
                    type: ADD_MERCHANT_PRODUCT_ERROR,
                    errorMsg: err.message,
                });
            });
    };
};
export const getProductCategoryLists = () => {
   
    return dispatch => {
        return apolloClient
            .query({
                query: GET_PRODUCT_CATEGORY_LISTS_QUERY,
                variables:{} 
            })
           
            .then(res => {
                console.log(res);
                if (res) {
                    dispatch({
                        type: GET_PRODUCT_CATEGORY_LISTS,
                        data: res.data,
                    });
                }
            })
            .catch(err => {
                console.log(err);
                dispatch({
                    type: GET_PRODUCT_CATEGORY_LISTS_ERROR,
                    errorMsg: err.message,
                });
            });
    };
};
export const getProductSubCategoryLists = (id) => {
 
   const subCategoryId = id * 1
   console.log('subCategoryId', subCategoryId)
   console.log('typeof(subCategoryId)', typeof(subCategoryId))
    return dispatch => {
        return apolloClient
            .query({
                query: GET_PRODUCT_SUB_CATEGORY_LISTS_QUERY,
                variables:{ID:subCategoryId} 
            })
           
            .then(res => {
                console.log(res);
                if (res) {
                    dispatch({
                        type: GET_PRODUCT_SUB_CATEGORY_LISTS,
                        data: res.data,
                    });
                }
            })
            .catch(err => {
                console.log(err);
                dispatch({
                    type: GET_PRODUCT_SUB_CATEGORY_LISTS_ERROR,
                    errorMsg: err.message,
                });
            });
    };
};
export const resetProductStatus = () => {
     return dispatch => {
        dispatch({
            type: RESET_PRODUCT_STATUS,
                   })   
    };
};

export const getMerchantProductByID = (id) => {
    
    return dispatch => {
        dispatch({
            type: GET_MERCHANT_PRODUCT_BY_ID_START,
            
        });
        return apolloClient
            .query({
                query: GET_MERCHANT_PRODUCT_BY_ID_QUERY,
                variables:{products:id} 
            })
           
            .then(res => {
                console.log("M P ID Details",res);
                if (res.data) {
                    dispatch({
                        type: GET_MERCHANT_PRODUCT_BY_ID_SUCCESS,
                        data: res.data.products,
                    });
                }
            })
            .catch(err => {
                console.log(err);
                dispatch({
                    type: GET_MERCHANT_PRODUCT_BY_ID_ERROR,
                    errorMsg: err.message,
                });
            });
    };
};






export default {
    getUserProductLists,
    AddMerchantProduct,
    getProductCategoryLists,
    getProductSubCategoryLists,
};
