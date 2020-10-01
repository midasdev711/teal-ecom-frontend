import { apolloClient } from "../../graphql";
import {
    GET_CUSTOMERS
} from "../../graphql/customers.query";

import {
    ACTION_GET_CUSTOMERS,
    ERROR_GET_CUSTOMERS,
} from "./actionTypes";

export function getCustomers(limit, page) {
    return (dispatch) => {
        return apolloClient.query({
            query: GET_CUSTOMERS,
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
                type: ACTION_GET_CUSTOMERS,
                data: res.data.articles,
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