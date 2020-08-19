import React, { useState, useEffect } from "react";
import styled from "styled-components";
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
} from "antd";
import Tags from "../../Tags";
import { Formik } from "formik";
import MDSelectProducts from "../MDSelectProducts";
const { Search } = Input;

const customer = [
  {
    profile_url:
      "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
    name: "BOB",
    email: "bob@gmail.com",
    address: {
      address_one: "4012 Town ship",
      address_two: "",
      city: "Da Nang",
      state: "hoakhanh",
      country: "VietNam",
      zipcode: "395010",
    },
  },
  {
    profile_url:
      "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
    name: "Charly",
    email: "charly@gmail.com",
    address: {
      address_one: "Royal coffe",
      address_two: "",
      city: "Boise",
      state: "Idaho",
      country: "USA",
      zipcode: "83703",
    },
  },
  {
    profile_url:
      "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
    name: "Vir",
    email: "vir@gmail.com",
    address: {
      address_one: "",
      address_two: "",
      city: "meridian",
      state: "Idaho",
      country: "USA",
      zipcode: "83705",
    },
  },
];

const content = (data, change) => {
  const [customerdata, setCustomerData] = useState([]);

  const UpdateData = () => {
    setCustomerData(customer.filter((res) => !res.name.search(data)));
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
              <p>{res.name}</p>
              <p>{res.email}</p>
            </div>
          </PopoverContent>
        );
      })}
    </div>
  );
};

const newForm = () => {
  const [visiable, setVisible] = useState(false);
  const [openCustumItem, setopenCustumItem] = useState(false);
  const [searchCustomner, setSearchcustomer] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isOpenSelectProduct, setShowSelectProduct] = useState(false);

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
    console.log(res);
    setSelectedCustomer(res);
  };

  useEffect(() => {}, [searchCustomner, selectedCustomer]);

  const showModal = () => {
    setopenCustumItem(!openCustumItem);
  };

  const handleOk = (e) => {
    setopenCustumItem(false);
  };

  const handleCancel = (e) => {
    setopenCustumItem(false);
  };

  const handleColsecontact = (e) => {
    setSelectedCustomer(null);
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
                      <Button onClick={() => setShowSelectProduct(true)}>Browse products</Button>
                    }
                    size="large"
                    onChange={e => setShowSelectProduct(true)}
                    onClick={() => setShowSelectProduct(true)}
                    prefix={<SearchOutlined />}
                  />

                  <Row className="price-content" gutter={24}>
                    <Col md={12}>
                      <Form.Item label="Notes" name="notes">
                        <TextInput placeholder="Add a note..." />
                      </Form.Item>
                    </Col>
                    <Col className="title" md={6}>
                      <ContentTitle>Add discount</ContentTitle>
                      <ContentTitle>SubTotal</ContentTitle>
                      <ContentTitle>Add shipment</ContentTitle>
                      <ContentTitle>Taxes</ContentTitle>
                      <Total>Total</Total>
                    </Col>
                    <Col className="price" md={6}>
                      <p>-</p>
                      <p>$0.00</p>
                      <p>-</p>
                      <p>$0.00</p>
                      <Total>$0.00</Total>
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
            {selectedCustomer === null && (
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
            {selectedCustomer !== null && (
              <>
                <ContentBox>
                  <AlignItem>
                    <TitleBox>Customer </TitleBox>
                    <CloseOutlined onClick={handleColsecontact} />
                  </AlignItem>
                  <StyledAvatar
                    width="55"
                    height="55"
                    src={selectedCustomer.profile_url}
                    alt="avatar"
                  />
                  <ContentTitle align="left">
                    {selectedCustomer.name}
                  </ContentTitle>
                  <AlignItem>
                    <ContentTitle>{selectedCustomer.email}</ContentTitle>
                    <ContentTitle>Edit</ContentTitle>
                  </AlignItem>
                </ContentBox>
                <ContentBox>
                  <AlignItem>
                    <TitleBox>Shipping Address </TitleBox>
                    <ContentTitle>Edit</ContentTitle>
                  </AlignItem>
                  <p>
                    {selectedCustomer.address.address_one}
                    {selectedCustomer.address.address_two}
                  </p>
                  <p>
                    {selectedCustomer.address.city}
                    {selectedCustomer.address.state}
                  </p>
                  <p>{selectedCustomer.address.country}</p>
                </ContentBox>
                <ContentBox>
                  <AlignItem>
                    <TitleBox>Edit Address </TitleBox>
                    <ContentTitle>Edit</ContentTitle>
                  </AlignItem>
                  <p>
                    {selectedCustomer.address.address_one}
                    {selectedCustomer.address.address_two}
                  </p>
                  <p>
                    {selectedCustomer.address.city}
                    {selectedCustomer.address.state}
                  </p>
                  <p>{selectedCustomer.address.country}</p>
                </ContentBox>
              </>
            )}
            <ContentBox marginTop="20px">
              <Tagcontent>
                <TitleBox>Tags</TitleBox>
                <ContentTitle className="TextAlign">View all tags</ContentTitle>
              </Tagcontent>
              <Tags />
            </ContentBox>
          </Col>
        </Row>
      </SubForm>

      <MDSelectProducts
        isOpen={isOpenSelectProduct}
        onCancel={() => setShowSelectProduct(false)}
        onAdd={() => setShowSelectProduct(false)}
      />        

      {/*  add customer item modal */}
      <Modal
        style={{ width: "136%" }}
        visible={openCustumItem}
        width="40%"
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
    </Form>
  );
};

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
    }
    .price p {
      margin-bottom: 12px;
      line-height: 2;
      text-align: right;
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

export default newForm;
