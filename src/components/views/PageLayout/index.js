import React from 'react';
import styled from 'styled-components';
import { Layout, Button } from 'antd';
import SideMenu from '../SideMenu';
import SiderBar from '../SiderBar';

const { Content } = Layout;
const PageLayout = ({ children }) => {
  return (
    <StyledLayout>
      {/* <SideMenu /> */}
      <SiderBar />
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
  padding-left: 250px;
`;

export default PageLayout;
