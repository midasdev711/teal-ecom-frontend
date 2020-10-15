import React, { useState } from "react";
import styled from "styled-components";
import Link from "next/link";
// components
import { PageLayout } from "../../../../../src/components/views";
import { TEPageFooter } from "../../../../../src/components/atoms";
// icons
import { LeftOutlined } from "@ant-design/icons";
import { EditCustomersContent } from "../../../../../src/components/customers";

const EditCustomers = () => {
  return (
    <PageLayout>
      <CustomerContent>
        <ContentHeader>
          <Link href="/customers">
            <LinkBack>
              <LeftOutlined /> Customers
            </LinkBack>
          </Link>
          <TittleHeader>Bulk editor</TittleHeader>
        </ContentHeader>
        <ViewContent>
          <EditCustomersContent />
        </ViewContent>
        <TEPageFooter>
          Use your arrow keys to switch between cells. Hold shift to select
          multiple cells.
        </TEPageFooter>
      </CustomerContent>
    </PageLayout>
  );
};

const CustomerContent = styled.div`
  padding: 20px;
`;

const ViewContent = styled.div`
  border: 1px solid #ddd;
  width: 100%;
  background: #fff;
  box-shadow: var(
    --p-card-shadow,
    0 0 0 1px rgba(63, 63, 68, 0.05),
    0 1px 3px 0 rgba(63, 63, 68, 0.15)
  );
  border-radius: 3px;
`;

const ContentHeader = styled.div`
  padding-bottom: 30px;
`;
const TittleHeader = styled.h3`
  font-size: 28px;
  color: #000;
  font-weight: bold;
  margin-bottom: 0;
`;

const LinkBack = styled.a`
  color: #333;
`;

export default EditCustomers;
