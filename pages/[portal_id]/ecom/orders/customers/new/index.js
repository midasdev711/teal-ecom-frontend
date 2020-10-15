import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { Button, Layout } from "antd";
// components
import { PageLayout } from "../../../../../../src/components/views";
import { NewForm } from "../../../../../../src/components/customers";
// icons
import { LeftOutlined } from "@ant-design/icons";
import { getUserData } from "../../../../../../src/utils";


const newActions = () => {
  let userData = getUserData()
  return (
    <ActionTopLayout>
      <ActionContent>
        <span>Unsaved changes</span>
        <NewCustomerAction>
          <Button className="cancel" size="large">
            <Link href="/[portal_id]/ecom/customers" as={`/${userData?.uniqueID}/ecom/customers`}>
              <a>Cancel</a>
            </Link>
          </Button>
          <Button size="large" type="primary">
            <Link href="/[portal_id]/ecom/customers/[pid]" as={`/${userData?.uniqueID}/ecom/customers/123456789`}>
              <a title="save">Save</a>
            </Link>
          </Button>
        </NewCustomerAction>
      </ActionContent>
    </ActionTopLayout>
  );
};

const NewCustomer = () => {
  let userData = getUserData()
  return (
    <PageLayout>
      <NewContent>
        {newActions()}
        <ContentPage>
          <ContentHeader>
            <Link href="/[portal_id]/ecom/customers" as={`/${userData?.uniqueID}/ecom/customers`}>

              {/* <Link href="/customers"> */}
              <LinkBack>
                <LeftOutlined /> Add customer
              </LinkBack>
            </Link>
            <TittleHeader>Customers</TittleHeader>
          </ContentHeader>
          <NewForm />
        </ContentPage>
      </NewContent>
    </PageLayout>
  );
};

const NewContent = styled.div`
  width: 100%;
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

const LinkBack = styled.a`
  color: #333;
`;

const ActionTopLayout = styled(Layout)`
  width: 100%;
  height: 55px;
  background: #fff;
  position: fixed;
  z-index: 10;
  top: 0;
  box-shadow: 0px 4px 4px rgba(186, 195, 201, 0.25);
`;

const ActionContent = styled.div`
  padding: 10px 50px;
  height: 55px;
  position: ;
  top: 0;
  left: 250px;
  position: fixed;
  right: 0;
  max-width: 65rem;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NewCustomerAction = styled.div`
  display: flex;
  .cancel {
    margin-right: 15px;
  }
`;

export default NewCustomer;
