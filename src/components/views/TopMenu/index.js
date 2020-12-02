import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";

import { Button } from "antd";

import { Routes, BlogsRoutes } from "../../../utils/Routes";
import { buildDynamicRoute } from "../../../utils";

const TopMenu = () => {
    const [channelName, setChannelName] = useState("Ecommerce");
    const [userData, setUserData] = useState("");
    const [activeTabForCreate, setActiveTabForCreate] = useState('');
    const [isNewPage, setIsNewPage] = useState(false);
    const router = useRouter();
    const { pathname } = router;
    const RoutesName = channelName === "Ecommerce" ? Routes : BlogsRoutes;

    useEffect(() => {
        setChannelName(localStorage.getItem("channelName") || "Ecommerce");
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
            </div>
        );
    });

    return (
        <PageHeader>
            <BackButton onClick={handleBackButton}><img src={'/images/icon_left_arrow.svg'} /></BackButton>
            <MyBlog>
                <BlogImg src="/images/blog.svg" alt="" />
                <BlogTitle>My blog name</BlogTitle>
            </MyBlog>
            {MenuList}
        </PageHeader>
    );
};


const BlogTitle = styled.p`
  margin: 0;
  font-family: Proxima Nova;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
    color: #404950;
`;

const BlogImg = styled.img`
  margin-right: 10px;
  width: 20px;
  height: 20px;
`;

const MyBlog = styled.div`
  padding: 5px;
  padding-right: 8px;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 5px;
  display: flex;
  align-items: center;
`;

const LinkButton = styled.a`
  padding: 7px 5px;
  color: ${(props) => (props.active ? "#0095F8" : "#404950")};
  height: 35px;
  font-family: Proxima Nova;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
  display: flex;
  align-items: center;
  background: ${(props) => (props.active ? "#E5F4FE" : "transparent")};
  border-radius: 5px;
  margin-left: 10px;
  &:hover {
    color: #404950;
  }
`;

const PageHeader = styled.div`
    position: fixed;
    z-index: 20;
    width: 100%;
    text-align: center;
    background: #FFFFFF;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-left: 50px;
`;

const BackButton = styled(Button)`
    position: absolute;
    left: 10px;
    border: none;
    padding: 0;
`;

export default TopMenu;
