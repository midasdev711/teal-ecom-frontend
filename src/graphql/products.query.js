import gql from 'graphql-tag';

const PRODUCTS_QUERY = gql`
  query Products {
    products {
      id
      title
      cost
      created_at
    }
  }
`;

export const GET_MY_PRODUCT_LISTS_QUERY = gql`
   query($ID: Int) { 
	getProductByMerchant(ID:$ID)  {
		merchantID
		merchantName
		totalQuantity
		images
		startDate
		isPublish
		featuredImage
		slug
		thumbnailImage
		mrp
		attributes
		{
		attributeName
		attributeValues
		}
		endDate
		tags
		description
		salePrice
		seo
		{
		cronicalUrl
		description
		}
		subCategory
		category
		sku
		title
		productCost
		}
		}`;

// export const ADD_MERCHANT_PRODUCT_MUTATION = gql`
// 		 mutation products(
// 			$productMerchantID: Int
//    $productMerchantName: String
//    $productSKU: String
//    $productTitle: String
//    $productSlug: String
//    $productDescription: String
//    $productMRP: String
//    $productSalePrice: String
//    $productThumbnailImage: String
//    $productFeaturedImage: String
//    $productImages : String
//    $productCategory: Int
//    $productSubcategory: Int
//    $productSEO: ProductSEOInput
//    $productTotalQuantity: Int
//      $productTags: [String]
//    $productStock: Int
//      $productVariants: ProductVariantInput
//    $productAttributes: [string]
//    $productStartDate: String
//    $productEndDate: String

// 			){
// 			upsertArticle{ 

// 				productMerchantID: $productMerchantID
// 				productMerchantName: $productMerchantName 
// 				productSKU: $productSKU
// 				productTitle: $productTitle
// 				productSlug: $productSlug
// 				productDescription: $productDescription
// 				productMRP: $productMRP
// 				productSalePrice: $productSalePrice
// 				productThumbnailImage: $productThumbnailImage
// 				productFeaturedImage: $productFeaturedImage
// 				productImages : $productImages
// 				productCategory: $productCategory
// 				productSubcategory: $productSubcategory
// 				productSEO: $productSEO
// 				productTotalQuantity: $productTotalQuantity
// 				productTags: $productTags
// 				productStock: $productStock
// 				productVariants: $productVariants
// 				productAttributes:$productAttributes
// 				productStartDate: $productStartDate
// 				productEndDate: $productEndDate

//       )        {
// 				_id
// 				productID
// 		   	    productMerchantID
// 				productMerchantName
// 				productSKU
// 				productTitle
// 				productDescription
// 				productSalePrice
// 				productFeaturedImage
// 				productTotalQuantity
// 		       }
// 	}
// }
// `;
export const ADD_MERCHANT_PRODUCT_MUTATION = gql`
mutation products(
    $productMerchantID: Int
   $productMerchantName: String
   $productSKU: String
   $productTitle: String
   $productSlug: String
   $productDescription: String
   $productMRP: String
   $productSalePrice: String
   $productThumbnailImage: String
   $productFeaturedImage: String
   $productImages : [String]
   $productCategory: Int
   $productSubcategory: Int
   $productSEO: ProductSEOInput
   $productTotalQuantity: Int
     $productTags: [String]
   $productStock: Int
     $productVariants: [ProductVariantInput]
   $productAttributes: [ProductAttributeInput]
   $productStartDate: String
  $productEndDate: String
  ) {
    upsertProduct(
     product:{
		                productMerchantID: $productMerchantID
						productMerchantName: $productMerchantName 
						productSKU: $productSKU
						productTitle: $productTitle
						productSlug: $productSlug
						productDescription: $productDescription
						productMRP: $productMRP
						productSalePrice: $productSalePrice
						productThumbnailImage: $productThumbnailImage
						productFeaturedImage: $productFeaturedImage
						productImages : $productImages
						productCategory: $productCategory
						productSubcategory: $productSubcategory
						productSEO: $productSEO
						productTotalQuantity: $productTotalQuantity
						productTags: $productTags
						productStock: $productStock
						productVariants: $productVariants
						productAttributes:$productAttributes
						productStartDate: $productStartDate
						productEndDate: $productEndDate
										})                 
				  {
						_id
						productID
				   	    productMerchantID
						productMerchantName
						productSKU
						productTitle
						productDescription
						productSalePrice
						productFeaturedImage
						productTotalQuantity
				       }
  }
`;
// export const ADD_MERCHANT_PRODUCT_MUTATION = gql`
// 		 mutation(
// 			$merchant_id :Int,
// 			$product_title: String,
// 			$product_des: String,
// 			$price_USD:String,
// 			$slug:String,
// 			$SKU: String,
// 			$Inventory : Int,
// 			$Search_engine_title: String,
// 			$Search_engine_description : String,
// 			$ProductCategory: [ParentCategoriesInput],
// 			$ProductSubcategory: [SubCategoriesInput],
// 			$publication_date:String,
// 			$merchant_name:String,
// 			$visibility:String,
// 			$ProductImage:String!
// 			){ 

// 				upsertProduct(
// 				productMerchantID: $merchant_id
// 				productMerchantName: $merchant_name
// 				productSKU: $SKU
// 				productTitle: $product_title 
// 				productDescription: $product_des 
// 				productSlug: $slug
// 				productSalePrice: $price_USD 
// 				productStartDate:$publication_date 
// 				productSearchEngineTitle:$Search_engine_title 
// 				productSearchEngineDescription:$Search_engine_description 
// 				productCategory: $ProductCategory
// 				productSubcategory: $ProductSubcategory 
// 				isPublish: $visibility 
// 				productTotalQuantity: $Inventory 
// 				productFeaturedImage: $ProductImage
//       ){
// 				_id
// 				productID
// 		   	    productMerchantID
// 				productMerchantName
// 				productSKU
// 				productTitle
// 				productDescription
// 				productSalePrice
// 				productFeaturedImage
// 				productTotalQuantity
//         }
// }
// `;
export const GET_PRODUCT_CATEGORY_LISTS_QUERY = gql`
      query{ getAllCategories{
		id
    ID
    Name
    isParent
		} }
		`;

// query
// {
//   getAllCategories
//   {
//   	id
//     ID
//     Name
//     isParent
//   }
// }
export const GET_PRODUCT_SUB_CATEGORY_LISTS_QUERY = gql`
query($ID:Int){ getSubCategories(ID:$ID) {
	id
	Name
	ID
	Description
	} }
	`;
export default {
	PRODUCTS_QUERY,
	GET_MY_PRODUCT_LISTS_QUERY,
	ADD_MERCHANT_PRODUCT_MUTATION,
	GET_PRODUCT_CATEGORY_LISTS_QUERY,
	GET_PRODUCT_SUB_CATEGORY_LISTS_QUERY,
};
