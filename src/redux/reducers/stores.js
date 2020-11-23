import {
    ADD_STORE_START,
    ADD_STORE,
    ADD_STORE_ERROR,
    ACTION_GET_STORES,
    ERROR_GET_STORES,
    RESET_STORE_STATUS
} from "../actions/actionTypes";

const initData = {
    storeData: [],
    isCreated: false,
    msgErr: null,
    isDeleted: false,
};


export const storeReducer = (state = initData, action) => {
    switch (action.type) {

        case RESET_STORE_STATUS:
      return {
        ...state,
        status:""
            };
        case ADD_STORE_START:
            return {
                ...state,
                status: "start",
                loading: true,

            };

        case ADD_STORE:
            console.log('state.storeData', state.storeData)
            let cloneData = state.storeData.slice()
            console.log('cloneData original', cloneData)
            cloneData.push(action.data.upsertStore)
            console.log('action.data.upsertStore', action.data.upsertStore)
            console.log('cloneData', cloneData)
            return {
                ...state,
                status: "success",
                loading: false,
                storesData: cloneData,
                errorMsg: null,

            };
        case ADD_STORE_ERROR:
            return {
                ...state,
                status: "fail",
                storesData: [],
                errorMsg: action.errorMsg,
                isGetDetail: false,
            };

        case ACTION_GET_STORES:
            return {
                ...state,
                storesData: action.data === null ? [] : action.data,
                isCreated: false,
                msgErr: null,
                isDeleted: false,
            };
        case ERROR_GET_STORES:
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