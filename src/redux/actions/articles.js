import { apolloClient } from "../../graphql";
import {
  GET_ARTICLES_QUERY,
  CREATE_ARTICLE_MUTATION,
  DELETE_ARTICLE_MUTATION,
  GET_DETAIL_ARTICLE_QUERY,
  UPDATE_ARTICLE_MUTATION,
  GET_LIST_ARTICLES_DELETED_QUERY,
  DELETE_ARTICLES_MULTI_MUTATION,
} from "../../graphql/articles.query";

import {
  ACTION_CREATED_NEW_POST,
  ACTION_GET_LIST_ARTICLES,
  ERROR_CREATED_NEW_POST,
  ERROR_GET_LIST_ARTICLES,
  ACTION_DELETED_ARTICLE_SUCCESS,
  ERROR_DELETED_ARTICLE,
  ACTION_GET_DETAIL_ARTICLE,
  ERROR_GET_DETAIL_ARTICLE,
  ACTION_UPDATED_ARTICLE,
  ERROR_UPDATED_ARTICLE,
  ACTION_DELETED_ACTICLES_MULTI,
  ERROR_DELETED_ARTICLES_MULTI,
  ACTION_GET_LIST_ARTTICLES_DELETED,
  ERROR_GET_LIST_ARTICLES_DELETED,
} from "./actionTypes";

export function updateArticle(data) {
  return (dispatch) => {
    return apolloClient
      .mutate({
        mutation: UPDATE_ARTICLE_MUTATION,
        variables: data,
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: ACTION_UPDATED_ARTICLE,
          data: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: ERROR_UPDATED_ARTICLE,
          msgErr: err.message,
        });
      });
  };
}

export function getDetailArticle(slug) {
  return (dispatch) => {
    return apolloClient
      .query({
        query: GET_DETAIL_ARTICLE_QUERY,
        variables: {
          filters: {
            slug,
            limit: 5,
            page: 1,
          },
        },
      })
      .then((res) => {
        dispatch({
          type: ACTION_GET_DETAIL_ARTICLE,
          data: res.data.articles[0],
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: ERROR_GET_DETAIL_ARTICLE,
          msgErr: err.message,
        });
      });
  };
}

export function getListArticlesDeleted(userId, authorId, limit, page) {
  return (dispatch) => {
    return apolloClient
      .query({
        query: GET_LIST_ARTICLES_DELETED_QUERY,
        variables: {
          filters: {
            userId,
            deletedArticlesAuthorId: authorId,
            limit,
            page,
          },
        },
        fetchPolicy: 'network-only'
      })
      .then((res) => {
        dispatch({
          type: ACTION_GET_LIST_ARTTICLES_DELETED,
          data: res.data.articles,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: ERROR_GET_LIST_ARTICLES_DELETED,
          msgErr: err.message,
        });
      });
  };
}

export function deleteMultiArticles(ids) {
  return (dispatch) => {
    return apolloClient
      .mutate({
        mutation: DELETE_ARTICLES_MULTI_MUTATION,
        variables: {
          deleteArticleIds: ids,
        },
      })
      .then((res) => {
        dispatch({
          type: ACTION_DELETED_ACTICLES_MULTI,
          data: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: ERROR_DELETED_ARTICLES_MULTI,
          msgErr: err.message,
        });
      });
  };
}

export function deleteArticleWithID(articleId) {
  return (dispatch) => {
    return apolloClient
      .mutate({
        mutation: DELETE_ARTICLE_MUTATION,
        variables: {
          articleId,
          status: 0,
        },
      })
      .then((res) => {
        dispatch({
          type: ACTION_DELETED_ARTICLE_SUCCESS,
          data: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: ERROR_DELETED_ARTICLE,
          msgErr: err.message,
        });
      });
  };
}

export function getListArticles(authorId, limit, page) {
  return (dispatch) => {
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
        fetchPolicy: 'network-only'
      })
      .then((res) => {
        if (res.data) {
          dispatch({
            type: ACTION_GET_LIST_ARTICLES,
            data: res.data.articles,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: ERROR_GET_LIST_ARTICLES,
          msgErr: err.message,
        });
      });
  };
}

export function createNewPost(data) {
  return (dispatch) => {
    return apolloClient
      .mutate({
        mutation: CREATE_ARTICLE_MUTATION,
        variables: data,
      })
      .then((res) => {
        if (res.data) {
          dispatch({
            type: ACTION_CREATED_NEW_POST,
            data: res.data,
          });
        }
      })
      .catch((err) => {
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
  deleteArticleWithID,
  getDetailArticle,
  updateArticle,
  getListArticlesDeleted,
  deleteMultiArticles,
};
