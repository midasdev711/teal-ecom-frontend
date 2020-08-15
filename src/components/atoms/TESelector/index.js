import React from 'react';
import styled from 'styled-components';
import { Select } from 'antd';

const TESelector = ({ children, ...props }) => {
  return (
    <StyledSelect
      suffixIcon={<DropDownIcon src='/images/icon_dropdown.svg' />}
      {...props}
    >
      {children}
    </StyledSelect>
  );
};

const DropDownIcon = styled.img`
  object-fit: corver;
  width: 10px;
`;

const StyledSelect = styled(Select)`
  align-items: center;
  display: flex;
  width: 100%;
  font-weight: bold;
  font-size: 14px;
  margin: 10px 0px;
  border: none;
  outline: none;
  height: 35px;
  background: white;
  box-shadow: 0px 4px 4px rgba(186, 195, 201, 0.25);
  border-radius: 5px;
  .ant-select-selector{
    border: none !important;
    outline: none !important;
    box-shadow: none !important;
  }
`;

export default TESelector;
