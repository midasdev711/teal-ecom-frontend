import {
    ADD_CUSTOMER_START,
    ADD_CUSTOMER,
    ADD_CUSTOMER_ERROR,
    ACTION_GET_CUSTOMERS,
    ERROR_GET_CUSTOMERS,
    RESET_CUSTOMER_STATUS
} from "../actions/actionTypes";

const initData = {
    customerData: [],
    isCreated: false,
    msgErr: null,
    isDeleted: false,
};


export const customerReducer = (state = initData, action) => {
    switch (action.type) {

        case RESET_CUSTOMER_STATUS:
      return {
        ...state,
        status:""
            };
        case ADD_CUSTOMER_START:
            return {
                ...state,
                status: "start",
                loading: true,

            };

        case ADD_CUSTOMER:
            console.log('state.customerData', state.customerData)
            let cloneData = state.customerData.slice()
            console.log('cloneData original', cloneData)
            cloneData.push(action.data.upsertProduct)
            console.log('action.data.upsertProduct', action.data.upsertProduct)
            console.log('cloneData', cloneData)
            return {
                ...state,
                status: "success",
                loading: false,
                customerData: cloneData,
                errorMsg: null,

            };
        case ADD_CUSTOMER_ERROR:
            return {
                ...state,
                status: "fail",
                customerData: [],
                errorMsg: action.errorMsg,
                isGetDetail: false,
            };

        case ACTION_GET_CUSTOMERS:
            return {
                ...state,
                customerData: action.data === null ? [] : action.data,
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