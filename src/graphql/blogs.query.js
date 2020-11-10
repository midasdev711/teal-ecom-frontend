import gql from 'graphql-tag';

export const GET_BLOGS = gql`
  query blogs($filters: BlogFilters) {
    blogs(filters: $filters) {
      _id
      BlogTitle
      BlogPublishingPlace
      BlogCategory
      BlogPicture
      BlogUserID
    }
  }
`;

export const CREATE_BLOGS_MUTATION = gql`
  mutation createBlog(
    $BlogTitle: String
    $BlogPublishingPlace: String
    $BlogCategory: String
    $BlogPicture: String
    $BlogUserID: Int
  ) {
    upsertBlog(
      blog: {
        BlogTitle: $BlogTitle
        BlogPublishingPlace: $BlogPublishingPlace
        BlogCategory: $BlogCategory
        BlogPicture: $BlogPicture
        BlogUserID: $BlogUserID
      }
    ) {
      _id
      BlogTitle
      BlogPublishingPlace
      BlogCategory
      BlogPicture
      BlogUserID
    }
  }
`;

export default {
  GET_BLOGS
};