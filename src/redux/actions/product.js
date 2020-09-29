import { apolloClient } from '../../graphql';
import { 
    GET_MY_PRODUCT_LISTS_QUERY,
    ADD_MERCHANT_PRODUCT_QUERY
 } from '../../graphql/products.query';

import {
    GET_MY_PRODUCT_LISTS,
    GET_MY_PRODUCT_LISTS_ERROR,
    ADD_MERCHANT_PRODUCT,
    ADD_MERCHANT_PRODUCT_ERROR,

} from './actionTypes';

export const getUserProductLists = (userId) => {
    console.log('userId', userId)
    return dispatch => {
        return apolloClient
            .query({
                query: GET_MY_PRODUCT_LISTS_QUERY,
                variables: {
                    _id: Number(userId),
                },
            })
            .then(res => {
                console.log(res);
                if (res.data.users.length > 0) {
                    dispatch({
                        type: GET_MY_PRODUCT_LISTS,
                        data: res.data.users[0],
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
export const AddMerchantProduct = (userId) => {
    console.log('userId', userId)
    return dispatch => {
        return apolloClient
            .query({
                query: ADD_MERCHANT_PRODUCT,
                variables: {
                    _id: Number(userId),
                },
            })
            .then(res => {
                console.log(res);
                if (res.data.users.length > 0) {
                    dispatch({
                        type: GET_MY_PRODUCT_LISTS,
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






export default {
    getUserProductLists,
};
