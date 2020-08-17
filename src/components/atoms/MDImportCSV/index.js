import React, { useState } from "react";
import styled from "styled-components";
// icons
import { FileTextOutlined } from "@ant-design/icons";
// ui
import { Upload, Button, Checkbox, Modal, Form } from "antd";

const { Dragger } = Upload;

const MDImportCSV = (props) => {
  const { isOpen, onCancel, onImport, name } = props;

  const onChangeFileCSV = (info) => {
    console.log(info);
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      console.log(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      console.error(`${info.file.name} file upload failed.`);
    }
  };

  return (
    <ModalStyle
      visible={isOpen}
      centered
      title={`Import ${name} by CSV`}
      onCancel={() => onCancel(false)}
      footer={
        <FooterCustom>
          <HelpImport href="/">Need help importing customers?</HelpImport>
          <Button onClick={() => onCancel(false)}>Cancel</Button>
          <Button type="primary" onClick={() => onImport(false)}>
            Import {name}
          </Button>
        </FooterCustom>
      }
    >
      <TitleForm>
        <a
          href="https://cdn.shopify.com/shopifycloud/web/assets/v1/customers_template-00a7fad84f7ed0f3e7293006d2e36fc9.csv"
          target="_blank"
          download
        >
          Download a sample CSV template
        </a>{" "}
        to see an example of the format required.
      </TitleForm>

      <Dragger
        accept=".csv"
        name="file"
        multiple={false}
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        onChange={(info) => onChangeFileCSV(info)}
      >
        <p className="ant-upload-drag-icon">
          <FileTextOutlined />
        </p>
        <Button>Add File</Button>
        <p className="ant-upload-hint">or drop files to upload</p>
      </Dragger>

      <CheckboxStyle>
        Overwrite existing customers that have the same email or phone
      </CheckboxStyle>
    </ModalStyle>
  );
};

const TitleForm = styled.p`
  font-size: 14px;
  margin-bottom: 20px;
`;

const HelpImport = styled.a`
  text-align: left;
  float: left;
  margin-top: 5px;
`;

const FooterCustom = styled.div`
  text-align: right;
`;

const ModalStyle = styled(Modal)`
  width: 600px !important;
`;
const CheckboxStyle = styled(Checkbox)`
  margin-top: 15px;
`;

export default MDImportCSV;
