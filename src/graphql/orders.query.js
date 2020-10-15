import gql from 'graphql-tag';

export const GET_ORDERS = gql`
  query orders($filters: OrderFilters) {
    orders(filters: $filters) {
        status: Int
        userID: Int
        orderAmount : String
        deliveryAddress: String
        shippingAddress : String
        products: OrderProductType
        paymentMethod: String
        tokenID: String
    }
  }
`;

export const CREATE_ORDER_MUTATION = gql`
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
						}
						variants
						{
						variantName
						}
						seo
						{
						cronicalUrl
						}
						slug
						tags
				       }
  }
`;

export default {
    GET_ORDERS,
    CREATE_ORDER_MUTATION
};

