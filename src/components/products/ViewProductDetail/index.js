import React, { useState , useEffect } from "react";
import styled from "styled-components";
import Link from "next/link";
// components
import VariansDetail from "./VariansDetail";
import { RemirorEditor } from "../../atoms";
import { ManageSalesMD } from "../Modals";
// icons
import {
  CalendarOutlined,
  EditOutlined,
  CloseOutlined,
} from "@ant-design/icons";
// ui
import {
  Card,
  Form,
  Input,
  Row,
  Col,
  Divider,
  Button,
  Tooltip,
  Tag,
  DatePicker,
  Select,
} from "antd";
import GalleryImages from "./GalleryImages";
import { TweenOneGroup } from "rc-tween-one";
import { TimeData } from "../fakeData";
import { connect, useSelector } from "react-redux";
import { getMerchantProductByID } from "../../../redux/actions/product";
import { useRouter } from 'next/router'


const { Search } = Input;

const ViewProductDetail = (props) => {
  const { getMerchantProductByID } = props
  const [openEditSite, setOpenEditSite] = useState(false);
  const [openManageMD, setOpenManageMD] = useState(false);
  const [isDatePicker, setIsDatePicker] = useState(false);
  const [productDetails, setProductDetails] = useState();
  const [inputValue, setInputValue] = useState("");
  const [tags, setTags] = useState(["test"]);
  const router = useRouter()
  const { productId } = router.query
  const ProductInfo = useSelector((state)=>state.productReducer.productById[0])
 // console.log('ProductDetails', productDetails)
  //console.log('productId', productId)
  useEffect(()=>{
    getMerchantProductByID((productId * 1))
  },[])
  useEffect(()=>{
      if(ProductInfo !== undefined){
        setProductDetails(ProductInfo)
      }
  },[ProductInfo])
  const onFinish = (values) => {
    console.log(values);
  };

  const onChangeDate = (date, dateString) => {
    //console.log(date, dateString);
  };

  const deleteDate = () => {
    setIsDatePicker(!isDatePicker);
  };

  // Tags group actions
  const handleClose = (removedTag) => {
    const removeTags = tags.filter((tag) => tag !== removedTag);
    setTags(removeTags);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    let tag = tags;
    if (inputValue && tag.indexOf(inputValue) === -1) {
      tag = [...tag, inputValue];
    }
    setTags(tag);
    setInputVisible(false);
    setInputValue("");
  };

  const saveInputRef = (input) => {
    input = input;
  };

  const forMap = (tag) => {
    const tagElem = (
      <TagContent
        closable
        onClose={(e) => {
          e.preventDefault();
          handleClose(tag);
        }}
      >
        {tag}
      </TagContent>
    );
    return (
      <span key={tag} style={{ display: "inline-block" }}>
        {tagElem}
      </span>
    );
  };

  const tagChild = tags.map(forMap);

  return (
    <>
      <Row gutter={24}>
        <Col md={16}>
          <CardStyle>
            <Form onFinish={onFinish} layout="vertical">
              <Form.Item label="Title">
                <InputStyle />
              </Form.Item>
              <Form.Item label="Description">
                <EditorContent>
                {/* <DescriptionContent> */}
                <TextAreaStyle rows={2} name="productDescription" />
                {/* <label style={{ color: "red" }} >{errors?.productDescription}</label> */}
                {/* <RemirorEditor /> */}
              {/* </DescriptionContent> */}
                  {/* <RemirorEditor /> */}
                </EditorContent>
              </Form.Item>
            </Form>
          </CardStyle>
          <GalleryImages />
          <VariansDetail />
          <CardStyle>
            <AlignItem className="margin-bottom">
              <TitleBox>Search engine listing preview</TitleBox>
              {!openEditSite && (
                <ContentTitle onClick={() => setOpenEditSite(!openEditSite)}>
                  Edit website SEO
                </ContentTitle>
              )}
            </AlignItem>

            <TitlePost>Indestructible Shoes</TitlePost>
            <LinkPost>
              https://sale.mysolidshoes.com/products/indestructible-shoes
            </LinkPost>
            <TitleStyle>
              These shoes are virtually indestructible, yet comfortable for
              every day wear. Go ahead, beat these to death! Features: Non Slip,
              Contact Grip Rubber Sole Anti-Smash Steel Toe Woven, Lightweight
              Upper Waterproof Sizing Chart These shoes run true to size -- Free
              worldwide shipping Hassle free 30-day returns / exchanges D…
            </TitleStyle>
            {openEditSite && (
              <>
                <Divider />
                <TitleStyle>Page title</TitleStyle>
                <InputStyle />
                <TextStyle>0 of 70 characters used</TextStyle>
                <TitleStyle className="margin-top">Description</TitleStyle>
                <Input.TextArea rows={5} />
                <TextStyle>0 of 320 characters used</TextStyle>
                <TitleStyle className="margin-top">URL and handle</TitleStyle>
                <InputStyle prefix="https://sale.mysolidshoes.com/products/" />
              </>
            )}
          </CardStyle>
        </Col>
        <Col md={8}>
          <ContentBox notPadding>
            <ItemContentBox>
              <AlignItem>
                <TitleBox>Product availability</TitleBox>
                <ContentTitle onClick={() => setOpenManageMD(!openManageMD)}>
                  Manage
                </ContentTitle>
                <ManageSalesMD
                  open={openManageMD}
                  close={() => setOpenManageMD(!openManageMD)}
                />
              </AlignItem>
              <TextStyle>Available on 1 of 1 channels and apps</TextStyle>
            </ItemContentBox>
            <Divider />
            <ItemContentBox>
              <AlignItem>
                <TitleStyle>Online Store</TitleStyle>
                <Tooltip placement="bottom" title="Set publication date">
                  <CalendarOutlined
                    onClick={() => setIsDatePicker(!isDatePicker)}
                    className="calendar-icon"
                  />
                </Tooltip>
              </AlignItem>
              {isDatePicker && (
                <>
                  <TextStyle>Publish product on</TextStyle>
                  <SelectContent>
                    <DatePicker
                      className="date-picker"
                      onChange={onChangeDate}
                    />
                    <Select
                      placeholder="Select time"
                      // onChange={(e) => onChangeTime(e)}
                    >
                      {TimeData &&
                        TimeData.length > 0 &&
                        TimeData.map((item, i) => (
                          <Option key={i} value={item.value}>
                            {item.name}
                          </Option>
                        ))}
                    </Select>
                    <Tooltip
                      placement="bottom"
                      title="Remove the future publishing date. The product will be published immediately."
                    >
                      <CloseOutlined
                        onClick={() => deleteDate()}
                        className="delete-date-icon"
                      />
                    </Tooltip>
                  </SelectContent>
                </>
              )}
            </ItemContentBox>
          </ContentBox>

          <ContentBox marginTop="20px" bgColor="#f9fafb">
            <AlignItem>
              <TitleBox>Insights</TitleBox>
              <TextStyle>Last 90 days</TextStyle>
            </AlignItem>
            <TitleStyle className="margin-top">
              Sold 16 units to 16 customers for $959.84 in net sales.
            </TitleStyle>
            <ContentTitle className="margin-top" align="left">
              View details
            </ContentTitle>
          </ContentBox>

          <ContentBox marginTop="20px" notPadding bgColor="#f9fafb">
            <ItemContentBox>
              <TitleBox>Organization</TitleBox>
              <GroupContent>
                <TitleStyle>Product type</TitleStyle>
                <Input
                  placeholder="e.g. Shirts"
                  addonAfter={<EditOutlined />}
                />
              </GroupContent>
              <GroupContent>
                <TitleStyle>Vendor</TitleStyle>
                <Input placeholder="e.g. Nike" addonAfter={<EditOutlined />} />
              </GroupContent>
            </ItemContentBox>
            <Divider />
            <ItemContentBox>
              <TitleStyle className="title-box">COLLECTIONS</TitleStyle>
              <SearchBox
                placeholder="Filter products"
                onSearch={(value) => console.log(value)}
              />
              <TextStyle>
                Add this product to a collection so it’s easy to find in your
                store.
              </TextStyle>
            </ItemContentBox>
            <Divider />
            <ItemContentBox>
              <TitleStyle className="title-box">TAGS</TitleStyle>
              <Input
                ref={saveInputRef}
                type="text"
                size="large"
                placeholder="Vintage, cotton, summer"
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleInputConfirm}
                onPressEnter={handleInputConfirm}
              />
              <TweenOneGroup
                className="tag-content"
                enter={{
                  scale: 0.8,
                  opacity: 0,
                  type: "from",
                  duration: 100,
                  with: 10,
                  onComplete: (e) => {
                    e.target.style = "";
                  },
                }}
                leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
                appear={false}
              >
                {tagChild}
              </TweenOneGroup>
            </ItemContentBox>
          </ContentBox>
        </Col>
      </Row>
      <ActionBottom>
        <Divider className="divider-bottom" />
        <AlignItem>
          <Button size="large" type="primary" danger>
            Delete product
          </Button>
          <Button size="large" type="primary">
            Save
          </Button>
        </AlignItem>
      </ActionBottom>
    </>
  );
};

