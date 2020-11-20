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
      BlogPageID
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
    $BlogPageID: String
  ) {
    upsertBlog(
      blog: {
        BlogTitle: $BlogTitle
        BlogPublishingPlace: $BlogPublishingPlace
        BlogCategory: $BlogCategory
        BlogPicture: $BlogPicture
        BlogUserID: $BlogUserID
        BlogPageID: $BlogPageID
      }
    ) {
      _id
      BlogTitle
      BlogPublishingPlace
      BlogCategory
      BlogPicture
      BlogUserID
      BlogPageID
    }
  }
`;

export default {
  GET_BLOGS
};