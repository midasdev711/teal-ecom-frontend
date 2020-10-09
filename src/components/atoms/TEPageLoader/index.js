import React from 'react';
import styled from 'styled-components';

const TEPageLoader = ({ loading }) => {

  return <>{<StyledLoader src='/images/logo_main.svg' />}</>;
};

const StyledLoader = styled.img`
  width: 40px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export default TEPageLoader;
