import React from "react";
import { PageLayout } from "../src/components/views";
import { LeftContent, RightContent } from "../src/components/home";
import { Col, Row, Select } from "antd";
import styled from "styled-components";

const Home = () => {
  return (
    <PageLayout>
      <HomeContent>
        <HomeContainer>
          <div className="wrap-content">
            <LeftContent />
            <RightContent />
          </div>
        </HomeContainer>
      </HomeContent>
    </PageLayout>
  );
};

const HomeContent = styled.div`
  padding-top: 50px;
`;

const HomeContainer = styled.div`
  .wrap-content {
    display: flex;
    width: fit-content;
    margin: 0 auto;
  }
`;

export default Home;
