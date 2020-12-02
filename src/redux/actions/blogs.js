import { apolloClient } from "../../graphql";
import {
  GET_BLOGS,
  CREATE_BLOGS_MUTATION
} from "../../graphql/blogs.query";

import {
  ADD_BLOG_START,
  ADD_BLOG,
  ADD_BLOG_ERROR,
  ACTION_GET_BLOGS,
  ERROR_GET_BLOGS,
  RESET_BLOG_STATUS
} from "./actionTypes";

export const resetBlogStatus = () => {
  return dispatch => {
    dispatch({
      type: RESET_BLOG_STATUS,
    })
  };
};

export const AddBlogs = (datas) => {
  console.log("datas", datas)
  return dispatch => {
    dispatch({
      type: ADD_BLOG_START,
    })
    return apolloClient
      .mutate({
        mutation: CREATE_BLOGS_MUTATION,
        variables: datas,
      })
      .then((res) => {
        if (res.data) {
          // dispatch({
          //   type: ADD_BLOG,
          //   data: res.data,
          // });

          window.location.href='/'+window.location.pathname.split("/")[1]+"/blogs/"
        }
      })
      .catch((err) => {
        dispatch({
          type: ADD_BLOG_ERROR,
          errorMsg: err.message,
        });
      });
  };
};

export function getBlogs(limit, page) {
  return (dispatch) => {
    return apolloClient.query({
      query: GET_BLOGS,

      fetchPolicy: "network-only",
    })
      .then((res) => {
        if (res.data) {
          dispatch({
            type: ACTION_GET_BLOGS,
            data: res.data.blogs,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: ERROR_GET_BLOGS,
          msgErr: err.message,
        });
      });
  };
}
export default {
  AddBlogs,
  getBlogs
};