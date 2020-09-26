import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Link from "next/link";
// components
import CollectionFilters from "../CollectionFilters";
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
    collection: {
      name: "Home Page",
      img: `https://cdn.shopify.com/s/files/1/0451/1472/0419/products/0_Ryder-Shoes-Men-And-Women-Dropship-Indestructible-Steel-Toe-Air-Safety-Boots-Puncture-Proof-Work-Sneakers_1_300x300_cc63d031-a9b3-4a95-8fb4-e12f8cf7e49d_50x50@3x.jpg?v=1596714418`,
    },
  },
];

const ViewInventory = () => {
  const [checkedList, setCheckedList] = useState([]);
  const [tagsFilter, setTagsFilter] = useState([]);
  const [tabIndex, setTabIndex] = useState(1);
  let userData = getUserData()

  const columns = [
    {
      title: "Title",
      dataIndex: "collection",
      render: (collection) => {
        return (
          <ProductContent>
            <ProductImage src={collection.img}></ProductImage>
          <Link href="/[portal_id]/ecom/products/collections/[collectionId]" as={`/${userData?.uniqueID}/ecom/products/collections/123456789`}>

            {/* <Link
              href="/products/collections/[collectionId]"
              as="/products/collections/123456789"
            > */}
              <a> {collection && collection.name}</a>
            </Link>
          </ProductContent>
        );
      },
    },
    {
      title: "Product conditions",
      dataIndex: "conditions",
      render: (conditions) => <span>{conditions || "--"}</span>,
      align: "left",
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

      <CollectionFilters />

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
          <ButtonEditCollection>Edit collections</ButtonEditCollection>
          <Dropdown
            overlay={
              <Menu onClick={handleMenuClickCheckbox}>
                <Menu.Item key="1">Make collections available</Menu.Item>
                <Menu.Item key="2">Make collections unavailable</Menu.Item>
                <Menu.Item key="3">Delete selected collections</Menu.Item>
              </Menu>
            }
            trigger={["click"]}
          >
            <ButtonMoreActions>
              Actions <DownOutlined />
            </ButtonMoreActions>
          </Dropdown>
          <StyledText>All items on this page are selected.</StyledText>
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

const StyledText = styled.span`
  font-size: 14px;
  margin-left: 15px;
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
  align-items: center;
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

const ButtonEditCollection = styled(Button)`
  border-radius: 4px 0 0 4px;
  border-right: 0;
`;

export default ViewInventory;
