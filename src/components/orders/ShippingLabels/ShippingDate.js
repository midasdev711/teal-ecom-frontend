import React from "react";
import styled from "styled-components";
import moment from "moment";
// ui
import { Card, Select, Checkbox } from "antd";

const { Option } = Select;

const today = moment();

const listDate = [today];
for (let i = 1; i < 7; i++) {
  listDate.push(moment().add(i, "days"));
}

const ShippingDate = () => {
  return (
    <Card>
      <h3>Shipping Date</h3>
      <SelectStyle defaultValue={0}>
        {listDate.length > 0 &&
          listDate.map((day, i) => (
            <Option key={i} value={i}>
              {day.format("ddd, MMM DD")}
            </Option>
          ))}
      </SelectStyle>
      <p>The date you’re going to send the shipment out.</p>
      <CardFooter>
        <Checkbox>Email shipment details to customers today.</Checkbox>
      </CardFooter>
    </Card>
  );
};

const CardFooter = styled.div`
  padding: 15px 0 0;
  border-top: 1px solid #ddd;
`;

const SelectStyle = styled(Select)`
  width: 100%;
`;

export default ShippingDate;