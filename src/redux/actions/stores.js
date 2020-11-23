import { apolloClient } from "../../graphql";
import {
  GET_STORES,
  CREATE_STORE_MUTATION
} from "../../graphql/stores.query";

import {
  ADD_STORE_START,
  ADD_STORE,
  ADD_STORE_ERROR,
  ACTION_GET_STORES,
  ERROR_GET_STORES,
  RESET_STORE_STATUS
} from "./actionTypes";

export const resetStoreStatus = () => {
  return dispatch => {
    dispatch({
      type: RESET_STORE_STATUS,
    })
  };
};

export const AddStores = (datas) => {

  return dispatch => {
    dispatch({
      type: ADD_STORE_START,
    })
    return apolloClient
      .mutate({
        mutation: CREATE_STORE_MUTATION,
        variables: datas,
      })
      .then((res) => {
        if (res.data) {
          dispatch({
            type: ADD_STORE,
            data: res.data,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: ADD_STORE_ERROR,
          errorMsg: err.message,
        });
      });
  };
};

export function getStores(limit, store) {
  return (dispatch) => {
    return apolloClient.query({
      query: GET_STORES,

      fetchPolicy: "network-only",
    })
      .then((res) => {
        if (res.data) {
          dispatch({
            type: ACTION_GET_STORES,
            data: res.data.stores,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: ERROR_GET_STORES,
          msgErr: err.message,
        });
      });
  };
}
export default {
  getStores
};