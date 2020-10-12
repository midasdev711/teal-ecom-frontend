import React,{useState ,useEffect} from "react";
import styled from "styled-components";
import Link from "next/link";
// components
import { PageLayout } from "../../../../src/components/views";
// icons
import {
  EyeOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CopyOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import {
  Divider,
  Button,
  message,
} from "antd";
// ui
import { Row, Col } from "antd";
import ProductDetail from "./editProduct";
import ViewProductDetail from "../../../../src/components/products/ViewProductDetail";
import { getUserData } from "../../../../src/utils";
import { useRouter } from 'next/router'
import { deleteMerchantProduct } from "../../../../src/redux/actions/product";
import { connect, useSelector } from "react-redux";
import DeletePopUp from "../../../../src/components/commanComponents/deletePopup";
//import { MDDeleteSelected } from "../../../../src/components/atoms";



const EditProductDetails = ({deleteMerchantProduct}) => {
  let userData = getUserData()
  const router = useRouter()
  const [isOpenDeleteSelected, setShowMDDeleteSelected] = useState(false);
    const { productId } = router.query
   // console.log('product deleted id', productId)
    const handleDeleteProduct = () =>{
      deleteMerchantProduct((productId * 1))
    }
    
    const onShowMdDeleteSelected = (value) => {
      console.log("value: ", value);
      setShowMDDeleteSelected(value);
    };  
    const onDeleteSelected = () => {
       handleDeleteProduct()
      // message.success("Product deleted successfully!");
       setShowMDDeleteSelected(false);
    };

  return (
    <PageLayout>
      <CustomerContent>
        <ContentHeader>
          <ActionsTop>
            <Row gutter={24}>
              <Col md={12}>
              <Link href={`/[portal_id]/ecom/products`} as={`/${userData?.uniqueID}/ecom/products`} shallow={true}>
                  <LinkBack>
                    <LeftOutlined /> Products
                  </LinkBack>
                </Link>
              </Col>
              <Col md={12}>
                <RightActions>
                  <ButtonPrev>
                    <ArrowLeftOutlined />
                  </ButtonPrev>
                  <ButtonNext>
                    <ArrowRightOutlined />
                  </ButtonNext>
                </RightActions>
              </Col>
            </Row>
          </ActionsTop>

          <TittleHeader>Indestructible Shoes</TittleHeader>
          <ButtonPrint>
            <CopyOutlined /> Duplicate
          </ButtonPrint>
          <ButtonView>
            <EyeOutlined /> View
          </ButtonView>
        </ContentHeader>
        {
          <ProductDetail />
        }
        <DeletePopUp
        name="Product"
       // count={checkedList.length}
        onCancel={onShowMdDeleteSelected}
        onDelete={onDeleteSelected}
        isOpen={isOpenDeleteSelected}
        message="Are sure to delete this product ?"
        buttonText="Delete"
      />
         <ActionBottom>

        <AlignItem>
          <Button size="large" type="primary" danger onClick={() => setShowMDDeleteSelected(true)}>
            Delete product
          </Button>
          <Button size="large" type="primary">
            Save
          </Button>
        </AlignItem>
      </ActionBottom>
        {/* <ViewProductDetail /> */}
      </CustomerContent>
    </PageLayout>
  );
};

const CustomerContent = styled.div`
  padding: 20px;
  width: 60rem;
  margin: 30px auto;
`;

const ButtonView = styled.a`
  color: #444;
  margin-top: 15px;
  display: inline-block;
  margin-left: 24px;
`;

const ButtonPrint = styled.a`
  color: #444;
  margin-top: 15px;
  display: inline-block;
`;

const SmallText = styled.span`
  font-size: 14px;
  color: #777;
  font-weight: normal;
`;

const ActionsTop = styled.div``;
const RightActions = styled.div`
  text-align: right;
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

const ButtonPrev = styled.a`
  color: #333;
`;

const ButtonNext = styled.a`
  color: #333;
  margin-left: 24px;
`;

const LinkBack = styled.a`
  color: #333;
`;
const ActionBottom = styled.div`
  margin-top: 20px;
`;
const AlignItem = styled.div`
  display: flex;
  justify-content: space-between;
`;
const mapStateToProps = (store) => {
  return {

  };
};

const mapDispatchToProps = {
  deleteMerchantProduct
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProductDetails);





