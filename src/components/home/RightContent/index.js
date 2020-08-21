import React from "react";
import { Col, Row, Layout, Select, Divider } from "antd";
import styled from "styled-components";
import Link from "next/link";

const { Option } = Select;

const RightContent = () => {
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  return (
    <LayoutRightContent>
      <LayoutContent>
        <AlignItem>
          <Select
            defaultValue="all"
            style={{ width: 160 }}
            onChange={handleChange}
          >
            <Option value="all">All channels</Option>
            <Option value="store">Online Store</Option>
            <Option value="other">Other</Option>
          </Select>
          <Select
            defaultValue="today"
            style={{ width: 160 }}
            onChange={handleChange}
          >
            <Option value="today">Today</Option>
            <Option value="yesterday">Yesterday</Option>
            <Option value="week">This week</Option>
            <Option value="month">This month</Option>
          </Select>
        </AlignItem>
      </LayoutContent>
      <LayoutContent>
        <AlignItem>
          <StyledTotal>
            <p className="title">TOTAL SALES</p>
            <StyledText>There were no sales during this time.</StyledText>
          </StyledTotal>
          <StyledText>Today</StyledText>
        </AlignItem>
      </LayoutContent>
      <LayoutContent>
        <AlignItem>
          <StyledTotal>
            <p className="title">TOTAL SALES BREAKDOWN</p>
            <StyledText>There were no sales during this time.</StyledText>
          </StyledTotal>
          <StyledText>Today</StyledText>
        </AlignItem>
      </LayoutContent>
      <LayoutContent>
        <AlignItem>
          <StyledTotal>
            <p className="title">TOTAL SALES BY CHANNEL</p>
            <StyledText>There were no sales during this time.</StyledText>
          </StyledTotal>
          <StyledText>Today</StyledText>
        </AlignItem>
      </LayoutContent>
      <LayoutContent>
        <AlignItem>
          <StyledTotal>
            <p className="title">TOP PRODUCTS</p>
            <StyledText>There were no sales during this time.</StyledText>
          </StyledTotal>
          <StyledText>Today</StyledText>
        </AlignItem>
      </LayoutContent>
      <LayoutPayout>
        <p className="title">TOP PRODUCTS</p>
        <AlignItem>
          <StyledText>There were no sales during this time.</StyledText>
          <StyledText>$0.00</StyledText>
        </AlignItem>
        <Divider />
        <Link href="#">
          <a className="view">View all payouts</a>
        </Link>
      </LayoutPayout>
    </LayoutRightContent>
  );
};

const LayoutRightContent = styled.div`
  border-left: 1px solid #ededed;
  height: calc(100%);
`;

const StyledText = styled.p`
  font-size: 14px;
  font-weight: 400;
  margin: 0;
`;

const StyledTotal = styled.div`
  .title {
    font-size: 12px;
    font-weight: 500;
    margin: 0;
  }
`;

const LayoutPayout = styled.div`
  padding: 20px;
  .title {
    font-size: 12px;
    font-weight: 500;
    margin: 0;
  }
  .view {
    font-size: 14px;
  }
  .ant-divider {
    margin: 10px 0;
  }
`;

const LayoutContent = styled(Layout.Content)`
  padding: 20px;
  border: none;
  outline: none;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #dfe3e8;
`;

const AlignItem = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default RightContent;
