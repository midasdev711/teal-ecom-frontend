import {
    ACTION_GET_CUSTOMERS,
    ERROR_GET_CUSTOMERS
} from "../actions/actionTypes";

const initData = {
    customerData: [],
    isCreated: false,
    msgErr: null,
    isDeleted: false,
};


export const customerReducer = (state = initData, action) => {
    switch (action.type) {
        case ACTION_GET_CUSTOMERS:
            return {
                ...state,
                customerData: action.data,
                isCreated: false,
                msgErr: null,
                isDeleted: false,
            };
        case ERROR_GET_CUSTOMERS:
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