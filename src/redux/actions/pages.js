import { apolloClient } from "../../graphql";
import {
  GET_PAGES,
  CREATE_PAGE_MUTATION
} from "../../graphql/pages.query";

import {
  ADD_PAGE_START,
  ADD_PAGE,
  ADD_PAGE_ERROR,
  ACTION_GET_PAGES,
  ERROR_GET_PAGES,
  RESET_PAGE_STATUS
} from "./actionTypes";

export const resetPageStatus = () => {
  return dispatch => {
    dispatch({
      type: RESET_PAGE_STATUS,
    })
  };
};

export const AddPages = (datas) => {
  return dispatch => {
    dispatch({
      type: ADD_PAGE_START,
    })
    return apolloClient
      .mutate({
        mutation: CREATE_PAGE_MUTATION,
        variables: datas,
      })
      .then((res) => {
        if (res.data) {
          dispatch({
            type: ADD_PAGE,
            data: res.data,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: ADD_PAGE_ERROR,
          errorMsg: err.message,
        });
      });
  };
};

export function getPages(limit, page) {

  return (dispatch) => {
    return apolloClient.query({
      query: GET_PAGES,

      fetchPolicy: "network-only",
    })
      .then((res) => {
        console.log("responsesssss", res)
        if (res.data) {
          dispatch({
            type: ACTION_GET_PAGES,
            data: res.data.pages,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: ERROR_GET_PAGES,
          msgErr: err.message,
        });
      });
  };
}
export default {
  getPages
};