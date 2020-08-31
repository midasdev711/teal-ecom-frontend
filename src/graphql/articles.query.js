import gql from "graphql-tag";

export const GET_ARTICLES_QUERY = gql`
  query articles($filters: ArticleFilters) {
    articles(filters: $filters) {
      title
      subTitle
      titleSlug
      description
      slug
      sequence
      urls
      createdDate
      author {
        name
      }
      isPublish
      ampSlug
      featureImage
      thumbnail
      readMinutes
      viewCount
      tags
      status
      totalClapCount
      totalArticleCount
      acceptDonation
      isBookmark
      isFollowed
      isClicked
      isContentAllowed
      articleScope
      ID
    }
  }
`;

export const CREATE_ARTICLE_MUTATION = gql`
mutation createArticle(
  $title: String
  $subTitle: String
  $description: String
  $authorID: Int
  $featureImage: String
  $categories: [ArticleCategoryInput]
) {
  upsertArticle(
    article: {
      title: $title
      subTitle: $subTitle
      description: $description
      authorID: $authorID
      featureImage: $featureImage
      categories: $categories
    }
  ) {
    title
    subTitle
    titleSlug
    description
    slug
    sequence
    urls
    createdDate
    author {
      name
      avatar
      ID
      userName
    }
    isPublish
    ampSlug
    featureImage
    thumbnail
    readMinutes
    viewCount
    tags
    status
    totalClapCount
    totalArticleCount
    acceptDonation
    isBookmark
    isFollowed
    isClicked
    isContentAllowed
    articleScope
    ID
    categories {
      ID
      name
    }
  }
}
`;

export default {
  GET_ARTICLES_QUERY,
  CREATE_ARTICLE_MUTATION,
};