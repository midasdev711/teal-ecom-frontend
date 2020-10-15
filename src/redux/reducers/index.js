import { combineReducers } from 'redux';

import { articlesReducer } from './articles';
import { usersReducer } from './users';
import { orderReducer } from './orders';
import { customerReducer } from './customers';
import { productReducer } from './product';

export const reducers = combineReducers({
	articlesReducer,
	usersReducer,
	productReducer,
	orderReducer,
	customerReducer
});

export default reducers;
