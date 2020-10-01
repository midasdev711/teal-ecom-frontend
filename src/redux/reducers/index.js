import { combineReducers } from 'redux';

import { articlesReducer } from './articles';
import { usersReducer } from './users';
import { productReducer } from './products';
import { orderReducer } from './orders';

export const reducers = combineReducers({
	articlesReducer,
	usersReducer,
	productReducer,
	orderReducer
});

export default reducers;
