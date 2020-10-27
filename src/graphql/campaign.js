import gql from "graphql-tag";

export const CREATE_CAMPAIGN_MUTATION = gql`
  mutation upsertCampaign(
    $CampaignName: String
    $ArticleId1: Int
    $ArticleId2: Int
    $authorID : Int
  ) {
    upsertCampaign(
      campaign: {
        CampaignName: $CampaignName
        ArticleId1: $ArticleId1
        ArticleId2: $ArticleId2
        authorID: $authorID
      }
    ) {
      ID
      SplitId
    }
  }
`;

export const GET_CAMPAIGN_QUERY = gql`
query campaign($filters: CampaignFilters) {
  campaign(filters: $filters) {
    ID
    CampaignName
    ArticleId1 {
        ID
    }
    ArticleId2 {
      ID
    }
    createdDate
    Views
    Reactions
    CTR
    Revenue
    SplitId
  }
}
`;

export const DELETE_CAMPAIGN_MUTATION = gql`
  mutation upsertCampaign(
    $isDeleted: Boolean
    $IdArray : [Int]
  ) {
    upsertCampaign(
      campaign: {
        isDeleted: $isDeleted
        IdArray: $IdArray
      }
    ){
      CampaignName
    }
  }
`;

export const UPDATE_CAMPAIGN_MUTATION = gql`
  mutation upsertCampaign(
    $ID: Int
    $CampaignName: String
    $ArticleId1: Int
    $ArticleId2: Int
  ) {
    upsertCampaign(
      campaign: {
        ID: $ID
        CampaignName: $CampaignName
        ArticleId1: $ArticleId1
        ArticleId2: $ArticleId2
      }
    ) {
      ID
      SplitId
    }
  }
`;

export default {
    CREATE_CAMPAIGN_MUTATION,
    GET_CAMPAIGN_QUERY,
    DELETE_CAMPAIGN_MUTATION,
    UPDATE_CAMPAIGN_MUTATION
};
