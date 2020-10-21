import gql from 'graphql-tag';

export const GET_CUSTOMERS = gql`
  query customers($filters: CustomerFilters) {
    customers(filters: $filters) {
      _id
      BasicDetailsFirstName
      BasicDetailsLastName
      BasicDetailsEmail
      BasicDetailsMobile
      BasicDetailsEmailFlag
      AddressDetailsFirstName
      AddressDetailsLastName
      AddressDetailsCompany
      AddressDetailsApartment
      AddressDetailsCity
      AddressDetailsCountry
      AddressDetailsPostalCode
      AddressDetailsMobile
      Tax
      Notes
      Tags
    }
  }
`;

export const CREATE_CUSTOMER_MUTATION = gql`
  mutation createCustomer(
    $BasicDetailsFirstName: String
    $BasicDetailsLastName: String
    $BasicDetailsEmail: String
    $BasicDetailsMobile: String
    $BasicDetailsEmailFlag: Boolean
    $AddressDetailsFirstName: String
    $AddressDetailsLastName: String
    $AddressDetailsCompany: String
    $AddressDetailsApartment: String
    $AddressDetailsCity: String
    $AddressDetailsCountry: String
    $AddressDetailsPostalCode: String
    $AddressDetailsMobile: String
    $Tax: Int
    $Notes: String
    $Tags: String
  ) {
    upsertCustomer(
      customer: {
        BasicDetailsFirstName: $BasicDetailsFirstName
        BasicDetailsLastName: $BasicDetailsLastName
        BasicDetailsEmail: $BasicDetailsEmail
        BasicDetailsMobile: $BasicDetailsMobile
        BasicDetailsEmailFlag: $BasicDetailsEmailFlag
        AddressDetailsFirstName: $AddressDetailsFirstName
        AddressDetailsLastName: $AddressDetailsLastName
        AddressDetailsCompany: $AddressDetailsCompany
        AddressDetailsApartment: $AddressDetailsApartment
        AddressDetailsCity: $AddressDetailsCity
        AddressDetailsCountry: $AddressDetailsCountry
        AddressDetailsPostalCode: $AddressDetailsPostalCode
        AddressDetailsMobile: $AddressDetailsMobile
        Tax: $Tax
        Notes: $Notes
        Tags: $Tags
      }
    ) {
      _id
      BasicDetailsFirstName
      BasicDetailsLastName
      BasicDetailsEmail
      BasicDetailsMobile
      BasicDetailsEmailFlag
      AddressDetailsFirstName
      AddressDetailsLastName
      AddressDetailsCompany
      AddressDetailsApartment
      AddressDetailsCity
      AddressDetailsCountry
      AddressDetailsPostalCode
      AddressDetailsMobile
      Tax
      Notes
      Tags
    }
  }
`;

export default {
  GET_CUSTOMERS
};