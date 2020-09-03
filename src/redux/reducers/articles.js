import {
	// articles
	ACTION_CREATED_NEW_POST,
	ERROR_CREATED_NEW_POST,
	ACTION_GET_LIST_ARTICLES,
	ERROR_GET_LIST_ARTICLES,
} from '../actions/actionTypes';

const initData = {
	articlesData: [],
	isCreated: false,
	articleData: null,
	msgErr: null,
};

export const articlesReducer = (state = initData, action) => {
	switch (action.type) {
		case ACTION_GET_LIST_ARTICLES:
			return {
				...state,
				articlesData: action.data,
				isCreated: false,
				msgErr: null,
			};
		case ERROR_GET_LIST_ARTICLES:
			return {
				...state,
				msgErr: action.msgErr,
			};
		case ACTION_CREATED_NEW_POST:
			return {
				...state,
				isCreated: true,
				msgErr: null,
			};
		case ERROR_CREATED_NEW_POST:
			return {
				...state,
				isCreated: false,
				msgErr: action.msgErr,
			};
		default:
			return {
				...state,
				msgErr: null,
			};
	}
};
