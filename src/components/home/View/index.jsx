import React from "react";
import styled from "styled-components";

import { Row, Col, Badge } from "antd";
import { TEStatistic } from "../../atoms";

const HomeView = (props) => {
  return (
    <Wrapper>
      <TitlePage>Home</TitlePage>
      <WrapperContent>
        <BoxStatistics>
          <Row gutter={24}>
            <Col md={9}>
              <TitleContent>My main blog</TitleContent>
            </Col>
            <Col md={9}>
              <BadgeLive color="#539B7C" text="2 live visitors" />
            </Col>
            <Col md={6}></Col>
            <Col md={9}>
              <Row gutter={24}>
                <Col md={12}>
                  <TEStatistic
                    title="1.04K"
                    percent={
                      <PercentGreen>
                        <ImgPercent src="/images/up-green.svg" alt="" />
                        +12.57%
                      </PercentGreen>
                    }
                    description="Uniques"
                  />
                </Col>
                <Col md={12}>
                  <TEStatistic
                    title="268"
                    percent={
                      <PercentRed>
                        <ImgPercent src="/images/down-red.svg" alt="" />
                        -5.57%
                      </PercentRed>
                    }
                    description="Views"
                  />
                </Col>
              </Row>
            </Col>
            <Col md={9}>
              <Row gutter={24}>
                <Col md={12}>
                  <TEStatistic
                    title="16%"
                    percent={
                      <PercentRed>
                        <ImgPercent src="/images/up-red.svg" alt="" />
                        +12.57%
                      </PercentRed>
                    }
                    description="Bounce rate"
                  />
                </Col>
                <Col md={12}>
                  <TEStatistic
                    title="59s"
                    percent={
                      <PercentGreen>
                        <ImgPercent src="/images/up-green.svg" alt="" />
                        +12.57%
                      </PercentGreen>
                    }
                    description="Avg duration"
                  />
                </Col>
              </Row>
            </Col>
            <Col md={6}>
              <div>
                <TitleLive>2</TitleLive>
                <DescriptionLive>Live</DescriptionLive>
              </div>
            </Col>
          </Row>
        </BoxStatistics>
      </WrapperContent>
    </Wrapper>
  );
};

const DescriptionLive = styled.h3`
  font-family: Proxima Nova;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 18px;
  /* identical to box height */

  color: #404950;
  margin: 0;
`;

const TitleLive = styled.h1`
  font-family: Proxima Nova;
  font-style: normal;
  font-weight: bold;
  font-size: 50px;
  line-height: 50px;
  margin-bottom: 7px;
  margin-top: 24px;
  color: #404950;
`;

const BoxStatistics = styled.div`
  padding: 30px;
  border: 1px solid #e5e5e5;
  border-radius: 15px;
`;

const BadgeLive = styled(Badge)`
  font-family: Proxima Nova;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 18px;
  color: #404950;
`;

const TitleContent = styled.h3`
  font-family: Proxima Nova;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 18px;
  /* identical to box height */

  color: #404950;
  margin: 0 0 40px;
`;

const ImgPercent = styled.img`
  margin-right: 6px;
`;

const PercentGreen = styled.div`
  font-family: Proxima Nova;
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  line-height: 14px;
  color: #02b075;
  display: inline-flex;
  align-items: center;
`;

const PercentRed = styled.div`
  font-family: Proxima Nova;
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  line-height: 14px;
  color: #e44e51;
  display: inline-flex;
  align-items: center;
`;

const WrapperContent = styled.div``;

const Wrapper = styled.div``;

const TitlePage = styled.h1`
  font-size: 24px;
  color: #404950;
  font-family: Proxima Nova;
  font-style: normal;
  font-weight: bold;
  line-height: 24px;
  margin: 0;
  margin-bottom: 30px;
`;

export default HomeView;
