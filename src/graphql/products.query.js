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
   query($MerchantID: Int) { 
	products(MerchantID:$MerchantID)  { 
		ProductID
    ProductMerchantID
    ProductTitle
    ProductSlug
    ProductDescription
    ProductMRP
    ProductSalePrice
    ProductFeaturedImage
    ProductTotalQuantity
    ProductStock
		Status 
	  }
		}`;

export const ADD_MERCHANT_PRODUCT_MUTATION = gql`
		 mutation(
			$merchant_id :Int,
			$product_title: String,
			$product_des: String,
			$price_USD:String,
			$slug:String,
			$SKU: String,
			$Inventory : Int,
			$Search_engine_title: String,
			$Search_engine_description : String,
			$ProductCategory: [ParentCategoriesInput],
			$ProductSubcategory: [SubCategoriesInput],
			$publication_date:String,
			$merchant_name:String,
			$visibility:String,
			$ProductImage:String!
			){ 
			
				addProductByMerchant(
				ProductMerchantID: $merchant_id
				ProductMerchantName: $merchant_name
				ProductSKU: $SKU
				ProductTitle: $product_title 
				ProductDescription: $product_des 
				ProductSlug: $slug
				ProductSalePrice: $price_USD 
				ProductStartDate:$publication_date 
				ProductSearchEngineTitle:$Search_engine_title 
				ProductSearchEngineDescription:$Search_engine_description 
				ProductCategory: $ProductCategory
				ProductSubcategory: $ProductSubcategory 
				isPublish: $visibility 
				ProductTotalQuantity: $Inventory 
				ProductFeaturedImage: $ProductImage
      ){
				_id
				ProductID
		   	    ProductMerchantID
				ProductMerchantName
				ProductSKU
				ProductTitle
				ProductDescription
				ProductSalePrice
				ProductFeaturedImage
				ProductTotalQuantity
        }
}
`;
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
