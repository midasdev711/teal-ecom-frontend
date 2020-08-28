import React, { useState } from "react";
import styled from "styled-components";
// icons
import { DownOutlined } from "@ant-design/icons";
// ui
import { Row, Col, Input, Button, Dropdown, Select } from "antd";

const { Search } = Input;
const { Option } = Select;

const sortOptions = [
  {
    label: "Product variant (A–Z)",
    value: 1,
  },
  {
    label: "Product variant (Z–A)",
    value: 2,
  },
  {
    label: "SKU (ascending)",
    value: 3,
  },
  {
    label: "SKU (descending)",
    value: 4,
  },
  {
    label: "Available (ascending)",
    value: 5,
  },
  {
    label: "Available (descending)",
    value: 6,
  },
  {
    label: "When sold out (A–Z)",
    value: 7,
  },
  {
    label: "When sold out (Z–A)",
    value: 8,
  },
]

const Filters = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  const [filterData, setFilterData] = useState("");

  const handleChange = (value) => {
    setIsVisible(true);
    setFilterData(value);
    console.log(`selected ${value}`); 
  };

  const onVisibleChangeCheckbox = (visible) => {
    setIsVisible(visible);
  };

  return (
    <ContentFilters>
      <Row gutter={0}>
        <Col md={3}>
          <Dropdown
            overlay={
              <DropdownBox>
                <p>Show all checkouts where:</p>
                <Select
                  defaultValue="lucy"
                  style={{ width: 150 }}
                  onChange={handleChange}
                  value={filterData}
                >
                  <Option value="">Select a filter...</Option>
                  <Option value="status">Status</Option>
                  <Option value="recovery_status">Recovery Status</Option>
                  <Option value="email_status">Email Status</Option>
                </Select>
                {filterData && filterData.length > 0 && (
                  <>
                    <Select
                      defaultValue="lucy"
                      style={{ width: 150 }}
                      defaultValue=""
                    >
                      <Option value="">Select a value...</Option>
                      <Option value="open">open</Option>
                      <Option value="archived">archived</Option>
                      <Option value="any">any</Option>
                    </Select>
                    <ButtonLink type="text">Add fiter</ButtonLink>
                  </>
                )}
              </DropdownBox>
            }
            trigger={["click"]}
            visible={isVisible}
            onVisibleChange={(visible) => onVisibleChangeCheckbox(visible)}
          >
            <ButtonBox block type="default">
              Filter <DownOutlined />
            </ButtonBox>
          </Dropdown>
        </Col>
        <Col md={16}>
          <SearchBox
            placeholder="Filter checkouts"
            onSearch={(value) => console.log(value)}
          />
        </Col>
        <Col md={5}>
        <SortTable>
            <LabelSort>Sort By</LabelSort>
            <Select defaultValue={1}>
              {sortOptions &&
                sortOptions.length > 0 &&
                sortOptions.map((item, i) => (
                  <Option key={i} value={item.value}>
                    {item.label}
                  </Option>
                ))}
            </Select>
          </SortTable>
        </Col>
      </Row>
    </ContentFilters>
  );
};

const ContentFilters = styled.div`
  padding: 15px;
`;

const DropdownBox = styled.div`
  padding: 15px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  .ant-select {
    display: block !important;
    margin-top: 10px;
  }
`;

const ButtonLink = styled(Button)`
  margin-top: 10px;
  background: #f4f6f8;
  padding: 5px 10px;
  display: block;
`;

const SearchBox = styled(Search)`
  border-radius: 0;
  padding: 6px 12px 6px 35px !important;
`;

const ButtonBox = styled(Button)`
  padding: 6px 12px;
  height: auto;
  border-radius: 0;
`;

const SortTable = styled.div`
  text-align: right;
`;

const LabelSort = styled.span`
  display: inline-block;
  margin-right: 10px;
`;

export default Filters;
