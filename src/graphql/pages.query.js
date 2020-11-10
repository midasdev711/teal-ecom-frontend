import gql from 'graphql-tag';

export const GET_PAGES = gql`
  query pages($filters: PageFilters) {
    pages(filters: $filters) {
      _id
      PageTitle
      PageDescription
      PageUserID
    }
  }
`;

export const CREATE_PAGE_MUTATION = gql`
  mutation createPage(
    $PageTitle: String
    $PageDescription: String
    $PageUserID: Int
  ) {
    upsertPage(
      page: {
        PageTitle: $PageTitle
        PageDescription: $PageDescription
        PageUserID: $PageUserID
      }
    ) {
      _id
      PageTitle
      PageDescription
      PageUserID
    }
  }
`;

export default {
  GET_PAGES
};