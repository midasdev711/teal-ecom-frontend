import React from 'react';
import styled from 'styled-components';
import { Layout, Button } from 'antd';
import HomeSideBar from '../HomeSideBar';

const { Content } = Layout;
const PageLayout = ({ children }) => {
  return (
    <StyledLayout>
      {/* <SideMenu /> */}
      <HomeSideBar />
      <StyledPageLayout>
        <Content>{children}</Content>
      </StyledPageLayout>
    </StyledLayout>
  );
};

const StyledLayout = styled(Layout)`
  min-height: 100vh;
  padding-top: 39px;
`;

const StyledPageLayout = styled(Layout)`
  position: relative;
  max-width: 950px;
  margin: 0 auto;
`;

export default PageLayout;
