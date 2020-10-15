import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { TweenOneGroup } from "rc-tween-one";
import { connect } from "react-redux";
import Link from "next/link";
// icon
import {
  SearchOutlined,
  FileTextOutlined,
  CreditCardOutlined,
  PlusOutlined,
  CloseOutlined,
} from "@ant-design/icons";
// ui
import {
  Form,
  Input,
  Row,
  Col,
  Button,
  Popover,
  Checkbox,
  Alert,
  Modal,
  Card,
  Divider,
  InputNumber,
  List,
  Tooltip,
  Tag,
  Dropdown,
} from "antd";
import { Formik } from "formik";
import MDSelectProducts from "../MDSelectProducts";
import {
  AddDiscount,
  Taxes,
  AddShipment,
  ViewTags,
  EditEmail,
  ShippingAddress,
} from "../Modal";
import { getCustomers } from "../../../redux/actions/customers";
// import { customer } from "../fakeData";

const { Search } = Input;
const newForm = (props) => {
  let orderInfo = {
    listOrders: [],
    selectedCustomer: null,
    subTotal: 0.0,
    tags: ['test']

  
  }
  const [orderDetails, setOrderDetails] = useState(orderInfo);
  const [visiable, setVisible] = useState(false);
  const [openCustumItem, setopenCustumItem] = useState(false);
  const [searchCustomner, setSearchcustomer] = useState("");
  // const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isOpenSelectProduct, setShowSelectProduct] = useState(false);
  const [listOrders, setListOrders] = useState([]);
  const [subTotal, setSubTotal] = useState(0.0);
  const [tags, setTags] = useState(["test"]);
  const [inputValue, setInputValue] = useState("");
  const [inputVisible, setInputVisible] = useState(false);
  const [openEmailPopup, setOpenEmailPopup] = useState(false);
  const [openShippingPopup, setOpenShippingPopup] = useState({
    status: false,
    name: "",
  });
  const [openViewTagsPopup, setOpenViewTagsPopup] = useState(false);
  useEffect(() => {
    getCustomersCall();
  }, [props]);

  useEffect(() => {
    if (props.saveFlag !== "") {
      handleSubmit()
    }
  }, [props.saveFlag])

  const handleSubmit = () => {

      props.saveSubmit(productDetails)
  }

  const getCustomersCall = async () => {
    await props.getCustomers();
  };

  const content = (data, change) => {
    
    const customer = props.customerData === undefined ? [] : props.customerData
    const [customerdata, setCustomerData] = useState([]);
    const UpdateData = () => {
      setCustomerData(customer.filter((res) => !res.BasicDetailsFirstName.search(data)));
    };

    useEffect(() => {
      UpdateData();
    }, [data]);

    

    return (
      <div>
        <PopoverHeader>
          <PlusOutlined />
          <p>Create a new customer</p>
        </PopoverHeader>
        {customerdata.map((res, index) => {
          return (
            <PopoverContent key={index} onClick={() => change(res)}>
              <StyledAvatar src={res.profile_url} alt="profile image" />
              <div className="customer-infor">
                <p>{res.BasicDetailsFirstName}</p>
                <p>{res.BasicDetailsEmail}</p>
              </div>
            </PopoverContent>
          );
        })}
      </div>
    );
  };




  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleVisibleChange = (visible) => {
    setVisible(!visiable);
  };

  const data = (res) => {
    let cloneCustomer = orderDetails
    cloneCustomer.selectedCustomer=res
    console.log('dsfdfdfdfdf',cloneCustomer )
    setOrderDetails(cloneCustomer);
  };

  useEffect(() => { }, [searchCustomner, orderInfo.selectedCustomer]);

  const showModal = () => {
    setopenCustumItem(!openCustumItem);
  };

  // Tags group actions
  const handleClose = (removedTag) => {
    const removeTags = tags.filter((tag) => tag !== removedTag);
    setTags(removeTags);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    let tag = tags;
    if (inputValue && tag.indexOf(inputValue) === -1) {
      tag = [...tag, inputValue];
    }
    setTags(tag);
    setInputVisible(false);
    setInputValue("");
  };

  const saveInputRef = (input) => {
    input = input;
  };

  const forMap = (tag) => {
    const tagElem = (
      <TagContent
        closable
        onClose={(e) => {
          e.preventDefault();
          handleClose(tag);
        }}
      >
        {tag}
      </TagContent>
    );
    return (
      <span key={tag} style={{ display: "inline-block" }}>
        {tagElem}
      </span>
    );
  };

  const tagChild = tags.map(forMap);

  // Tags modal
  const handleOpenViewTagsPopup = () => {
    setOpenViewTagsPopup(!openViewTagsPopup);
  };

  const handleCloseViewTagsPopup = () => {
    setOpenViewTagsPopup(false);
  };

  // Customer modal
  const handleCancel = (e) => {
    setopenCustumItem(false);
  };

  const handleColsecontact = (e) => {
    let cloneCustomer = orderDetails
    cloneCustomer.selectedCustomer=null
    setOrderDetails(cloneCustomer);
  };

  // Edit email
  const handleEmailEditModal = () => {
    setOpenEmailPopup(!openEmailPopup);
  };

  const handleCloseEmailPopup = () => {
    setOpenEmailPopup(false);
  };

  // Edit address
  const handleShippingEditModal = (value) => {
    setOpenShippingPopup({ status: !openShippingPopup.status, name: value });
  };

  const handleCloseShippingPopup = () => {
    setOpenShippingPopup({ status: false, name: openShippingPopup.name });
  };

  const onChangeTotal = (e, index) => {
    let data = [];
    let subTotal = 0;
    for (let i = 0; i < listOrders.length; i++) {
      const item = listOrders[i];

      if (i === index) {
        item.total = e;
        data.push(item);
      } else {
        data.push(item);
      }

      let _price = item.price * item.total;
      subTotal += _price;
    }

    setListOrders(data);
    setSubTotal(subTotal);
  };

  const onAddProductsSearch = (num) => {
    let data = [];
    let subTotal = 0;
    for (let i = 0; i < num; i++) {
      data.push({
        id: i + 1,
        image:
          "https://cdn.shopify.com/s/files/1/0451/1472/0419/products/0_Ryder-Shoes-Men-And-Women-Dropship-Indestructible-Steel-Toe-Air-Safety-Boots-Puncture-Proof-Work-Sneakers_1_300x300_cc63d031-a9b3-4a95-8fb4-e12f8cf7e49d_small.jpg?v=1596714418",
        name: "Indestructible Shoes " + i,
        style: "Black / US 9 - 9.5 | EU 43 • 112",
        sku: 101,
        price: 59.99,
        total: 1,
      });
      subTotal += 59.99;
    }
    setListOrders(data);
    setShowSelectProduct(false);
    setSubTotal(subTotal);
  };

  const onRemoveOrderItem = async (index) => {
    let subTotal = 0;
    let data = await listOrders.filter((item, i) => {
      if (index !== i) {
        let _price = item.price * item.total;
        subTotal += _price;
        return item;
      }
    });
    await setListOrders(data);
    await setSubTotal(subTotal);
  };

  return (
    <Form
      name="basic"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      className="form-new"
      layout="vertical"
    >
      <SubForm>
        <Row gutter={24}>
          <Col md={16}>
            <Row gutter={24}>
              <Col md={24}>
                <ContentBox>
                  <AlignItem>
                    <TitleBox>Order details</TitleBox>
                    <ContentTitle className="TextAlign" onClick={showModal}>
                      Add custom item
                    </ContentTitle>
                  </AlignItem>

                  <StyledSearch
                    placeholder="Search products"
                    enterButton="Browse products"
                    enterButton={
                      <Button onClick={() => setShowSelectProduct(true)}>
                        Browse products
                      </Button>
                    }
                    size="large"
                    onChange={(e) => setShowSelectProduct(true)}
                    onClick={() => setShowSelectProduct(true)}
                    prefix={<SearchOutlined />}
                  />

                  {listOrders && listOrders.length > 0 && (
                    <List
                      dataSource={listOrders}
                      renderItem={(item, i) => (
                        <List.Item>
                          <ProductDetail>
                            <ProductView>
                              <ImageView src={item.image} alt="" />
                              <div>
                                <Link href={`/products/[productId]`} as="/products/123456789">
                                  <a href="#">{item.name}</a>
                                </Link>
                                <TextStyle>{item.style}</TextStyle>
                                <TextStyle>SKU: {item.sku}</TextStyle>
                              </div>
                            </ProductView>
                            <InputTotal>
                              <LabelPriceStyle title="Add item discount">
                                <Dropdown
                                  trigger={["click"]}
                                  overlay={
                                    <Card>
                                      <div>
                                        <LabelStyle>
                                          Discount this item by
                                        </LabelStyle>
                                      </div>
                                    </Card>
                                  }
                                >
                                  <a href="#">${item.price}</a>
                                </Dropdown>
                              </LabelPriceStyle>
                              <InputNumberStyle
                                onChange={(e) => onChangeTotal(e, i)}
                                value={item.total}
                                min={0}
                                max={10}
                              />
                              <LabelStyle>
                                ${item.total * item.price}
                              </LabelStyle>
                            </InputTotal>

                            <ButtonRemove onClick={() => onRemoveOrderItem(i)}>
                              <CloseOutlined />
                            </ButtonRemove>
                          </ProductDetail>
                        </List.Item>
                      )}
                    />
                  )}

                  <Row className="price-content" gutter={24}>
                    <Col md={12}>
                      <Form.Item label="Notes" name="notes">
                        <TextInput placeholder="Add a note..." />
                      </Form.Item>
                    </Col>
                    <Col className="title" md={6}>
                      <Popover
                        content={AddDiscount}
                        placement="bottomRight"
                        trigger="click"
                        className="new-order"
                      // visible={true}
                      // onVisibleChange={handleVisibleChange}
                      >
                        <ContentTitle>Add discount</ContentTitle>
                      </Popover>
                      <p>SubTotal</p>
                      <Popover
                        content={AddShipment}
                        placement="bottom"
                        trigger="click"
                      // visible={true}
                      // onVisibleChange={handleVisibleChange}
                      >
                        <ContentTitle>Add shipment</ContentTitle>
                      </Popover>
                      <Popover
                        content={Taxes}
                        placement="bottomRight"
                        trigger="click"
                      // visible={true}
                      // onVisibleChange={handleVisibleChange}
                      >
                        <ContentTitle>Taxes</ContentTitle>
                      </Popover>
                      <Total>Total</Total>
                    </Col>
                    <Col className="price" md={6}>
                      <p>-</p>
                      <p>${subTotal}</p>
                      <p>-</p>
                      <p>$0.00</p>
                      <Total>${subTotal}</Total>
                    </Col>
                  </Row>
                </ContentBox>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col md={24}>
                <EmailSection>
                  <Labelsection>
                    <Icons>
                      <FileTextOutlined />
                    </Icons>
                    <ContentLabel> EMAIL INVOICE </ContentLabel>
                  </Labelsection>
                  <Button disabled>Email invoice</Button>
                </EmailSection>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col md={24}>
                <ContentBox>
                  <Labelsection>
                    <Icons>
                      <CreditCardOutlined />
                    </Icons>
                    <ContentLabel> ACCEPT PAYMENT </ContentLabel>
                  </Labelsection>
                  <PaymentSection>
                    <Button disabled>Mark as paid</Button>
                    <Button disabled>Mark as pending</Button>
                    <Button disabled>pay with credit card</Button>
                  </PaymentSection>
                </ContentBox>
              </Col>
            </Row>
          </Col>
          <Col md={8}>
            {orderInfo.selectedCustomer === null && (
              <ContentBox>
                <TitleBox>Find and Create customer </TitleBox>
                <Popover
                  content={() => content(searchCustomner, data)}
                  placement="bottom"
                  trigger="click"
                  visible={visiable}
                  onVisibleChange={handleVisibleChange}
                >
                  <SearchCustomerInput
                    placeholder="Search customers"
                    size="large"
                    prefix={<SearchOutlined />}
                    onClick={handleVisibleChange}
                    onChange={(e) => setSearchcustomer(e.target.value)}
                  />
                </Popover>
              </ContentBox>
            )}
            {orderInfo.selectedCustomer !== null && (
              <>
                <ContentBox>
                  <AlignItem>
                    <TitleBox>Customer </TitleBox>
                    <CloseOutlined onClick={handleColsecontact} />
                  </AlignItem>
                  <StyledAvatar
                    width="55"
                    height="55"
                    src={orderInfo.selectedCustomer.profile_url}
                    alt="avatar"
                  />
                  <ContentTitle align="left">
                    {orderInfo.selectedCustomer.BasicDetailsFirstName}
                  </ContentTitle>
                  <AlignItem>
                    <ContentTitle>{orderInfo.selectedCustomer.BasicDetailsEmail}</ContentTitle>
                    <ContentTitle onClick={handleEmailEditModal}>
                      Edit
                    </ContentTitle>
                  </AlignItem>
                </ContentBox>
                <ContentBox>
                  <AlignItem>
                    <TitleBoxAddress>SHIPPING ADDRESS</TitleBoxAddress>
                    <ContentTitle
                      onClick={() => handleShippingEditModal("shipping")}
                    >
                      Edit
                    </ContentTitle>
                  </AlignItem>
                  <p>
                    {orderInfo.selectedCustomer.AddressDetailsApartment}
                    {orderInfo.selectedCustomer.AddressDetailsCompany}
                  </p>
                  <p>
                    {orderInfo.selectedCustomer.AddressDetailsCity}
                  </p>
                  <p>{orderInfo.selectedCustomer.AddressDetailsCountry}</p>
                </ContentBox>
                <ContentBox>
                  <AlignItem>
                    <TitleBoxAddress>BILLING ADDRESS</TitleBoxAddress>
                    <ContentTitle
                      onClick={() => handleShippingEditModal("billing")}
                    >
                      Edit
                    </ContentTitle>
                  </AlignItem>
                  <p>
                    {orderInfo.selectedCustomer.AddressDetailsApartment}
                    {orderInfo.selectedCustomer.AddressDetailsCompany}
                  </p>
                  <p>
                    {orderInfo.selectedCustomer.AddressDetailsCity}
                  </p>
                  <p>{orderInfo.selectedCustomer.AddressDetailsCountry}</p>
                </ContentBox>
              </>
            )}
            <ContentBox marginTop="20px">
              <Tagcontent>
                <TitleBox>Tags</TitleBox>
                <ContentTitle
                  className="TextAlign"
                  onClick={handleOpenViewTagsPopup}
                >
                  View all tags
                </ContentTitle>
              </Tagcontent>
              <TagBlock>
                <div>
                  <Input
                    ref={saveInputRef}
                    type="text"
                    size="large"
                    value={inputValue}
                    onChange={handleInputChange}
                    onBlur={handleInputConfirm}
                    onPressEnter={handleInputConfirm}
                  />
                  <TweenOneGroup
                    enter={{
                      scale: 0.8,
                      opacity: 0,
                      type: "from",
                      duration: 100,
                      with: 10,
                      onComplete: (e) => {
                        e.target.style = "";
                      },
                    }}
                    leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
                    appear={false}
                  >
                    {tagChild}
                  </TweenOneGroup>
                </div>
              </TagBlock>
            </ContentBox>
          </Col>
        </Row>
      </SubForm>

      <MDSelectProducts
        isOpen={isOpenSelectProduct}
        onCancel={() => setShowSelectProduct(false)}
        onAdd={onAddProductsSearch}
      />

      {/*  add customer item modal */}
      <Modal
        visible={openCustumItem}
        width="35%"
        onCancel={handleCancel}
        footer={null}
      >
        <Wraper className="customer-item-content">
          <CardViews
            bordered={false}
            style={{ width: "100%" }}
            title="Add custom item"
          >
            <Formik
              initialValues={{
                item_name: "",
                price: "",
                qty: "",
                item_shipping: false,
                item_taxable: false,
              }}
              validate={(values) => {
                const errors = {};
                if (!values.item_name) {
                  errors.item_name = "Required";
                }
                if (!values.price) {
                  errors.price = "!Required";
                }
                if (!values.qty) {
                  errors.qty = "!Required";
                }
                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  alert(JSON.stringify(values, null, 2));
                  setSubmitting(false);
                }, 400);
              }}
            >
              {({
                values,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                errors,
                touched,
                /* and other goodies */
              }) => (
                  <form id="myForm" onSubmit={handleSubmit}>
                    <Row gutter={24}>
                      <Col className="gutter-row" span={12}>
                        <div>
                          <span>
                            <label>Line item name </label>
                          </span>
                          <Input
                            name="item_name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.item_name}
                            size="large"
                          />
                        </div>
                      </Col>
                      <Col className="gutter-row" span={6}>
                        <div>
                          <span>
                            <label>Price per item </label>
                          </span>
                          <Input
                            name="price"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.price}
                            prefix="$"
                            size="large"
                          />
                        </div>
                      </Col>
                      <Col className="gutter-row" span={6}>
                        <div>
                          <span>
                            <label>Quantity </label>
                          </span>
                          <Input
                            name="qty"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.qty}
                            type="number"
                            size="large"
                          />
                        </div>
                      </Col>
                    </Row>
                    <Row gutter={16} style={{ marginTop: "1rem" }}>
                      <Col className="gutter-row" span={16}>
                        <Checkbox
                          name="item_taxable"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          checked={values.item_taxable}
                        >
                          Item is taxable
                      </Checkbox>
                      </Col>
                    </Row>
                    <Row gutter={16} style={{ marginTop: "1rem" }}>
                      <Col className="gutter-row" span={16}>
                        <Checkbox
                          name="item_shipping"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          checked={values.item_shipping}
                        >
                          Item requires shipping
                      </Checkbox>
                      </Col>
                    </Row>
                    {values.item_shipping ? (
                      <StyledAlert
                        message={
                          <>
                            <Link href="#">
                              <a>Create a product</a>
                            </Link>{" "}
                          with weight specified to calculate shipping rates
                          accurately
                          </>
                        }
                        type="warning"
                      />
                    ) : null}
                    <Divider />
                    <ItemAction>
                      <Button size="large">Cancel</Button>
                      <Button
                        form="myForm"
                        key="submit"
                        size="large"
                        htmlType="submit"
                        type="primary"
                        disabled={isSubmitting}
                      >
                        Save line item
                    </Button>
                    </ItemAction>
                  </form>
                )}
            </Formik>
          </CardViews>
        </Wraper>
      </Modal>
      <ShippingAddress
        open={openShippingPopup.status}
        close={handleCloseShippingPopup}
        values={orderInfo.selectedCustomer && orderInfo.selectedCustomer.email}
        name={openShippingPopup.name}
      />
      <EditEmail
        open={openEmailPopup}
        close={handleCloseEmailPopup}
        values={orderInfo.selectedCustomer && orderInfo.selectedCustomer.email}
      />
      <ViewTags
        open={openViewTagsPopup}
        close={handleCloseViewTagsPopup}
        closeTag={handleClose}
        values={tags}
      />
    </Form>
  );
};

