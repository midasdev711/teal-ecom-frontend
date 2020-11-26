import gql from 'graphql-tag';

export const GET_ORDERS = gql`
  query orders($filters: OrderFilters) {
    orders(filters: $filters) {
		_id
		ID
        status
		userId
		orderAmount
		createdAt
		customer {
			_id
			ID
			BasicDetailsFullName
			BasicDetailsEmail
			BasicDetailsMobile
			AddressDetailsAddress
			AddressDetailsApartment
			AddressDetailsCity
			AddressDetailsCountry
			AddressDetailsPostalCode
			AddressDetailsState
		}
		line_items {
			_id
			ID
			merchantID
			merchantName
			sku
			title
			slug
			description
			mrp
			salePrice
			yourShippingCost
			shippingCost
			thumbnailImage
			featuredImage
			images
			category
			subCategory
			seo
			{
				title		
				description
				cronicalUrl
			}
			attributes
			{
				attributeName
				attributeValues
			}
			ampSlug
			totalQuantity
			stock
			termsAndConditions
			tags
			startDate
			endDate
			editStatus
			views
			revenue
			searchEngineTitle
			searchEngineDescription
			status
			createdBy
			modifiedBy
			createdDate
			modifiedDate
			weight
			weightUnit
			name
			productCost
		}
		fulfillment_status
		fulfillments {
			_id
			ID
			merchantID
			merchantName
			sku
			title
			slug
			description
			mrp
			salePrice
			yourShippingCost
			shippingCost
			thumbnailImage
			featuredImage
			images
			category
			subCategory
			seo
			{
				title		
				description
				cronicalUrl
			}
			attributes
			{
				attributeName
				attributeValues
			}
			ampSlug
			totalQuantity
			stock
			termsAndConditions
			tags
			startDate
			endDate
			editStatus
			views
			revenue
			searchEngineTitle
			searchEngineDescription
			status
			createdBy
			modifiedBy
			createdDate
			modifiedDate
			weight
			weightUnit
			name
			productCost
		}
		paymentMethod
		transactionID
		createdAt
	}
  }
`;

export const CREATE_ORDER_MUTATION = gql`
mutation createOrder(
	$status: Int
	$userId: Int
	$orderAmount: Float
	$paymentMethod: String
	$transactionID: String
	$customer: OrderCustomerInput
	$line_items: [OrderProductInput]
	$fulfillments: [OrderProductInput]
	$fulfillment_status: String
) {
    upsertOrder(
		order:{
			status: $status
			userId: $userId 
			orderAmount: $orderAmount
			customer: $customer
			line_items: $line_items
			fulfillments: $fulfillments
			fulfillment_status: $fulfillment_status
			paymentMethod: $paymentMethod
			transactionID: $transactionID
		})                 
		{
			status
			userId
			orderAmount
			customer {
				ID
				BasicDetailsFullName
				BasicDetailsEmail
				BasicDetailsMobile
				AddressDetailsAddress
				AddressDetailsApartment
				AddressDetailsCity
				AddressDetailsCountry
				AddressDetailsPostalCode
				AddressDetailsState
			}
			line_items {
				ID
				merchantID
				merchantName
				sku
				title
				slug
				description
				mrp
				salePrice
				yourShippingCost
				shippingCost
				thumbnailImage
				featuredImage
				images
				category
				subCategory
				seo
				{
					title		
					description
					cronicalUrl
				}
				attributes
				{
					attributeName
					attributeValues
				}
				ampSlug
				totalQuantity
				stock
				termsAndConditions
				tags
				startDate
				endDate
				editStatus
				views
				revenue
				searchEngineTitle
				searchEngineDescription
				status
				createdBy
				modifiedBy
				createdDate
				modifiedDate
				weight
				weightUnit
				name
				productCost
			}
			fulfillment_status
			fulfillments {
				ID
				merchantID
				merchantName
				sku
				title
				slug
				description
				mrp
				salePrice
				yourShippingCost
				shippingCost
				thumbnailImage
				featuredImage
				images
				category
				subCategory
				seo
				{
					title		
					description
					cronicalUrl
				}
				attributes
				{
					attributeName
					attributeValues
				}
				ampSlug
				totalQuantity
				stock
				termsAndConditions
				tags
				startDate
				endDate
				editStatus
				views
				revenue
				searchEngineTitle
				searchEngineDescription
				status
				createdBy
				modifiedBy
				createdDate
				modifiedDate
				weight
				weightUnit
				name
				productCost
			}
			paymentMethod
			transactionID
		}
	}
`;

export default {
	GET_ORDERS,
	CREATE_ORDER_MUTATION
};

