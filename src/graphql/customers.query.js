import gql from 'graphql-tag';

export const GET_CUSTOMERS = gql`
  query customers($filters: CustomerFilters) {
    customers(filters: $filters) {
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
  }
`;

export const CREATE_CUSTOMER_MUTATION = gql`
  mutation createCustomer(
    $BasicDetailsFullName: String
    $BasicDetailsEmail: String
    $BasicDetailsMobile: String
    $AddressDetailsAddress: String
    $AddressDetailsApartment: String
    $AddressDetailsCity: String
    $AddressDetailsCountry: String
    $AddressDetailsPostalCode: String
    $AddressDetailsState: String
  ) {
    upsertCustomer(
      customer: {
        BasicDetailsFullName: $BasicDetailsFullName
        BasicDetailsEmail: $BasicDetailsEmail
        BasicDetailsMobile: $BasicDetailsMobile
        AddressDetailsAddress: $AddressDetailsAddress
        AddressDetailsApartment: $AddressDetailsApartment
        AddressDetailsCity: $AddressDetailsCity
        AddressDetailsCountry: $AddressDetailsCountry
        AddressDetailsPostalCode: $AddressDetailsPostalCode
        AddressDetailsState: $AddressDetailsState
      }
    ) {
      _id
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
  }
`;

export default {
  GET_CUSTOMERS
};