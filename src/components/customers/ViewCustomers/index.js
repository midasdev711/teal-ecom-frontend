import React, { useState, useEffect } from "react";
import styled from "styled-components";
import languagesList from "language-list";
import { CountryDropdown } from "react-country-region-selector";
import Router from "next/router";
import Link from "next/link";
import { connect } from "react-redux";
import { getCustomers } from "../../../redux/actions/customers";
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
} from "antd";
import { getUserData } from "../../../utils";


const { TabPane } = Tabs;
const { Option } = Select;
const { Panel } = Collapse;



const sortOptions = [
  {
    label: "Last update (newest first)",
    value: 1,
  },
  {
    label: "Last update (oldest first)",
    value: 2,
  },
  {
    label: "Amount spent (high to low)",
    value: 3,
  },
  {
    label: "Amount spent (low to high)",
    value: 4,
  },
  {
    label: "Total orders (high to low)",
    value: 5,
  },
  {
    label: "Total orders (low to high)",
    value: 6,
  },
  {
    label: "Last order date (newest first)",
    value: 7,
  },
  {
    label: "Last order date (oldest first)",
    value: 8,
  },
  {
    label: "Date added as a customer (newest first)",
    value: 9,
  },
  {
    label: "Date added as a customer (oldest first)",
    value: 10,
  },
];



const languagesData = languagesList().getData();

