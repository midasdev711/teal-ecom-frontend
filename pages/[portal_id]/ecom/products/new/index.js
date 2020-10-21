import React, { useEffect, useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import { Button, Layout } from "antd";
import { connect , useSelector } from "react-redux";
import Router from "next/router";
// components
import { PageLayout } from "../../../../../src/components/views";
import { NewForm } from "../../../../../src/components/products";
// icons
import { LeftOutlined } from "@ant-design/icons";
import { getUserData , GetToken} from "../../../../../src/utils";
import { AddMerchantProduct  , resetProductStatus } from "../../../../../src/redux/actions/product";

const NewCustomer = (props) => {
  let userData = getUserData()
  let token = GetToken()
  //console.log('token', token)
  const apiStatus = useSelector((state)=>state.productReducer.status)
  const [flag, setFlag] = useState("")
  const [saveFlag, setSaveFlag] = useState("")
  const [productDetails, setProductDetails] = useState("")
  const handleSubmit = (values) => {
    values === undefined ? setFlag({ name: `${flag + "demo"}` }) : ""
    if (values !== undefined) {
      let cloneValues = values
      console.log('cloneValues', cloneValues)
      cloneValues.productMerchantID = (userData?.ID * 1)
      cloneValues.productMerchantName = userData?.name
    //  cloneValues.productMRP = cloneValues.productMRP.toString()
      cloneValues.productCategory = (cloneValues.productCategory * 1)
      cloneValues.productSubcategory = (cloneValues.productSubcategory * 1)
      cloneValues.isPublish = "false"
      // cloneValues.token = token.toString()
      setProductDetails(cloneValues)
      // props.AddMerchantProduct(JSON.stringify(cloneValues))
      // let data = JSON.parse(cloneValues)
      // console.log('data', data)
      props.AddMerchantProduct(cloneValues)
    }

  }
  const handleSubmitSaveAndSubmit = (values) => {
    values === undefined ? setSaveFlag({ name: `${flag + "demo"}` }) : ""
    if (values !== undefined) {
      let cloneValues = values
      console.log('cloneValues', cloneValues)
      cloneValues.productMerchantID = (userData?.ID * 1)
      cloneValues.productMerchantName = userData?.name
     // cloneValues.productMRP = cloneValues.productMRP.toString()
      cloneValues.productCategory = (cloneValues.productCategory * 1)
      cloneValues.productSubcategory = (cloneValues.productSubcategory * 1)
      cloneValues.isPublish = "true"
      // cloneValues.token = token.toString()

      setProductDetails(cloneValues)
      // props.AddMerchantProduct(JSON.stringify(cloneValues))
      // let data = JSON.parse(cloneValues)
      // console.log('data', data)
      props.AddMerchantProduct(cloneValues)
    }

  }
  //console.log('apiStatus', apiStatus)
  useEffect(() =>{
  
    if(apiStatus === "success"){
    
      props.resetProductStatus(),
      Router.router.push("/[portal_id]/ecom/products" ,{ pathname: `/${userData?.uniqueID}/ecom/products`}, { shallow: true });
    }
  },[apiStatus])

  //console.log('productDetails updates', productDetails)
  return (
    <PageLayout>
      <NewContent>
        {/* {newActions()} */}
        <ActionTopLayout>
          <ActionContent>
            <span>Unsaved changes</span>
            <NewOrderAction>
              <Button className="cancel" size="large">
                <Link href={`/[portal_id]/ecom/products`} as={`/${userData?.uniqueID}/ecom/products`} shallow={true}>
                  <a>
                    Discard
            </a>
            
                </Link>
              </Button>
              <Button className="save" size="large" type="primary" onClick={() => handleSubmit()}>
                {/* <Link href="/products"> */}
                {/* <Link href={`/[portal_id]/ecom/products`} as={`/${userData?.uniqueID}/ecom/products`} shallow={true}> */}

                <a title="save">Save</a>
                {/* </Link> */}
              </Button>
              <Button className="save" size="large" type="primary" style={{ marginLeft: "15px" }} onClick={() => handleSubmitSaveAndSubmit()}>
                {/* <Link href="/products"> */}
                {/* <Link href={`/[portal_id]/ecom/products`} as={`/${userData?.uniqueID}/ecom/products`} shallow={true}> */}

                <a title="save">Save And Publish</a>
                {/* </Link> */}
              </Button>
            </NewOrderAction>
          </ActionContent>
        </ActionTopLayout>
        <ContentPage>
          <ContentHeader>
            <Link href={`/[portal_id]/ecom/products`} as={`/${userData?.uniqueID}/ecom/products`} shallow={true}>

              <LinkBack>
                <LeftOutlined /> Products
              </LinkBack>
            </Link>
            <TittleHeader>Add product</TittleHeader>
          </ContentHeader>
          <NewForm submit={(values) => handleSubmit(values)} flag={flag} saveSubmit={(values) => handleSubmitSaveAndSubmit(values)} saveFlag={saveFlag} />
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
  AddMerchantProduct,
  resetProductStatus
};

export default connect(mapStateToProps, mapDispatchToProps)(NewCustomer);


