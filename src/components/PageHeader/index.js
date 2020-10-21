import React, { useState } from "react";
import styled from "styled-components";
import { Layout } from "antd";
import { TEImportButton } from "../atoms";
import { Button } from "antd";
import Link from "next/link";
import MDImportCSV from "../atoms/MDImportCSV";
import MDExport from "../atoms/MDExport";
import { getUserData } from "../../utils";


const PageHeader = ({ ...props }) => {
  const [isOpenImport, setOpenImport] = useState(false);
  const [isOpenExport, setOpenExport] = useState(false);
  let userData = getUserData()

  return (
    <PageHeaderContent>
      <TitleActionContent>
        <PageHeaderTitle>{props.PageName}</PageHeaderTitle>
        <ImportExportContent>
          {props.isImport && (
            <TEImportButton onClick={() => setOpenImport(true)}>
              {props.ImportButtonName}
            </TEImportButton>
          )}
          {props.isData && (
            <TEImportButton export={`true`} onClick={() => setOpenExport(true)}>
              Export
            </TEImportButton>
          )}
        </ImportExportContent>
      </TitleActionContent>
      {props.isData && (
        <Button type="primary" size="large">
          {/* <Link href={props.path}> */}
          {
            props.path === "/products" ? (<Link href={`/[portal_id]/ecom/${props.path}`} as={`/${userData?.uniqueID}/ecom/${props.path}`} shallow={true}>
              <a>{props.CreateButtonName}</a>
            </Link>) : (<Link href={`/[portal_id]/ecom/${props.path}`} as={`/${userData?.uniqueID}/ecom/${props.path}`} shallow={true}>
              <a>{props.CreateButtonName}</a>
            </Link>)
          }

        </Button>
      )}
      <MDImportCSV
        isOpen={isOpenImport}
        onCancel={setOpenImport}
        onImport={setOpenImport}
        name="customers"
      />

      <MDExport
        isOpen={isOpenExport}
        name="customers"
        onCancel={setOpenExport}
        onExport={setOpenExport}
      />
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
