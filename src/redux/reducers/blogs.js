import {
    ADD_BLOG_START,
    ADD_BLOG,
    ADD_BLOG_ERROR,
    ACTION_GET_BLOGS,
    ERROR_GET_BLOGS,
    RESET_BLOG_STATUS
} from "../actions/actionTypes";

const initData = {
    blogData: [],
    isCreated: false,
    msgErr: null,
    isDeleted: false,
};


export const blogReducer = (state = initData, action) => {
    switch (action.type) {

        case RESET_BLOG_STATUS:
      return {
        ...state,
        status:""
            };
        case ADD_BLOG_START:
            return {
                ...state,
                status: "start",
                loading: true,

            };

        case ADD_BLOG:
            console.log('state.blogData', state.blogData)
            let cloneData = state.blogData.slice()
            console.log('cloneData original', cloneData)
            cloneData.push(action.data.upsertBlog)
            console.log('action.data.upsertProduct', action.data.upsertBlog)
            console.log('cloneData', cloneData)
            return {
                ...state,
                status: "success",
                loading: false,
                blogsData: cloneData,
                errorMsg: null,

            };
        case ADD_BLOG_ERROR:
            return {
                ...state,
                status: "fail",
                blogsData: [],
                errorMsg: action.errorMsg,
                isGetDetail: false,
            };

        case ACTION_GET_BLOGS:
            return {
                ...state,
                blogsData: action.data === null ? [] : action.data,
                isCreated: false,
                msgErr: null,
                isDeleted: false,
            };
        case ERROR_GET_BLOGS:
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