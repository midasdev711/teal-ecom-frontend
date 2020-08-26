import React, { useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import { CountryDropdown } from "react-country-region-selector";
// ui
import {
  Row,
  Col,
  Card,
  Checkbox,
  Input,
  Form,
  InputNumber,
  Select,
  Button,
  List,
} from "antd";

const { Option } = Select;
const { Search } = Input;

const dataVariants = [
  {
    title: "US 6 | EU 36",
  },
  {
    title: "US 5.5 | EU 37",
  },
  {
    title: "US 6 | EU 38",
  },
  {
    title: "US 6.5 | EU 39",
  },
  {
    title: "US 6 | EU 36",
  },
  {
    title: "US 5.5 | EU 37",
  },
  {
    title: "US 6 | EU 38",
  },
  {
    title: "US 6.5 | EU 39",
  },
  {
    title: "US 6 | EU 36",
  },
  {
    title: "US 5.5 | EU 37",
  },
  {
    title: "US 6 | EU 38",
  },
  {
    title: "US 6.5 | EU 39",
  },
  {
    title: "US 6 | EU 36",
  },
  {
    title: "US 5.5 | EU 37",
  },
  {
    title: "US 6 | EU 38",
  },
  {
    title: "US 6.5 | EU 39",
  },
  {
    title: "US 6 | EU 36",
  },
  {
    title: "US 5.5 | EU 37",
  },
  {
    title: "US 6 | EU 38",
  },
  {
    title: "US 6.5 | EU 39",
  },
];

const InventoryDetail = () => {
  const [country, setCountry] = useState("United States");

  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <InventoryDetailStyle>
      <Form onFinish={onFinish} layout="vertical">
        <Row gutter={24}>
          <Col md={8}>
            <CardStyle>
              <ContentFlex>
                <ImgStyle
                  src="https://cdn.shopify.com/s/files/1/0451/1472/0419/products/0_Ryder-Shoes-Men-And-Women-Dropship-Indestructible-Steel-Toe-Air-Safety-Boots-Puncture-Proof-Work-Sneakers_grande_f861cbf4-1bf9-4357-a453-ffc48bdbd2ba_350x350.jpg?v=1596714398"
                  alt=""
                />
                <TextFlexCenter>
                  <TitleStyle>Indestructible Shoes</TitleStyle>
                  <TextStyle>39 variants</TextStyle>
                  <Link href={`/products/[productId]`} as="/products/123456789">
                    <a href="#">Back to product</a>
                  </Link>
                </TextFlexCenter>
              </ContentFlex>
            </CardStyle>

            <VariantStyle>
              <TitleVariant>Variants</TitleVariant>
              <ListStyle
                itemLayout="horizontal"
                dataSource={dataVariants}
                renderItem={(item) => (
                  <List.Item>
                    <ContentItemFlex>
                      <ImgItemStyle
                        src="https://cdn.shopify.com/s/files/1/0451/1472/0419/products/0_Ryder-Shoes-Men-And-Women-Dropship-Indestructible-Steel-Toe-Air-Safety-Boots-Puncture-Proof-Work-Sneakers_grande_f861cbf4-1bf9-4357-a453-ffc48bdbd2ba_350x350.jpg?v=1596714398"
                        alt=""
                      />
                      <TextStyle>{item.title}</TextStyle>
                    </ContentItemFlex>
                  </List.Item>
                )}
              />
            </VariantStyle>
          </Col>
          <Col md={16}>
            <CardStyle>
              <TitleCardStyle>Options</TitleCardStyle>
              <Row gutter={24}>
                <Col md={16}>
                  <Form.Item
                    label="Color"
                    name="color"
                    initialValue="Black"
                    rules={[
                      {
                        required: true,
                        message:
                          "PleaseYou need to add option values for Color",
                      },
                    ]}
                  >
                    <InputStyle />
                  </Form.Item>
                  <Form.Item
                    label="Size"
                    name="size"
                    initialValue="US 6.5 | EU 39"
                    rules={[
                      {
                        required: true,
                        message: "You need to add option values for Size",
                      },
                    ]}
                  >
                    <InputStyle />
                  </Form.Item>
                </Col>
                <Col md={8}>
                  <ImgFullStyle
                    src="https://cdn.shopify.com/s/files/1/0451/1472/0419/products/0_Ryder-Shoes-Men-And-Women-Dropship-Indestructible-Steel-Toe-Air-Safety-Boots-Puncture-Proof-Work-Sneakers_grande_f861cbf4-1bf9-4357-a453-ffc48bdbd2ba_350x350.jpg?v=1596714398"
                    alt=""
                  />
                  <Button block type="link">
                    Change image
                  </Button>
                </Col>
              </Row>
            </CardStyle>

            <CardStyle>
              <TitleCardStyle>Pricing</TitleCardStyle>
              <Row gutter={24}>
                <Col md={12}>
                  <Form.Item label="Price">
                    <InputNumberStyle
                      formatter={(value) =>
                        `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                    />
                  </Form.Item>
                </Col>
                <Col md={12}>
                  <Form.Item label="Compare at price">
                    <InputNumberStyle
                      formatter={(value) =>
                        `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                    />
                  </Form.Item>
                </Col>
                <Col md={12}>
                  <Form.Item
                    label="Cost per item"
                  >
                    <InputNumberStyle
                      formatter={(value) =>
                        `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                    />
                  </Form.Item>
                </Col>
                <Col md={6}>
                  <TextForm>
                    <TextStyle>Margin</TextStyle>
                    <span>-</span>
                  </TextForm>
                </Col>
                <Col md={6}>
                  <TextForm>
                    <TextStyle>Profit</TextStyle>
                    <span>-</span>
                  </TextForm>
                </Col>
                <Col md={24}>
                  <CheckboxChargeStyle>
                    Charge tax on this variant
                  </CheckboxChargeStyle>
                </Col>
              </Row>
            </CardStyle>

            <CardStyle>
              <TitleCardStyle>Inventory</TitleCardStyle>

              <Row gutter={24}>
                <Col md={12}>
                  <Form.Item label="SKU (Stock Keeping Unit)">
                    <InputStyle />
                  </Form.Item>
                </Col>
                <Col md={12}>
                  <Form.Item label="Barcode (ISBN, UPC, GTIN, etc.)">
                    <InputStyle />
                  </Form.Item>
                </Col>
                <Col md={24}>
                  <CheckboxGroupStyle>
                    <CheckboxStyle>Track quantity</CheckboxStyle>
                    <CheckboxStyle>
                      Continue selling when out of stock
                    </CheckboxStyle>
                  </CheckboxGroupStyle>
                </Col>
              </Row>

              <LineBorder />

              <TitleSmall>
                QUANTITY
                <ActionRight href="#">View inventory history</ActionRight>
              </TitleSmall>

              <Row gutter={24}>
                <Col md={12}>
                  <Form.Item label="Available">
                    <InputNumberStyle />
                  </Form.Item>
                </Col>
                <Col md={12}>
                  <TextForm>
                    <TextStyle>Incoming</TextStyle>
                    <span>0</span>
                  </TextForm>
                </Col>
              </Row>
            </CardStyle>

            <CardStyle>
              <TitleCardStyle>Shipping</TitleCardStyle>
              <CheckboxStyle>This is a physical product</CheckboxStyle>

              <LineBorder />

              <TitleSmall>WEIGHT</TitleSmall>
              <TextStyle>
                Used to calculate shipping rates at checkout and label prices
                during fulfillment.
              </TextStyle>
              <Row gutter={0}>
                <Col md={8}>
                  <Form.Item label="Weight">
                    <InputNumberStyle />
                  </Form.Item>
                </Col>
                <Col md={3}>
                  <Form.Item label=" " name="" initialValue="kg">
                    <Select>
                      <Option value="lb">lb</Option>
                      <Option value="oz">oz</Option>
                      <Option value="kg">kg</Option>
                      <Option value="g">g</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <LineBorder />

              <TitleSmall>CUSTOMS INFORMATION</TitleSmall>
              <p>
                Used by border officers to calculate duties when shipping
                internationally. Shown on customs forms you print during
                fulfillment.
              </p>

              <Form.Item
                label="Country of origin"
              >
                <CountryDropdownStyle
                  defaultOptionLabel="Select a country."
                  value={country}
                  onChange={(val) => setCountry(val)}
                  blacklist={["CD", "SH", "KP", "GS", "HM", "VC"]} 
                  className="dropDown"
                />
                <span>In most cases, where the product is manufactured.</span>
              </Form.Item>

              <Form.Item
                label="HS (Harmonized System) code"
              >
                <SearchStyle
                  placeholder="Search by product keyword or HS code"
                  onSearch={(value) => console.log(value)}
                />
                <span>Used by border officers to classify this product.</span>
              </Form.Item>
            </CardStyle>
          </Col>

          <LineBorder />

          <Col md={12}>
            <Button size="large" type="primary" danger>
              Delete variant
            </Button>
          </Col>

          <Col md={12}>
            <AlignRight>
              <Button size="large" type="primary">Save</Button>
            </AlignRight>
          </Col>
        </Row>
      </Form>
    </InventoryDetailStyle>
  );
};
const ListStyle = styled(List)`
  max-height: 524px;
  overflow: auto;
`;
const AlignRight = styled.div`
  text-align: right;
`;
const CountryDropdownStyle = styled(CountryDropdown)`
  width: 100%;
  padding: 6px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: no-repeat;
`;
const SearchStyle = styled(Search)`
  width: 100%;
`;
const TitleSmall = styled.h4`
  color: #212b36;
  font-weight: 600;
  font-size: 12px;
`;
const LineBorder = styled.div`
  width: 100%;
  height: 1px;
  border-top: 1px solid #ddd;
  margin: 15px 0;
`;
const ActionRight = styled.a`
  float: right;
  font-weight: 400;
  font-size: 14px;
`;
const CheckboxGroupStyle = styled(Checkbox.Group)``;
const CheckboxChargeStyle = styled(Checkbox)`
  margin-top: 15px;
`;
const CheckboxStyle = styled(Checkbox)`
  margin-left: 0 !important;
  width: 100%;
  margin-bottom: 10px;
`;
const InputStyle = styled(Input)`
  width: 100%;
`;
const InputNumberStyle = styled(InputNumber)`
  width: 100%;
`;
const TextForm = styled.div``;
const ImgFullStyle = styled.img`
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-right: 15px;
`;
const TitleCardStyle = styled.h3`
  font-weight: 600;
  font-size: 16px;
  color: #000;
`;
const TitleVariant = styled.h3`
  background: #f3f3f3;
  padding: 15px;
  border-bottom: 1px solid #ddd;
  font-weight: bold;
  color: #000;
`;
const TitleStyle = styled.h3`
  color: #000;
  font-size: 16px;
  margin: 0;
`;
const TextStyle = styled.p`
  margin: 0;
`;
const VariantStyle = styled.div`
  border: 1px solid #f0f0f0;
  margin: 0;
  padding: 0;
  color: #404950;
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5715;
  list-style: none;
  font-feature-settings: "tnum";
  position: relative;
  background: #fff;
`;
const InventoryDetailStyle = styled.div`
  width: 100%;
`;
const TextFlexCenter = styled.div``;
const CardStyle = styled(Card)`
  margin-bottom: 24px;
`;
const ImgStyle = styled.img`
  width: 80px;
  height: 80px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-right: 15px;
`;
const ContentFlex = styled.div`
  display: inline-flex;
  width: 100%;
  align-items: center;
`;
const ContentItemFlex = styled.div`
  display: inline-flex;
  width: 100%;
  align-items: center;
  padding: 0px 15px;
`;
const ImgItemStyle = styled.img`
  width: 50px;
  height: 50px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-right: 15px;
`;
export default InventoryDetail;
