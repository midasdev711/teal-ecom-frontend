import React, { useState } from "react";
import { PageLayout } from "../../../src/components/views";
import { TEPageFooter, MDExport } from "../../../src/components/atoms";
import PageHeader from "../../../src/components/PageHeader";
import styled from "styled-components";
import { Layout, Empty, Button } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import Link from "next/link";
import { ViewCheckouts } from "../../../src/components/orders";

const Checkouts = () => {
  const [isOpenExport, setOpenExport] = useState(false);

  return (
    <PageLayout>
      <CustomerContent>
        {/* <EmptyCustomerContent>
          <PageHeader
            PageName="Checkouts"
          />
          <EmptyDataContent>
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}>
              <Message>Currently you do not have any draft to manage.</Message>
              <CreateButton size="large">
                <Link href="drafts/new">
                  <a>Create order</a>
                </Link>
              </CreateButton>
            </Empty>
          </EmptyDataContent>
          <TEPageFooter>
            Learn more about
            <Link href="#">
              <a> abandoned checkouts</a>
            </Link>
          </TEPageFooter>
        </EmptyCustomerContent> */}
        <ContentHeader>
          <Link href="/orders">
            <LinkBack>
              <LeftOutlined /> Orders
            </LinkBack>
          </Link>
          <StyledContainer>
            <TittleHeader>Abandoned checkouts</TittleHeader>
            <CreateButton
              type="primary"
              onClick={() => setOpenExport(true)}
              size="large"
            >
              Export
            </CreateButton>
          </StyledContainer>
        </ContentHeader>
        <ViewCheckouts />
        <TEPageFooter>
          Learn more about
          <Link href="#">
            <a> abandoned checkouts.</a>
          </Link>
        </TEPageFooter>

        <MDExport
          isOpen={isOpenExport}
          name="abandoned checkouts"
          onCancel={setOpenExport}
          onExport={setOpenExport}
        />
      </CustomerContent>
    </PageLayout>
  );
};

const CustomerContent = styled.div`
  padding: 20px;
`;

const EmptyCustomerContent = styled.div`
  padding: 20px;
  max-width: 60rem;
  margin: 0 auto;
`;

const EmptyDataContent = styled(Layout.Content)`
  padding: 20px;
  width: 100%;
  border: none;
  outline: none;
  display: flex;
  justify-content: center;
  min-height: 50vh;
  align-items: center;
  background: white;
  box-shadow: 0px 4px 4px rgba(186, 195, 201, 0.25);
  border-radius: 5px;
`;

const CreateButton = styled(Button)`
  background: #1890ff;
  border: 1px solid #1890ff;
  color: #fff;
  &:hover {
    background: #1890ff;
    border: 1px solid #1890ff;
    color: #fff;
    opacity: 0.8;
  }
`;

const Message = styled.p`
  color: #637381;
  font-size: 14px;
`;

const StyledContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ContentHeader = styled.div`
  padding: 10px 0;
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

export default Checkouts;
