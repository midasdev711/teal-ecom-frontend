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


export const GET_MY_PRODUCT_LISTS_QUERY = gql`
   query($ID: Int) { 
	getProductByMerchant(ID:$ID)  {
		_id
		ID
		variants {
			variantName
		  variantValues
		  
		  }
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
		createdDate
		createdAt
		stock
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


export const ADD_MERCHANT_PRODUCT_MUTATION = gql`
mutation products(
	$productMerchantID: Int
	$productMerchantName: String
	$productSKU: String
	$productTitle: String
	$productSlug: String
	$productDescription: String
	$productMRP: Int
	$productCostPerItem:Int
	$productSalePrice: Int
	$productThumbnailImage: Upload
	$productFeaturedImage: Upload!
	$productImages : [Upload]!
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
	$isPublish:String
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
						productCostPerItem:$productCostPerItem
						isPublish:$isPublish
										})                 
				  {
						_id
						ID
				   	    merchantID
						merchantName
						sku
						title
						description
						salePrice
						featuredImage
						totalQuantity
						productCost
						mrp
						stock
					    thumbnailImage
						featuredImage
						images
						isPublish
						endDate
                        startDate
                        totalQuantity
						attributes
						{
						attributeName
						attributeValues
						}
						seo
						{
							title		
						description
						cronicalUrl
						}
						variants
						{
						variantName
						variantValues
						}
						slug
						tags
				       }
  }
`;

export const GET_PRODUCT_CATEGORY_LISTS_QUERY = gql`
      query{ getParentCategories{
		id
        ID
        name
        isParent
		} }
		`;


export const GET_PRODUCT_SUB_CATEGORY_LISTS_QUERY = gql`
query($ID:Int){ getSubCategories(ID:$ID) {
	id
	name
	ID
	description
	} }
	`;
export const GET_MERCHANT_PRODUCT_BY_ID_QUERY = gql`

	query($products:ID){
		 products(filters:{productIds:[$products]})
		 {
		
			_id
			ID
			merchantID
			merchantName
			sku
			title
			description
			salePrice
			featuredImage
			totalQuantity
			productCost
			category
            subCategory
			mrp
			stock
			thumbnailImage
			featuredImage
			images
			isPublish
			endDate
			startDate
			totalQuantity
			attributes
			{
			attributeName
			attributeValues
			}
			seo
			{
				title		
			description
			cronicalUrl
			}
			variants
			{
			variantName
			variantValues
			}
			slug
			tags
			}
 }
			`;
export const DELETE_MERCHANT_PRODUCT_MUTATION = gql`
				mutation removeProduct($ID:Int) {
					removeProduct(ID:$ID) {
						message
						ID
						title
				}
				}
			`;
export const UPDATE_MERCHANT_PRODUCT_MUTATION = gql`
			mutation products(
				$productId:Int
				$productMerchantID: Int
				$productMerchantName: String
				$productSKU: String
				$productTitle: String
				$productSlug: String
				$productDescription: String
				$productMRP: Int
				$productCostPerItem:Int
				$productSalePrice: Int
				$productExistingImages:[String]
				$productThumbnailImage: Upload
	            $productFeaturedImage: Upload
             	$productImages : [Upload]
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
				$isPublish:String
			  ) {
				updateProduct(
				 product:{
									
					                productId: $productId
					                productMerchantID: $productMerchantID
									productMerchantName: $productMerchantName 
									productSKU: $productSKU
									productTitle: $productTitle
									productSlug: $productSlug
									productDescription: $productDescription
									productMRP: $productMRP
									productSalePrice: $productSalePrice
									productExistingImages:$productExistingImages
									productImages :$productImages 
									productThumbnailImage:$productThumbnailImage
	                                productFeaturedImage:$productFeaturedImage
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
									productCostPerItem:$productCostPerItem
									isPublish:$isPublish
													})                 
							  {
									_id
									ID
								    merchantID
									merchantName
									sku
									title
									description
									salePrice
								
									totalQuantity
									productCost
									mrp
									stock
								
									isPublish
									endDate
									startDate
									totalQuantity
									attributes
									{
									attributeName
									attributeValues
									}
									seo
									{
										title		
									description
									cronicalUrl
									}
									variants
									{
									variantName
									variantValues
									}
									slug
									tags
								   }
			  }
			`;

export default {
	GET_MY_PRODUCT_LISTS_QUERY,
	ADD_MERCHANT_PRODUCT_MUTATION,
	GET_PRODUCT_CATEGORY_LISTS_QUERY,
	GET_PRODUCT_SUB_CATEGORY_LISTS_QUERY,
	GET_MERCHANT_PRODUCT_BY_ID_QUERY,
	DELETE_MERCHANT_PRODUCT_MUTATION,
	UPDATE_MERCHANT_PRODUCT_MUTATION
};
