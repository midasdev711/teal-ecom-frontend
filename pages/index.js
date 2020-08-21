import React from "react";
import { PageLayout } from "../src/components/views";
import { LeftContent, RightContent } from "../src/components/home";
import { Col, Row } from "antd";
import styled from "styled-components";

const Home = () => {
  return (
    <PageLayout>
      <HomeContent>
        <Row className="home-page" gutter={24}>
          <Col md={17}>
            <LeftContent />
          </Col>
          <Col md={7}>
            <RightContent />
          </Col>
        </Row>
      </HomeContent>
    </PageLayout>
  );
};

const HomeContent = styled.div`
  .home-page {
    height: calc(100%);
  }
`;

export default Home;
