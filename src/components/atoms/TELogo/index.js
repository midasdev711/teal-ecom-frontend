import React, { useState, useEffect } from "react";
import Link from "next/link";
import styled from "styled-components";
import TESelector from "../TESelector";
import { Typography, Select } from "antd";
import Router from "next/router";

const { Text } = Typography;
const TELogo = () => {
  const [channelName, setChannelName] = useState("Ecommerce");

  const handleChange = (value) => {
    setChannelName(value);
    localStorage.setItem("channelName", value);
    Router.push("/");
  };

  useEffect(() => {
    setChannelName(localStorage.getItem("channelName") || "Ecommerce");
  });

  return (
    <LogoWrapper>
      <LogoImage className="logo" src="/favicon.svg" />
      <LogoTitle>
        <TESelector value={channelName} onChange={handleChange}>
          <Select.Option value="Ecommerce">Ecommerce</Select.Option>
          <Select.Option value="Stories">Stories</Select.Option>
        </TESelector>
      </LogoTitle>
    </LogoWrapper>
  );
};

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 35px;
  margin: 20px 0px;
  background: white;
  box-shadow: 0px 4px 4px rgba(186, 195, 201, 0.25);
  border-radius: 5px;
  .ant-select {
    box-shadow: 0px 0px 0px #fff;
    .ant-select-selector {
      padding-left: 50px;
    }
  }
  .logo {
    position: absolute;
    z-index: 10;
  }
`;

const LogoImage = styled.img`
  height: 18.5px;
  margin: 0px 16px 0px 15px;
`;

const LogoTitle = styled(Text)`
  font-weight: bold;
  width: 100%;
  font-size: 14px;
`;

export default TELogo;