const TitlePost = styled.h3`
  color: #0076d1;
  font-size: 18px;
  font-weight: 500;
  margin: 0;
`;

const GroupContent = styled.div`
  margin-top: 15px;
  input {
    padding: 8px 12px;
  }
`;

const LinkPost = styled.a`
  color: #52c41a;
`;

const SearchBox = styled(Search)`
  border-radius: 4px 0 0 4px;
  padding: 6px 12px 6px 35px !important;
`;

const TitleStyle = styled.p`
  margin: 0;
  font-size: 14px;
`;

const InputStyle = styled(Input)`
  width: 100%;
`;

const ContentBox = styled.div`
  padding: ${(props) => (props.notPadding ? "0px" : "20px")};
  margin-top: ${(props) => (props.marginTop ? props.marginTop : "0px")};
  background: ${(props) => (props.bgColor ? props.bgColor : "#fff")};
  box-shadow: 0px 4px 4px rgba(186, 195, 201, 0.25);
  border-radius: 3px;
  outline: 0.1rem solid transparent;
  .margin-top {
    margin-top: 20px !important;
  }
  .margin-bottom {
    margin-bottom: 20px !important;
  }
  .ant-divider {
    margin: 0;
  }
  .calendar-icon {
    font-size: 20px;
    cursor: pointer;
  }
  .title-box {
    font-size: 12px;
    font-weight: 600;
    margin-bottom: 10px;
  }
  .tag-content {
    margin-top: 10px;
  }
  .date-picker {
    margin-right: 10px;
    width: 120px;
  }
`;

