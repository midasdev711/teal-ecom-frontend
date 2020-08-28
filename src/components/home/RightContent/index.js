import React from "react";
import { Col, Row, Layout, Select } from "antd";
import styled from "styled-components";
import Link from "next/link";

const RightContent = () => {
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  return (
    <LayoutRightContent>
      <LayoutContent height="100px"></LayoutContent>
      <LayoutContent className="align-top">
        <StyledText>
          <strong>16 orders</strong> to fullfill
        </StyledText>
      </LayoutContent>
    </LayoutRightContent>
  );
};

const LayoutRightContent = styled.div`
  width: 300px;
  padding-top: 62px;
  .align-top {
    margin-top: 30px;
  }
`;

const StyledText = styled.p`
  font-family: Proxima Nova;
  font-style: normal;
  font-size: 16px;
  line-height: 16px;
  color: #404950;
  margin: 0;
`;

const LayoutContent = styled(Layout.Content)`
  padding: 15px 20px;
  height: ${(props) => (props.height ? props.height : "auto")};
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

export default RightContent;
