import React from 'react';
import styled from 'styled-components';
import { Input } from 'antd';

const InputText = (props) => {
  return <StyledInput {...props} />;
};

const StyledInput = styled(Input)`
  width: 100%;
  background: #f9f9f9;
  border: 1px solid #ededed;
  box-sizing: border-box;
  box-shadow: none;
  outline: none;
  border-radius: 5px;
  padding: 16px 20px;
  font-size: 16px;
  line-height: 20px;
  height: 50px;
  &:focus {
    background: #ffffff;
    box-shadow: 10px 10px 25px rgba(228, 234, 238, 0.8);
    outline: none;
  }
  @media (max-width: 375px) {
    border-top-style: initial;
  }
`;

export default InputText;
