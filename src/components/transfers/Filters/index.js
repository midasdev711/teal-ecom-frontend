import React, { useState } from "react";
import styled from "styled-components";
// icons
import { DownOutlined } from "@ant-design/icons";
// ui
import { Row, Col, Input, Button, Dropdown, Select } from "antd";

const { Search } = Input;
const { Option } = Select;

const Filters = (props) => {
  const [valueSubscription, setValueSubscription] = useState(0);

  const onChangeSubscription = (e) => {
    setValueSubscription(e.target.value);
  };

  return (
    <ContentFilters>
      <Row gutter={0}>
        <Col md={3}>
          <Dropdown
            overlay={
              <DropdownBox>
                <p>Show all resources where:</p>
                <SelectStyle placeholder="Select a filter...">
                  <Option value="1">Status</Option>
                  <Option value="2">Supplier</Option>
                  <Option value="3">Tagged with</Option>
                </SelectStyle>
              </DropdownBox>
            }
            trigger={["click"]}
          >
            <ButtonBoxLeft block type="default">
              Filter <DownOutlined />
            </ButtonBoxLeft>
          </Dropdown>
        </Col>

        <Col md={15}>
          <SearchBox
            placeholder="Filter customers"
            onSearch={(value) => console.log(value)}
          />
        </Col>

        <Col md={2}>
          <TextSortBy>Sort by</TextSortBy>
        </Col>
        <Col md={4}>
          <SelectStyle className="sort_by_custom" defaultValue="1">
            <Option value="1">Newest</Option>
            <Option value="2">Oldest</Option>
            <Option value="3">Expected soon</Option>
            <Option value="4">Origin (A-Z)</Option>
            <Option value="5">Origin (Z-A)</Option>
            <Option value="6">Destination (A-Z)</Option>
            <Option value="7">Destination (Z-A)</Option>
          </SelectStyle>
        </Col>
      </Row>
    </ContentFilters>
  );
};

const TextSortBy = styled.span`
  width: 100%;
  text-align: center;
  display: inline-block;
  padding: 5px 0;
`;

const SelectStyle = styled(Select)`
  width: 100%;
`;

const ButtonBoxLeft = styled(Button)`
  border-right: 0;
  padding: 6px 12px;
  height: auto;
  border-radius: 0;
`;

const ContentFilters = styled.div`
  padding: 15px;
`;

const DropdownBox = styled.div`
  padding: 15px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const SearchBox = styled(Search)`
  border-radius: 0 4px 4px 0px;
  padding: 6px 12px 6px 35px !important;
`;

export default Filters;
