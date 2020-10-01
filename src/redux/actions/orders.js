import { apolloClient } from "../../graphql";
import {
    GET_ORDERS
} from "../../graphql/orders.query";

import {
    ACTION_GET_ORDERS,
    ERROR_GET_ORDERS,
} from "./actionTypes";

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
                data: res.data.articles,
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