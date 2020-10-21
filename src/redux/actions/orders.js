import { apolloClient } from "../../graphql";
import {
  GET_ORDERS,
  CREATE_ORDER_MUTATION
} from "../../graphql/orders.query";

import {
  RESET_ORDER_STATUS,
  ADD_ORDER_START,
  ADD_ORDER,
  ADD_ORDER_ERROR,
  ACTION_GET_ORDERS,
  ERROR_GET_ORDERS,
} from "./actionTypes";


export const resetOrderStatus = () => {
  return dispatch => {
    dispatch({
      type: RESET_ORDER_STATUS,
    })
  };
};

export const AddOrders = (datas) => {

  return dispatch => {
    dispatch({
      type: ADD_ORDER_START,
    })
    return apolloClient
      .mutate({
        mutation: CREATE_ORDER_MUTATION,
        variables: datas,
      })
      .then((res) => {
        if (res.data) {
          dispatch({
            type: ADD_ORDER,
            data: res.data,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: ADD_ORDER_ERROR,
          errorMsg: err.message,
        });
      });
  };
};

export function getOrders(limit, page) {
  return (dispatch) => {
    return apolloClient.query({
      query: GET_ORDERS,
      variables: {
        filters: {
          limit: limit,
          page: page
        },
      },
      fetchPolicy: "network-only",
    })
      .then((res) => {
        if (res.data) {
          dispatch({
            type: ACTION_GET_ORDERS,
            data: res.data.orders,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: ERROR_GET_ORDERS,
          msgErr: err.message,
        });
      });
  };
}
export default {
  getOrders
};