import React, { useState } from "react";
import styled from "styled-components";
import Link from "next/link";
// components
import MDEditShippingAddress from "../../atoms/MDEditShippingAddress";
// icons
import {
  EllipsisOutlined,
  FlagOutlined,
  TagsOutlined,
  DownOutlined
} from "@ant-design/icons";
// ui
import {
  Card,
  Tag,
  Button,
  Row,
  Col,
  InputNumber,
  Dropdown,
  Alert,
  Menu,
  Select
} from "antd";

const { Option } = Select;

const Orders = () => {
  const [isOpenEdit, setOpenEdit] = useState(false);

  const onFinishEdit = values => {
    console.log(values);
  };

  return (
    <ListOrderStyle>
      <OrderItem
        title={
          <CardTitle>
            <OrderIdTextBold>Order #1007</OrderIdTextBold>
            <OrderIdText>Waldene Leach</OrderIdText>
            <TagStyle>Unfulfilled</TagStyle>
          </CardTitle>
        }
        extra={
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item>Remove order</Menu.Item>
              </Menu>
            }
            trigger={["click"]}
            placement="bottomRight"
          >
            <Button type="text" icon={<MenuIconStyle />} />
          </Dropdown>
        }
      >
        <SubContent>
          <Row gutter={24}>
            <Col md={12}>
              <TitleContent>SHIPPING ADDRESS</TitleContent>
            </Col>
            <Col md={12}>
              <TextRight>
                  <a href="#" onClick={() => setOpenEdit(true)}>
                    Edit shipping address
                  </a>
              </TextRight>
            </Col>
          </Row>
          <TextStyle>Waldene Leach</TextStyle>
          <TextStyle>
            367 South Cedar Creek Drive, Cedar Creek TX 78612, United States
          </TextStyle>
        </SubContent>
        <SubContent>
          <TitleContent>Items</TitleContent>

          <AlertStyle
            type="error"
            message="You need to fulfill at least 1 item."
            banner
          />
          <ProductDetail>
            <ProductView>
              <ImageView
                src="https://cdn.shopify.com/s/files/1/0451/1472/0419/products/0_Ryder-Shoes-Men-And-Women-Dropship-Indestructible-Steel-Toe-Air-Safety-Boots-Puncture-Proof-Work-Sneakers_1_300x300_cc63d031-a9b3-4a95-8fb4-e12f8cf7e49d_small.jpg?v=1596714418"
                alt=""
              />
              <div>
                <Link href={`/products/[productId]`} as="/products/123456789">
                  <a href="#">Indestructible Shoes</a>
                </Link>
                <TextStyle>Black / US 9 - 9.5 | EU 43 • 112</TextStyle>
              </div>
            </ProductView>
            <InputTotal>
              <LabelStyle>0.0 lb</LabelStyle>
              <InputNumber min={0} max={1} defaultValue={0} />
            </InputTotal>
          </ProductDetail>
        </SubContent>
        <SubContent>
          <TitleContent>PACKAGE AND WEIGHT</TitleContent>
          <AlertStyle
            type="error"
            message="Total weight must be greater than 0"
            banner
          />

          <PackageContent>
            <LabelPackage htmlFor="">
              Package
              <AddButtonText href="#">Add package</AddButtonText>
            </LabelPackage>
            <Dropdown
              trigger={["click"]}
              overlay={
                <Menu>
                  <Menu.Item key={0}>
                    <MenuItemContent>
                      <PackageIconLeft />
                      <ButtonPackageInfo>
                        <ButtonPackageTitle>Sample box</ButtonPackageTitle>
                        <TextStyle>8.6 x 5.4 x 1.6 in, 0 lb</TextStyle>
                      </ButtonPackageInfo>
                    </MenuItemContent>
                  </Menu.Item>
                </Menu>
              }
            >
              <ButtonPackage>
                <PackageIconLeft />
                <ButtonPackageInfo>
                  <ButtonPackageTitle>Sample box</ButtonPackageTitle>
                  <TextStyle>8.6 x 5.4 x 1.6 in, 0 lb</TextStyle>
                </ButtonPackageInfo>
                <DownOutlined />
              </ButtonPackage>
            </Dropdown>
          </PackageContent>

          <PackageContent>
            <LabelPackage htmlFor="">Total weight (with package)</LabelPackage>
            <Row gutter={0}>
              <Col md={20}>
                <InputNumberStyle min={0} max={10} defaultValue={0} />
              </Col>
              <Col md={4}>
                <SelectStyle defaultValue="3">
                  <Option value="1">g</Option>
                  <Option value="2">kg</Option>
                  <Option value="3">lb</Option>
                  <Option value="4">oz</Option>
                </SelectStyle>
              </Col>
              <Col md={24}>
                <Button type="link">Reset to original weight (0 lb)</Button>
              </Col>
            </Row>
          </PackageContent>
        </SubContent>

        <SubContentLast>
          <TitleContent>SHIPPING SERVICE</TitleContent>
          <FlagAlert>
            <FlagIcon />
            <TextStyle>
              To get shipping rates, you need to fix the errors for this order.
            </TextStyle>
          </FlagAlert>
        </SubContentLast>
      </OrderItem>

      <MDEditShippingAddress
        isOpen={isOpenEdit}
        onCancel={() => setOpenEdit(false)}
        onSave={() => setOpenEdit(false)}
        onFinish={onFinishEdit}
      />
    </ListOrderStyle>
  );
};

