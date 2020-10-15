import React from "react";
import styled from "styled-components";
import Link from "next/link";
// components
import { PageLayout } from "../../../../../src/components/views";
import InventoryDetailView from "../../../../../src/components/products/InventoryDetail";
// icons
import {
  LeftOutlined,
  ArrowRightOutlined,
  ArrowLeftOutlined,
  CopyOutlined,
} from "@ant-design/icons";
// ui
import { Row, Col } from "antd";
import { getUserData } from "../../../../../src/utils";


const InventoryDetail = () => {
  let userData = getUserData()
  return (
    <PageLayout>
      <CustomerContent>
        <ContentHeader>
          <ActionsTop>
            <Row gutter={24}>
              <Col md={12}>
          <Link href={`/[portal_id]/ecom/products`} as={`/${userData?.uniqueID}/ecom/products`} shallow={true}>
                                <LinkBack>
                    <LeftOutlined /> Back to product
                  </LinkBack>
                </Link>
              </Col>
              <Col md={12}>
                <RightActions>
                  <ButtonPrev>
                    <ArrowLeftOutlined />
                  </ButtonPrev>
                  <ButtonNext>
                    <ArrowRightOutlined />
                  </ButtonNext>
                </RightActions>
              </Col>
            </Row>
          </ActionsTop>

          <TittleHeader>Black / US 10 | EU 44</TittleHeader>
          <ButtonPrint>
            <CopyOutlined /> Duplicate
          </ButtonPrint>
        </ContentHeader>

        <InventoryDetailView />
      </CustomerContent>
    </PageLayout>
  );
};

const CustomerContent = styled.div`
  padding: 20px;
  width: 60rem;
  margin: 30px auto;
`;

const ButtonPrint = styled.a`
  color: #444;
  margin-top: 15px;
  display: inline-block;
`;

const SmallText = styled.span`
  font-size: 14px;
  color: #777;
  font-weight: normal;
`;

const ActionsTop = styled.div``;
const RightActions = styled.div`
  text-align: right;
`;

const ContentPage = styled.div`
  max-width: 65rem;
  margin: 80px auto;
  padding: 0 3.2rem;
`;

const ContentHeader = styled.div`
  padding-bottom: 30px;
`;
const TittleHeader = styled.h3`
  font-size: 28px;
  color: #000;
  font-weight: bold;
  margin-bottom: 0;
`;

const ButtonPrev = styled.a`
  color: #333;
`;

const ButtonNext = styled.a`
  color: #333;
  margin-left: 24px;
`;

const LinkBack = styled.a`
  color: #333;
`;

export default InventoryDetail;
