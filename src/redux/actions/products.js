import { apolloClient } from "../../graphql";
import {
    GET_PRODUCTS
} from "../../graphql/products.query";

import {
    ACTION_GET_PRODUCTS,
    ERROR_GET_PRODUCTS,
} from "./actionTypes";

export function getProducts(limit, page) {
    return (dispatch) => {
        return apolloClient.query({
            query: GET_PRODUCTS,
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
                type: ACTION_GET_PRODUCTS,
                data: res.data.articles,
              });
            }
          })
          .catch((err) => {
            console.log(err);
            dispatch({
              type: ERROR_GET_PRODUCTS,
              msgErr: err.message,
            });
          });
      };
}
export default {
    getProducts
};