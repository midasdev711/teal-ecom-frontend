import React from 'react';
import styled from 'styled-components';
import { Layout } from 'antd';
import SideMenu from '../SideMenu';

const { Content } = Layout;
const PageLayout = ({ children }) => {
  return (
    <StyledLayout>
      <SideMenu />
      <Layout>
        <Content>{children}</Content>
      </Layout>
    </StyledLayout>
  );
};

const StyledLayout = styled(Layout)`
  min-height: 100vh;
`;

export default PageLayout;
