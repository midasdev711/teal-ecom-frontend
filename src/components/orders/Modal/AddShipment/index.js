import React, {useState} from "react";
import styled from "styled-components";
import { Radio, Input, Button, Col, Row } from "antd";

const AddShipment = (props) => {
  const [shippingRate, setShippingRate] = useState({name: 'free', rate: 0});

  const onCustomNameChange = (name, value="") => {
    console.log(name, value)
    let tmp = Object.assign({}, shippingRate);
    tmp[name] = value;
    setShippingRate(tmp)
  }
  return (
    <RetesPopover>
      <RatesShiping>
        <PopoversectionRetes>
          <NextNoticeTates>
            <h3 className="next-heading">
              <strong> Not seeing all your rates?</strong>
            </h3>
            <p className="sub-text-rates">
              Add a customer with a complete shipping address to select from
              calculated shipping rates
            </p>
          </NextNoticeTates>
          <Radio.Group onChange={(e) => onCustomNameChange('name', e.target.value)} >
            <StyledRadio value={'free'}>Free shipping</StyledRadio>
            <StyledRadio value={'custom'}>Custom</StyledRadio>
          </Radio.Group>
          <InputRetes>
            <Col md={14} className="customer">
              <Input size="large" type="text" placeholder="Custom rate name" disabled={shippingRate.name == 'free'} onChange={e => onCustomNameChange('name', e.target.value)}/>
            </Col>
            <Col md={8}>
              <Input size="large" type="text" placeholder="$" disabled={shippingRate.name == 'free'} onChange={e => onCustomNameChange('rate', e.target.value)}/>
            </Col>
          </InputRetes>
        </PopoversectionRetes>
        <div className="button-bottom">
          <Button size="large" onClick={() => props.onClose()}>Close</Button>
          <Button size="large" type="primary" onClick={() => props.onOk(shippingRate)}>Apply</Button>
        </div>
      </RatesShiping>
    </RetesPopover>
  );
};

const RatesShiping = styled.div`
  & .button-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid #dfe3e8;
    padding: 14px;
  }
`;
const RetesPopover = styled.div`
  width: 550px;
  background-color: rgba(255, 255, 255, 0.98);
  border-radius: 3px;
`;

const StyledRadio = styled(Radio)`
  display: block;
  height: 30px;
  lineheight: 30px;
`;

const NextNoticeTates = styled.div`
  border-radius: 3px;
  border-style: solid;
  border-width: 1px;
  margin-bottom: 20px;
  padding: 20px;
  background: #fff7b2;
  border-color: #ffe477;
  & .next-heading {
    margin: 0 0 10px;
    text-transform: uppercase;
    color: #31373d;
    font-size: 12px;
  }
  & .sub-text-rates {
    font-size: 14px;
    color: #31373d;
    margin-bottom: 0;
  }
`;
const PopoversectionRetes = styled.div`
  height: 225px;
  padding: 14px;
  overflow-x: auto;
  overflow-y: initial;
`;

const InputRetes = styled(Row)`
  padding: 10px 0px;
  .customer {
    margin-right: 20px;
  }
`;

export default AddShipment;
