import React from 'react';
import styled from 'styled-components';
import { Layout, Button } from 'antd';
import TopBar from '../TopBar';

const { Content } = Layout;
const PageLayout = ({ children, title }) => {
    return (
        <StyledLayout>
            {/* <SideMenu /> */}
            <TopBar title={title} />
            <Content>{children}</Content>
        </StyledLayout>
    );
};

const StyledLayout = styled(Layout)`
  min-height: 100vh;
  background-color: #f6f8f9;
`;

export default PageLayout;
