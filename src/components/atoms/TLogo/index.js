import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const TLogo = () => {
  return (
    <Link href='/'>
      <a>
        <LogoImage src='/images/logo.svg' />
      </a>
    </Link>
  );
};

const LogoImage = styled.img`
  height: 20px;
  margin: 20px 0px;
`;

export default TLogo;
