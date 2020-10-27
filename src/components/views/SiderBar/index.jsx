import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";

import { PlusOutlined } from "@ant-design/icons";
import { Layout, Typography, Button } from "antd";

import { Routes, StoriesRoutes } from "../../../utils/Routes";
import { buildDynamicRoute } from "../../../utils";

const SiderBar = () => {
  const [channelName, setChannelName] = useState("Ecommerce");
  const [userData, setUserData] = useState("");
  useEffect(() => {
    setChannelName(localStorage.getItem("channelName") || "Ecommerce");
  });

  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem("userData")));
  }, []);

  const { pathname } = useRouter();
  const RoutesName = channelName === "Ecommerce" ? Routes : StoriesRoutes;

  const MenuList = RoutesName.map((route, index) => {
    const mainDynamicRoute = buildDynamicRoute(route.as, userData);
    return (
      <div key={index}>
        <Link href={route.path} as={mainDynamicRoute}>
          <LinkButton active={!route.components && pathname === route.as}>
            {route.title}
          </LinkButton>
        </Link>
        {/* {console.log('pathname.split("/", 2)[1]', pathname.split("/", 4)[3], route.path.split("/", 4)[3])} */}
        {pathname.split("/", 4)[3] === route.path.split("/", 4)[3] &&
          route.components &&
          route.components.map((res, indexKey) => {
            const dynamicRoute = buildDynamicRoute(res.as, userData);

            return (
              <Link key={indexKey} href={res.path} as={dynamicRoute}>
                <LinkButton
                  active={pathname === res.as}
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
      <Wrapper>
        <BarMain>
          <Button
            type="text"
            href="/"
            icon={<img src="/images/logo-new.svg" alt="" />}
          />
        </BarMain>

        <SubBarStyle>
          <ButtonBack
            type="text"
            icon={<img src="/images/back.svg" alt="" />}
          />

          <MyBlog>
            <BlogImg src="/images/blog.svg" alt="" />
            <BlogTitle>My blog name</BlogTitle>
          </MyBlog>

          <ButtonCreate block icon={<PlusOutlined />} type="primary">
            Create
          </ButtonCreate>

          <MainMenu>{MenuList}</MainMenu>
        </SubBarStyle>
      </Wrapper>
    </StyledSider>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: inline-flex;
  height: 100%;
`;

const SubBarStyle = styled.div`
  width: calc(100% - 50px);
  padding: 0 10px;
`;

const BarMain = styled.div`
  width: 50px;
  padding: 7px;
  padding-top: 40px;
  background: #fff;
  height: 100%;
`;

const ButtonCreate = styled(Button)`
  font-family: Proxima Nova;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 14px;
  color: #fffdfd;
  margin-top: 15px;
  height: 30px;
`;

const BlogTitle = styled.p`
  margin: 0;
`;
const BlogImg = styled.img`
  margin-right: 10px;
`;

const MyBlog = styled.div`
  padding: 5px;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 5px;
  display: inline-flex;
  align-items: center;
  width: 100%;
`;

const ButtonBack = styled(Button)`
  margin-top: 40px;
  margin-bottom: 20px;
`;

const StyledSider = styled(Layout.Sider)`
  max-width: 250px !important;
  min-width: 250px !important;
  width: 250px !important;
  padding: 0px;
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
  margin-top: 15px;
`;

const LinkButton = styled.a`
  padding: 9px 16px 10px 16px;
  color: ${(props) => (props.active ? "#0095F8" : "#404950")};
  width: 100%;
  height: 35px;
  font-size: 14px;
  line-height: 16px;
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

export default SiderBar;