const ButtonRemove = styled.a`
  color: #ccc;
  margin-left: 30px;
`;

const TitleBoxAddress = styled.span`
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 0;
  line-height: 3;
`;

const InputNumberStyle = styled(InputNumber)`
  margin: 0 10px;
`;

const TextStyle = styled.p`
  margin: 0;
  font-size: 14px;
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
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 5px;
`;

const InputTotal = styled.div`
  height: 100%;
  align-items: center;
  display: inline-flex;
`;

const LabelPriceStyle = styled(Tooltip)``;
const LabelStyle = styled.span``;

const SubForm = styled.div`
  padding: 15px 0;

  & .p {
    text-align: right;
    line-height: 2rem;
  }
`;

const ContentBox = styled.div`
  padding: 20px;
  margin-top: ${(props) => (props.marginTop ? props.marginTop : "0px")};
  background: #fff;
  box-shadow: 0px 4px 4px rgba(186, 195, 201, 0.25);
  border: 1px solid #ddd;
  border-radius: 3px;
  outline: 0.1rem solid transparent;
  .price-content {
    padding-top: 30px;
    .title {
      text-align: right;
      line-height: 2;
    }
    .price p {
      margin-bottom: 12px;
      line-height: 2;
      text-align: right;
    }
  }
`;

const TagContent = styled(Tag)`
  padding: 5px 10px;
  marginbottom: 10px;
`;

