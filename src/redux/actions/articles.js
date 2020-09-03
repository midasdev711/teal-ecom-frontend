import { apolloClient } from '../../graphql';
import { GET_ARTICLES_QUERY, CREATE_ARTICLE_MUTATION } from '../../graphql/articles.query';

import {
	ACTION_CREATED_NEW_POST,
	ACTION_GET_LIST_ARTICLES,
	ERROR_CREATED_NEW_POST,
	ERROR_GET_LIST_ARTICLES,
} from './actionTypes';

export function getListArticles(authorId, limit, page) {
	return dispatch => {
		return apolloClient
			.query({
				query: GET_ARTICLES_QUERY,
				variables: {
					filters: {
						limit: limit,
						page: page,
						authorId: authorId,
					},
				},
			})
			.then(res => {
				if (res.data) {
					dispatch({
						type: ACTION_GET_LIST_ARTICLES,
						data: res.data.articles,
					});
				}
			})
			.catch(err => {
				console.log(err);
				dispatch({
					type: ERROR_GET_LIST_ARTICLES,
					msgErr: err.message,
				});
			});
	};
}

export function createNewPost(data) {
	return dispatch => {
		return apolloClient
			.mutate({
				mutation: CREATE_ARTICLE_MUTATION,
				variables: data,
			})
			.then(res => {
				if (res.data) {
					dispatch({
						type: ACTION_CREATED_NEW_POST,
						data: res.data,
					});
				}
			})
			.catch(err => {
				console.log(err);
				dispatch({
					type: ERROR_CREATED_NEW_POST,
					msgErr: err.message,
				});
			});
	};
}

export default {
	getListArticles,
	createNewPost,
};
