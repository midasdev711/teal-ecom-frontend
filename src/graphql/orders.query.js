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

export default {
    GET_ORDERS
};

