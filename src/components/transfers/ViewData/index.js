import React, { useState, useEffect } from "react";
import styled from "styled-components";
import languagesList from "language-list";
import { CountryDropdown } from "react-country-region-selector";
import Router from "next/router";
import Link from "next/link";
// components
import Filters from "../Filters";
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
  InputNumber,
  Dropdown,
  Menu,
  message,
  Progress
} from "antd";

const { TabPane } = Tabs;
const { Option } = Select;
const { Panel } = Collapse;

const customerData = [
  {
    key: 1,
    transfer_id: "#T0001",
    name: "Transfer to 650 E Stonewall St",
    des: '1 Expected August 12, 2020',
    status: "Pending",
    process: 10,
  },
  {
    key: 2,
    transfer_id: "#T0002",
    name: "Transfer to 650 E Stonewall St",
    des: '1 Expected August 12, 2020',
    status: "Pending",
    process: 10,
  },
];


const dataNew = customerData.filter((el) => {
  return el.isNew === true;
});

const languagesData = languagesList().getData();

const ViewData = () => {
  const [tabIndex, setTabIndex] = useState(1);
  const [isOpenMoreFilter, setOpenMoreFilters] = useState(false);
  const [valuesCollapse, setShowCollapse] = useState([]);
  const [valueSubscription, setValueSubscription] = useState(0);
  const [tags, setTags] = useState([]);
  const [accountStatus, setAccountStatus] = useState(null);
  const [checkedAmount, setAmountSpent] = useState([]);
  const [checkedNumberOrders, setNumberOrders] = useState([]);
  const [tagsFilter, setTagsFilter] = useState([]);
  const [nodeCheckbox, setNodeCheckbox] = useState(
    customerData.length > 10
      ? `Showing 10 of ${customerData.length} transfer`
      : `Showing ${customerData.length} of ${customerData.length} transfer`
  );
  const [checkedList, setCheckedList] = useState([]);
  const [isOpenAddTags, setMDAddTags] = useState(false);
  const [isOpenDeleteTags, setMDDeleteTags] = useState(false);
  const [isOpenDeleteSelected, setShowMDDeleteSelected] = useState(false);
  const [country, setCountry] = useState('United States');

  const columns = [
    {
      title: (title) => nodeCheckbox,
      dataIndex: "transfer_id",
      render: (value, item) => {
        return (
          <div>
            <p><strong>{item.transfer_id}</strong> {item.name}</p>
            <p>{item.des}</p>
          </div>
        );
      },
      width: "72%",
    },
    {
      title: "",
      dataIndex: "status",
      render: (status) =>
        status !== "" ? <TagPending color="#ffeb8a">{status}</TagPending> : "",
      align: "right",
      width: "8%",
    },
    {
      title: "",
      dataIndex: "process",
      render: (process) => {
        return <Progress percent={process} strokeWidth={10} />
      },
      align: "right",
      width: "15%",
    },
  ];

  const handleMenuClickCheckbox = (e) => {};

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setCheckedList(selectedRows);

      if (selectedRows.length > 0) {
        let node = (
          <div>
            <LabelSelected>{selectedRows.length} selected</LabelSelected>
            <Dropdown
              overlay={
                <Menu onClick={handleMenuClickCheckbox}>
                  <Menu.Item
                    key="1"
                    // onClick={() => setShowMDDeleteSelected(true)}
                  >
                    Archive transfers
                  </Menu.Item>
                  <Menu.Item key="2" >
                  Unarchive transfers
                  </Menu.Item>
                  <Menu.Item key="3" >
                  Add tags
                  </Menu.Item>
                  <Menu.Item key="4" >
                  Remove tags
                  </Menu.Item>
                </Menu>
              }
              trigger={["click"]}
            >
              <Button>
                Actions <DownOutlined />
              </Button>
            </Dropdown>
          </div>
        );
        setNodeCheckbox(node);
      } else {
        setNodeCheckbox(
          customerData.length > 10
            ? `Showing 10 of ${customerData.length} transfer`
            : `Showing ${customerData.length} of ${customerData.length} transfer`
        );
      }
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      name: record.name,
    }),
  };

  const callback = (key) => {
    setTabIndex(Number(key));
    if (key === "2") {
      setTagsFilter(["Status is Pending"]);
    } else if (key === "3") {
      setTagsFilter(["Status is Partial"]);
    } else if (key === "4") {
      setTagsFilter(["Status is Completed"]);
    } else {
      setTagsFilter([]);
    }
  };

  const onChangeSubscription = (e) => {
    setValueSubscription(e.target.value);
  };

  const onChangeAmount = (e, name) => {};

  const onChangeNumberOrders = (e, name) => {};

  const onShowMdAddTags = (value) => {
    setMDAddTags(value);
  };

  const onSaveAddTags = (value) => {};

  const onFinishAddTags = (value) => {};

  // delete tags
  const onShowMdDeleteTags = (value) => {
    setMDDeleteTags(value);
  };

  const onSaveDeleteTags = (value) => {};

  const onFinishDeleteTags = (value) => {};

  // delete customers selected
  const onShowMdDeleteSelected = (value) => {
   // console.log("value: ", value);
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
        <TabPane tab="Pending" key="2" />
        <TabPane tab="Partial" key="3" />
        <TabPane tab="Completed" key="4" />
      </Tabs>

      <Filters onOpen={setOpenMoreFilters} />

      {tagsFilter && tagsFilter.length > 0 && (
        <TagsList>
          {tagsFilter.map((item, i) => (
            <Tag key={i} closable>
              {item}
            </Tag>
          ))}
        </TagsList>
      )}

      {nodeCheckbox && (
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
              dataSource={customerData}
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
        </ContentTab>
      )}

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

      <DrawerStyle
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
                <PanelTitle>Email subscription status</PanelTitle>
              </div>
            }
            key="1"
          >
            <RadioGroupStyle
              onChange={onChangeSubscription}
              value={valueSubscription}
            >
              <RadioStyle value={1}>Subscribed</RadioStyle>
              <RadioStyle value={2}>Pending confirmation</RadioStyle>
              <RadioStyle value={3}>Not subscribed</RadioStyle>
            </RadioGroupStyle>
            <ButtonLink type="text">Clear</ButtonLink>
          </PanelStyle>
          <PanelStyle
            header={
              <div>
                <PanelTitle>Tagged with</PanelTitle>
              </div>
            }
            key="2"
          >
            <SelectStyle mode="tags" onChange={setTags}>
              {tags}
            </SelectStyle>
            <ButtonLink type="text">Clear</ButtonLink>
          </PanelStyle>
          <PanelStyle
            header={
              <div>
                <PanelTitle>Customer account status</PanelTitle>
              </div>
            }
            key="3"
          >
            <RadioGroupStyle
              onChange={(e) => setAccountStatus(e.target.value)}
              value={accountStatus}
            >
              <RadioStyle value={1}>Active account</RadioStyle>
              <RadioStyle value={2}>Disabled account</RadioStyle>
              <RadioStyle value={3}>Invited to create account</RadioStyle>
              <RadioStyle value={4}>Declined account invitation</RadioStyle>
            </RadioGroupStyle>
            <ButtonLink type="text">Clear</ButtonLink>
          </PanelStyle>
          <PanelStyle
            header={
              <div>
                <PanelTitle>Customer language</PanelTitle>
              </div>
            }
            key="4"
          >
            <SelectStyle placeholder="Select a language...">
              {languagesData &&
                languagesData.length > 0 &&
                languagesData.map((item, i) => (
                  <Option key={i} value={item.code}>
                    {item.language}
                  </Option>
                ))}
            </SelectStyle>
            <ButtonLink type="text">Clear</ButtonLink>
          </PanelStyle>
          <PanelStyle
            header={
              <div>
                <PanelTitle>Amount spent</PanelTitle>
              </div>
            }
            key="5"
          >
            <Checkbox.Group
              value={checkedAmount}
              onChange={(checked) => setAmountSpent(checked)}
            >
              <CheckboxStyle value="1">More than this amount</CheckboxStyle>
              {checkedAmount.indexOf("1") > -1 && (
                <InputNumberStyle
                  formatter={(value) =>
                    `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                  step={0.01}
                  placeholder="0.00"
                  onChange={(e) => onChangeAmount(e, "more")}
                />
              )}

              <CheckboxStyle value="2">Less than this amount</CheckboxStyle>
              {checkedAmount.indexOf("2") > -1 && (
                <InputNumberStyle
                  formatter={(value) =>
                    `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                  step={0.01}
                  placeholder="0.00"
                  onChange={(e) => onChangeAmount(e, "less")}
                />
              )}

              <CheckboxStyle value="3">This exact amount</CheckboxStyle>
              {checkedAmount.indexOf("3") > -1 && (
                <InputNumberStyle
                  formatter={(value) =>
                    `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                  step={0.01}
                  placeholder="0.00"
                  onChange={(e) => onChangeAmount(e, "exact")}
                />
              )}
            </Checkbox.Group>
            <ButtonLink
              type={`${checkedAmount.length > 0 ? "link" : "text"}`}
              onClick={() => setAmountSpent([])}
            >
              Clear
            </ButtonLink>
          </PanelStyle>
          <PanelStyle
            header={
              <div>
                <PanelTitle>Number of orders</PanelTitle>
              </div>
            }
            key="6"
          >
            <Checkbox.Group
              value={checkedNumberOrders}
              onChange={(checked) => setNumberOrders(checked)}
            >
              <CheckboxStyle value="1">More than this amount</CheckboxStyle>
              {checkedNumberOrders.indexOf("1") > -1 && (
                <InputNumberStyle
                  formatter={(value) =>
                    `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                  step={0.01}
                  placeholder="0.00"
                  onChange={(e) => onChangeNumberOrders(e, "more")}
                />
              )}

              <CheckboxStyle value="2">Less than this amount</CheckboxStyle>
              {checkedNumberOrders.indexOf("2") > -1 && (
                <InputNumberStyle
                  formatter={(value) =>
                    `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                  step={0.01}
                  placeholder="0.00"
                  onChange={(e) => onChangeNumberOrders(e, "less")}
                />
              )}

              <CheckboxStyle value="3">This exact amount</CheckboxStyle>
              {checkedNumberOrders.indexOf("3") > -1 && (
                <InputNumberStyle
                  formatter={(value) =>
                    `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                  step={0.01}
                  placeholder="0.00"
                  onChange={(e) => onChangeNumberOrders(e, "exact")}
                />
              )}
            </Checkbox.Group>
            <ButtonLink
              type={`${checkedNumberOrders.length > 0 ? "link" : "text"}`}
              onClick={() => setNumberOrders([])}
            >
              Clear
            </ButtonLink>
          </PanelStyle>
          <PanelStyle
            header={
              <div>
                <PanelTitle>Date of order</PanelTitle>
              </div>
            }
            key="7"
          >
            <RadioGroupStyle
              onChange={onChangeSubscription}
              value={valueSubscription}
            >
              <RadioStyle value={1}>Last 7 days</RadioStyle>
              <RadioStyle value={2}>Last 30 days</RadioStyle>
              <RadioStyle value={3}>Last 90 days</RadioStyle>
              <RadioStyle value={4}>Last 12 months</RadioStyle>
              <RadioStyle value={5}>Custom</RadioStyle>
            </RadioGroupStyle>
            <ButtonLink type="text">Clear</ButtonLink>
          </PanelStyle>
          <PanelStyle
            header={
              <div>
                <PanelTitle>Date added as customer</PanelTitle>
              </div>
            }
            key="8"
          >
            <RadioGroupStyle
              onChange={onChangeSubscription}
              value={valueSubscription}
            >
              <RadioStyle value={1}>Last 7 days</RadioStyle>
              <RadioStyle value={2}>Last 30 days</RadioStyle>
              <RadioStyle value={3}>Last 90 days</RadioStyle>
              <RadioStyle value={4}>Last 12 months</RadioStyle>
              <RadioStyle value={5}>Custom</RadioStyle>
            </RadioGroupStyle>
            <ButtonLink type="text">Clear</ButtonLink>
          </PanelStyle>
          <PanelStyle
            header={
              <div>
                <PanelTitle>Abandoned checkout</PanelTitle>
              </div>
            }
            key="9"
          >
            <RadioGroupStyle
              onChange={onChangeSubscription}
              value={valueSubscription}
            >
              <RadioStyle value={1}>Last 7 days</RadioStyle>
              <RadioStyle value={2}>Last 30 days</RadioStyle>
              <RadioStyle value={3}>Last 90 days</RadioStyle>
              <RadioStyle value={4}>Last 12 months</RadioStyle>
              <RadioStyle value={5}>Custom</RadioStyle>
            </RadioGroupStyle>
            <ButtonLink type="text">Clear</ButtonLink>
          </PanelStyle>
          <PanelStyle
            header={
              <div>
                <PanelTitle>Location</PanelTitle>
              </div>
            }
            key="10"
          >
            <CountryDropdown
              defaultOptionLabel="Select a country."
              value={country}
              onChange={(val) => setCountry(val)}
              blacklist={["CD", "SH", "KP", "GS", "HM", "VC"]}
              className="location"
            />
            <ButtonLink type="text">Clear</ButtonLink>
          </PanelStyle>
        </CollapseStyle>
      </DrawerStyle>
    </ViewContent>
  );
};

const TagPending = styled(Tag)`
color: #333;
background: #ffeb8a;
border-radius: 15px;
`
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

const DrawerStyle = styled(Drawer)``;

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
  .location{
    width: 100%;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
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
  margin: 10px 0 0;
  padding: 0 3px;
  display: block;
`;

const CheckboxStyle = styled(Checkbox)`
  width: 100%;
  margin: 0 0 7px !important;
`;
const InputNumberStyle = styled(InputNumber)`
  padding: 3px;
  height: auto;
  width: calc(100% - 24px);
  margin-bottom: 10px;
  margin-left: 24px;
`;

const TagsList = styled.div`
  padding: 0 15px 15px;
`;

const LabelSelected = styled.span`
  margin-right: 15px;
  color: #0095f8;
  font-weight: bold;
`;

export default ViewData;
