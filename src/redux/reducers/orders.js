import {
    
  RESET_ORDER_STATUS,
  ADD_ORDER_START,
  ADD_ORDER,
  ADD_ORDER_ERROR,
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
        case RESET_ORDER_STATUS:
            return {
                ...state,
                status: ""
            };
        case ADD_ORDER_START:
            return {
                ...state,
                status: "start",
                loading: true,

            };

        case ADD_ORDER:
            console.log('state.ORDERData', state.orderData)
            let cloneData = state.orderData.slice()
            console.log('cloneData original', cloneData)
            cloneData.push(action.data.upsertProduct)
            console.log('action.data.upsertProduct', action.data.upsertProduct)
            console.log('cloneData', cloneData)
            return {
                ...state,
                status: "success",
                loading: false,
                orderData: cloneData,
                errorMsg: null,

            };
        case ADD_ORDER_ERROR:
            return {
                ...state,
                status: "fail",
                orderData: [],
                errorMsg: action.errorMsg,
                isGetDetail: false,
            };

        case ACTION_GET_ORDERS:
            return {
                ...state,
                orderData: action.data === null ? [] : action.data,
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