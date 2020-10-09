import React from "react";
import Link from "next/link";
import styled from "styled-components";
// components
import { PageLayout } from "../../src/components/views";
import { OrderData } from "../../src/components/orders";
// icons
import {
  LeftOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";

const NewCustomer = () => {
  return (
    <PageLayout>
      <NewContent>
        <ContentPage>
          <ContentHeader>
            <TitleHeader>
              <Link href="/orders">
                <LinkBack>
                  <LeftOutlined /> Orders
                </LinkBack>
              </Link>
              <PrevNextContent>
                <ArrowLeftOutlined />
                <ArrowRightOutlined />
              </PrevNextContent>
            </TitleHeader>
          </ContentHeader>
          <OrderData />
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

const ContentHeader = styled.div``;

const TitleHeader = styled.div`
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