const TagBlock = styled.div`
  margin-top: 10px;
  & div:first-child {
    margin-bottom: 16px;
    & input {
      margin: 10px 0px;
    }
  }
`;

const TitleBox = styled.h3`
  font-weight: 600;
  font-size: 16px;
  color: #000;
  opacity: 0.9;
`;

const AlignItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const StyledSearch = styled(Search)`
  padding-left: 0 !important;
  .ant-btn-primary {
    background: linear-gradient(to bottom, white, #f9fafb);
    border: 1px solid #ddd;
    color: #637381;
    font-size: 14px;
  }
  .ant-input-search {
    padding-left: 15px !important;
  }
`;

const StyledAvatar = styled.img`
  width: ${(props) => (props.width ? props.width : "45px")};
  height: ${(props) => (props.height ? props.height : "45px")};
  border-radius: 50%;
`;

const PopoverHeader = styled.div`
  display: flex;
  height: 50px;
  justify-content: cneter;
  align-items: center;
  font-size: 18px;
  padding: 20px;
  background: #5c6ac4;
  color: #fff;
  & p {
    margin: 0;
    margin-left: 5px;
  }
`;

const PopoverContent = styled.div`
  display: flex;
  margin: 5px 0;
  padding: 0 15px;
  .avatar {
    width: 45px;
    height: 45px;
    border-radius: 50%;
  }
  .customer-infor {
    padding-left: 10px;
    p {
      font-size: 14px;
      margin-bottom: 3px;
    }
  }
  &:hover {
    background: #5c6ac4;
  }
`;

