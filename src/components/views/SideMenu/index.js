import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { Layout, Typography, Select } from "antd";
import { TELogo, TESelector } from "../../atoms";
import { Routes, StoriesRoutes } from "../../../utils/Routes";
import Link from "next/link";

const SideMenu = () => {
  const [channelName, setChannelName] = useState("Ecommerce");

  useEffect(() => {
    setChannelName(localStorage.getItem("channelName") || "Ecommerce");
  });

  const { pathname } = useRouter();
  const RoutesName = channelName === "Ecommerce" ? Routes : StoriesRoutes;

  const MenuList = RoutesName.map((route, index) => {
    return (
      <div key={index}>
        <Link href={route.path} as={route.as}>
          <LinkButton active={!route.components && pathname === route.path}>
            {route.title}
          </LinkButton>
        </Link>
        {pathname.split("/", 2)[1] === route.path.split("/", 2)[1] &&
          route.components &&
          route.components.map((res, indexKey) => {
            return (
              <Link key={indexKey} href={res.path}>
                <LinkButton
                  active={pathname === res.path}
                  style={{ paddingLeft: "30px" }}
                >
                  {res.title}
                </LinkButton>
              </Link>
            );
          })}
      </div>
    );
  });

  return (
    <StyledSider theme="light">
      <TELogo name={channelName} />
      <MenuTitle>CHANNELS</MenuTitle>
      <TESelector value="teal">
        <Select.Option value="teal">Teal</Select.Option>
      </TESelector>
      <MainMenu>{MenuList}</MainMenu>
    </StyledSider>
  );
};

const StyledSider = styled(Layout.Sider)`
  border-right: 1px solid #ededed;
  max-width: 250px !important;
  min-width: 250px !important;
  width: 250px !important;
  padding: 0px 16px;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10;
  height: calc(100%);
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
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
  background: ${(props) => (props.active ? "#E5F4FE" : "#f6f8f9")};
  border-radius: 5px;
  &:hover {
    color: #404950;
  }
`;

export default SideMenu;
