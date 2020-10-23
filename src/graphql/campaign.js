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



export default {
    CREATE_CAMPAIGN_MUTATION,

};
