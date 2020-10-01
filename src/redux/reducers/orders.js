import {
    ACTION_GET_ORDERS,
    ERROR_GET_ORDERS
} from "../actions/actionTypes";

const initData = {
    orderData: [],
    isCreated: false,
    msgErr: null,
    isDeleted: false,
};


export const orderReducer = (state = initData, action) => {
    switch (action.type) {
        case ACTION_GET_ORDERS:
            return {
                ...state,
                orderData: action.data,
                isCreated: false,
                msgErr: null,
                isDeleted: false,
            };
        case ERROR_GET_ORDERS:
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