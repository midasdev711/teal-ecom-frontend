import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { Form, Input, Button, Modal, Card, Col, Row, Select } from "antd";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import PhoneInput from "react-phone-input-2";
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const { Option } = Select;

const ShippingModal = ({ open, close, values, name, handleChange, onSave }) => {
  const [openCustumItem, setopenCustumItem] = useState(open);
  const [form] = Form.useForm();
 
  useEffect(() => {
    setopenCustumItem(open);
    form.setFieldsValue({
      BasicDetailsFirstName: values.BasicDetailsFirstName,
      BasicDetailsLastName: values.BasicDetailsLastName,
      AddressDetailsCompany: values.AddressDetailsCompany,
      AddressDetailsMobile: values.AddressDetailsMobile,
      AddressDetailsApartment: values.AddressDetailsApartment,
      AddressDetailsCity: values.AddressDetailsCity,
      AddressDetailsCountry: values.AddressDetailsCountry,
      AddressDetailsPostalCode: values.AddressDetailsPostalCode,
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
        <Button key="submit" type="primary" size="large" onClick={()=> onSave(form.getFieldsValue(), 'customer', name)}>
          Apply
        </Button>,
      ]}
    >
      <Wraper className="site-card-border-less-wrapper">
        <CardViews bordered={false} title={`Edit ${name || ''} address`}>
          {/* <Select placeholder="Select another address" style={{ width: 200 }}>
            <Option value="jack">
              Armando Salmeron <br />
              1310 Tamara Court <br />
              Waukegan IL 60085 <br />
              United States
            </Option>
          </Select> */}
          <Form
            name="basic"
            onFinish={()=> onSave(values, 'customer')}
            form={form}
          >
            <Rows gutter={24}>
              <Col md={12}>
                <Label
                  name="BasicDetailsFirstName"
                  size="large"
                  
                  rules={[
                    {
                      required: true,
                      message: "Please input your username!",
                    },
                  ]}
                >
                  <Input size="large" placeholder="First name"  onChange={(e)=> handleChange(e, 'BasicDetailsFirstName')} />
                </Label>
              </Col>
              <Col md={12}>
                <Label
                  name="BasicDetailsLastName"
                  size="large"
                  
                  rules={[
                    {
                      required: true,
                      message: "Please input your username!",
                    },
                  ]}
                >
                  <Input size="large" placeholder="Last name"  onChange={(e)=> handleChange(e, 'BasicDetailsLastName')} />
                </Label>
              </Col>
            </Rows>
            <Rows gutter={24}>
              <Col md={12}>
                <Label
                  name="AddressDetailsCompany"
                  size="large"
                  rules={[
                    {
                      required: true,
                      message: "Please input your company!",
                    },
                  ]}
                >
                  <Input size="large" placeholder="Company"  onChange={(e)=> handleChange(e, 'AddressDetailsCompany')} />
                </Label>
              </Col>
              <Col md={12}>
                <Label
                  name="AddressDetailsMobile"
                  size="large"
                  
                  rules={[
                    {
                      required: true,
                      message: "Please input your phone!",
                    },
                  ]}
                >
                  <PhoneInput
                      className="phone-input"
                      placeholder="Phone number"
                      country={"us"}
                      onChange={(e) => handleChange(e, 'AddressDetailsMobile')} name='AddressDetailsMobile'
                      
                    />
                  {/* <Input size="large" placeholder="Phone number" onChange={(e)=> handleChange(e, 'AddressDetailsMobile')} /> */}
                </Label>
              </Col>
            </Rows>
            <Rows gutter={24}>
              {/* <Col md={12}>
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
                  <Input size="large" placeholder="Address"  value={values.AddressDetailsCompany} onChange={(e)=> handleChange(e, 'AddressDetailsCompany')} />
                </Label>
              </Col> */}
              <Col md={12}>
                <Label
                  name="AddressDetailsApartment"
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
                    onChange={(e)=> handleChange(e, 'AddressDetailsApartment')}
                    placeholder="Apartment, suite, etc. (optional)"
                  />
                </Label>
              </Col>
              <Col md={12}>
                <Label
                  name="AddressDetailsPostalCode"
                  size="large"
                  rules={[
                    {
                      required: true,
                      message: "Please input your ZIP/Postal code!",
                    },
                  ]}
                >
                  <Input size="large" placeholder="ZIP/Postal code"  onChange={(e)=> handleChange(e, 'AddressDetailsCountry')} />
                </Label>
              </Col>
            </Rows>
            <Rows gutter={24}>
              <Col md={12}>
                <Label
                  name="AddressDetailsCity"
                  size="large"
                  
                  rules={[
                    {
                      required: true,
                      message: "Please input your city!",
                    },
                  ]}
                >
                  <Input size="large" placeholder="City" onChange={(e)=> handleChange(e, 'AddressDetailsCity')} />
                </Label>
              </Col>
              <Col md={12}>
                <Label
                  name="AddressDetailsCountry"
                  size="large"
                  
                  rules={[
                    {
                      required: true,
                      message: "Please input your Country/Region!",
                    },
                  ]}
                >
                  <CountryDropdown
                      defaultOptionLabel="Select a country."
                      onChange={(e) => handleChange(e, 'AddressDetailsCountry')} name='AddressDetailsCountry'
                      value={values.AddressDetailsCountry}
                      blacklist={["CD", "SH", "KP", "GS", "HM", "VC"]}
                      className="country-region"
                    />
                </Label>
              </Col>
            </Rows>
            <Rows gutter={24}>
              {/* <Col md={12}>
                <Label
                  name="state"
                  size="large"
                  value={values.AddressDetailsCountry}
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
              </Col> */}
              
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
