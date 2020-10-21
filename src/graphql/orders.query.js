import gql from 'graphql-tag';

export const GET_ORDERS = gql`
  query orders($filters: OrderFilters) {
    orders(filters: $filters) {
		_id
        Status
		UserId
		OrderAmount
		createdAt
		DeliveryAddress{
			BasicDetailsFirstName
			BasicDetailsLastName
			AddressDetailsCompany
			AddressDetailsMobile
			AddressDetailsApartment
			AddressDetailsCity
			AddressDetailsCountry
			AddressDetailsPostalCode
			}
		ShippingAddress{
			BasicDetailsFirstName
			BasicDetailsLastName
			AddressDetailsCompany
			AddressDetailsMobile
			AddressDetailsApartment
			AddressDetailsCity
			AddressDetailsCountry
			AddressDetailsPostalCode
			}
			Products {
			_id
			status
			productID
			productMerchantID
			productSKU
			productTitle
			productSalePrice
			productTotalQuantity
			productTotalPrice
			productVariantID
			productVariantObject {
				ID 
		productID  
		merchantID 
		costPrice  
		sellingPrice  
		variantStock  
		variantSKU 
		variantImage 

		status 
		productVariants {
		_id
		name 
		value 
}
			}
			
	}
		PaymentMethod
		Notes
		Tags
		tokenID
	}
  }
`;

export const CREATE_ORDER_MUTATION = gql`
mutation createOrder(
	$Status: Int
	$UserId: Int
	$OrderAmount: String
	$PaymentMethod: String
	$tokenID:String
	$DeliveryAddress: DeliveryAddressInput
	$ShippingAddress: ShippingAddressInput
	$Products: [OrderProductInput]
	$Notes: String
	$Tags: String
	
  ) {
    upsertOrder(
     order:{
		                Status: $Status
						UserId: $UserId 
						OrderAmount: $OrderAmount
						DeliveryAddress: $DeliveryAddress
						ShippingAddress: $ShippingAddress
						Products: $Products
						PaymentMethod: $PaymentMethod
						Notes: $Notes
						Tags: $Tags
						tokenID: $tokenID
						
										})                 
				  {
						_id
						Status
				   	    UserId
						OrderAmount
						DeliveryAddress{
							BasicDetailsFirstName
							BasicDetailsLastName
							AddressDetailsCompany
							AddressDetailsMobile
							AddressDetailsApartment
							AddressDetailsCity
							AddressDetailsCountry
							AddressDetailsPostalCode
						  }
						ShippingAddress{
							BasicDetailsFirstName
							BasicDetailsLastName
							AddressDetailsCompany
							AddressDetailsMobile
							AddressDetailsApartment
							AddressDetailsCity
							AddressDetailsCountry
							AddressDetailsPostalCode
						  }
						  Products {
							_id
							productID
							productMerchantID
							productSKU
							productTitle
							productSalePrice
							productTotalQuantity
						
							
						
						}
						PaymentMethod
						Notes
						Tags
						tokenID
				  }
  }
`;

export default {
	GET_ORDERS,
	CREATE_ORDER_MUTATION
};

