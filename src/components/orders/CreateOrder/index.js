import React, { useState, useEffect } from "react";
import styled from "styled-components";
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
  Modal,
  Card,
  Checkbox,
  Alert,
  Divider,
} from "antd";
import { Formik } from "formik";
const { Search } = Input;

const customer = [
  {
    profile_url:
      "https://cdn.pixabay.com/photo/2015/02/24/15/41/dog-647528__340.jpg",
    name: "BOB",
    email: "bob@gmail.com",
    address: {
      address_one: "4012 Town ship",
      address_two: "",
      city: "Surat",
      state: "Gujrat",
      country: "India",
      zipcode: "395010",
    },
  },
  {
    profile_url:
      "https://www.esa.int/var/esa/storage/images/esa_multimedia/images/2020/07/solar_orbiter_s_first_views_of_the_sun5/22136942-2-eng-GB/Solar_Orbiter_s_first_views_of_the_Sun_pillars.gif",
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
      "https://www.freedigitalphotos.net/images/img/homepage/394230.jpg",
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
      {customerdata.map((res) => {
        return (
          <PopoverContent onClick={() => change(res)}>
            <div>
              <img
                src={res.profile_url}
                alt="profile image"
                width="45"
                height="45"
                style={{ borderRadius: "50%" }}
              />
            </div>
            <div style={{ marginLeft: "5px" }}>
              <p>{res.name}</p>
              <p>{res.email}</p>
            </div>
          </PopoverContent>
        );
      })}
    </div>
  );
};

const CreateOrder = () => {
  const [visiable, setVisible] = useState(false);
  const [openCustumItem, setopenCustumItem] = useState(false);
  const [searchCustomner, setSearchcustomer] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);

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
    openCustumItem(false);
  };

  const handleCancel = (e) => {
    setopenCustumItem(false);
  };

  const handleColsecontact = (e) => {
    setSelectedCustomer(null);
  };
  return (
    <>
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
                    <Row gutter={24}>
                      <Col md={12}>
                        <TitleBox>Order details</TitleBox>
                      </Col>
                      <Col md={12}>
                        <ContentTitle
                          className="TextAlign LabelColor"
                          onClick={showModal}
                        >
                          Add custom item
                        </ContentTitle>
                      </Col>

                      <Col md={24}>
                        <Form.Item>
                          <Search
                            placeholder="Search products"
                            enterButton="Browse products"
                            size="large"
                            prefix={<SearchOutlined />}
                            onSearch={(value) => console.log(value)}
                          />
                        </Form.Item>
                      </Col>
                      <Col md={12}>
                        <Form.Item label="Notes" name="notes">
                          <TextInput placeholder="Add a note..." />
                        </Form.Item>
                      </Col>
                      <Col md={6}>
                        <ContentTitle className="TextAlign LabelColor">
                          Add discount
                        </ContentTitle>
                        <div className="TextAlign">SubTotal</div>
                        <ContentTitle className="TextAlign LabelColor">
                          Add shipment
                        </ContentTitle>
                        <ContentTitle className="TextAlign LabelColor">
                          Taxes
                        </ContentTitle>
                        <Total>Total</Total>
                      </Col>
                      <Col md={6}>
                        <ContentTitle className="TextAlign ValueColor">
                          -
                        </ContentTitle>
                        <div className="TextAlign ValueColor">$0.00</div>
                        <ContentTitle className="TextAlign ValueColor">
                          -
                        </ContentTitle>
                        <ContentTitle className="TextAlign ValueColor">
                          $0.00
                        </ContentTitle>
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
                      <ContentLabel> Email invoice </ContentLabel>
                    </Labelsection>
                    <div>
                      <Button disabled>Email invoice</Button>
                    </div>
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
                      <ContentLabel> Accept Payment </ContentLabel>
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
                      style={{ position: "relative" }}
                    />
                  </Popover>
                </ContentBox>
              )}
              {selectedCustomer !== null && (
                <>
                  <ContentBox>
                    <Row gutter={24}>
                      <Col
                        md={24}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <TitleBox>Customer </TitleBox>
                        <CloseOutlined onClick={handleColsecontact} />
                      </Col>
                      <Col md={24}>
                        <img
                          src={selectedCustomer.profile_url}
                          alt="profile image"
                          width="55"
                          height="55"
                          style={{ borderRadius: "50%" }}
                        />
                        <p>{selectedCustomer.name}</p>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <p>{selectedCustomer.email}</p>
                          <p>Edit</p>
                        </div>
                      </Col>
                    </Row>
                  </ContentBox>
                  <ContentBox>
                    <Row gutter={24}>
                      <Col
                        md={24}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <TitleBox>Shipping Address </TitleBox>
                        <p>Edit</p>
                      </Col>
                      <Col md={24}>
                        <p>
                          {selectedCustomer.address.address_one}{" "}
                          {selectedCustomer.address.address_two}
                        </p>
                        <p>
                          {selectedCustomer.address.city}{" "}
                          {selectedCustomer.address.state}
                        </p>
                        <p style={{ margin: 0 }}>
                          {selectedCustomer.address.country}
                        </p>
                      </Col>
                    </Row>
                  </ContentBox>
                  <ContentBox>
                    <Row gutter={24}>
                      <Col
                        md={24}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <TitleBox>Edit Address </TitleBox>
                        <p>Edit</p>
                      </Col>
                      <Col>
                        <p>
                          {selectedCustomer.address.address_one}{" "}
                          {selectedCustomer.address.address_two}
                        </p>
                        <p>
                          {selectedCustomer.address.city}{" "}
                          {selectedCustomer.address.state}
                        </p>
                        <p>{selectedCustomer.address.country}</p>
                      </Col>
                    </Row>
                  </ContentBox>
                </>
              )}
              <ContentBox style={{ marginTop: "20px" }}>
                <Tagcontent>
                  <TitleBox>Tags</TitleBox>
                  <ContentTitle className="TextAlign LabelColor">
                    View all tags
                  </ContentTitle>
                </Tagcontent>
                <div styled={{ marginTop: "20px" }}>
                  <SearchCustomerInput
                    placeholder="Urgent, reviewed, wholesale"
                    size="large"
                    onSearch={(value) => console.log(value)}
                  />
                </div>
              </ContentBox>
            </Col>
          </Row>
        </SubForm>
      </Form>
      <Modal
        style={{ width: "136%" }}
        visible={openCustumItem}
        onOk={handleOk}
        width="35%"
        onCancel={handleCancel}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
      >
        <Wraper className="site-card-border-less-wrapper">
          <CardViews
            bordered={false}
            style={{ width: "100%" }}
            title="Add custom item"
          >
            <Formik
              initialValues={{
                item_name: "",
                price: "0.00",
                qty: "",
                item_shipping: "1",
                item_taxable: "1  ",
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
                if (!values.item_shipping) {
                  errors.item_shipping = "!Required";
                }
                if (!values.item_taxable) {
                  errors.item_taxable = "!Required";
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
                /* and other goodies */
              }) => (
                <form onSubmit={handleSubmit}>
                  <Row gutter={16}>
                    <Col className="gutter-row" span={10}>
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
                        value={values.Checkbox}
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
                        value={values.Checkbox}
                      >
                        Item requires shipping
                      </Checkbox>
                    </Col>
                  </Row>
                  <Row gutter={16} style={{ marginTop: "1rem" }}>
                    {values.item_shipping ? (
                      <Alert
                        style={{
                          padding: "19px",
                          width: "100%",
                          backgroundColor: "#fff7b2",
                          borderColor: "#ffe477",
                        }}
                        message="Create a product with weight specified to calculate shipping rates accurately"
                        type="warning"
                      />
                    ) : null}
                  </Row>
                  <Divider />
                  <div style={{ float: "right", width: "50%" }}>
                    <Button style={{ marginLeft: "63px" }} size="large">
                      Cancel
                    </Button>
                    <SaveButton type="submit" disabled={isSubmitting}>
                      Save line item
                    </SaveButton>
                  </div>
                </form>
              )}
            </Formik>
          </CardViews>
        </Wraper>
      </Modal>
    </>
  );
};

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
  padding: 0 20px;

  &:hover {
    background: #5c6ac4;
  }
