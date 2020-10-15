import React from "react";
import Link from "next/link";
import styled from "styled-components";
// components
import { PageLayout } from "../../../../src/components/views";
import { CustomerData } from "../../../../src/components/customers";
// icons
import {
  LeftOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import { getUserData } from "../../../../src/utils";


const NewCustomer = () => {
  let userData = getUserData()
  return (
    <PageLayout>
      <NewContent>
        <ContentPage>
          <ContentHeader>
            <TitleHeader>
              {/* <Link href="/customers"> */}
              <Link href={`/[portal_id]/ecom/customers`} as={`/${userData?.uniqueID}/ecom/customers`} shallow={true}>

                <LinkBack>
                  <LeftOutlined /> Customers
                </LinkBack>
              </Link>
              <PrevNextContent>
                <ArrowLeftOutlined />
                <ArrowRightOutlined />
              </PrevNextContent>
            </TitleHeader>
          </ContentHeader>
          <CustomerData />
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
  margin: 60px auto;
  padding: 0 3.2rem;
`;

const ContentHeader = styled.div`
  padding-bottom: 10px;
`;

const TitleHeader = styled.div`
  padding-bottom: 10px;
  display: flex;
  justify-content: space-between;
`;

const PrevNextContent = styled.div`
  svg {
    margin: 0 10px;
    cursor: pointer;
  }
`;

const LinkBack = styled.a`
  color: #333;
`;

export default NewCustomer;
