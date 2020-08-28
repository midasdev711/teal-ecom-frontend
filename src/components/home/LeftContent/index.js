import React, { useRef } from "react";
import { Col, Row, Layout, Select, Divider } from "antd";
import {
  RightOutlined,
  FileMarkdownOutlined,
  PayCircleOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import Link from "next/link";

const { Option } = Select;
const img = `https://cdn.shopify.com/s/files/1/0451/1472/0419/products/0_Ryder-Shoes-Men-And-Women-Dropship-Indestructible-Steel-Toe-Air-Safety-Boots-Puncture-Proof-Work-Sneakers_grande_f861cbf4-1bf9-4357-a453-ffc48bdbd2ba_350x350.jpg?v=1596714398`;

const LeftContent = () => {
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  return (
    <LayoutLeftContent>
      <MainContent>
        <StyledSelect defaultValue="all" onChange={handleChange}>
          <Option value="all">
            What's new <strong>Today</strong>
          </Option>
        </StyledSelect>
        <LayoutContent height="100px">
          <Row gutter={24}>
            <Col className="item-left" md={8}>
              <ItemContent>
                <StyledNum>$10.5K</StyledNum>
                <StyledTitle>TOTAL SALES</StyledTitle>
              </ItemContent>
            </Col>
            <Col className="item-center" md={8}>
              <ItemContent>
                <StyledNum>835</StyledNum>
                <StyledTitle>ORDERS</StyledTitle>
              </ItemContent>
            </Col>
            <Col className="item-right" md={8}>
              <ItemContent>
                <StyledNum>1,922</StyledNum>
                <StyledTitle>SESSIONS</StyledTitle>
              </ItemContent>
            </Col>
          </Row>
        </LayoutContent>
        <LayoutContent height="122px" className="align-top">
          <ProductTitle>Top products</ProductTitle>
          <AlignItem>
            <div className="product-content">
              <ProductImage src={img}></ProductImage>
              <div>
                <Link href="#">
                  <a>Teal Essentials hand...</a>
                </Link>
                <br />
                <StyledText>3 Pack</StyledText>
              </div>
            </div>
            <StyledText>$432,00</StyledText>
          </AlignItem>
        </LayoutContent>
      </MainContent>
    </LayoutLeftContent>
  );
};

const LayoutLeftContent = styled(Layout)`
  width: 600px;
  margin-right: 50px;
  .align-top {
    margin-top: 30px;
  }
  .item-left {
  }
  .item-center {
    text-align: center;
  }
  .item-right {
    text-align: right;
  }
`;

const ProductImage = styled.img`
  width: 60px;
  height: 60px;
  margin-right: 10px;
  border: 1px solid #bbc3c9;
`;

const ProductTitle = styled.p`
  font-family: Proxima Nova;
  margin-bottom: 20px;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 12px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #788995;
`;

const MainContent = styled.div`
  & .section-content {
    margin-top: 20px;
  }
  .ant-divider {
    margin: 10px 0;
  }
`;

const StyledSelect = styled(Select)`
  font-size: 24px;
  color: #404950;
  font-family: Proxima Nova;
  font-style: normal;
  font-weight: normal;
`;

const StyledText = styled.p`
  font-family: Proxima Nova;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  color: #404950;
`;

const ItemContent = styled.div`
  &:hover {
    h1,
    h4 {
      color: #404950;
      cursor: pointer;
    }
  }
`;

const StyledNum = styled.h1`
  font-family: Proxima Nova;
  font-style: normal;
  font-weight: bold;
  font-size: 32px;
  line-height: 32px;
  color: rgba(64, 73, 80, 0.5);
  margin-top: 4px;
  margin-bottom: 0;
`;

const StyledTitle = styled.h4`
  font-size: 12px;
  padding-top: 10px;
  font-weight: 500;
  text-transform: uppercase;
`;

const LayoutContent = styled(Layout.Content)`
  padding: 15px 20px;
  margin-top: 30px;
  border: none;
  height: ${(props) => (props.height ? props.height : "auto")};
  outline: none;
  width: 100%;
  background: white;
  box-shadow: 0px 2px 2px rgba(186, 195, 201, 0.25);
  border-radius: 5px;
`;

const AlignItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  .product-content {
    display: flex;
    justify-content: space-between;
  }
`;

export default LeftContent;
