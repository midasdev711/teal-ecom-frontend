import gql from 'graphql-tag';

export const GET_CUSTOMERS = gql`
  query customers($filters: CustomerFilters) {
    customers(filters: $filters) {
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

export default {
    GET_CUSTOMERS
};