const SelectContent = styled.div`
  position: relative;
  .delete-date-icon {
    font-size: 22px;
    position: absolute;
    top: 5px;
    right: -8px;
    cursor: pointer;
  }
`;

const ItemContentBox = styled.div`
  padding: 20px;
`;

const CardStyle = styled(Card)`
  margin-bottom: 24px;
`;

const TextStyle = styled.span`
  margin: 0;
  font-size: 14px;
  color: #637381;
`;

const EditorContent = styled.div`
  padding: 20px;
  border: 1px solid #ddd;
`;

const AlignItem = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ContentTitle = styled.h4`
  color: rgb(0, 122, 206);
  font-size: 14px;
  cursor: pointer;
  text-align: ${(props) => (props.align ? props.align : "right")};
  font-weight: 400;
  margin-bottom: 5px;
`;

const TitleBox = styled.h3`
  font-weight: 600;
  font-size: 16px;
  color: #000;
  margin: 0;
  opacity: 0.9;
`;
const TextAreaStyle = styled(Input.TextArea)`
  width: 100%;
  padding: 8px 12px;
`;

const ActionBottom = styled.div`
  margin-top: 20px;
`;

const TagContent = styled(Tag)`
  padding: 5px 10px;
  marginbottom: 10px;
`;

const mapStateToProps = (store) => {
  return {

  };
};

const mapDispatchToProps = {
  getMerchantProductByID
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewProductDetail);

