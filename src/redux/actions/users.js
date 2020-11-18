import { apolloClient } from '../../graphql';
import { LOGIN_USER_QUERY, CREATE_NEW_USER, GET_USER_ID_QUERY, INVITE_USER_MUTATION } from '../../graphql/users.query';

import {
	SET_USER_EMAIL,
	LOGIN_SUCCESS,
	LOGIN_FAILED,
	SIGNUP_SUCCESS,
	SIGNUP_FAILED,
	GET_USER_WITH_ID_FAILED,
	GET_USER_WITH_ID_SUCCESS,
	SEND_USER_INVITATION_ERROR,
	SEND_USER_INVITATION_START,
	SEND_USER_INVITATION_SUCCESS,
	ClEAR_STATUS
} from './actionTypes';

export const getUserWithID = userId => {
	return dispatch => {
		return apolloClient
			.query({
				query: GET_USER_ID_QUERY,
				variables: {
					filters: {
						userId: Number(userId),
					},
				},
			})
			.then(res => {
				console.log(res);
				if (res.data.users.length > 0) {
					dispatch({
						type: GET_USER_WITH_ID_SUCCESS,
						data: res.data.users[0],
					});
				}
			})
			.catch(err => {
				console.log(err);
				dispatch({
					type: GET_USER_WITH_ID_FAILED,
					errorMsg: err.message,
				});
			});
	};
};

export const setUserEmail = email => {
	return dispatch => {
		dispatch({
			type: SET_USER_EMAIL,
			data: email,
		});
	};
};

export const login = (email, password) => {
	return dispatch => {
		return apolloClient
			.query({
				query: LOGIN_USER_QUERY,
				variables: {
					uniqueID: email,
					password,
				},
			})
			.then(res => {
				localStorage.setItem('userData', JSON.stringify(res.data.auth));
				localStorage.setItem('userID', JSON.stringify(res.data.auth.ID));
				localStorage.setItem('_token_tel', res.data.auth.token);
				dispatch({
					type: LOGIN_SUCCESS,
					data: res.data.auth,
				});
			})
			.catch(err => {
				dispatch({
					type: LOGIN_FAILED,
					errorMsg: err.message,
				});
			});
	};
};

export const signup = (email, password, name, mobileNo) => {
	console.log(email, password, name, mobileNo);
	return dispatch => {
		return apolloClient
			.mutate({
				mutation: CREATE_NEW_USER,
				variables: {
					name,
					email,
					password,
					mobileNo,
					signUpMethod: 'Site',
				},
			})
			.then(res => {
				dispatch({
					type: SIGNUP_SUCCESS,
					data: res.data.upsertAuth,
				});
			})
			.catch(err => {
				console.log(err.message);
				dispatch({
					type: SIGNUP_FAILED,
					errorMsg: err.message,
				});
			});
	};
};
export const userInvitation = (email, merchantId) => {
	return dispatch => {
		dispatch({
			type: SEND_USER_INVITATION_START,
		});
		return apolloClient
			.mutate({
				mutation: INVITE_USER_MUTATION,
				variables: {
					merchantId,
					email,
				},
			})
			.then(res => {
				dispatch({
					type: SEND_USER_INVITATION_SUCCESS,
					data: res.data,
				});
			})
			.catch(err => {
				console.log(err.message);
				dispatch({
					type: SEND_USER_INVITATION_ERROR,
					errorMsg: err.message,
				});
			});
	};
};
export const clearStatus = userId => {
	return dispatch => {
		dispatch({
			type: ClEAR_STATUS,
		});
	};
};

export default {
	setUserEmail,
	login,
	signup,
	getUserWithID,
	userInvitation,
	clearStatus,
};
