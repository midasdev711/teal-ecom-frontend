import { apolloClient } from "../../graphql";

import {
    CREATE_CAMPAIGN_MUTATION,
    GET_CAMPAIGN_QUERY,
    DELETE_CAMPAIGN_MUTATION,
    UPDATE_CAMPAIGN_MUTATION
} from "../../graphql/campaign";
import {
    ADD_CAMPAIGN_START,
    ADD_CAMPAIGN,
    ADD_CAMPAIGN_ERROR,
    ACTION_GET_CAMPAIGN,
    ERROR_GET_CAMPAIGN,
    EDIT_CAMPAIGN_START,
    EDIT_CAMPAIGN_ERROR,
    EDIT_CAMPAIGN,
    DELETE_CAMPAIGN,
    DELETE_CAMPAIGN_ERROR
  } from "./actionTypes";

export function getListCampaignDraft(userId) {
  return (dispatch) => {
    return apolloClient
      .query({
        query: GET_CAMPAIGN_QUERY,
        variables: {
          filters: {
            userId,
          },
        },
        fetchPolicy: "no-cache",
      })
      .then((res) => {
        res.data.campaign.map(value=>{
            value.ArticleId1Name=value.ArticleId1.title
          })
        dispatch({
          type: ACTION_GET_CAMPAIGN,
          data: res.data.campaign,
        });
      })
      .catch((err) => {
        dispatch({
          type: ERROR_GET_CAMPAIGN,
          msgErr: err.message,
        });
      });
  };
}

export function createDraftCampaign(variables) {
  return (dispatch) => {
    return new Promise(function(resolve, reject) {
     apolloClient
      .mutate({
        mutation: CREATE_CAMPAIGN_MUTATION,
        variables,
      })
      .then((res) => {
        dispatch({
          type: ADD_CAMPAIGN,
          data: res.data,
        });
        resolve(res.data)
      })
      .catch((err) => {
        dispatch({
          type: ADD_CAMPAIGN_ERROR,
          msgErr: err.message,
        });
        reject(err.message)
      });
    }) 
  };
}

export function updateCampaign(data) {
  return (dispatch) => {
    dispatch({
      type: EDIT_CAMPAIGN_START
    });
    return new Promise(function(resolve, reject) {
     apolloClient
      .mutate({
        mutation: UPDATE_CAMPAIGN_MUTATION,
        variables: data,
      })
      .then((res) => {
        dispatch({
          type: EDIT_CAMPAIGN,
          data: res.data,
        });
        resolve(res.data)
      })
      .catch((err) => {
        dispatch({
          type: EDIT_CAMPAIGN_ERROR,
          msgErr: err.message,
        });
        reject(err.message)
      });
  });
}
}


export function deleteMultiCampaign(ids) {
  return (dispatch) => {
    return new Promise(function(resolve, reject) {
    apolloClient
      .mutate({
        mutation: DELETE_CAMPAIGN_MUTATION,
        variables: {
          IdArray: ids,
          isDeleted: true
        },
      })
      .then((res) => {
        dispatch({
          type: DELETE_CAMPAIGN,
          data: res.data,
        });
        resolve(res.data)
      })
      .catch((err) => {
        dispatch({
          type: DELETE_CAMPAIGN_ERROR,
          msgErr: err.message,
        });
        reject(err.message)
      });
    })
  };
}


export default {
    getListCampaignDraft,
    createDraftCampaign,
    updateCampaign,
    deleteMultiCampaign  
};