const Labelsection = styled.div`
  display: flex;
  margin: 0;
  font-size: 14px;
`;

const Icons = styled.div`
  font-size: 20px;
`;

const TextInput = styled(Input)`
  padding: 6px 12px;
`;

const ContentLabel = styled.span`
  margin-left: 20px;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 0;
  line-height: 2.5;
`;

const ContentTitle = styled.h4`
  color: rgb(0, 122, 206);
  font-size: 14px;
  cursor: pointer;
  text-align: ${(props) => (props.align ? props.align : "right")};
  font-weight: 400;
  margin-bottom: 5px;
  line-height: 2rem;
`;

const PaymentSection = styled.div`
  text-align: right;
  & button {
    margin-right: 10px;
  }
  & button:last-child {
    margin-right: 0 !important;
  }
`;

const EmailSection = styled.div`
  padding: 24px 24px 24px 24px;
  background: #fff;
  box-shadow: 0px 4px 4px rgba(186, 195, 201, 0.25);
  border: 1px solid #ddd;
  border-radius: 3px;
  outline: 0.1rem solid transparent;
  display: flex;
  justify-content: space-between;
`;

const Total = styled.div`
  text-align: right;
  font-weight: 600;
  font-size: 14x;
`;

const SearchCustomerInput = styled(Input)`
  margin-top: 20px;
  position: relative;
`;

const Tagcontent = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ItemAction = styled.div`
  display: flex;
  align-item: center;
  justify-content: flex-end;
  button {
    margin-left: 10px;
  }
`;

const Wraper = styled.div``;

const StyledAlert = styled(Alert)`
  padding: 20px 25px !important;
  margin-top: 20px;
`;

const CardViews = styled(Card)`
  color: black;
  .ant-card-head-title {
    display: block;
    color: black;
    font-size: 24px;
  }
  .ant-card-body {
  }
`;
const mapStateToProps = (store) => {
  return {
    customerData: store.customerReducer.customerData,
  };
};
const mapDispatchToProps = {
  getCustomers,
};

export default connect(mapStateToProps, mapDispatchToProps)(newForm);
