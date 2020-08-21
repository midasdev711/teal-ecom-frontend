import React, { useRef } from "react";
import { Col, Row, Layout, Tooltip, Divider } from "antd";
import {
  ExclamationCircleOutlined,
  RightOutlined,
  FileMarkdownOutlined,
  PayCircleOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import { Line, Bar } from "react-chartjs-2";

const LeftContent = () => {
  const data = {
    labels: ["", "", "", "", "", "", ""],
    datasets: [
      {
        label: "Sales",
        backgroundColor: "rgba(151,95,228, 1)",
        borderColor: "#975fe4",
        borderWidth: 1,
        hoverBackgroundColor: "#1890ff",
        hoverBorderColor: "#1890ff",
        data: [20, 0, 10, 20, 10, 15, 30],
      },
    ],
  };

  const sessionsData = {
    labels: ["", "", "", "", "", "", ""],
    datasets: [
      {
        label: "Sessions",
        backgroundColor: "#1890ff",
        borderColor: "#1890ff",
        borderWidth: 1,
        hoverBackgroundColor: "#1890ff",
        hoverBorderColor: "#1890ff",
        data: [20, 0, 10, 20, 10, 15, 30],
      },
    ],
  };
  return (
    <LayoutLeftContent>
      <MainContent>
        <StyledText>Here’s what’s happening with your store today.</StyledText>
        <Row className="section-content" gutter={24}>
          <Col md={12}>
            <LayoutContent>
              <AlignItem>
                <StyledTitle>Total Sales</StyledTitle>
                <Tooltip title="Introduce">
                  <ExclamationCircleOutlined />
                </Tooltip>
              </AlignItem>
              <StyledTotal>8,846</StyledTotal>
              <Line data={data} />
              <Divider />
              <StyledText>
                <span className="visits">Daily Visits</span> 1,234
              </StyledText>
            </LayoutContent>
          </Col>
          <Col md={12}>
            <LayoutContent>
              <AlignItem>
                <StyledTitle>Total Sessions</StyledTitle>
                <Tooltip title="Introduce">
                  <ExclamationCircleOutlined />
                </Tooltip>
              </AlignItem>
              <StyledTotal>6,999</StyledTotal>
              <Bar data={sessionsData} />
              <Divider />
              <StyledText>
                <span className="visits">Conversion Rate</span> 60%
              </StyledText>
            </LayoutContent>
          </Col>
        </Row>
        <LayoutContent className="align-top">
          <AlignItem>
            <StyledItemTitle>
              <FileMarkdownOutlined />
              <strong> 16 orders</strong> to fulfill
            </StyledItemTitle>
            <RightOutlined />
          </AlignItem>
          <Divider />
          <AlignItem>
            <StyledItemTitle>
              <PayCircleOutlined />
              <strong> 1 payment</strong> to capture
            </StyledItemTitle>
            <RightOutlined />
          </AlignItem>
        </LayoutContent>
      </MainContent>
    </LayoutLeftContent>
  );
};

const LayoutLeftContent = styled(Layout)`
  ${"" /* padding: 20px; */}
  .align-top {
    margin-top: 40px;
  }
`;

const MainContent = styled.div`
  width: 44rem;
  margin: 0 auto;
  padding: 25px 0;
  & .section-content {
    margin-top: 20px;
  }
  .ant-divider {
    margin: 10px 0;
  }
`;

const StyledText = styled.p`
  font-size: 14px;
  font-weight: 400;
  margin: 0;
  .visits {
    color: #975fe4;
    margin-right: 10px;
  }
`;

const StyledItemTitle = styled.div`
  cursor: pointer;
  svg{
    font-size: 20px;
    margin-bottom: -3px;
  }
`;

const StyledTotal = styled.span`
  margin-top: 4px;
  font-size: 30px;
  margin-bottom: 0;
  overflow: hidden;
  color: rgba(0, 0, 0, 0.85);
  font-size: 27px;
  line-height: 38px;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;
`;

const StyledTitle = styled.h4`
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
`;

const LayoutContent = styled(Layout.Content)`
  padding: 20px;
  border: none;
  outline: none;
  width: 100%;
  background: white;
  box-shadow: 0px 2px 2px rgba(186, 195, 201, 0.25);
  border-radius: 5px;
`;

const AlignItem = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default LeftContent;
