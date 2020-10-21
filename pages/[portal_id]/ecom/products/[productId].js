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
import {resetProductStatus, UpdateMerchantProduct , deleteMerchantProduct  , getUserProductLists} from "../../../../src/redux/actions/product";
import { connect, useSelector } from "react-redux";
import DeletePopUp from "../../../../src/components/commanComponents/deletePopup";
import Router from "next/router";
//import { MDDeleteSelected } from "../../../../src/components/atoms";



const EditProductDetails = (props) => {
  let userData = getUserData()
  const router = useRouter()
  const [flag, setFlag] = useState("")
  const [productTitle, setProductTitle] = useState("")
  const [saveFlag, setSaveFlag] = useState("")
  const [productDetails, setProductDetails] = useState("")
  const apiResponse = useSelector(state =>state.productReducer.status)
  const [isOpenDeleteSelected, setShowMDDeleteSelected] = useState(false);
  const MerchantCategoryLists = useSelector(state =>state.productReducer.merchantProductLists)
    const { productId } = router.query
    let Id = productId * 1 
    useEffect(() => {
      if(!MerchantCategoryLists.length){
        let userId = userData?.ID
        props.getUserProductLists(userId)
      }
    },[])
    const handleGoToPreviousProduct = () =>{
        let previousRecordId = null
        let RecordIndex = MerchantCategoryLists.length > 0 && MerchantCategoryLists.findIndex(({ID}) => ID === Id)
        if(RecordIndex !== -1 && RecordIndex !== 0){
          previousRecordId = MerchantCategoryLists[(RecordIndex - 1)]
          if(previousRecordId !== null && previousRecordId !== undefined){
            Router.router.push("/[portal_id]/ecom/products/[productId]" ,{ pathname: `/${userData?.uniqueID}/ecom/products/${previousRecordId.ID}`}, { shallow: true });
          }else{
            message.error("Previous record not available.")
          }
        }else{
          message.error("Previous record not available.")
        }
    }
    const handleGoToNextProduct = () =>{
      let nextRecordId = null
      let RecordIndex = MerchantCategoryLists.length > 0 && MerchantCategoryLists.findIndex(({ID}) => ID === Id)
      let arrayLength =  MerchantCategoryLists.length
      if(RecordIndex !== -1 && RecordIndex <= arrayLength){
        nextRecordId = MerchantCategoryLists[(RecordIndex + 1)]
        if(nextRecordId !== null && nextRecordId !== undefined){
          Router.router.push("/[portal_id]/ecom/products/[productId]" ,{ pathname: `/${userData?.uniqueID}/ecom/products/${nextRecordId.ID}`}, { shallow: true });
        }else{
          message.error("Next record not available.")
        }
      }else{
        message.error("Next record not available.")
      }
    }
    const handleDeleteProduct = () =>{
      props.deleteMerchantProduct(Id)
    }
    const onShowMdDeleteSelected = (value) => {
     // console.log("value: ", value);
      setShowMDDeleteSelected(value);
    };  
    const onDeleteSelected = () => {
       handleDeleteProduct()
      // message.success("Product deleted successfully!");
       setShowMDDeleteSelected(false);
    };
    // console.log('apiResponse', apiResponse)
    useEffect(()=>{
        if(apiResponse === "deleted" || apiResponse === "updated"){
          props.resetProductStatus(),
          Router.router.push("/[portal_id]/ecom/products" ,{ pathname: `/${userData?.uniqueID}/ecom/products`}, { shallow: true });
        }else if(apiResponse === "fail"){ 
          message.error("Something went to wrong!");   
        }
    },[apiResponse])
    const handleSubmit = (values) => {
     
      values === undefined ? setFlag({ name: `${flag + "demo"}` }) : ""
      if (values !== undefined) {
        let cloneValues = values
      //  console.log('cloneValues', cloneValues)
        cloneValues.productCategory = (cloneValues.productCategory * 1)
        cloneValues.productSubcategory = (cloneValues.productSubcategory * 1)
        cloneValues.productId = cloneValues.ID
        cloneValues.productFeaturedImage === null || cloneValues.productFeaturedImage === "" || cloneValues.productFeaturedImage === undefined ? delete cloneValues.productFeaturedImage : "" 
        cloneValues.productThumbnailImage === null || cloneValues.productThumbnailImage === "" || cloneValues.productThumbnailImage === undefined ? delete cloneValues.productThumbnailImage : "" 
        cloneValues.isPublish = "false"
   //   console.log('cloneValues save time', cloneValues)

        setProductDetails(cloneValues)
        props.UpdateMerchantProduct(cloneValues)
      }
  
    }
    const handleSubmitSaveAndSubmit = (values) => {
      values === undefined ? setSaveFlag({ name: `${flag + "demo"}` }) : ""
      if (values !== undefined) {
        let cloneValues = values
      //  console.log('cloneValues', cloneValues)
        cloneValues.productCategory = (cloneValues.productCategory * 1)
        cloneValues.productSubcategory = (cloneValues.productSubcategory * 1)
        cloneValues.productId = cloneValues.ID
        cloneValues.productFeaturedImage === null || cloneValues.productFeaturedImage === "" || cloneValues.productFeaturedImage === undefined ? delete cloneValues.productFeaturedImage : "" 
        cloneValues.productThumbnailImage === null ||  cloneValues.productThumbnailImage === "" || cloneValues.productThumbnailImage === undefined ? delete cloneValues.productThumbnailImage : "" 
       // console.log('cloneValues save time', cloneValues)
        cloneValues.isPublish = "true"
        setProductDetails(cloneValues)
        props.UpdateMerchantProduct(cloneValues)
      }
  
    }
    const handleProduct = (value) =>{
      setProductTitle(value)
    }

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
                    <ArrowLeftOutlined onClick={()=>handleGoToPreviousProduct()} />
                  </ButtonPrev>
                  <ButtonNext>
                    <ArrowRightOutlined onClick={()=>handleGoToNextProduct()}/>
                  </ButtonNext>
                </RightActions>
              </Col>
            </Row>
          </ActionsTop>

  <TittleHeader>{productTitle || ""}</TittleHeader>
          <ButtonPrint>
            <CopyOutlined /> Duplicate
          </ButtonPrint>
          <ButtonView>
            <EyeOutlined /> View
          </ButtonView>
        </ContentHeader>
        {
          <ProductDetail submit={(values) => handleSubmit(values)} flag={flag} saveSubmit={(values) => handleSubmitSaveAndSubmit(values)} saveFlag={saveFlag} productName={(value)=>handleProduct(value)}/>
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
          <Button size="large" type="primary" onClick={() => handleSubmit()}>
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
  text-transform: capitalize;
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
  deleteMerchantProduct,
  resetProductStatus,
  UpdateMerchantProduct,
  getUserProductLists,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProductDetails);





