import { apolloClient } from "../../graphql";
import {
  GET_CUSTOMERS,
  CREATE_CUSTOMER_MUTATION
} from "../../graphql/customers.query";

import {
  ADD_CUSTOMER_START,
  ADD_CUSTOMER,
  ADD_CUSTOMER_ERROR,
  ACTION_GET_CUSTOMERS,
  ERROR_GET_CUSTOMERS,
  RESET_CUSTOMER_STATUS
} from "./actionTypes";

export const resetCustomerStatus = () => {
  return dispatch => {
    dispatch({
      type: RESET_CUSTOMER_STATUS,
    })
  };
};

export const AddCustomers = (datas) => {

  return dispatch => {
    dispatch({
      type: ADD_CUSTOMER_START,
    })
    return apolloClient
      .mutate({
        mutation: CREATE_CUSTOMER_MUTATION,
        variables: datas,
      })
      .then((res) => {
        if (res.data) {
          dispatch({
            type: ADD_CUSTOMER,
            data: res.data,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: ADD_CUSTOMER_ERROR,
          errorMsg: err.message,
        });
      });
  };
};

export function getCustomers(limit, page) {
  return (dispatch) => {
    return apolloClient.query({
      query: GET_CUSTOMERS,

      fetchPolicy: "network-only",
    })
      .then((res) => {
        if (res.data) {
          dispatch({
            type: ACTION_GET_CUSTOMERS,
            data: res.data.customers,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: ERROR_GET_CUSTOMERS,
          msgErr: err.message,
        });
      });
  };
}
export default {
  getCustomers
};