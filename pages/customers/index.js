import React from "react";
import { PageLayout } from "../../src/components/views";
import { TEPageFooter } from "../../src/components/atoms";
import { ViewCustomers } from "../../src/components/customers";
import PageHeader from "../../src/components/PageHeader";
import styled from "styled-components";
import { Layout, Empty, Button } from "antd";
import Link from "next/link";

const Customers = () => {
  return (
    <PageLayout>
      <CustomerContent>
        {/* <EmptyCustomerContent>
          <PageHeader />
          <EmptyDataContent>
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}>
              <Message>
                Currently you do not have any customers to manage.
              </Message>
              <Button type="primary" size="large">
                <Link href="customers/new">
                  <a>Add customer</a>
                </Link>
              </Button>
            </Empty>
          </EmptyDataContent>
          <TEPageFooter>
            Learn more about
            <Link href="#">
              <a> customers</a>
            </Link>
          </TEPageFooter>
        </EmptyCustomerContent> */}
        <ViewsCustomerContent>
          <PageHeader
            PageName="Your Customers"
            ImportButtonName="Import customers"
            CreateButtonName="Add customer"
            path="customers/new"
            isData={true}
            isImport={true}
          />
          <ViewCustomers />
          <StyledSettingFooter>
            <Message>
              Customer accounts are disabled.
              <Link href="#">
                <a> Edit settings</a>
              </Link>
            </Message>
          </StyledSettingFooter>
          <TEPageFooter>
            Learn more about
            <Link href="#">
              <a> customers.</a>
            </Link>
          </TEPageFooter>
        </ViewsCustomerContent>
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

const StyledSettingFooter = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 20px;
`;

const ViewsCustomerContent = styled.div`
  padding: 20px;
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

const Message = styled.p`
  color: #637381;
  font-size: 14px;
`;

export default Customers;
