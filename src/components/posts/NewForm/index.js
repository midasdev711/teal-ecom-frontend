import React, { useState } from "react";
import styled from "styled-components";
import WysiwygEditor from "./WysiwygEditor";

// icon
import { FormOutlined } from "@ant-design/icons";
// ui
import { Form, Row, Col } from "antd";

const NewForm = () => {
  const [collect_tax, setCollectTax] = useState(true);

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <SubForm>
      <Row gutter={24}>
        <ContentBox>
          <WysiwygEditor />
        </ContentBox>
      </Row>
    </SubForm>
  );
};

const SubForm = styled.div`
  padding: 24px 0;
  border-top: 1px solid #ddd;
`;

const ContentBox = styled.div`
  padding: 24px;
  width: 100%;
  background: #fff;
  box-shadow: 0px 4px 4px rgba(186, 195, 201, 0.25);
  border: 1px solid #ddd;
  border-radius: 3px;
  outline: 0.1rem solid transparent;
`;

const TitleBox = styled.h3`
  font-weight: 600;
  font-size: 16px;
  color: #000;
  opacity: 0.9;
`;

export default NewForm;
