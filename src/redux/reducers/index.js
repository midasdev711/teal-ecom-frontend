import { combineReducers } from 'redux';

import { articlesReducer } from './articles';
import { usersReducer } from './users';
import { orderReducer } from './orders';
import { customerReducer } from './customers';
import { productReducer } from './product';
import {campaignReducer} from './campaign';
import {blogReducer} from './blogs';
import {pageReducer} from './pages';
import {storeReducer} from './stores';

export const reducers = combineReducers({
	articlesReducer,
	usersReducer,
	productReducer,
	orderReducer,
	customerReducer,
	campaignReducer,
	blogReducer,
	pageReducer,
	storeReducer
});

export default reducers;
