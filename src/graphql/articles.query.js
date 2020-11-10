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
      metaRobots
      article_SEO {
        metaTitle
        metaDescription
        conicalUrl
        keyPhrases
      }
      descriptionJson
      isPublish
      ampSlug
      featureImage
      thumbnail
      readMinutes
      viewCount
      tags
      status
      internalArticle
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
    $featureImage: Upload
    $categories: [ArticleCategoryInput]
    $tags:[String]
    $metaRobots:String
    $article_SEO: [ArticleSEOType]
    $internalArticle: Boolean
    $descriptionJson:descriptionJson
  ) {
    upsertArticle(
      article: {
        title: $title
        subTitle: $subTitle
        description: $description
        authorID: $authorID
        featureImage: $featureImage
        categories: $categories
        tags:$tags
        metaRobots:$metaRobots
        article_SEO:$article_SEO
        internalArticle:$internalArticle
        descriptionJson:$descriptionJson
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
      tags
      internalArticle
      metaRobots
      article_SEO {
        metaTitle
        metaDescription
        conicalUrl
        keyPhrases
      }
      isPublish
      ampSlug
      featureImage
      thumbnail
      readMinutes
      viewCount
      tags
      status
      descriptionJson
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
    $featureImage: Upload
    $authorID: Int
    $isDraft: Boolean
    $isPublish: Boolean
    $tags:[String]
    $metaRobots:String
    $article_SEO: [ArticleSEOType]
    $internalArticle: Boolean
    $descriptionJson:JSON
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
        authorID: $authorID
        tags:$tags
        metaRobots:$metaRobots
        article_SEO:$article_SEO
        internalArticle:$internalArticle
        descriptionJson:$descriptionJson
      }
    ) {
      title
      subTitle
      titleSlug
      description
      slug
      tags
      metaRobots
      article_SEO {
        metaTitle
        metaDescription
        conicalUrl
        keyPhrases
      }
      sequence
      internalArticle 
      urls
      createdDate
      author {
        name
      }
      descriptionJson
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
      descriptionJson
      isPublish
      ampSlug
      featureImage
      thumbnail
      readMinutes
      viewCount
      tags
      internalArticle
      metaRobots
      article_SEO {
        metaTitle
        metaDescription
        conicalUrl
        keyPhrases
      }
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
    $featureImage: Upload
    $tags:[String]
    $metaRobots:String
    $article_SEO: [ArticleSEOType]
    $internalArticle: Boolean,
    $descriptionJson:JSON
  ) {
    upsertArticle(
      article: {
        title: $title
        subTitle: $subTitle
        description: $description
        authorID: $authorID
        isDraft: $isDraft
        featureImage: $featureImage
        tags:$tags
        metaRobots:$metaRobots
        article_SEO:$article_SEO
        internalArticle:$internalArticle
        descriptionJson:$descriptionJson
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
      metaRobots
      article_SEO {
        metaTitle
        metaDescription
        conicalUrl
        keyPhrases
      }
      descriptionJson
      internalArticle
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
      metaRobots
      article_SEO {
        metaTitle
        metaDescription
        conicalUrl
        keyPhrases
      }
      descriptionJson
      isPublish
      internalArticle
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
export const SET_IMAGE_EXTENSION_MUTATION = gql`
mutation ArticleImg(
          $articleImage:Upload
          ) {
              uploadArticleImg(
                       articleImgInput: {
                           articleImage: $articleImage
                       } 
             ) 
         {
       imgUrl
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
  SET_IMAGE_EXTENSION_MUTATION,
};
