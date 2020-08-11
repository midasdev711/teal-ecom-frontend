import React from 'react';
import styled from 'styled-components';

const TEIcon = ({ path, width, height }) => {
  return <StyledImage src={path} width={width} height={height} />;
};

const StyledImage = styled.img``;

export default TEIcon;
