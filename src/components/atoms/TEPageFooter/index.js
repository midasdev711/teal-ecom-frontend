import React from "react";
import styled from "styled-components";
import { QuestionCircleOutlined } from "@ant-design/icons";
import Link from "next/link";

const TEPageFooter = ({ children }) => {
  return (
    <PageFooter>
      <PageFooterContent>
        <QuestionCircleOutlined /> 
        {children}
      </PageFooterContent>
    </PageFooter>
  );
};

const PageFooter = styled.div`
  padding: 20px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PageFooterContent = styled.div`
  padding: 18px;
  border-radius: 30px;
  max-width: 350px;
  display: flex;
  align-items: center;
  border: 1px solid #bbc3c9;
  svg {
    color: #47c1bf;
    background: #fff;
    font-size: 20px;
    margin-right: 10px;
    margin-bottom: -3px;
  }
  a{
    margin-left: 5px;
  }
`;

export default TEPageFooter;
