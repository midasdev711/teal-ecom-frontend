import React, { useState } from "react";
import styled from "styled-components";
import { Button, Checkbox } from "antd";

const Taxes = (props) => {
  const [tax, setTax] = useState(false);
  const onChangeTax = (e) => {
    setTax(e.target.checked);
  }
  return (
    <StyledPopover>
      <ContentTitle>Tax are autometically calculated.</ContentTitle>
      <Checkbox onChange={(e) => onChangeTax(e)}/> Charge taxes
      <ButtonActions>
        <Button size="large" onClick={() => props.onClose()}>Close</Button>
        <Button size="large" type="primary" onClick={() => props.onOk(tax)}>
          Apply
        </Button>
      </ButtonActions>
    </StyledPopover>
  );
};

const StyledPopover = styled.div`
  ${'' /* width: 329px; */}
  padding: 14px;
  background-color: rgba(255, 255, 255, 0.98);
  border-radius: 3px;
`;

const ContentTitle = styled.h4`
  margin: 0;
  cursor: pointer;
  color: #637381;
  font-size: 14px;
  font-weight: 400;
  line-height: 2rem;
  padding: 0;
`;

const ButtonActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid #dfe3e8;
  margin-top: 12px;
  padding: 14px;
`;

export default Taxes;
