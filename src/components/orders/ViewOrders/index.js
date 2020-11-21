import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Router from "next/router";
import Link from "next/link";
import { connect } from "react-redux";
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
  Input,
} from "antd";
// fake data
import MDMessages from "../../atoms/MDMessages";
import MDFulfill from "../../atoms/MDFulfill";
import { getOrders } from "../../../redux/actions/orders";
import { getUserData } from "../../../utils";
const { TabPane } = Tabs;
const { Panel } = Collapse;

const ViewOrders = (props) => {
  const orderData =props.orderData === undefined ? [] : props.orderData
  const [tabIndex, setTabIndex] = useState(1);
  const [isOpenMoreFilter, setOpenMoreFilters] = useState(false);
  const [valuesCollapse, setShowCollapse] = useState([]);
  const [valueSubscription, setValueSubscription] = useState(0);
  const [tags, setTags] = useState([]);
  const [tagsFilter, setTagsFilter] = useState([]);
  const [checkedList, setCheckedList] = useState([]);
  const [isOpenAddTags, setMDAddTags] = useState(false);
  const [isOpenDeleteTags, setMDDeleteTags] = useState(false);
  const [isOpenDeleteSelected, setShowMDDeleteSelected] = useState(false);
  const [isShowCapture, setShowCapture] = useState(false);
  const [isShowFulfill, setShowFulfil] = useState(false);
  const dataNew = orderData.filter((el) => {
    return el.isNew === true;
  });
  let userData = getUserData()
  useEffect(() => {
    getOrdersCall();
  }, [props]);
  
  const getOrdersCall = async () => {
    await props.getOrders();
  };
  const columns = [
    {
      title: "Order",
      dataIndex: "order_id",
      render: (value, item) => {
        return (
          <Link href={`/orders/${item._id}`} >
          <FullName href="">#{item._id}</FullName>
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
      render: (value, item) => (

        <Dropdown
          trigger={["click"]}
          overlay={
            <PopupDetailTB>
              {console.log('11111111111111111', value, item)}
              <h3>
                {item.ShippingAddress.BasicDetailsFirstName} {item.ShippingAddress.BasicDetailsLastName}
              </h3>
              <p>{item.ShippingAddress.AddressDetailsApartment}</p>
              {/* <p>
                {item.ShippingAddress.order} order{item.ShippingAddress.order > 1 ? "s" : ""}
              </p> */}
              <TextPhone>{item.ShippingAddress.AddressDetailsMobile}</TextPhone>
              <div>

                {/* <Button block type="default">
                  <Link href="/[portal_id]/ecom/customers/123" as={`/${userData?.uniqueID}/ecom/customers/123`} shallow={true}>
                    <a>View customer</a>
                  </Link>
                </Button> */}
              </div>
            </PopupDetailTB>
          }
          placement="bottomCenter"
        >
          <ButtonCustomer type="text">
            {item.ShippingAddress.BasicDetailsFirstName} {item.ShippingAddress.BasicDetailsLastName} <DownOutlined />
          </ButtonCustomer>
        </Dropdown>
      ),
      align: "left",
    },
    {
      title: "Amount",
      dataIndex: "total",
      render: (value, item) => `$${item.OrderAmount}`,
    },
    {
      title: "Payment",
      dataIndex: "status_payment",
      render: (value, item) => {
        if (item.PaymentMethod !== null) {
          return <TagDark>Paid</TagDark>;
        } else {
          return <TagOrang>Pending</TagOrang>;
        }
      },
    },
    {
      title: "Fulfillment",
      dataIndex: "fulfillment",
      render: (value, item) => {
        if (item.status === 1) {
          return <TagYellow>Unfullfilled</TagYellow>;
        } else {
          return <TagGreen>Fullfilled</TagGreen>;
        }
      },
    },
    {
      title: "Items",
      dataIndex: "items",
      render: (value, items) => {
        let data = [];
        for (let i = 0; i < items.Products.length; i++) {
          const item = items[i];
          data.push(
            <Dropdown
              // key={i}
              trigger={["click"]}
              overlay={
                <PopupDetailTB>
                  <Tag>{item.status}</Tag>
                  <div>
                    <img src={item.image} alt="" />
                    <Link href={`/products/[productId]`} as="/products/123456789">
                      <a href="">{item.name}</a>
                    </Link>
                    <p>{item.style}</p>
                    <p>SKU {item.sku}</p>
                  </div>
                </PopupDetailTB>
              }
              placement="bottomRight"
            >
              {/* <ButtonCustomer type="text">
                {items && items.length > 1
                  ? `${items.length} items`
                  : `${items.length} item`}{" "}
                <DownOutlined />
              </ButtonCustomer> */}
            </Dropdown>
          );

          return data;
        }
      },
    },
    {
      title: "Shipping",
      dataIndex: "shipping",
    }
  ];

  const handleMenuClickCheckbox = (e) => { };

  const onCreateShippingLabels = () => {
    Router.router.push("/orders/shipping-labels");
  };

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
      setTagsFilter(["Open orders", "Unfulfilled, Partially fulfilled"]);
    } else if (key === "3") {
      setTagsFilter(["Open orders", "Payment unpaid"]);
    } else if (key === "4") {
      setTagsFilter(["Open orders"]);
    } else if (key === "5") {
      setTagsFilter(["Archived"]);
    } else {
      setTagsFilter([]);
    }
  };

  const onChangeSubscription = (e) => {
    setValueSubscription(e.target.value);
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

  const [step, setStep] = useState("1");

  const onTabClick = (e) => {
    setStep('' + e);
  }

  const goToNewPage = () => {
    Router.router.push(`/[portal_id]/ecom/orders/drafts/new`, { pathname: `/${userData?.uniqueID}/ecom/orders/drafts/new` }, { shallow: true });
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
              dataSource={orderData}
              pagination={orderData.length > 10}
            />
          </ContentBox>
        </TabPane>
        <TabPane tab="Drafts" key="2">
          <ContentBox>
            <DataTable
              rowSelection={{
                type: "checkbox",
                ...rowSelection,
              }}
              columns={columns}
              dataSource={orderData}
              pagination={orderData.length > 10}
            />
          </ContentBox>
        </TabPane>
        <TabPane tab="Unfulfilled" key="3">
          <ContentBox>
            <DataTable
              rowSelection={{
                type: "checkbox",
                ...rowSelection,
              }}
              columns={columns}
              dataSource={dataNew && dataNew.length > 0 ? dataNew : []}
              pagination={orderData.length > 10}
            />
          </ContentBox>
        </TabPane>
        <TabPane tab="Unpaid" key="4">
          <ContentBox>
            <DataTable
              rowSelection={{
                type: "checkbox",
                ...rowSelection,
              }}
              columns={columns}
              dataSource={[]}
              pagination={orderData.length > 10}
            />
          </ContentBox>
        </TabPane>
      </InputTabs>

      <Filters top={10} right={30} onOpen={setOpenMoreFilters} goToNewPage={() => goToNewPage()}/>

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
          <ButtonEditCustomer onClick={() => onCreateShippingLabels()}>
            Create shipping labels
          </ButtonEditCustomer>
          <ButtonCenterCustomer onClick={() => setShowFulfil(true)}>
            Fulfill orders
          </ButtonCenterCustomer>
          <ButtonCenterCustomer onClick={() => setShowCapture(true)}>
            Capture payments
          </ButtonCenterCustomer>
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
        </ActionsTable>
      )}

      <MDFulfill
        isOpen={isShowFulfill}
        title={`Fulfill ${checkedList.length} order${checkedList.length > 1 ? "s" : ""
          }`}
        content="This will mark these orders as fulfilled."
        cancelText="Cancel"
        okText="Fulfil"
        onOk={() => setShowFulfil(false)}
        onCancel={() => setShowFulfil(false)}
      />

      <MDMessages
        isOpen={isShowCapture}
        title="Capture all order payments"
        content="This will capture payments for all selected orders."
        cancelText="Cancel"
        okText="Capture order payments"
        onOk={() => setShowCapture(false)}
        onCancel={() => setShowCapture(false)}
      />

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
                <PanelTitle>Delivery method</PanelTitle>
              </div>
            }
            key="1"
          >
            <CheckboxGroupStyle>
              <CheckboxStyle value={1}>Local delivery</CheckboxStyle>
              <CheckboxStyle value={2}>Local pickup</CheckboxStyle>
              <CheckboxStyle value={3}>Ship to customer</CheckboxStyle>
            </CheckboxGroupStyle>

            <ButtonLink type="text">Clear</ButtonLink>
          </PanelStyle>
          <PanelStyle
            header={
              <div>
                <PanelTitle>Status</PanelTitle>
              </div>
            }
            key="2"
          >
            <RadioGroupStyle
              onChange={onChangeSubscription}
              value={valueSubscription}
            >
              <RadioStyle value={1}>Open</RadioStyle>
              <RadioStyle value={2}>Archived</RadioStyle>
              <RadioStyle value={3}>Canceled</RadioStyle>
            </RadioGroupStyle>
            <ButtonLink type="text">Clear</ButtonLink>
          </PanelStyle>

          <PanelStyle
            header={
              <div>
                <PanelTitle>Payment status</PanelTitle>
              </div>
            }
            key="3"
          >
            <CheckboxGroupStyle>
              <CheckboxStyle value={1}>Authorized</CheckboxStyle>
              <CheckboxStyle value={2}>Paid</CheckboxStyle>
              <CheckboxStyle value={3}>Partially refunded</CheckboxStyle>
              <CheckboxStyle value={4}>Partially paid</CheckboxStyle>
              <CheckboxStyle value={5}>Pending</CheckboxStyle>
              <CheckboxStyle value={6}>Refunded</CheckboxStyle>
              <CheckboxStyle value={7}>Unpaid</CheckboxStyle>
              <CheckboxStyle value={8}>Paid</CheckboxStyle>
            </CheckboxGroupStyle>
            <ButtonLink type="text">Voided</ButtonLink>
          </PanelStyle>

          <PanelStyle
            header={
              <div>
                <PanelTitle>Fulfillment status</PanelTitle>
              </div>
            }
            key="4"
          >
            <CheckboxGroupStyle>
              <CheckboxStyle value={1}>Fulfilled</CheckboxStyle>
              <CheckboxStyle value={2}>Unfulfilled</CheckboxStyle>
              <CheckboxStyle value={3}>Partially fulfilled</CheckboxStyle>
            </CheckboxGroupStyle>
            <ButtonLink type="text">Voided</ButtonLink>
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

          <PanelStyle
            header={
              <div>
                <PanelTitle>Sales channel</PanelTitle>
              </div>
            }
            key="6"
          >
            <CheckboxGroupStyle>
              <CheckboxStyle value={1}>Online Store</CheckboxStyle>
            </CheckboxGroupStyle>
            <ButtonLink type="text">Clear</ButtonLink>
          </PanelStyle>

          <PanelStyle
            header={
              <div>
                <PanelTitle>Chargeback and inquiry status</PanelTitle>
              </div>
            }
            key="7"
          >
            <RadioGroupStyle>
              <RadioStyle value={1}>Open</RadioStyle>
              <RadioStyle value={2}>Submitted</RadioStyle>
              <RadioStyle value={3}>Won</RadioStyle>
              <RadioStyle value={4}>Lost</RadioStyle>
              <RadioStyle value={5}>Any</RadioStyle>
            </RadioGroupStyle>
            <ButtonLink type="text">Clear</ButtonLink>
          </PanelStyle>

          <PanelStyle
            header={
              <div>
                <PanelTitle>Risk level</PanelTitle>
              </div>
            }
            key="8"
          >
            <CheckboxGroupStyle>
              <CheckboxStyle value={1}>High</CheckboxStyle>
              <CheckboxStyle value={2}>Medium</CheckboxStyle>
              <CheckboxStyle value={3}>Low</CheckboxStyle>
            </CheckboxGroupStyle>
            <ButtonLink type="text">Voided</ButtonLink>
          </PanelStyle>

          <PanelStyle
            header={
              <div>
                <PanelTitle>Date</PanelTitle>
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
                <PanelTitle>Credit card (Last four digits)</PanelTitle>
              </div>
            }
            key="10"
          >
            <InputStyle placeholder="xxxx" />
            <ButtonLink type="text">Clear</ButtonLink>
          </PanelStyle>
        </CollapseStyle>
      </Drawer>
    </ViewContent>
  );
};

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
      height: 80px;
      td {
        &:not(:nth-child(1)) {
          padding-left: 0px;
        }
        padding: 15px;
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

const ViewContent = styled.div`
  margin-top: 30px;
  background: #FFFFFF;
  box-shadow: 0px 2px 8px rgba(64, 73, 80, 0.15);
  border-radius: 5px;
  position: relative;
`;

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

const ButtonCenterCustomer = styled(Button)`
  border-radius: 0;
  border-right: 0;
`;

const ButtonMoreActions = styled(Button)`
  border-radius: 0 4px 4px 0px;
`;

const FullName = styled.a`
  font-size: 14px;
  font-weight: 600;
`;

const ButtonBox = styled(Button)`
  padding: 6px 12px;
  height: auto;
  border-radius: 0;
  border-left: 0;
`;

const TextPhone = styled.p``;

const TagDark = styled(Tag)`
  border-radius: 15px;
  padding: 1px 10px;
  border: none;
  background: rgb(223, 227, 232);
  color: #000;
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

const PopupDetailTB = styled.div`
  background: #fff;
  border-radius: 5px;
  padding: 15px;
  -webkit-box-shadow: 0px 0px 3px 0px rgba(163, 161, 163, 1);
  -moz-box-shadow: 0px 0px 3px 0px rgba(163, 161, 163, 1);
  box-shadow: 0px 0px 3px 0px rgba(163, 161, 163, 1);
`;

const InputStyle = styled(Input)`
  width: 100%;
`;

const ActionsTable = styled.div`
  padding: 24px;
`;

const mapStateToProps = (store) => {
  return {
    orderData: store.orderReducer.orderData,
  };
};
const mapDispatchToProps = {
  getOrders,
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewOrders);