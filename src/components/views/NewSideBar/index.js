import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";

import { PlusOutlined } from "@ant-design/icons";
import { Layout, Typography, Button } from "antd";

import { Routes, BlogsRoutes } from "../../../utils/Routes";
import { buildDynamicRoute } from "../../../utils";
import { Query } from "react-apollo";
import { clearArticleDetails } from "../../../redux/actions/articles";
import { useDispatch } from "react-redux";

const NewSideBar = () => {
  const [channelName, setChannelName] = useState("Ecommerce");
  const [userData, setUserData] = useState("");
  const [activeTabForCreate, setActiveTabForCreate] = useState('');
  const [isNewPage, setIsNewPage] = useState(false);
  const dispatch = useDispatch()
  const router = useRouter();
  const { pathname } = router;
  const RoutesName = channelName === "Ecommerce" ? Routes : BlogsRoutes;

  useEffect(() => {
    setChannelName(localStorage.getItem("channelName") || "Ecommerce");
   // console.log('router', router)
  });

  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem("userData")));

  }, []);

  useEffect(() => {
    const pathContainer = pathname.split('/');
    const newPath = pathname.split('/', 4)[3];
    // console.log('pathContainer', pathContainer);
    const isNew = (pathContainer.includes('new') || pathContainer?.includes('[pid]')) ? true : false;
    setActiveTabForCreate(newPath);
    setIsNewPage(isNew);
  }, [router])

  const handleBackButton = () => {
    router.push(`/[portal_id]`, { pathname: `/${userData?.uniqueID}` }, { shallow: true });
  }

  const handleCreate = () => {
    dispatch(clearArticleDetails())
    const url = `${(router.asPath.split('/', 4).join('/'))}/new`
    console.log('url', url)
    router.push(`${router.pathname.split('/', 4).join('/')}/new`, { pathname: `${url}` }, { shallow: true })
  }

  const MenuList = RoutesName.map((route, index) => {
    const mainDynamicRoute = buildDynamicRoute(route.as, userData);
    const mainRouteChildren = route.as && route.as.split('/');
    const newMatch = router.asPath.split('/').slice(2).join('/');
    const childRoute = route.as?.split('/').slice(2).join('/');
    const isActive = (activeTabForCreate === 'posts' && activeTabForCreate === route.title.toLowerCase()) ? true : (!route.components && newMatch === childRoute) || (isNewPage && mainRouteChildren?.includes(activeTabForCreate) || activeTabForCreate === route.title.toLowerCase());
    // console.log('newMatch', newMatch)
    // console.log('childRoute', childRoute)
    return (
      <div key={`main_${index}`}>
        <Link href={route.path} as={mainDynamicRoute}>
          <LinkButton active={isActive}>
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
        <SubBarStyle>
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
  width: 100%;
  padding-left: 2px;
`;

const StyledSider = styled(Layout.Sider)`
  max-width: 200px !important;
  min-width: 200px !important;
  width: 200px !important;
  padding: 0px;
  position: fixed;
  left: 0;
  top: 100px;
  z-index: 10;
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
  border-left: ${(props) => (props.active ? "2px solid #0095f8" : "none")};
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  &:hover {
    color: #404950;
  }
`;

export default NewSideBar;
