import React from 'react';
import styled from 'styled-components';
import { Layout, Button } from 'antd';
import SideMenu from '../SideMenu';
import NewSideBar from '../NewSideBar';
import TopMenu from '../TopMenu';

const { Content } = Layout;
const NewPageLayout = ({ children }) => {
    return (
        <StyledLayout>
            <TopMenu />
            <NewSideBar />
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

export default NewPageLayout;
