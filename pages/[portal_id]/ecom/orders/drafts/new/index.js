import React, { useState, useEffect } from "react";
import Link from "next/link";
import styled from "styled-components";
import { Button, Layout } from "antd";
import Router from "next/router";
import { connect, useSelector } from "react-redux";
// components
import { PageLayout } from "../../../../../../src/components/views";
import { NewForm } from "../../../../../../src/components/orders";
// icons
import { LeftOutlined } from "@ant-design/icons";
import { AddOrders, resetOrderStatus } from "../../../../../../src/redux/actions/orders";
import { getUserData } from "../../../../../../src/utils";
const NewOrder = (props) => {
  let userData = getUserData()
  const apiStatus = useSelector((state) => state.orderReducer.status)
  const [Products, setProducts] = useState([]);
  const [OrderAmount, setOrderAmount] = useState(null);
  const [ShippingAddress, setShippingAddress] = useState({});
  const [DeliveryAddress, setDeliveryAddress] = useState({});
  const [PaymentMethod, setPaymentMethod] = useState(null);
  const [TransactionID, setTransactionID] = useState(null);
  const [Notes, setNotes] = useState('');
  const [Tags, setTags] = useState(['test']);

  const saveData = () => {
    console.log('qqqqqqqqqqqqqqqqqq', Products)
    let pro_data = []
    Products.map(data => {
      let dat = {
        productID: data._id,
        productMerchantID: data.merchantID,
        productSKU: data.sku,
        productTitle: data.title,
        productSalePrice: data.salePrice,
        productTotalQuantity: data.totalQuantity,
        productVariantObject: {
          variantName: data.variants.variantName,
          variantValues: data.variants.variantName
        }
      }
      pro_data.push(dat)
    })

    let userId = userData?.ID
    let _variables = {
      UserId: userId,
      Status: 1,
      Products:pro_data,
      OrderAmount: OrderAmount,
      ShippingAddress:
      {
        BasicDetailsFirstName: ShippingAddress.BasicDetailsFirstName,
        BasicDetailsLastName: ShippingAddress.BasicDetailsLastName,
        AddressDetailsCompany: ShippingAddress.AddressDetailsCompany,
        AddressDetailsMobile: ShippingAddress.AddressDetailsMobile,
        AddressDetailsApartment: ShippingAddress.AddressDetailsApartment,
        AddressDetailsCity: ShippingAddress.AddressDetailsCity,
        AddressDetailsCountry: ShippingAddress.AddressDetailsCountry,
        AddressDetailsPostalCode: ShippingAddress.AddressDetailsPostalCode
      },
      DeliveryAddress: {
        BasicDetailsFirstName: DeliveryAddress.BasicDetailsFirstName,
        BasicDetailsLastName: DeliveryAddress.BasicDetailsLastName,
        AddressDetailsCompany: DeliveryAddress.AddressDetailsCompany,
        AddressDetailsMobile: DeliveryAddress.AddressDetailsMobile,
        AddressDetailsApartment: DeliveryAddress.AddressDetailsApartment,
        AddressDetailsCity: DeliveryAddress.AddressDetailsCity,
        AddressDetailsCountry: DeliveryAddress.AddressDetailsCountry,
        AddressDetailsPostalCode: DeliveryAddress.AddressDetailsPostalCode
      },
      PaymentMethod: PaymentMethod,
      TransactionID,
      Notes,
      Tags: JSON.stringify(Tags)
    };
    props.AddOrders(_variables)
  }


  useEffect(() => {

    if (apiStatus === "success") {

      props.resetOrderStatus(),
        Router.router.push("/[portal_id]/ecom/orders", { pathname: `/${userData?.uniqueID}/ecom/orders` }, { shallow: true });
    }
  }, [apiStatus])

  const handleChangeValue = (e, module, element) => {
    if (module === 'customer') {
      if (element === 'shipping') {
        setShippingAddress(e)
      } else if (module === 'billing') {
        setDeliveryAddress(e)
      } else {
        setShippingAddress(e)
        setDeliveryAddress(e)
      }
    } else if (module === 'product') {
      setProducts(e)
    } else if (module === 'Notes') {
      setNotes(e.target.value)
    } else if (module === 'Tags') {
      setTags(e)
    }

  }


  const newActions = () => {
    return (
      <ActionTopLayout>
        <ActionContent>
          <span>Unsaved changes</span>
          <NewOrderAction>
            <Button className="cancel" size="large">
              <Link href="/[portal_id]/ecom/orders" as={`/${userData?.uniqueID}/ecom/orders`} shallow={true}>
                <a>Discard</a>

              </Link>
            </Button>
            <Button size="large" type="primary" onClick={() => saveData()}>
              Save
              </Button>
          </NewOrderAction>
        </ActionContent>
      </ActionTopLayout>
    );
  };

  return (
    <PageLayout>
      <NewContent>
        {newActions()}
        <ContentPage>
          <ContentHeader>
            <Link href="/[portal_id]/ecom/orders" as={`/${userData?.uniqueID}/ecom/orders`} shallow={true}>
              <LinkBack>
                <LeftOutlined /> Orders
              </LinkBack>
            </Link>
            <TittleHeader>Create order</TittleHeader>
          </ContentHeader>
          <NewForm Products={Products} OrderAmount={OrderAmount} ShippingAddresss={ShippingAddress} DeliveryAddress={DeliveryAddress} PaymentMethod={PaymentMethod} TransactionID={TransactionID} Notes={Notes} Tags={Tags} handleChangeValue={handleChangeValue} />
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
  padding-bottom: 10px;
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

const NewOrderAction = styled.div`
  display: flex;
  .cancel {
    margin-right: 15px;
    & span {
      font-size: 14px;
      margin-top: -5px;
      color: #000;
      font-weight: 100;
    }
  }
`;
const mapStateToProps = (store) => {
  return {

  };
};

const mapDispatchToProps = {
  AddOrders,
  resetOrderStatus
};

export default connect(mapStateToProps, mapDispatchToProps)(NewOrder);

