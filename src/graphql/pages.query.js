import gql from 'graphql-tag';

export const GET_PAGES = gql`
  query pages($filters: PageFilters) {
    pages(filters: $filters) {
      _id
      PageTitle
      PageDescription
      PageUserID
      PageCategory
      PageUserName
      PageEmail
      PagePhone
      PageWebsite
      PageLocation
    }
  }
`;

export const CREATE_PAGE_MUTATION = gql`
  mutation createPage(
    $PageTitle: String
    $PageDescription: String
    $PageUserID: Int
    $PageCategory: String
    $PageUserName: String
    $PageEmail: String
    $PagePhone: String
    $PageWebsite: String
    $PageLocation: String
  ) {
    upsertPage(
      page: {
        PageTitle: $PageTitle
        PageDescription: $PageDescription
        PageUserID: $PageUserID
        PageCategory: $PageCategory
        PageUserName: $PageUserName
        PageEmail: $PageEmail
        PagePhone: $PagePhone
        PageWebsite: $PageWebsite
        PageLocation: $PageLocation
      }
    ) {
      _id
      PageTitle
      PageDescription
      PageUserID
      PageCategory
      PageUserName
      PageEmail
      PagePhone
      PageWebsite
      PageLocation
    }
  }
`;

export default {
  GET_PAGES
};

