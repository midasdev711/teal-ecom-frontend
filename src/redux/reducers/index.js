import { combineReducers } from 'redux';

import { articlesReducer } from './articles';
import { usersReducer } from './users';
import { productReducer } from './product';

export const reducers = combineReducers({
	articlesReducer,
	usersReducer,
	productReducer,
});

export default reducers;
