import React, { useState, useEffect }  from "react";
import Link from "next/link";
import styled from "styled-components";
import { Button, Layout } from "antd";
import Router from "next/router";
import { connect, useSelector } from "react-redux";
// components
import { PageLayout } from "../../../../../src/components/views";
import { NewForm } from "../../../../../src/components/customers";
// icons
import { LeftOutlined } from "@ant-design/icons";
import { getUserData } from "../../../../../src/utils";
import { AddCustomers  , resetCustomerStatus } from "../../../../../src/redux/actions/customers";

const NewCustomer = (props) => {
  let userData = getUserData()

  const [BasicDetails, setBasicDetails] = useState({
    FirstName: '',
    LastName: '',
    Email: '',
    Mobile: '',
    EmailFlag: false
  });
  const [AddressDetails, setAddressDetails] = useState({
    FirstName: '',
    LastName: '',
    Company: '',
    Apartment: '',
    City: '',
    Country: '',
    PostalCode: '',
    Mobile: '',
  });
  const [TaxFlag, setTaxFlag] = useState(false);
  const [Tax, setTax] = useState(0);
  const [Notes, setNotes] = useState('');
  const [Tags, setTags] = useState('');
  const apiStatus = useSelector((state)=>state.customerReducer.status)

  const newActions = () => {
    return (
      <ActionTopLayout>
        <ActionContent>
          <span>Unsaved changes</span>
          <NewCustomerAction>
            <Button className="cancel" size="large">
              Cancel
            </Button>
           <Button size="large" type="primary" onClick={() => saveData()}>
              Save
            </Button>
          </NewCustomerAction>
        </ActionContent>
      </ActionTopLayout>
    );
  };

  const saveData = () => {
    let _variables = {
      BasicDetailsFirstName: BasicDetails.FirstName,
      BasicDetailsLastName: BasicDetails.LastName,
      BasicDetailsEmail: BasicDetails.Email,
      BasicDetailsMobile: BasicDetails.Mobile,
      BasicDetailsEmailFlag: BasicDetails.EmailFlag,
      AddressDetailsFirstName: AddressDetails.FirstName,
      AddressDetailsLastName: AddressDetails.LastName,
      AddressDetailsCompany: AddressDetails.Company,
      AddressDetailsApartment: AddressDetails.Apartment,
      AddressDetailsCity: AddressDetails.City,
      AddressDetailsCountry: AddressDetails.Country,
      AddressDetailsPostalCode: AddressDetails.PostalCode,
      AddressDetailsMobile: AddressDetails.Mobile,
      Tax: Tax,
      Notes: Notes,
      Tags: Tags,
    };
    props.AddCustomers(_variables)
  }
  useEffect(() =>{
  
    if(apiStatus === "success"){
    
      props.resetCustomerStatus(),
      Router.router.push("/[portal_id]/ecom/customers" ,{ pathname: `/${userData?.uniqueID}/ecom/customers`}, { shallow: true });
    }
  },[apiStatus])

  const handleChangeValue = (e, module, element) => {
    console.log('dfdfdf', e.target, e, module)
    if (module === 'BasicDetails') {
      if (element === 'Mobile') {
        setBasicDetails({ ...BasicDetails, [element]: e })
      } else {
        let { name, value } = e.target
        setBasicDetails({ ...BasicDetails, [name]: value })
      }
    } else if (module === 'AddressDetails') {
      if (element === 'Mobile' || element === 'Country') {
        setAddressDetails({ ...AddressDetails, [element]: e })
      } else {
        let { name, value } = e.target
        setAddressDetails({ ...AddressDetails, [name]: value })
      }
    } else {
      let { name, value } = e.target
      if (name === 'TaxFlag') {
        setTaxFlag(e.target.checked)
      } else if (name === 'Notes') {
        setNotes(e.target.value)
      }
    }

  }
  return (
    <PageLayout>
      <NewContent>
        {newActions()}
        <ContentPage>
          <ContentHeader>
            <Link href="/[portal_id]/ecom/customers" as={`/${userData?.uniqueID}/ecom/customers`}>
              {/* <Link href="/customers"> */}
              <LinkBack>
                <LeftOutlined /> Add customer
              </LinkBack>
            </Link>
            <TittleHeader>Customers</TittleHeader>
          </ContentHeader>
          <NewForm BasicDetails={BasicDetails} AddressDetails={AddressDetails} TaxFlag={TaxFlag} Tax={Tax} Notes={Notes} Tags={Tags} handleChangeValue={handleChangeValue} />
        </ContentPage>
      </NewContent>
    </PageLayout>
  );
};

const NewContent = styled.div`
  width: 100%;
`;

const ContentPage = styled.div`
  max-width: 65rem;
  margin: 80px auto;
  padding: 0 3.2rem;
`;

const ContentHeader = styled.div`
  padding-bottom: 30px;
`;

const TittleHeader = styled.h3`
  font-size: 28px;
  color: #000;
  font-weight: bold;
  margin-bottom: 0;
`;

const LinkBack = styled.a`
  color: #333;
`;

const ActionTopLayout = styled(Layout)`
  width: 100%;
  height: 55px;
  background: #fff;
  position: fixed;
  z-index: 10;
  top: 0;
  box-shadow: 0px 4px 4px rgba(186, 195, 201, 0.25);
`;

const ActionContent = styled.div`
  padding: 10px 50px;
  height: 55px;
  position: ;
  top: 0;
  left: 250px;
  position: fixed;
  right: 0;
  max-width: 65rem;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NewCustomerAction = styled.div`
  display: flex;
  .cancel {
    margin-right: 15px;
  }
`;

const mapStateToProps = (store) => {
  return {

  };
};

const mapDispatchToProps = {
  AddCustomers,
  resetCustomerStatus
};

export default connect(mapStateToProps, mapDispatchToProps)(NewCustomer);
