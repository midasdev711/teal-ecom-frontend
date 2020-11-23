import gql from 'graphql-tag';

export const GET_STORES = gql`
  query stores($filters: StoreFilters) {
    stores(filters: $filters) {
      _id
      StoreTitle
      StoreDescription
      StoreUserID
      StoreCategory
      StoreUserName
      StoreEmail
      StorePhone
      StoreWebsite
      StoreLocation
      StorePageID
    }
  }
`;

export const CREATE_STORE_MUTATION = gql`
  mutation createStore(
    $StoreTitle: String
    $StoreDescription: String
    $StoreUserID: Int
    $StoreCategory: String
    $StoreUserName: String
    $StoreEmail: String
    $StorePhone: String
    $StoreWebsite: String
    $StoreLocation: String
    $StorePageID: String
  ) {
    upsertStore(
      store: {
        StoreTitle: $StoreTitle
        StoreDescription: $StoreDescription
        StoreUserID: $StoreUserID
        StoreCategory: $StoreCategory
        StoreUserName: $StoreUserName
        StoreEmail: $StoreEmail
        StorePhone: $StorePhone
        StoreWebsite: $StoreWebsite
        StoreLocation: $StoreLocation
        StorePageID: $StorePageID
      }
    ) {
      _id
      StoreTitle
      StoreDescription
      StoreUserID
      StoreCategory
      StoreUserName
      StoreEmail
      StorePhone
      StoreWebsite
      StoreLocation
      StorePageID
    }
  }
`;

export default {
  GET_STORES
};




    