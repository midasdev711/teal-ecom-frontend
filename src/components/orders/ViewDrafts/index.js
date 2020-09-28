import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Link from "next/link";
// components
import DraftFilters from "../DraftFilters";
import { MDDeleteTags, MDAddTags, MDDeleteSelected } from "../../atoms";
// icons
import { CloseOutlined, DownOutlined } from "@ant-design/icons";
// ui
import {
  Table,
  Tabs,
  Tag,
  Select,
  Drawer,
  Button,
  Collapse,
  Radio,
  Checkbox,
  Dropdown,
  Menu,
  message,
  DatePicker,
} from "antd";
// fake data
import { draftsData } from "../fakeData";
import { getUserData } from "../../../utils";


const { TabPane } = Tabs;
const { Panel } = Collapse;
const dateFormat = "YYYY-MM-DD";
const customerData = draftsData;

const dataNew = customerData.filter((el) => {
  return el.isNew === true;
});

const ViewOrders = () => {
  const [tabIndex, setTabIndex] = useState(1);
  const [isOpenMoreFilter, setOpenMoreFilters] = useState(false);
  const [valuesCollapse, setShowCollapse] = useState([]);
  const [tags, setTags] = useState([]);
  const [tagsFilter, setTagsFilter] = useState([]);
  const [checkedList, setCheckedList] = useState([]);
  const [isOpenAddTags, setMDAddTags] = useState(false);
  const [isOpenDeleteTags, setMDDeleteTags] = useState(false);
  const [isOpenDeleteSelected, setShowMDDeleteSelected] = useState(false);
  let userData = getUserData()

  const columns = [
    {
      title: "Draft order",
      dataIndex: "order_id",
      render: (order_id) => {
        return (
          <Link href="/[portal_id]/ecom/order/123" as={`/${userData?.uniqueID}/ecom/order/123`}>
            <FullName href="">#{order_id}</FullName>
          </Link>
        );
      },
    },
    {
      title: "Date",
      dataIndex: "created_date",
    },
    {
      title: "Customer",
      dataIndex: "customer",
      render: (customer) => (
        <Dropdown
          trigger={["click"]}
          overlay={
            <PopupDetailTB>
              <h3>
                {customer.first_name} {customer.last_name}
              </h3>
              <p>{customer.address}</p>
              <p>
                {customer.order} order{customer.order > 1 ? "s" : ""}
              </p>
              <TextPhone>{customer.phone}</TextPhone>
              <div>
                <Button block type="default">
                  <Link href="/[portal_id]/ecom/customers/123" as={`/${userData?.uniqueID}/ecom/customers/123`} shallow={true}>
                    <a>View customer</a>
                  </Link>
                </Button>
              </div>
            </PopupDetailTB>
          }
          placement="bottomCenter"
        >
          <ButtonCustomer type="text">
            {customer.first_name} {customer.last_name} <DownOutlined />
          </ButtonCustomer>
        </Dropdown>
      ),
      align: "left",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (val) => {
        if (val === "open") {
          return <TagDark>{val}</TagDark>;
        } else {
          return <TagOrang>{val}</TagOrang>;
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

  const handleMenuClickCheckbox = (e) => { };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setCheckedList(selectedRows);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      name: record.name,
    }),
  };

  const callback = (key) => {
    setTabIndex(Number(key));
    if (key === "2") {
      setTagsFilter(["Status is Open, Status is Invoice sent"]);
    } else if (key === "3") {
      setTagsFilter(["Status is Open"]);
    } else if (key === "4") {
      setTagsFilter(["Status is Invoice sent"]);
    } else if (key === "5") {
      setTagsFilter(["Status is Completed"]);
    } else {
      setTagsFilter([]);
    }
  };

  const onShowMdAddTags = (value) => {
    setMDAddTags(value);
  };

  const onSaveAddTags = (value) => { };

  const onFinishAddTags = (value) => { };

  // delete tags
  const onShowMdDeleteTags = (value) => {
    setMDDeleteTags(value);
  };

  const onSaveDeleteTags = (value) => { };

  const onFinishDeleteTags = (value) => { };

  // delete customers selected
  const onShowMdDeleteSelected = (value) => {
    console.log("value: ", value);
    setShowMDDeleteSelected(value);
  };

  const onDeleteSelected = () => {
    message.success("Deleted!");
    setShowMDDeleteSelected(false);
  };

  return (
    <ViewContent>
      <Tabs defaultActiveKey={tabIndex} onChange={callback}>
        <TabPane tab="All" key="1" />
        <TabPane tab="Open and invoice sent" key="2" />
        <TabPane tab="Open" key="3" />
        <TabPane tab="Invoice sent" key="4" />
        <TabPane tab="Completed" key="5" />
      </Tabs>

      <DraftFilters onOpen={setOpenMoreFilters} />

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
                <Menu.Item
                  key="1"
                  onClick={() => setShowMDDeleteSelected(true)}
                >
                  Delete draft orders
                </Menu.Item>
                <Menu.Item key="2" onClick={() => onShowMdAddTags(true)}>
                  Add tags
                </Menu.Item>
                <Menu.Item key="3" onClick={() => setMDDeleteTags(true)}>
                  Remove tags
                </Menu.Item>
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
        {tabIndex === 2 && (
          <Table
            rowSelection={{
              type: "checkbox",
              ...rowSelection,
            }}
            columns={columns}
            dataSource={dataNew && dataNew.length > 0 ? dataNew : []}
            pagination={customerData.length > 10}
          />
        )}
        {tabIndex === 3 && (
          <Table
            rowSelection={{
              type: "checkbox",
              ...rowSelection,
            }}
            columns={columns}
            dataSource={[]}
            pagination={customerData.length > 10}
          />
        )}
        {tabIndex === 4 && (
          <Table
            rowSelection={{
              type: "checkbox",
              ...rowSelection,
            }}
            columns={columns}
            dataSource={[]}
            pagination={customerData.length > 10}
          />
        )}
        {tabIndex === 5 && (
          <Table
            rowSelection={{
              type: "checkbox",
              ...rowSelection,
            }}
            columns={columns}
            dataSource={[]}
            pagination={customerData.length > 10}
          />
        )}
      </ContentTab>

      <MDAddTags
        name="customers"
        count={checkedList.length}
        onCancel={onShowMdAddTags}
        onSave={onSaveAddTags}
        isOpen={isOpenAddTags}
        onFinish={onFinishAddTags}
      />

      <MDDeleteTags
        name="customers"
        count={checkedList.length}
        onCancel={onShowMdDeleteTags}
        onSave={onSaveDeleteTags}
        isOpen={isOpenDeleteTags}
        onFinish={onFinishDeleteTags}
      />

      <MDDeleteSelected
        name="customer"
        count={checkedList.length}
        onCancel={onShowMdDeleteSelected}
        onDelete={onDeleteSelected}
        isOpen={isOpenDeleteSelected}
      />

      <Drawer
        title={
          <DrawerTitle>
            More filters
            <TitleIconClose onClick={() => setOpenMoreFilters(false)} />
          </DrawerTitle>
        }
        placement="right"
        closable={false}
        onClose={() => setOpenMoreFilters(false)}
        visible={isOpenMoreFilter}
        footer={
          <>
            <ButtonFooterLeft type="default">
              Clear all filters
            </ButtonFooterLeft>
            <ButtonFooterRight type="primary">Done</ButtonFooterRight>
          </>
        }
      >
        <CollapseStyle
          defaultActiveKey={valuesCollapse}
          onChange={(values) => setShowCollapse(values)}
          expandIconPosition="right"
        >
          <PanelStyle
            header={
              <div>
                <PanelTitle>Status</PanelTitle>
              </div>
            }
            key="1"
          >
            <CheckboxGroupStyle>
              <CheckboxStyle value={1}>Open</CheckboxStyle>
              <CheckboxStyle value={2}>Invoice sent</CheckboxStyle>
              <CheckboxStyle value={3}>Completed</CheckboxStyle>
            </CheckboxGroupStyle>

            <ButtonLink type="text">Clear</ButtonLink>
          </PanelStyle>
          <PanelStyle
            header={
              <div>
                <PanelTitle>Update at</PanelTitle>
              </div>
            }
            key="2"
          >
            <RadioGroupStyle>
              <RadioStyle value={1}>Today</RadioStyle>
              <RadioStyle value={2}>In the last week</RadioStyle>
              <RadioStyle value={3}>In the last month</RadioStyle>
              <RadioStyle value={4}>In the last 3 months</RadioStyle>
              <RadioStyle value={5}>In the last year</RadioStyle>
              <RadioStyle value={6}>On or before</RadioStyle>
              <RadioStyle value={7}>On or after</RadioStyle>
            </RadioGroupStyle>
            <DatePicker placeholder={dateFormat} disabled />
            <ButtonLink type="text">Clear</ButtonLink>
          </PanelStyle>

          <PanelStyle
            header={
              <div>
                <PanelTitle>Create at</PanelTitle>
              </div>
            }
            key="3"
          >
            <RadioGroupStyle>
              <RadioStyle value={1}>Today</RadioStyle>
              <RadioStyle value={2}>In the last week</RadioStyle>
              <RadioStyle value={3}>In the last month</RadioStyle>
              <RadioStyle value={4}>In the last 3 months</RadioStyle>
              <RadioStyle value={5}>In the last year</RadioStyle>
              <RadioStyle value={6}>On or before</RadioStyle>
              <RadioStyle value={7}>On or after</RadioStyle>
            </RadioGroupStyle>
            <DatePicker placeholder={dateFormat} disabled />
            <ButtonLink type="text">Clear</ButtonLink>
          </PanelStyle>
          <PanelStyle
            header={
              <div>
                <PanelTitle>Customer</PanelTitle>
              </div>
            }
            key="4"
          >
            <SelectStyle mode="tags" onChange={setTags}>
              {tags}
            </SelectStyle>
            <ButtonLink type="text">Clear</ButtonLink>
          </PanelStyle>
          <PanelStyle
            header={
              <div>
                <PanelTitle>Tagged with</PanelTitle>
              </div>
            }
            key="5"
          >
            <SelectStyle mode="tags" onChange={setTags}>
              {tags}
            </SelectStyle>
            <ButtonLink type="text">Clear</ButtonLink>
          </PanelStyle>
        </CollapseStyle>
      </Drawer>
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

const DrawerTitle = styled.h3`
  margin: 0;
  font-weight: 500;
  position: relative;
  color: #000;
  font-size: 24px;
`;

const TitleIconClose = styled(CloseOutlined)`
  position: absolute;
  right: 0;
  font-size: 18px;
  cursor: pointer;
`;

const ButtonFooterLeft = styled(Button)`
  float: left;
`;

const ButtonFooterRight = styled(Button)`
  float: right;
`;

const CollapseStyle = styled(Collapse)`
  background: none;
  border: none;
  padding: 0 10px;
`;

const PanelStyle = styled(Panel)`
  background: none;
  border: none;
  .ant-picker {
    margin-top: 10px;
    width: 100%;
  }
`;

const PanelTitle = styled.h3`
  margin: 0px;
  font-weight: 600;
  color: #000;
  font-size: 16px;
  opacity: 0.8;
`;

const RadioGroupStyle = styled(Radio.Group)`
  width: 100%;
`;

const RadioStyle = styled(Radio)`
  display: block;
  height: 30px;
  line-height: 30px;
  width: 100%;
`;

const SelectStyle = styled(Select)`
  width: 100%;
`;

const ButtonLink = styled(Button)`
  ${"" /* color: #ccc; */}
  margin: 10px 0 0;
  padding: 0 3px;
  display: block;
`;

const CheckboxGroupStyle = styled(Checkbox.Group)`
  width: 100%;
`;

const CheckboxStyle = styled(Checkbox)`
  width: 100%;
  margin: 0 0 7px !important;
`;

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

const TextPhone = styled.p``;

const TagDark = styled(Tag)`
  border-radius: 15px;
  padding: 1px 10px;
  border: none;
  background: rgb(223, 227, 232);
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

const PopupDetailTB = styled.div`
  background: #fff;
  border-radius: 5px;
  padding: 15px;
  -webkit-box-shadow: 0px 0px 3px 0px rgba(163, 161, 163, 1);
  -moz-box-shadow: 0px 0px 3px 0px rgba(163, 161, 163, 1);
  box-shadow: 0px 0px 3px 0px rgba(163, 161, 163, 1);
`;

const ActionsTable = styled.div`
  padding: 24px;
`;

export default ViewOrders;
