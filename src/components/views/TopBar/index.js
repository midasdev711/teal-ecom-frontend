import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { Button, Typography } from "antd";

const { Text } = Typography;

const TopBar = ({title}) => {
  const [userData, setUserData] = useState("");
  const router = useRouter();
  const { pathname } = router;

  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem("userData")));
  }, []);

  const handleBackButton = () => {
    router.push(`/[portal_id]/blogs/dashboard`, { pathname: `/${userData?.uniqueID}/blogs/dashboard` }, { shallow: true });
  }

  return (
    <PageHeader>
        <BackButton onClick={handleBackButton}><img src={'/images/icon_left_arrow.svg'}/></BackButton>
        <PageTitle>{title}</PageTitle>
    </PageHeader>
  );
};

const PageHeader = styled.div`
    position: relative;
    text-align: center;
    background: #FFFFFF;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const BackButton = styled(Button)`
    position: absolute;
    left: 10px;
    border: none;
    padding: 0;
`;

const PageTitle = styled(Text)`
    font-family: Proxima Nova;
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 14px;
    color: #000000;
`;

export default TopBar;
