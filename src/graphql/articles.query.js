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

export const UPDATE_ARTICLE_MUTATION = gql`
  mutation updateArticle(
    $articleId: Int
    $title: String
    $subTitle: String
    $description: String
    $featureImage: String
    $isDraft: Boolean
    $isPublish: Boolean
  ) {
    upsertArticle(
      article: {
        articleId: $articleId
        title: $title
        subTitle: $subTitle
        description: $description
        featureImage: $featureImage
        isDraft: $isDraft
        isPublish: $isPublish
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
      isDraft
      isFollowed
      isClicked
      isContentAllowed
      articleScope
      ID
    }
  }
`;

export const DELETE_ARTICLE_MUTATION = gql`
  mutation updateArticle($status: Int, $articleId: Int) {
    upsertArticle(article: { status: $status, articleId: $articleId }) {
      title
      subTitle
      titleSlug
      description
      status
    }
  }
`;

export const DELETE_ARTICLES_MULTI_MUTATION = gql`
  mutation deleteArticles($deleteArticleIds: [ID]) {
    upsertArticle(article: { deleteArticleIds: $deleteArticleIds }) {
      status
    }
  }
`;

export const GET_LIST_ARTICLES_DELETED_QUERY = gql`
  query getDeletedArticles($filters: ArticleFilters) {
    articles(filters: $filters) {
      title
      ID
      createdDate
      viewCount
      slug
    }
  }
`;

export const GET_DETAIL_ARTICLE_QUERY = gql`
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
      isDraft
      isFollowed
      isClicked
      isContentAllowed
      articleScope
      ID
    }
  }
`;

export const CREATE_DRAFT_ARTICLE_MUTATION = gql`
  mutation createDraftArticle(
    $title: String
    $subTitle: String
    $description: String
    $authorID: Int
    $isDraft: Boolean
  ) {
    upsertArticle(
      article: {
        title: $title
        subTitle: $subTitle
        description: $description
        authorID: $authorID
        isDraft: $isDraft
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
      isDraft
      isFollowed
      isClicked
      isContentAllowed
      articleScope
      ID
    }
  }
`;

export const GET_DRAFT_ARTICLES_QUERY = gql`
  query getDraftArticle($filters: ArticleFilters) {
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
      isDraft
      isFollowed
      isClicked
      isContentAllowed
      articleScope
      ID
    }
  }
`;

export default {
  GET_ARTICLES_QUERY,
  GET_DETAIL_ARTICLE_QUERY,
  CREATE_ARTICLE_MUTATION,
  DELETE_ARTICLE_MUTATION,
  UPDATE_ARTICLE_MUTATION,
  DELETE_ARTICLES_MULTI_MUTATION,
  GET_LIST_ARTICLES_DELETED_QUERY,
  CREATE_DRAFT_ARTICLE_MUTATION,
  GET_DRAFT_ARTICLES_QUERY,
};
