import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getCountries, getStates } from "country-state-picker";
import PhoneInput from "react-phone-input-2";
// ui
import { Modal, Form, Input, Select, Row, Col } from "antd";

const { Option } = Select;

const MDEditShippingAddress = (props) => {
  const [country, setCountry] = useState("us");
  const [stateEx, setStateEx] = useState("");
  const [statesData, setStatesData] = useState(getStates(country));
  const [phone, setPhone] = useState("");
  const { isOpen, onCancel, onSave, onFinish } = props;

  const countriesData = getCountries();

  // useEffect(() => {
  //   setStatesData(getStates(country));
  // }, [country]);

  const onChangeCountry = (e) => {
    let data = getStates(e);
    setStatesData(data);
    setStateEx("");
    setCountry(e);
  };

  const onChangeState = (e) => {
    setStateEx(e);
  };

  return (
    <Modal
      title="Edit shipping address"
      visible={isOpen}
      onCancel={onCancel}
      onOk={onSave}
      okText="Save"
      centered
    >
      <Form onFinish={onFinish} layout="vertical">
        <Row gutter={24}>
          <Col md={12}>
            <Form.Item
              label="First name"
              initialValue="Waldene"
              name="first_name"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col md={12}>
            <Form.Item label="Last name" initialValue="Leach" name="last_name">
              <Input />
            </Form.Item>
          </Col>
          <Col md={24}>
            <Form.Item label="Company" name="company">
              <Input />
            </Form.Item>
          </Col>
          <Col md={24}>
            <Form.Item
              label="Address"
              name="address"
              initialValue="367 South Cedar Creek Drive"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col md={24}>
            <Form.Item label="Apartment, suite, etc." name="other_address">
              <Input />
            </Form.Item>
          </Col>
          <Col md={24}>
            <Form.Item label="City" name="city" initialValue="Cedar Creek">
              <Input />
            </Form.Item>
          </Col>
          <Col md={8}>
            <Form.Item
              label="Country/Region"
              name="country"
              initialValue={country}
            >
              <Select
                placeholder="Select Country"
                onChange={(e) => onChangeCountry(e)}
                value={country}
              >
                {countriesData &&
                  countriesData.length > 0 &&
                  countriesData.map((item, i) => (
                    <Option key={i} value={item.code}>
                      {item.name}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
          <Col md={8}>
            <Form.Item label="State" name="state">
              <Select
                placeholder="Select Country"
                onChange={(e) => onChangeState(e)}
                value={stateEx}
              >
                {statesData &&
                  statesData.length > 0 &&
                  statesData.map((item, i) => (
                    <Option key={i} value={item}>
                      {item}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
          <Col md={8}>
            <Form.Item label="ZIP Code" name="zip_code">
              <Input />
            </Form.Item>
          </Col>
          <Col md={24}>
            <Form.Item label="Phone" name="zip_code">
              <PhoneStyle
                country={"us"}
                value={phone}
                onChange={(phone) => setPhone({ phone })}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

const PhoneStyle = styled(PhoneInput)`
  width: 100%;
`;

export default MDEditShippingAddress;
