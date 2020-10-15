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
import { AddOrders  , resetOrderStatus } from "../../../../../../src/redux/actions/orders";

const NewOrder = () => {
  const apiStatus = useSelector((state)=>state.orderReducer.status)
  const [saveFlag, setSaveFlag] = useState("")
  let userData
  if (process.browser) {
    userData = JSON.parse(localStorage.getItem("userData"))
     }
  const newActions = () => {
    let userData
    if (process.browser) {
      userData = JSON.parse(localStorage.getItem("userData"))
       }
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
            <Button size="large" type="primary" onClick={() => handleSubmit()}>
                Save
              </Button>
          </NewOrderAction>
        </ActionContent>
      </ActionTopLayout>
    );
  };
  
 
  useEffect(() =>{
  
    if(apiStatus === "success"){
    
      props.resetOrderStatus(),
      Router.router.push("/[portal_id]/ecom/orders" ,{ pathname: `/${userData?.uniqueID}/ecom/orders`}, { shallow: true });
    }
  },[apiStatus])

  const handleSubmit = (values) => {
    values === undefined ? setSaveFlag({ name: "demo" }) : ""
    if (values !== undefined) {
      let cloneValues = values
      console.log('cloneValues', cloneValues)
      // cloneValues.productMerchantID = (userData?.ID * 1)

      // props.AddOrders(cloneValues)
    }

  }
 
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
          <NewForm saveSubmit={(values) => handleSubmit(values)} saveFlag={saveFlag} />
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

