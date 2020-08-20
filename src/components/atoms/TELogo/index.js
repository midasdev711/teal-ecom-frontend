import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Typography } from 'antd';

const { Text } = Typography;
const TELogo = ({name}) => {
  return (
    <Link href='/'>
      <a>
        <LogoWrapper>
          <LogoImage src='/favicon.svg' />
          <LogoTitle>{name}</LogoTitle>
          <ExploreIcon src='/images/icon_detail.svg' />
        </LogoWrapper>
      </a>
    </Link>
  );
};

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 200px;
  height: 35px;
  margin: 20px 0px;
  background: white;
  box-shadow: 0px 4px 4px rgba(186, 195, 201, 0.25);
  border-radius: 5px;
`;

const LogoImage = styled.img`
  height: 18.5px;
  margin: 0px 16px 0px 15px;
`;

const LogoTitle = styled(Text)`
  font-weight: bold;
  font-size: 14px;
`;

const ExploreIcon = styled.img`
  margin-right: 16px;
  margin-left: auto;
`;

export default TELogo;
