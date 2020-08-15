import React from 'react';
import styled from 'styled-components';
import { Layout } from 'antd';
import SideMenu from '../SideMenu';

const { Content } = Layout;
const PageLayout = ({ children }) => {
  return (
    <StyledLayout>
      <SideMenu />
      <StyledPageLayout>
        <Content>{children}</Content>
      </StyledPageLayout>
    </StyledLayout>
  );
};

const StyledLayout = styled(Layout)`
  min-height: 100vh;
`;

const StyledPageLayout = styled(Layout)`
  position: relative;
  padding-left: 232px;
`;

export default PageLayout;
