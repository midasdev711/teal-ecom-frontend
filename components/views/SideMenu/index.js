import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { Layout, Typography, Select } from 'antd';
import { TELogo, TESelector } from '../../atoms';
import Routes from '../../../utils/Routes';
import Link from 'next/link';

const SideMenu = () => {
  const handleChange = () => {};
  const { pathname } = useRouter();

  const MenuList = Routes.map((route, index) => {
    return (
      <Link key={index} href={route.path}>
        <LinkButton active={pathname === route.path}>{route.title}</LinkButton>
      </Link>
    );
  });

  return (
    <StyledSider theme='light'>
      <TELogo />
      <MenuTitle>CHANNELS</MenuTitle>
      <TESelector defaultValue='Teal' onChange={handleChange}>
        <Select.Option value='teal'>Teal</Select.Option>
      </TESelector>
      <MainMenu>{MenuList}</MainMenu>
    </StyledSider>
  );
};

const StyledSider = styled(Layout.Sider)`
  border-right: 1px solid #ededed;
  max-width: 232px !important;
  min-width: 232px !important;
  width: 232px !important;
  padding: 0px 16px;
`;

const MenuTitle = styled(Typography.Text)`
  font-weight: bold;
  font-size: 12px;
  line-height: 12px;
  padding: 10px 0px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #788995;
`;

const MainMenu = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
`;

const LinkButton = styled.a`
  padding: 9px 16px 10px 16px;
  color: #404950;
  width: 100%;
  height: 35px;
  font-size: 14px;
  display: flex;
  align-items: center;
  font-weight: ${(props) => (props.active ? 'bold' : 'normal')};
  background: ${(props) => (props.active ? '#E5F4FE' : '#f6f8f9')};
  border-radius: 5px;
  &:hover {
    color: #404950;
  }
`;

export default SideMenu;
