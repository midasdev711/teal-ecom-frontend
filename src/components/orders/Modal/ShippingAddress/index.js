import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { Form, Input, Button, Modal, Card, Col, Row, Select } from "antd";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const { Option } = Select;

const ShippingModal = ({ open, close, values, name }) => {
  const [openCustumItem, setopenCustumItem] = useState(open);
  const [state, setState] = useState("XS");
  const [country, setCountry] = useState("United States");
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    setopenCustumItem(open);
    form.setFieldsValue({
      email: values,
    });
  }, [open, values]);

  return (
    <Modals
      visible={openCustumItem}
      onOk={close}
      width="35%"
      onCancel={close}
      footer={[
        <Button key="back" size="large" onClick={close}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" size="large" onClick={close}>
          Apply
        </Button>,
      ]}
    >
      <Wraper className="site-card-border-less-wrapper">
        <CardViews bordered={false} title={`Edit ${name || ''} address`}>
          <Select placeholder="Select another address" style={{ width: 200 }}>
            <Option value="jack">
              Armando Salmeron <br />
              1310 Tamara Court <br />
              Waukegan IL 60085 <br />
              United States
            </Option>
          </Select>
          <Form
            {...layout}
            name="basic"
            onFinish={onFinish}
            form={form}
            onFinishFailed={onFinishFailed}
          >
            <Rows gutter={24}>
              <Col md={12}>
                <Label
                  name="firstName"
                  size="large"
                  rules={[
                    {
                      required: true,
                      message: "Please input your username!",
                    },
                  ]}
                >
                  <Input size="large" placeholder="First name" />
                </Label>
              </Col>
              <Col md={12}>
                <Label
                  name="lastName"
                  size="large"
                  rules={[
                    {
                      required: true,
                      message: "Please input your username!",
                    },
                  ]}
                >
                  <Input size="large" placeholder="Last name" />
                </Label>
              </Col>
            </Rows>
            <Rows gutter={24}>
              <Col md={12}>
                <Label
                  name="company"
                  size="large"
                  rules={[
                    {
                      required: true,
                      message: "Please input your company!",
                    },
                  ]}
                >
                  <Input size="large" placeholder="Company" />
                </Label>
              </Col>
              <Col md={12}>
                <Label
                  name="phoneNumber"
                  size="large"
                  rules={[
                    {
                      required: true,
                      message: "Please input your phone!",
                    },
                  ]}
                >
                  <Input size="large" placeholder="Phone number" />
                </Label>
              </Col>
            </Rows>
            <Rows gutter={24}>
              <Col md={12}>
                <Label
                  name="addressOne"
                  size="large"
                  rules={[
                    {
                      required: true,
                      message: "Please input your address!",
                    },
                  ]}
                >
                  <Input size="large" placeholder="Address" />
                </Label>
              </Col>
              <Col md={12}>
                <Label
                  name="addressTwo"
                  size="large"
                  rules={[
                    {
                      required: true,
                      message: "Please input your apartment!",
                    },
                  ]}
                >
                  <Input
                    size="large"
                    placeholder="Apartment, suite, etc. (optional)"
                  />
                </Label>
              </Col>
            </Rows>
            <Rows gutter={24}>
              <Col md={12}>
                <Label
                  name="city"
                  size="large"
                  rules={[
                    {
                      required: true,
                      message: "Please input your city!",
                    },
                  ]}
                >
                  <Input size="large" placeholder="City" />
                </Label>
              </Col>
              <Col md={12}>
                <Label
                  name="country"
                  size="large"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Country/Region!",
                    },
                  ]}
                >
                  <div>
                    <CountryDropdown
                      defaultOptionLabel="Select a country."
                      value={country}
                      onChange={(val) => setCountry(val)}
                      blacklist={["CD", "SH", "KP", "GS", "HM", "VC"]}
                      className="dropDown"
                    />
                  </div>
                </Label>
              </Col>
            </Rows>
            <Rows gutter={24}>
              <Col md={12}>
                <Label
                  name="state"
                  size="large"
                  rules={[
                    {
                      required: true,
                      message: "Please input your state!",
                    },
                  ]}
                >
                  <RegionDropdown
                    showDefaultOption={false}
                    defaultOptionLabel="Select a country, man."
                    country={country}
                    value={state}
                    onChange={(val) => setState(val)}
                    className="dropDown"
                  />
                </Label>
              </Col>
              <Col md={12}>
                <Label
                  name="zipcode"
                  size="large"
                  rules={[
                    {
                      required: true,
                      message: "Please input your ZIP/Postal code!",
                    },
                  ]}
                >
                  <Input size="large" placeholder="ZIP/Postal code" />
                </Label>
              </Col>
            </Rows>
          </Form>
        </CardViews>
      </Wraper>
    </Modals>
  );
};

const Wraper = styled.div`
  .ant-card.ant-card-bordered {
    width: 40% !important;
  }
`;

const Modals = styled(Modal)`
  & .ant-modal-content {
    & .ant-modal-body {
      padding: 0;
    }
  }
`;

const CardViews = styled(Card)`
  color: black;
  width: 100%;
  form {
    margin-top: 20px;
  }
  & .ant-card-head {
    padding: 0;
  }
  .ant-card-head-title {
    display: block;
    color: black;
    font-size: 24px;
    padding: 0;
  }
  .ant-card-body {
    & p {
      font-size: 16px;
      margin-bottom: 10px;
    }
  }
  .ant-card-head {
    padding: 20px;
  }
  & .dropDown {
    width: 100%;
    padding: 10px 11px 10px 11px;
    border: 1px solid #d9d9d9;
    background: transparent;
    border-radius: 5px;
  }
`;

const Label = styled(Form.Item)`
  display: block;
  margin: 0;
  & .ant-form-item-label {
    display: unset;
    width: 100%;
    & label {
      color: #000;
      font-size: 16px;
    }
    & label::before {
      content: "";
      margin: 0;
    }
  }
  & .ant-form-item-control {
    max-width: 100%;
  }
`;

const Rows = styled(Row)`
  margin-bottom: 10px;
`;

export default ShippingModal;
