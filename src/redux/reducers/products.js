import {
    ACTION_GET_PRODUCTS,
    ERROR_GET_PRODUCTS
} from "../actions/actionTypes";

const initData = {
    productData: [],
    isCreated: false,
    msgErr: null,
    isDeleted: false,
};


export const productReducer = (state = initData, action) => {
    switch (action.type) {
        case ACTION_GET_PRODUCTS:
            return {
                ...state,
                productData: action.data,
                isCreated: false,
                msgErr: null,
                isDeleted: false,
            };
        case ERROR_GET_PRODUCTS:
            return {
                ...state,
                msgErr: action.msgErr,
            };
        default:
            return {
                ...state,
                msgErr: null,
            };
    }
};