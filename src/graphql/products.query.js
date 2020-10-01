import gql from 'graphql-tag';

export const GET_PRODUCTS = gql`
  query products($filters: ProductFilters) {
    products(filters: $filters) {
       productID  
      productMerchantID
      productMerchantName 
      productSKU 
      productTitle 
      productSlug 
      productDescription 
      productMRP 
      productSalePrice
      productThumbnailImage 
      productFeaturedImage
      productImages:String
      productCategory
      productSubcategory
      productSEO
      ampSlug
      productTotalQuantity
      productInventory
      productTags
      productStock
      productTermsAndConditions 
      productVariants
      productAttributes
      productStartDate
      productEndDate
      isPublish
      productSearchEngineTitle
      productSearchEngineDescription
      status
      createdBy
      modifiedBy
    }
  }
`;

export default {
  GET_PRODUCTS
};

