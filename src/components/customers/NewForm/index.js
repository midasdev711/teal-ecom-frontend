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

const NewForm = () => {
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

  const handleChangeValue = (val) => {};

  const handleChangeTags = (value) => {
    console.log(`selected ${value}`);
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
          <Col md={8}>
            <TitleBox>Customer overview</TitleBox>
          </Col>
          <Col md={16}>
            <ContentBox>
              <Row gutter={24}>
                <Col md={12}>
                  <Form.Item
                    name="first_name"
                    rules={[
                      {
                        required: true,
                        message: "Please input first name!",
                      },
                    ]}
                  >
                    <TextInput
                      onChange={(e) => handleChangeValue(e.target.value)}
                      placeholder="First Name"
                    />
                  </Form.Item>
                </Col>
                <Col md={12}>
                  <Form.Item
                    name="last_name"
                    rules={[
                      {
                        required: true,
                        message: "Please input last name!",
                      },
                    ]}
                  >
                    <TextInput placeholder="Last Name" />
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
                    <TextInput placeholder="Email" />
                  </Form.Item>
                </Col>
                <Col md={24}>
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
                      value={phone}
                      onChange={(phone) => setPhone(phone)}
                    />
                  </Form.Item>
                </Col>
                <Col md={24}>
                  <Form.Item
                    name="agreement"
                    valuePropName="checked"
                    rules={[
                      {
                        validator: (_, value) =>
                          value
                            ? Promise.resolve()
                            : Promise.reject("Should accept agreement"),
                      },
                    ]}
                  >
                    <Checkbox>
                      Customer agreed to receive marketing emails.
                      <DesCheckbox>
                        You should ask your customers for permission before you
                        subscribe them to your marketing emails.
                      </DesCheckbox>
                    </Checkbox>
                  </Form.Item>
                </Col>
              </Row>
            </ContentBox>
          </Col>
        </Row>
      </SubForm>

      <SubForm>
        <Row gutter={24}>
          <Col md={8}>
            <TitleBox>Address</TitleBox>
            <DescriptBox>The primary address of this customer</DescriptBox>
          </Col>
          <Col md={16}>
            <ContentBox>
              <Row gutter={24}>
                <Col md={12}>
                  <Form.Item name="address_first_name">
                    <TextInput placeholder="First name" />
                  </Form.Item>
                </Col>
                <Col md={12}>
                  <Form.Item name="address_last_name">
                    <TextInput placeholder="Last Name" />
                  </Form.Item>
                </Col>
                <Col md={24}>
                  <Form.Item name="address_company">
                    <TextInput placeholder="Company" />
                  </Form.Item>
                </Col>
                <Col md={24}>
                  <Form.Item name="address_suite">
                    <TextInput placeholder="Apartment, suite, etc." />
                  </Form.Item>
                </Col>
                <Col md={24}>
                  <Form.Item name="address_city">
                    <TextInput placeholder="City" />
                  </Form.Item>
                </Col>
                <Col md={12}>
                  <Form.Item name="address_country">
                    <CountryDropdown
                      defaultOptionLabel="Country/Region"
                      value={country}
                      onChange={(val) => setCountry(val)}
                      blacklist={["CD", "SH", "KP", "GS", "HM", "VC"]}
                      className="country-region"
                    />
                  </Form.Item>
                </Col>
                <Col md={12}>
                  <Form.Item name="address_postal_code">
                    <TextInput placeholder="Postal code" />
                  </Form.Item>
                </Col>
                <Col md={24}>
                  <Form.Item name="address_phone">
                    <PhoneInput
                      country={"us"}
                      className="phone-input"
                      value={address_phone}
                      onChange={(phone) => setAddressPhone(phone)}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </ContentBox>
          </Col>
        </Row>
      </SubForm>

      <SubForm>
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
                  onChange={(e) => setCollectTax(e.target.checked)}
                  checked={collect_tax}
                >
                  Collect tax
                </Checkbox>
              </Form.Item>
              <Form.Item name="exemptions">
                <Select
                  placeholder="Select Tax"
                  onChange={handleChangeExemptions}
                >
                  {exemptions}
                </Select>
              </Form.Item>
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
                <TextInput placeholder="Note" />
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
                  onChange={handleChangeTags}
                ></Select>
              </Form.Item>
            </ContentBox>
          </Col>
        </Row>
      </SubForm>
    </Form>
  );
};

const SubForm = styled.div`
  padding: 24px 0;
  border-top: 1px solid #ddd;
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
  padding: 24px 24px 0;
  background: #fff;
  box-shadow: 0px 4px 4px rgba(186, 195, 201, 0.25);
  border: 1px solid #ddd;
  border-radius: 3px;
  outline: 0.1rem solid transparent;
`;

const TitleBox = styled.h3`
  font-weight: 600;
  font-size: 16px;
  color: #000;
  opacity: 0.9;
`;

const DesCheckbox = styled.p`
  margin: 0;
  font-size: 14px;
  color: #637381;
  padding-left: 24px;
  margin-top: 5px;
`;

const TextInput = styled(Input)`
  padding: 8px 12px;
`;

const DescriptBox = styled.h4`
  width: 80%;
  font-size: 14px;
`;

export default NewForm;
