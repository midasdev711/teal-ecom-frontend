import React from "react";
import styled from "styled-components";
import Link from "next/link";
// ui
import { Card, Row, Col, Alert, Button } from "antd";

const Summary = () => {
  return (
    <CardStyle>
      <CardHeader>
        <Row gutter={12}>
          <Col md={12}>
            <h3>Summary</h3>
          </Col>
          <Col md={12}>
            <Link href="/orders">
              <MoreDetailText href="#">More Detail</MoreDetailText>
            </Link>
          </Col>
        </Row>
      </CardHeader>
      <Alert message="Can’t get rates for 3 shipping labels." banner />
      <ListStyle>
        <li>Shipping from 650 E Stonewall St</li>
      </ListStyle>
      <TotalTitle>
        Total <PriceTitle>$500</PriceTitle>{" "}
      </TotalTitle>

      <CardFooter>
        <ButtonStyle block type="primary">
          Buy shipping labels
        </ButtonStyle>
        <TermServiceText>
          In buying a shipping label, you agree to the{" "}
          <a href="https://www.shopify.com/legal/terms-shipping-us">
            terms of service.
          </a>
        </TermServiceText>
      </CardFooter>
    </CardStyle>
  );
};

const CardStyle = styled(Card)`
  margin-top: 24px;
`;

const ListStyle = styled.ul`
  margin: 15px 0;
  padding-left: 24px;
`;

const CardHeader = styled.div`
  overflow: hidden;
`;

const TotalTitle = styled.h3`
  overflow: hidden;
  font-weight: bold;
  margin: 15px 0;
  color: #333;
`;

const PriceTitle = styled.span`
  float: right;
`;

const CardFooter = styled.div`
  padding-top: 15px;
  border-top: 1px solid #ddd;
`;

const ButtonStyle = styled(Button)`
  height: auto;
  padding: 8px 15px;
  margin-bottom: 15px;
`;
const TermServiceText = styled.p`
  margin: 0;
`;

const MoreDetailText = styled.a`
  float: right;
`;

export default Summary;