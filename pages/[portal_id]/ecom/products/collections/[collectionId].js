import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { Button, Layout } from "antd";

// components
import { PageLayout } from "../../../../../src/components/views";
import { CollectionDetail } from "../../../../../src/components/products";
// icons
import { LeftOutlined, EyeOutlined } from "@ant-design/icons";
import { getUserData } from "../../../../../src/utils";

const newActions = () => {
  let userData = getUserData()
  return (
    <ActionTopLayout>
      <ActionContent>
        <span>Unsaved changes</span>
        <NewOrderAction>
          <Button className="cancel" size="large">
            <Link href="/[portal_id]/ecom/products/collections" as={`/${userData?.uniqueID}/ecom/products/collections`}>
              <a>Discard</a>
            </Link>
          </Button>
          <Button className="save" size="large" type="primary">
            <Link href="/[portal_id]/ecom/products/collections" as={`/${userData?.uniqueID}/ecom/products/collections`}>
              <a title="save">Save</a>
            </Link>
          </Button>
        </NewOrderAction>
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
            <Link href="/[portal_id]/ecom/products/collections" as={`/${userData?.uniqueID}/ecom/products/collections`}>
              <LinkBack>
                <LeftOutlined /> Collections
              </LinkBack>
            </Link>
            <TittleHeader>Home Page</TittleHeader>
            <span><EyeOutlined /> View</span>
          </ContentHeader>
          <CollectionDetail />
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
  padding-bottom: 10px;
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

const NewOrderAction = styled.div`
  display: flex;
  .cancel {
    margin-right: 15px;
    & span {
      font-size: 14px;
      margin-top: -5px;
      color: #000;
      font-weight: 100;
    }
  }
`;
export default NewCustomer;
