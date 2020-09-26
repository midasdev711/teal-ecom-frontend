import React, { useEffect } from "react";
import { PageLayout } from "../../../../../src/components/views";
import { TEPageFooter } from "../../../../../src/components/atoms";
import styled from "styled-components";
import { Layout, Empty, Button, Row, Col } from "antd";
import Link from "next/link";
import { LeftOutlined, TagsOutlined, SendOutlined } from "@ant-design/icons";

const Gifts = () => {
  let userData
  if (process.browser) {
    userData = JSON.parse(localStorage.getItem("userData"))
     }

  return (
    <PageLayout>
      <GiftContent>
        <EmptyGiftContent>
          <Link href="/[portal_id]/ecom/products" as={`/${userData?.uniqueID}/ecom/products`} shallow={true}>
            <LinkBack>
              <LeftOutlined /> Products
            </LinkBack>
          </Link>
          <PageHeaderContent>
            <TitleActionContent>
              <PageHeaderTitle>Gift cards</PageHeaderTitle>
            </TitleActionContent>
          </PageHeaderContent>
          <EmptyDataContent>
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}>
              <Message>Currently you do not have any gifts to manage.</Message>
              <Row className="action-content" gutter={24}>
                <Col md={12}>
                  <ContentActionGift>
                    <TagsOutlined />
                    <StyledTitle>Sell gift cards</StyledTitle>
                    <Message>
                      Make a gift card product for customers to buy.
                    </Message>

                    <Button type="primary" size="large">
                      <Link href="gift-cards/product/new">
                        <a>Sell gift cards</a>
                      </Link>
                    </Button>
                  </ContentActionGift>
                </Col>
                <Col md={12}>
                  <ContentActionGift>
                    <SendOutlined />
                    <StyledTitle>Send gift cards</StyledTitle>
                    <Message>
                      Issue a gift card code directly to a customer.
                    </Message>
                    <Button type="primary" size="large">
                      <Link href="gift-cards/new">
                        <a>Send gift cards</a>
                      </Link>
                    </Button>
                  </ContentActionGift>
                </Col>
              </Row>
            </Empty>
          </EmptyDataContent>
          <TEPageFooter>
            Learn more about
            <Link href="#">
              <a> gift cards.</a>
            </Link>
          </TEPageFooter>
        </EmptyGiftContent>
      </GiftContent>
    </PageLayout>
  );
};

const PageHeaderContent = styled(Layout.Content)`
  display: flex;
  margin-bottom: 20px;
  justify-content: space-between;
  align-items: center;
`;

const LinkBack = styled.a`
  color: #333;
`;

const ContentActionGift = styled.div`
  max-width: 200px;
	svg{
		font-size: 40px;
		color: #637381;
		margin-bottom: 10px;
	}
`;

const TitleActionContent = styled.div`
  flex: 1 1 auto;
  padding-bottom: 10px;
  border-bottom: ${(props) => (props.transferData ? "1px solid #bbc3c9" : 0)};
`;

const PageHeaderTitle = styled.h1`
  font-size: 27px;
  margin-bottom: 0;
  font-weight: 600;
  color: #212b36;
`;

const GiftContent = styled.div`
  padding: 20px;
`;

const EmptyGiftContent = styled.div`
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
  min-height: 70vh;
  align-items: center;
  background: white;
  box-shadow: 0px 4px 4px rgba(186, 195, 201, 0.25);
  border-radius: 5px;
  .action-content {
    margin-top: 50px;
  }
`;

const StyledTitle = styled.p`
  font-size: 16px;
  font-weight: 600;
  color: #333;
	margin: 0;
`;

const Message = styled.p`
  color: #637381;
  font-size: 14px;
`;

export default Gifts;
