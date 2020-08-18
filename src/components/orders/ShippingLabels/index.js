import React from "react";
import styled from "styled-components";
// components
import ShippingDate from "./ShippingDate";
import Summary from "./Summary";
import Orders from "./Orders";
// ui
import { Row, Col } from "antd";

const ShippingLabelsContent = () => {
  return (
    <ShippingLabelsContentStyle>
      <Row gutter={24}>
        <Col md={16}>
          <Orders />
        </Col>
        <Col md={8}>
          <ShippingDate />
          <Summary />
        </Col>
      </Row>
    </ShippingLabelsContentStyle>
  );
};

const ShippingLabelsContentStyle = styled.div`
  width: 100%;
`;

export default ShippingLabelsContent;