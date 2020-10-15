import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Link from "next/link";
// components
import CheckoutsFilters from "../CheckoutsFilters";
// icons
import {
  DownOutlined,
  RightCircleOutlined,
} from "@ant-design/icons";
// ui
import {
  Table,
  Tabs,
  Tag,
  Button,
  Dropdown,
  Menu,
} from "antd";
import { getUserData } from "../../../utils";


const { TabPane } = Tabs;
const customerData = [
  {
    id: 1,
    key: 1,
    checkout_id: "123133132113",
    created_date: "04:12 am",
    placed_by: {
      first_name: "Jordan",
      last_name: "Handeson",
    },
    email_status: "sent",
    recovery_status: "not_recovered",
    total: 66.89,
  },
  {
    id: 2,
    key: 2,
    checkout_id: "534535355353",
    created_date: "Yesterday at 09:07 pm",
    placed_by: {
      first_name: "Jordan",
      last_name: "Handeson",
    },
    email_status: "not_sent",
    recovery_status: "not_recovered",
    total: 79.79,
  },
  {
    id: 3,
    key: 3,
    checkout_id: "675677557578",
    created_date: "Yesterday at 09:07 pm",
    placed_by: {
      first_name: "Jordan",
      last_name: "Handeson",
    },
    email_status: "scheduled",
    recovery_status: "not_recovered",
    total: 66.99,
  },
];

const ViewOrders = () => {
  const [checkedList, setCheckedList] = useState([]);
  const [tagsFilter, setTagsFilter] = useState([]);
  const [tabIndex, setTabIndex] = useState(1);
  let userData = getUserData()

  const columns = [
    {
      title: "Checkout",
      dataIndex: "checkout_id",
      render: (checkout_id) => {
        return (
          <Link href={`/[portal_id]/ecom/orders/checkouts/${checkout_id}`} as={`/${userData?.uniqueID}/ecom/orders/checkouts/${checkout_id}`}>
            <FullName>#{checkout_id}</FullName>
          </Link>
        );
      },
    },
    {
      title: "Date",
      dataIndex: "created_date",
    },
    {
      title: "Placed by",
      dataIndex: "placed_by",
      render: (placed_by) => (
        <ButtonCustomer type="text">
          {placed_by.first_name} {placed_by.last_name}
          <Link href={`/[portal_id]/ecom/orders/customers/[pid]`} as={`/${userData?.uniqueID}/ecom/orders/customers/123456789`} >
            <FullName>
              {" "}
              <RightCircleOutlined />
            </FullName>
          </Link>
        </ButtonCustomer>
      ),
      align: "left",
    },
    {
      title: "Email Status",
      dataIndex: "email_status",
      render: (val) => {
        if (val === "not_sent") {
          return <TagOrang>Not Sent</TagOrang>;
        } else if (val === "sent") {
          return <TagGreen>Sent</TagGreen>;
        } else if (val === "scheduled") {
          return <TagYellow>Scheduled</TagYellow>;
        }
      },
    },
    {
      title: "Recovery Status",
      dataIndex: "recovery_status",
      render: (val) => {
        if (val === "not_recovered") {
          return <TagOrang>Not Recovered</TagOrang>;
        } else {
          return <TagGreen>{val}</TagGreen>;
        }
      },
    },
    {
      title: "Total",
      dataIndex: "total",
      render: (val) => `$${val}`,
      align: "right",
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

      <CheckoutsFilters />

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

const FullName = styled.a`
  font-size: 14px;
`;

const TagGreen = styled(Tag)`
  border-radius: 15px;
  padding: 1px 10px;
  border: none;
  background: rgb(65, 191, 105);
  color: #000;
`;

const TagYellow = styled(Tag)`
  border-radius: 15px;
  padding: 1px 10px;
  border: none;
  background: rgb(255, 234, 138);
  color: #000;
`;

const TagOrang = styled(Tag)`
  border-radius: 15px;
  padding: 1px 10px;
  border: none;
  background: rgb(255, 197, 139);
  color: #000;
`;

const ButtonCustomer = styled(Button)`
  padding: 0;
`;

const ActionsTable = styled.div`
  padding: 24px;
`;

export default ViewOrders;