const ListOrderStyle = styled.div`
  width: 100%;
`;

const PackageContent = styled.div`
  margin-bottom: 15px;
`;

const LabelPackage = styled.label`
  width: 100%;
  display: block;
  margin-bottom: 5px;
  overflow: hidden;
`;

const AddButtonText = styled.a`
  float: right;
`;

const MenuItemContent = styled.div`
  width: 100%;
  height: auto;
  display: inline-flex;
  align-items: center;
  text-align: left;
`;

const ButtonPackage = styled(Button)`
  width: 100%;
  height: auto;
  display: inline-flex;
  align-items: center;
  text-align: left;
`;

const PackageIconLeft = styled(TagsOutlined)`
  font-size: 28px;
  margin-right: 15px;
`;

const ButtonPackageInfo = styled.div`
  width: calc(100% - 48px - 10px);
`;
const ButtonPackageTitle = styled.h3`
  margin: 0;
`;

const InputNumberStyle = styled(InputNumber)`
  width: 100%;
`;

const SelectStyle = styled(Select)`
  width: 100%;
`;

const FlagAlert = styled.div`
  background: var(--p-banner-background, #f4f6f8);
  padding: 8px 15px;
  display: inline-flex;
  align-items: center;
  width: 100%;
`;

const FlagIcon = styled(FlagOutlined)`
  font-size: 22px;
  margin-right: 10px;
`;

const ProductDetail = styled.div`
  display: inline-flex;
  align-items: center;
  width: 100%;
`;

const ProductView = styled.div`
  display: inline-flex;
  align-items: center;
  width: calc(100% - 135px);
`;
const ImageView = styled.img`
  width: 60px;
  margin-right: 15px;
`;

const InputTotal = styled.div`
  height: 100%;
  align-items: center;
  display: inline-flex;
  width: 135px;
`;
const LabelStyle = styled.span`
  margin-right: 10px;
`;

const MenuIconStyle = styled(EllipsisOutlined)`
  font-size: 22px;
  font-weight: bold;
  color: #333;
`;

const OrderIdTextBold = styled.h3`
  color: #333;
  margin: 0 15px 0 0;
  text-transform: none;
  font-weight: bold;
`;

const OrderIdText = styled.p`
  color: #666;
  margin: 0 0;
  text-transform: none;
`;

const OrderItem = styled(Card)`
  margin-bottom: 24px;
`;
const CardTitle = styled.div`
  width: 100%;
  display: inline-flex;
  align-items: center;
`;
const TagStyle = styled(Tag)`
  background: #ffea8a;
  color: #333;
  line-height: 14px;
  margin-left: 15px;
  padding: 2px 10px;
  border-radius: 15px;
  display: inline-table;
`;

const SubContent = styled.div`
  padding: 0 0 15px;
  margin-bottom: 15px;
  border-bottom: 1px solid #ddd;
`;

const SubContentLast = styled.div`
  padding: 0 0 15px;
`;

const TitleContent = styled.h3`
  text-transform: uppercase;
  font-weight: bold;
  color: #333;
`;
const TextRight = styled.div`
  text-align: right;
  width: 100%;
`;

const TextStyle = styled.p`
  margin: 0;
  font-size: 14px;
`;

const AlertStyle = styled(Alert)`
  margin-bottom: 15px;
`;

export default Orders;