const ViewCustomers = (props) => {
  console.log('props.customerDataprops.customerData', props)
  const customerData =props.customerData === undefined ? [] : props.customerData
  // const dataNew = customerData.filter((el) => {
  //   return el.isNew === true;
  // });
  
  // const dataEmailSubscription = customerData.filter((el) => {
  //   return el.status === "Subscribed";
  // });
  
  // const dataFromUS = customerData.filter((el) => {
  //   return el.isUS === true;
  // });
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
      ? `Showing 10 of ${customerData.length} customers`
      : `Showing ${customerData.length} of ${customerData.length} customers`
  );
  const [checkedList, setCheckedList] = useState([]);
  const [isOpenAddTags, setMDAddTags] = useState(false);
  const [isOpenDeleteTags, setMDDeleteTags] = useState(false);
  const [isOpenDeleteSelected, setShowMDDeleteSelected] = useState(false);
  const [country, setCountry] = useState('United States');
    let userData = getUserData()
  useEffect(() => {
    getCustomersCall();
  }, [props]);
  
  const getCustomersCall = async () => {
    await props.getCustomers();
  };
  const columns = [
    {
      title: "Customer",
      dataIndex: "BasicDetailsFullName",
      width: "45%",
    },
    {
      title: "Last Order",
      dataIndex: "",
      render: (status) =>
        status !== "" ? {status} : "",
      width: "18%",
    },
    {
      title: "Orders",
      dataIndex: "order",
      render: (order) => {
        if (order > 1) {
          return `${order} items`;
        } else {
          return `${order || '0'} item`;
        }
      },
      width: "13%",
    },
    {
      title: "Spent",
      dataIndex: "spent",
      render: (spent) => `$${spent || '0'} spent`,
      width: "24%",
      align: 'right'
    },
  ];

  const handleMenuClickCheckbox = (e) => { };

  const editCustomers = () => {
    Router.router.push("/customers/edit");
  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setCheckedList(selectedRows);

      if (selectedRows.length > 0) {
        let node = (
          <div>
            <LabelSelected>{selectedRows.length} selected</LabelSelected>
            <ButtonEditCustomer onClick={() => editCustomers()}>
              Edit customers
            </ButtonEditCustomer>
            <Dropdown
              overlay={
                <Menu onClick={handleMenuClickCheckbox}>
                  <Menu.Item
                    key="1"
                    onClick={() => setShowMDDeleteSelected(true)}
                  >
                    Delete selected customers
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
                More actions <DownOutlined />
              </ButtonMoreActions>
            </Dropdown>
          </div>
        );
        setNodeCheckbox(node);
      } else {
        setNodeCheckbox(
          customerData.length > 10
            ? `Showing 10 of ${customerData.length} customers`
            : `Showing ${customerData.length} of ${customerData.length} customers`
        );
      }
    },
    getCheckboxProps: (record) => ({
      disabled: record && record.name === "Disabled User",
      name: record && record.name,
    }),
  };

  const callback = (key) => {
    setTabIndex(Number(key));
    if (key === "2") {
      setTagsFilter(["0 orders"]);
    } else if (key === "3") {
      setTagsFilter(["More then 1 order"]);
    } else if (key === "4") {
      setTagsFilter(["Abandoned checkout in last 30 days"]);
    } else if (key === "5") {
      setTagsFilter(["Subscribed"]);
    } else if (key === "6") {
      setTagsFilter(["From United States"]);
    } else {
      setTagsFilter([]);
    }
  };

  const onChangeSubscription = (e) => {
    setValueSubscription(e.target.value);
  };

  const onChangeAmount = (e, name) => { };

  const onChangeNumberOrders = (e, name) => { };

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

  const [step, setStep] = useState("1");

  const onTabClick = (e) => {
    setStep('' + e);
  }

  const goToNewPage = () => {
    Router.router.push(`/[portal_id]/ecom/customers/new`, { pathname: `/${userData?.uniqueID}/ecom/customers/new` }, { shallow: true });
  }

  return (
    <ViewContent>
      <InputTabs tabPosition={'top'} activeKey={step} onTabClick={(e) => onTabClick(e)}>
        <TabPane tab="All" key="1">
          <ContentBox>
            <DataTable
              rowSelection={{
                type: "checkbox",
                ...rowSelection,
              }}
              columns={columns}
              dataSource={customerData}
              pagination={customerData.length > 10}
            />
          </ContentBox>
        </TabPane>
        <TabPane tab="Returning" key="2">
          <ContentBox>
            <DataTable
              rowSelection={{
                type: "checkbox",
                ...rowSelection,
              }}
              columns={columns}
              dataSource={customerData}
              pagination={customerData.length > 10}
            />
          </ContentBox>
        </TabPane>
        <TabPane tab="Subscription" key="3">
          <ContentBox>
            <DataTable
              rowSelection={{
                type: "checkbox",
                ...rowSelection,
              }}
              columns={columns}
              dataSource={customerData}
              pagination={customerData.length > 10}
            />
          </ContentBox>
        </TabPane>
      </InputTabs>

      <Filters top={10} right={30} onOpen={setOpenMoreFilters} goToNewPage={() => goToNewPage()} />

      {tagsFilter && tagsFilter.length > 0 && (
        <TagsList>
          {tagsFilter.map((item, i) => (
            <Tag key={i} closable>
              {item}
            </Tag>
          ))}
        </TagsList>
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

const ViewContent = styled.div`
  margin-top: 30px;
  background: #FFFFFF;
  box-shadow: 0px 2px 8px rgba(64, 73, 80, 0.15);
  border-radius: 5px;
  position: relative;
`;

const LabelSort = styled.span`
  display: inline-block;
  margin-right: 10px;
`;

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
  ${"" /* color: #ccc; */}
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

const ButtonEditCustomer = styled(Button)`
  border-radius: 4px 0 0 4px;
  border-right: 0;
`;

const ButtonMoreActions = styled(Button)`
  border-radius: 0 4px 4px 0px;
`;

const FullName = styled.a`
  font-size: 16px;
  color: #333;
  font-weight: bold;
`;

const InputTabs = styled(Tabs)`
  .ant-tabs-nav {
    height: 50px;
    margin-left: 25px!important;
    margin-right: 93px;
    .ant-tabs-tab {
      padding-top: 7px!important;
      padding-bottom: 7px!important;
      font-family: Proxima Nova;
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 144.89%;
      color: #404950;
    }
  }
  .ant-tabs-content-holder {
    width: 100%;
    border-left: none;
    .ant-tabs-tabpane {
      padding-left: 0!important;
    }
  }

`;

const DataTable = styled(Table)`
  thead {
    tr {
      height: 50px;
      border-top: 1px solid #EDEDED;
      th {
        &:nth-child(2) {
          padding-left: 0!important;
        }
        padding: 25px!important;
        background: white!important;
        font-family: Proxima Nova;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 144.89%;
        color: #404950;
      }
    }
  }
  tbody {
    tr {
      height: 70px;
      td {
        &:nth-child(2) {
          padding-left: 0;
        }
        padding: 25px;
        font-family: Proxima Nova;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 16px;
        color: #404950;
      }
    }
  }
`;

const ContentBox = styled.div`
  padding-right: ${props => props.paddingRight ? props.paddingRight : 0}px;
  margin-top: ${(props) => (props.marginTop ? props.marginTop : "0px")};
`;

const mapStateToProps = (store) => {
  return {
    customerData: store.customerReducer.customerData,
  };
};
const mapDispatchToProps = {
  getCustomers,
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewCustomers);