import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Link from "next/link";
// components
import InventoryFilters from "../InventoryFilters";
// icons
import { DownOutlined } from "@ant-design/icons";
// ui
import { Table, Tabs, Tag, Button, Dropdown, Menu, Input } from "antd";
import { getUserData } from "../../../utils";


const { TabPane } = Tabs;
const customerData = [
  {
    id: 1,
    key: 1,
    product: {
      name: "Indestructible Shoes",
      type: "Black / US 10 | EU 44",
      img: `https://cdn.shopify.com/s/files/1/0451/1472/0419/products/0_Ryder-Shoes-Men-And-Women-Dropship-Indestructible-Steel-Toe-Air-Safety-Boots-Puncture-Proof-Work-Sneakers_1_300x300_cc63d031-a9b3-4a95-8fb4-e12f8cf7e49d_50x50@3x.jpg?v=1596714418`,
    },
    SKU: 112,
    sold_out: "Stop selling",
    incoming: 0,
    available: 97,
    quantity_available: "",
  },
  {
    id: 2,
    key: 2,
    product: {
      name: "Indestructible Shoes",
      type: "Black / US 11.5 - 12 | EU 46",
      img: `https://cdn.shopify.com/s/files/1/0451/1472/0419/products/0_Ryder-Shoes-Men-And-Women-Dropship-Indestructible-Steel-Toe-Air-Safety-Boots-Puncture-Proof-Work-Sneakers_1_300x300_cc63d031-a9b3-4a95-8fb4-e12f8cf7e49d_50x50@3x.jpg?v=1596714418`,
    },
    SKU: 112,
    sold_out: "Stop selling",
    incoming: 0,
    available: 97,
    quantity_available: "",
  },
];

const ViewInventory = () => {
  const [checkedList, setCheckedList] = useState([]);
  const [tagsFilter, setTagsFilter] = useState([]);
  const [tabIndex, setTabIndex] = useState(1);
  let userData = getUserData()

  const columns = [
    {
      title: "Product",
      dataIndex: "product",
      render: (product) => {
        return (
          <ProductContent>
            <ProductImage src={product.img}></ProductImage>
            <div className="inventory-link">
              <Link href="/[portal_id]/ecom/products/inventory/[inventoryId]" as={`/${userData?.uniqueID}/ecom/products/inventory/123456789`}>
                <a> {product && product.name}</a>
              </Link>
              <Link href="/[portal_id]/ecom/products/inventory/[inventoryId]" as={`/${userData?.uniqueID}/ecom/products/inventory/123456789`}>
             
                <a> {product && product.type}</a>
              </Link>
            </div>
          </ProductContent>
        );
      },
    },
    {
      title: "SKU",
      dataIndex: "SKU",
      render: (SKU) => <span>{SKU}</span>,
      align: "left",
    },
    {
      title: "When sold out",
      dataIndex: "sold_out",
      render: (sold_out) => <span>{sold_out}</span>,
    },
    {
      title: "Incoming",
      dataIndex: "incoming",
      render: (incoming) => <span>{incoming ? incoming : 0}</span>,
      align: "left",
    },
    {
      title: "Available",
      dataIndex: "available",
      render: (available) => <span>{available}</span>,
      align: "left",
    },
    {
      title: "Edit quantity available",
      dataIndex: "quantity_available",
      render: (val) => {
        return (
          <QuantityContent>
            <Button disabled>Add</Button>
            <Button>Set</Button>
            <Input defaultValue={0} type="number" />
            <Button type="primary">Save</Button>
          </QuantityContent>
        );
      },
      width: "25%",
    },
  ];

  const handleMenuClickCheckbox = (e) => {};

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setCheckedList(selectedRows);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      name: record.name,
    }),
  };

  return (
    <ViewContent>
      <Tabs>
        <TabPane tab="All" key="1" />
      </Tabs>

      <InventoryFilters />

      {tagsFilter && tagsFilter.length > 0 && (
        <TagsList>
          {tagsFilter.map((item, i) => (
            <Tag key={i} closable>
              {item}
            </Tag>
          ))}
        </TagsList>
      )}

      {checkedList.length > 0 && (
        <ActionsTable>
          <LabelSelected>{checkedList.length} selected</LabelSelected>
          <Dropdown
            overlay={
              <Menu onClick={handleMenuClickCheckbox}>
                <Menu.Item key="1">Archive checkouts</Menu.Item>
                <Menu.Item key="2">Unarchive checkouts</Menu.Item>
              </Menu>
            }
            trigger={["click"]}
          >
            <ButtonMoreActions>
              Actions <DownOutlined />
            </ButtonMoreActions>
          </Dropdown>
        </ActionsTable>
      )}

      <ContentTab>
        {tabIndex === 1 && (
          <Table
            rowSelection={{
              type: "checkbox",
              ...rowSelection,
            }}
            columns={columns}
            dataSource={customerData}
            pagination={customerData.length > 10}
          />
        )}
      </ContentTab>
    </ViewContent>
  );
};

const ViewContent = styled.div`
  border: 1px solid #ddd;
  background: #fff;
  box-shadow: var(
    --p-card-shadow,
    0 0 0 1px rgba(63, 63, 68, 0.05),
    0 1px 3px 0 rgba(63, 63, 68, 0.15)
  );
  border-radius: 3px;
`;

const ContentTab = styled.div``;

const TagsList = styled.div`
  padding: 0 15px 15px;
`;

const LabelSelected = styled.span`
  margin-right: 15px;
  color: #0095f8;
  font-weight: 600;
`;

const ButtonMoreActions = styled(Button)`
  border-radius: 0 4px 4px 0px;
`;

const ActionsTable = styled.div`
  padding: 24px;
`;

const ProductContent = styled.div`
  display: flex;
  .inventory-link {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    line-height: 2;
  }
`;

const ProductImage = styled.img`
  width: 60px;
  height: 60px;
  margin-right: 10px;
  border: 1px solid #bbc3c9;
`;

const QuantityContent = styled.div`
  display: flex;
  .ant-btn,
  .ant-input {
    border-radius: 0;
  }
`;

export default ViewInventory;
