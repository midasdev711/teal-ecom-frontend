import { apolloClient } from '../../graphql';
import {
    GET_MY_PRODUCT_LISTS_QUERY,
    ADD_MERCHANT_PRODUCT_MUTATION,
    GET_PRODUCT_CATEGORY_LISTS_QUERY,
    GET_PRODUCT_SUB_CATEGORY_LISTS_QUERY,
    GET_MERCHANT_PRODUCT_BY_ID_QUERY,
    DELETE_MERCHANT_PRODUCT_MUTATION,
    UPDATE_MERCHANT_PRODUCT_MUTATION

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
    DELETE_MERCHANT_PRODUCT_ERROR,
    DELETE_MERCHANT_PRODUCT_START,
    DELETE_MERCHANT_PRODUCT_SUCCESS,
    EDIT_MERCHANT_PRODUCT_ERROR,
    EDIT_MERCHANT_PRODUCT_START,
    EDIT_MERCHANT_PRODUCT_SUCCESS,
} from './actionTypes';

export const getUserProductLists = (userId) => {
            
    return dispatch => {

        return apolloClient
            .query({
                query: GET_MY_PRODUCT_LISTS_QUERY,
                variables: { ID: userId },
                fetchPolicy: "no-cache",
            })

            .then(res => {

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
                fetchPolicy: 'no-cache',
            })
            .then(res => {

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
                variables: {},
                fetchPolicy: 'no-cache',
            })

            .then(res => {

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
   // console.log('subCategoryId', subCategoryId)
   // console.log('typeof(subCategoryId)', typeof (subCategoryId))
    return dispatch => {
        return apolloClient
            .query({
                query: GET_PRODUCT_SUB_CATEGORY_LISTS_QUERY,
                variables: { ID: subCategoryId },
                fetchPolicy: 'no-cache',
            })

            .then(res => {

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
                variables: { products: id },
                fetchPolicy: 'no-cache',
            })

            .then(res => {

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
export const deleteMerchantProduct = (userId) => {
 
    return dispatch => {
        dispatch({
            type: DELETE_MERCHANT_PRODUCT_START,
        });
        return apolloClient
            .mutate({
                mutation: DELETE_MERCHANT_PRODUCT_MUTATION,
                variables: { ID: userId },
                fetchPolicy: 'no-cache',
            })
            .then(res => {
            
                if (res) {
                    dispatch({
                        type: DELETE_MERCHANT_PRODUCT_SUCCESS,
                        data: res.data.removeProduct,
                    });
                }
            })
            .catch(err => {
                console.log(err);
                dispatch({
                    type: DELETE_MERCHANT_PRODUCT_ERROR,
                    errorMsg: err.message,
                });
            });
    };
};
export const UpdateMerchantProduct = (data) => {
    
   // console.log('data', data)
    
    return dispatch => {
        dispatch({
            type: EDIT_MERCHANT_PRODUCT_START,
        });
        return apolloClient
            .mutate({
                mutation: UPDATE_MERCHANT_PRODUCT_MUTATION,
                variables: data,
                fetchPolicy: 'no-cache',
            })
            .then(res => {
               // console.log("edit product", res);
                if (res.data) {
                    dispatch({
                        type:EDIT_MERCHANT_PRODUCT_SUCCESS,
                        data: res.data,
                    });
                }
            })
            .catch(err => {
                console.log(err);
                dispatch({
                    type: EDIT_MERCHANT_PRODUCT_ERROR,
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
    UpdateMerchantProduct
};
