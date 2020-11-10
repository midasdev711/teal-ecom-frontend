import {
    ADD_PAGE_START,
    ADD_PAGE,
    ADD_PAGE_ERROR,
    ACTION_GET_PAGES,
    ERROR_GET_PAGES,
    RESET_PAGE_STATUS
} from "../actions/actionTypes";

const initData = {
    pageData: [],
    isCreated: false,
    msgErr: null,
    isDeleted: false,
};


export const pageReducer = (state = initData, action) => {
    switch (action.type) {

        case RESET_PAGE_STATUS:
      return {
        ...state,
        status:""
            };
        case ADD_PAGE_START:
            return {
                ...state,
                status: "start",
                loading: true,

            };

        case ADD_PAGE:
            console.log('state.pageData', state.pageData)
            let cloneData = state.pageData.slice()
            console.log('cloneData original', cloneData)
            cloneData.push(action.data.upsertPage)
            console.log('action.data.upsertProduct', action.data.upsertPage)
            console.log('cloneData', cloneData)
            return {
                ...state,
                status: "success",
                loading: false,
                pagesData: cloneData,
                errorMsg: null,

            };
        case ADD_PAGE_ERROR:
            return {
                ...state,
                status: "fail",
                pagesData: [],
                errorMsg: action.errorMsg,
                isGetDetail: false,
            };

        case ACTION_GET_PAGES:
            return {
                ...state,
                pagesData: action.data === null ? [] : action.data,
                isCreated: false,
                msgErr: null,
                isDeleted: false,
            };
        case ERROR_GET_PAGES:
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