import React, { useState } from "react";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import { CountryDropdown } from "react-country-region-selector";
import styled from "styled-components";
// icon
import { FormOutlined } from "@ant-design/icons";
// ui
import { Form, Input, Row, Col, Checkbox, Select } from "antd";

const { Option } = Select;

const NewForm = (props) => {
  const [collect_tax, setCollectTax] = useState(true);
  const [exemptions, setExemptions] = useState([]);
  const [phone, setPhone] = useState("");
  const [address_phone, setAddressPhone] = useState("");
  const [country, setCountry] = useState("United States");

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleChangeExemptions = (values) => {
    setExemptions(values);
  };

  const handleChangeTags = (value) => {
    console.log(`selected ${value}`);
  };

  const { BasicDetails, AddressDetails, /* Tags, TaxFlag, Tax, Notes, */ handleChangeValue } = props
  
  return (
    <Form
      name="basic"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      className="form-new"
      layout="vertical"
    >
      {console.log('BasicDetails', props)}
      <SubForm>
        <Row gutter={24}>
          <Col md={24}>
            <ContentBox>
              <SubFormTitle>New customer</SubFormTitle>
              <Row gutter={24}>
                <Col md={12}>
                  <Form.Item
                    name="full_name"
                    rules={[
                      {
                        required: true,
                        message: "Please input full name!",
                      },
                    ]}
                  >
                    <TextInput
                      onChange={(e) => handleChangeValue(e, 'BasicDetails')}
                      placeholder="Full name"
                      name='FullName'
                      value={BasicDetails.FullName}
                    />
                  </Form.Item>
                </Col>
                <Col md={12}>
                  <Form.Item
                    name="phone"
                    rules={[
                      {
                        required: true,
                        message: "Please input phone number!",
                      },
                    ]}
                  >
                    <PhoneInput
                      className="phone-input"
                      placeholder="Phone"
                      country={"us"}
                      onChange={(e) => handleChangeValue(e, 'BasicDetails', 'Mobile')} name='Mobile'
                      value={BasicDetails.Mobile}
                    />
                  </Form.Item>
                </Col>
                <Col md={24}>
                  <Form.Item
                    name="email"
                    rules={[
                      {
                        required: true,
                        type: "email",
                        message: "Please input email!",
                      },
                    ]}
                  >
                    <TextInput placeholder="Email" onChange={(e) => handleChangeValue(e, 'BasicDetails')} name='Email'
                      value={BasicDetails.Email} />
                  </Form.Item>
                </Col>
              </Row>
            </ContentBox>
          </Col>
        </Row>
      </SubForm>

      <SubForm>
        <Row gutter={24}>
          <Col md={24}>
            <ContentBox>
              <SubFormTitle>Shipping Address</SubFormTitle>
              <Row gutter={24}>
                <Col md={12}>
                  <Form.Item name="address">
                    <TextInput onChange={(e) => handleChangeValue(e, 'AddressDetails')}
                      placeholder="Address"
                      name='Address'
                      value={AddressDetails.Address} />
                  </Form.Item>
                </Col>
                <Col md={12}>
                  <Form.Item name="address_suite">
                    <TextInput placeholder="Apartment, suite, etc." onChange={(e) => handleChangeValue(e, 'AddressDetails')} name='Apartment'
                      value={AddressDetails.Apartment} />
                  </Form.Item>
                </Col>
                <Col md={12}>
                  <Form.Item name="address_country">
                    <CountryDropdown
                      defaultOptionLabel="Country/Region"
                      onChange={(e) => handleChangeValue(e, 'AddressDetails', 'Country')} name='Country'
                      value={AddressDetails.Country}
                      blacklist={["CD", "SH", "KP", "GS", "HM", "VC"]}
                      className="country-region"
                    />
                  </Form.Item>
                </Col>
                <Col md={12}>
                  <Form.Item name="address_state">
                    <TextInput placeholder="State" onChange={(e) => handleChangeValue(e, 'AddressDetails')} name='State'
                      value={AddressDetails.State} />
                  </Form.Item>
                </Col>
                <Col md={12}>
                  <Form.Item name="address_city">
                    <TextInput placeholder="City" onChange={(e) => handleChangeValue(e, 'AddressDetails')} name='City'
                      value={AddressDetails.City} />
                  </Form.Item>
                </Col>
                <Col md={12}>
                  <Form.Item name="address_postal_code">
                    <TextInput placeholder="Postal code" onChange={(e) => handleChangeValue(e, 'AddressDetails')} name='PostalCode'
                      value={AddressDetails.PostalCode} />
                  </Form.Item>
                </Col>
                {/* <Col md={24}>
                  <Form.Item name="address_phone">
                    <PhoneInput
                      country={"us"}
                      className="phone-input"
                      onChange={(e) => handleChangeValue(e, 'AddressDetails', 'Mobile')} name='Mobile'
                      value={AddressDetails.Mobile}
                    />
                  </Form.Item>
                </Col> */}
              </Row>
            </ContentBox>
          </Col>
        </Row>
      </SubForm>

      {/* <SubForm>
        <Row gutter={24}>
          <Col md={8}>
            <TitleBox>Tax exemptions</TitleBox>
            <DescriptBox>
              Tax exemptions are currently limited to Canada.
              <a href="">
                Learn more <FormOutlined />
              </a>
            </DescriptBox>
          </Col>
          <Col md={16}>
            <ContentBox>
              <Form.Item name="collect_tax">
                <Checkbox
                  onChange={(e) => handleChangeValue(e)} name='TaxFlag'
                  checked={TaxFlag}
                >
                  Collect tax
                </Checkbox>
              </Form.Item>
              {TaxFlag &&<Form.Item name="exemptions">
                <Select
                  placeholder="Select Tax"
                  onChange={(e) => handleChangeValue(e)} name='Tax'
                  value={Tax}
                >
                  {exemptions}
                </Select>
              </Form.Item>}
            </ContentBox>
          </Col>
        </Row>
      </SubForm>

      <SubForm>
        <Row gutter={24}>
          <Col md={8}>
            <TitleBox>Notes</TitleBox>
            <DescriptBox>Add notes about your customer.</DescriptBox>
          </Col>
          <Col md={16}>
            <ContentBox>
              <Form.Item name="notes">
                <TextInput placeholder="Note" onChange={(e) => handleChangeValue(e)} name='Notes'
                  value={Notes} />
              </Form.Item>
            </ContentBox>
          </Col>
        </Row>
      </SubForm>

      <SubForm>
        <Row gutter={24}>
          <Col md={8}>
            <TitleBox>Tags</TitleBox>
            <DescriptBox>
              Tags can be used to categorize customers into groups.
            </DescriptBox>
          </Col>
          <Col md={16}>
            <ContentBox>
              <Form.Item name="tags">
                <Select
                  placeholder="Tags"
                  mode="tags"
                  onChange={(e) => handleChangeValue(e, 'TAGS')} name='Tags'
                  value={Tags}
                ></Select>
              </Form.Item>
            </ContentBox>
          </Col>
        </Row>
      </SubForm> */}
    </Form>
  );
};

const SubForm = styled.div`
  padding: 24px 0;
  .react-tel-input input {
    width: 100% !important;
    padding: 18px 50px;
  }
  .country-region {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
`;

const ContentBox = styled.div`
`;

const DesCheckbox = styled.p`
  margin: 0;
  font-size: 14px;
  color: #637381;
  padding-left: 24px;
  margin-top: 5px;
`;

const TextInput = styled(Input)`
  max-width: 550px!important;
  width: 100%;
  height: 45px;
  border: none;
  background-color: #F6F8F9;
  border-radius: 5px;
  font-family: Proxima Nova;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 17px;
  color: #404950;
`;

const SubFormTitle = styled.p`
  font-family: Proxima Nova;
  font-style: normal;
  font-weight: bold;
  font-size: ${props => props.fontSize ? props.fontSize : '19'}px;
  line-height: ${props => props.fontSize ? props.fontSize : '19'}px;
  color: #404950;
`;

const DescriptBox = styled.h4`
  width: 80%;
  font-size: 14px;
`;

export default NewForm;
