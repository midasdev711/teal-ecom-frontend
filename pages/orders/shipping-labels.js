import React from "react";
import styled from "styled-components";
import Link from "next/link";
import Router from "next/router";
// components
import PageHeader from "../../src/components/PageHeader";
import { PageLayout } from "../../src/components/views";
import ShippingLabelsContent from "../../src/components/orders/ShippingLabels";
// icons
import { LeftOutlined, PrinterOutlined } from "@ant-design/icons";
// ui
import { Button } from "antd";

const ShippingLabels = () => {
  return (
    <PageLayout>
      <ContentLayout>
        <ContentBox>
          <ContentHeader>
            <Link href="/orders">
              <LinkBack>
                <LeftOutlined /> Orders
              </LinkBack>
            </Link>
            <TittleHeader>Create shipping label</TittleHeader>
            <HeaderActions>
              <Link href="/orders/shipping-labels/purchase">
                <PrintStyle href="#">
                  <PrinterOutlined /> Print packing slips
                </PrintStyle>
              </Link>
              <ButtonCancel onClick={() => Router.router.push("/orders")}>
                Cancel
              </ButtonCancel>
            </HeaderActions>
          </ContentHeader>

          <ShippingLabelsContent />
        </ContentBox>
      </ContentLayout>
    </PageLayout>
  );
};

const ContentLayout = styled.div`
  padding: 20px;
`;

const ContentBox = styled.div`
  padding: 20px;
  max-width: 60rem;
  margin: 0 auto;
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

const LinkBack = styled.a`
  color: #333;
`;

const HeaderActions = styled.div`
  width: 100%;
  overflow: hidden;
  margin-top: 15px;
`;

const PrintStyle = styled.a`
  color: #666;
`;

const ButtonCancel = styled(Button)`
  float: right;
`;

export default ShippingLabels;
