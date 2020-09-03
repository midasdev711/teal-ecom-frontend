import { combineReducers } from 'redux';

import { articlesReducer } from './articles';
import { usersReducer } from './users';

export const reducers = combineReducers({
	articlesReducer,
	usersReducer,
});

export default reducers;
