import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

import { Layout, Button } from "antd";


const HomeSideBar = () => {
  const [channelName, setChannelName] = useState("Ecommerce");
  const [userData, setUserData] = useState("");
  const [activeTabForCreate, setActiveTabForCreate] = useState('');
  const [isNewPage, setIsNewPage] = useState(false);
  const router = useRouter();
  const { pathname } = router;

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

  return (
    <StyledSider theme="light">
      <Wrapper>
        <BarMain>
          <Button
            type="text"
            onClick={handleBackButton}
            icon={<img src="/images/logo-new.svg" alt="" />}
          />
        </BarMain>
      </Wrapper>
    </StyledSider>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: inline-flex;
  height: 100%;
`;

const BarMain = styled.div`
  width: 50px;
  padding: 7px;
  padding-top: 40px;
  background: #fff;
  height: 100%;
`;

const StyledSider = styled(Layout.Sider)`
  max-width: 50px !important;
  min-width: 50px !important;
  width: 50px !important;
  padding: 0px;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10;
  height: calc(100%);
`;

export default HomeSideBar;
