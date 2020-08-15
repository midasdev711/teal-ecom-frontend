import React from "react";
import styled from "styled-components";
import { Layout } from "antd";
import { TEImportButton } from "../atoms";
import { Button } from "antd";
import Link from "next/link";

const PageHeader = ({ ...props }) => {
  return (
    <PageHeaderContent>
      <TitleActionContent>
        <PageHeaderTitle>{props.PageName}</PageHeaderTitle>
        <ImportExportContent>
          <TEImportButton>{props.ImportButtonName}</TEImportButton>
          {props.isData && (
            <TEImportButton export={`true`}>Export</TEImportButton>
          )}
        </ImportExportContent>
      </TitleActionContent>
      {props.isData && (
        <Button type="primary" size="large">
          <Link href={props.path}>
            <a>{props.CreateButtonName}</a>
          </Link>
        </Button>
      )}
    </PageHeaderContent>
  );
};

const PageHeaderContent = styled(Layout.Content)`
  display: flex;
  margin-bottom: 20px;
  justify-content: space-between;
  align-items: center;
`;

const ImportExportContent = styled.div`
  display: flex;
  margin-top: 5px;
  button {
    margin-right: 20px;
  }
`;

const TitleActionContent = styled.div`
  flex: 1 1 auto;
  padding-bottom: 10px;
  border-bottom: ${(props) => (props.customerData ? "1px solid #bbc3c9" : 0)};
`;

const PageHeaderTitle = styled.h1`
  font-size: 27px;
  margin-bottom: 0;
  font-weight: 600;
  color: #212b36;
`;

export default PageHeader;