`;

const SubForm = styled.div`
  padding: 24px 0;
  border-top: 1px solid #ddd;

  & .TextAlign {
    text-align: right;
  }
  & .LabelColor {
    color: #007ace;
  }
  & .ValueColor {
    color: #000;
  }

  & .ant-input-search-button {
    color: unset;
    background: unset;
    border-color: #d9d9d9;
  }

  & .ant-popover-inner > .ant-popover-inner-content {
    padding: 0;
  }
  & p {
    margin: 0;
  }
`;

const ContentBox = styled.div`
  padding: 20px;
  background: #fff;
  box-shadow: 0px 4px 4px rgba(186, 195, 201, 0.25);
  border: 1px solid #ddd;
  border-radius: 3px;
  outline: 0.1rem solid transparent;
`;

const TitleBox = styled.h3`
  font-weight: 600;
  font-size: 19px;
  color: #000;
  opacity: 0.9;
  font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI,
    Roboto, Helvetica Neue, sans-serif-apple-system, BlinkMacSystemFont,
    San Francisco, Segoe UI, Roboto, Helvetica Neue, sans-serif;
`;

const Labelsection = styled.p`
  display: flex;
  margin: 0;
`;

const Icons = styled.div`
  font-size: 20px;
`;

const TextInput = styled(Input)`
  padding: 6px 12px;
`;

const ContentLabel = styled.h2`
  margin-left: 30px;
  font-size: 16px;
`;

const ContentTitle = styled.h4`
  color: rgb(0, 122, 206);
  margin: 0;
  background: inherit;
  border: 0;
  font-weight: 400;
  cursor: pointer;
  text-transform: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  vertical-align: middle;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: transparent;
  border: 0;
  outline: 0;
  -webkit-box-shadow: none;
  box-shadow: none;
  color: #007ace;
  text-decoration: none;
  -webkit-user-select: text;
  -moz-user-select: text;
  -ms-user-select: text;
  font-size: 1rem;
  font-weight: 400;
  line-height: 2rem;
  padding: 0;
  vertical-align: initial;
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
  font-size: 16px;
`;

const SearchCustomerInput = styled(Input)`
  margin-top: 20px;
`;

const Tagcontent = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SaveButton = styled.button`
cursor: pointer;
    padding: 8px;
    width: 45%;
    border-radius: 5px;
  margin-left:5px;
  padding:50px
  background: "red"
  width: 47%;
  color:white;
  background: #5f6dc5 !important;

  border: #5f6dc5;
`;
const Wraper = styled.div`
  .ant-card.Customer_item__CardViews-sc-16fy1u8-2.cayPey.ant-card-bordered {
    width: 40% !important;
  }
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

export default CreateOrder;
