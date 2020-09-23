import React, { useState } from "react";
import styled from "styled-components";

import { Radio, Button, Modal } from "antd";

const MDExport = (props) => {
  const { onCancel, onExport, isOpen, name } = props;

  const [valueExport, setValueExport] = useState(1);
  const [valueExportAs, setValueExportAs] = useState(1);

  return (
    <ModalStyle
      visible={isOpen}
      title={`Export ${name}`}
      okText={`Export ${name}`} 
      cancelText="Cancel"
      onCancel={() => onCancel(false)}
      onOk={() => onExport(false)}
    >
      <Title>Export</Title>
      <RadioGroupStyle
        onChange={(e) => setValueExport(e.target.value)}
        value={valueExport}
      >
        <RadioStyle value={1}>Current page</RadioStyle>
        <RadioStyle value={2}>All customers</RadioStyle>
        <RadioStyle value={3} disabled>
          Selected: 0 customers
        </RadioStyle>
        <RadioStyle value={4} disabled>
          2 customers matching your search
        </RadioStyle>
      </RadioGroupStyle>

      <Title>Export as</Title>
      <RadioGroupStyle
        onChange={(e) => setValueExportAs(e.target.value)}
        value={valueExportAs}
      >
        <RadioStyle value={1}>
          CSV for Excel, Numbers, or other spreadsheet programs
        </RadioStyle>
        <RadioStyle value={2}>Plain CSV file</RadioStyle>
      </RadioGroupStyle>

      <LearnMore>
        Learn more about{" "}
        <a
          href="https://help.shopify.com/en/manual/customers/import-export-customers"
          target="_blank"
        >
          exporting customers to CSV file
        </a>
      </LearnMore>
    </ModalStyle>
  );
};

const ModalStyle = styled(Modal)`
  width: 600px !important;
`;

const Title = styled.h3`
  margin-bottom: 15px;
`;

const RadioGroupStyle = styled(Radio.Group)`
  margin-bottom: 24px;
  display: block;
`;

const RadioStyle = styled(Radio)`
  display: block;
  margin-bottom: 10px;
`;

const LearnMore = styled.p`
  border-top: 1px solid #ddd;
  padding: 15px 0;
`;

export default MDExport;
