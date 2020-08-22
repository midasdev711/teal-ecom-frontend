import React, { useState } from "react";
import styled from "styled-components";
// icons
import { StarOutlined, DownOutlined, SortAscendingOutlined } from "@ant-design/icons";
// ui
import { Row, Col, Input, Button, Dropdown, Radio } from "antd";

const { Search } = Input;

const Filters = (props) => {
  const [valueSubscription, setValueSubscription] = useState(0);

  const onChangeSubscription = (e) => {
    setValueSubscription(e.target.value);
  };

  return (
    <ContentFilters>
      <Row gutter={0}>
        <Col md={10}>
          <SearchBox
            placeholder="Filter products"
            onSearch={(value) => console.log(value)}
          />
        </Col>
        <Col md={3}>
          <Dropdown
            overlay={
              <DropdownBox>
                <RadioGroupStyle
                  onChange={onChangeSubscription}
                  value={valueSubscription}
                >
                  <RadioStyle value={1}>mysolidshoes</RadioStyle>
                </RadioGroupStyle>
                <ButtonLink type="text">Clear</ButtonLink>
              </DropdownBox>
            }
            trigger={["click"]}
          >
            <ButtonBox block type="default">
              Product vendor <DownOutlined />
            </ButtonBox>
          </Dropdown>
        </Col>
        <Col md={3}>
          <Dropdown
            overlay={
              <DropdownBox>
                <RadioGroupStyle
                  onChange={onChangeSubscription}
                  value={valueSubscription}
                >
                  <RadioStyle value={1}>Available on Online Store</RadioStyle>
                  <RadioStyle value={2}>Unavailable on Online Store</RadioStyle>
                </RadioGroupStyle>
                <ButtonLink type="text">Clear</ButtonLink>
              </DropdownBox>
            }
            trigger={["click"]}
          >
            <ButtonBox block type="default">
            Availability <DownOutlined />
            </ButtonBox>
          </Dropdown>
        </Col>
        <Col md={2}>
          <Dropdown
            overlay={
              <DropdownBox>
                <Input />
                <ButtonLink type="link">Clear</ButtonLink>
              </DropdownBox>
            }
            trigger={["click"]}
          >
            <ButtonBox block type="default">
              Tagged with <DownOutlined />
            </ButtonBox>
          </Dropdown>
        </Col>
        <Col md={2}>
          <ButtonLast block type="default" onClick={() => props.onOpen(true)}>
            More filters
          </ButtonLast>
        </Col>
        <Col md={2}>
          <ButtonSaved block type="default" disabled icon={<StarOutlined />}>
            Saved
          </ButtonSaved>
        </Col>
        <Col md={2}>
          <Dropdown
            overlay={
              <DropdownBox>
                <h3>Sort by</h3>
                <RadioGroupStyle
                  onChange={onChangeSubscription}
                  value={valueSubscription}
                >
                  <RadioStyle value={1}>Order number (ascending)</RadioStyle>
                  <RadioStyle value={2}>Order number (descending)</RadioStyle>
                  <RadioStyle value={3}>Date (oldest first)</RadioStyle>
                  <RadioStyle value={4}>Date (newest first)</RadioStyle>
                  <RadioStyle value={5}>Customer name (A-Z)</RadioStyle>
                  <RadioStyle value={6}>Customer name (Z-A)</RadioStyle>
                  <RadioStyle value={7}>Payment status (A-Z)</RadioStyle>
                  <RadioStyle value={8}>Payment status (Z-A)</RadioStyle>
                  <RadioStyle value={9}>Fulfillment status (A-Z)</RadioStyle>
                  <RadioStyle value={10}>Fulfillment status (Z-A)</RadioStyle>
                  <RadioStyle value={11}>Total price (low to high)</RadioStyle>
                  <RadioStyle value={12}>Total price (high to low)</RadioStyle>
                </RadioGroupStyle>
              </DropdownBox>
            }
            trigger={["click"]}
          >
            <ButtonContent>
              <ButtonSaved
                block
                type="default"
                icon={<SortAscendingOutlined />}
              >
                Sort
              </ButtonSaved>
            </ButtonContent>
          </Dropdown>
        </Col>
      </Row>
    </ContentFilters>
  );
};;

const ContentFilters = styled.div`
  padding: 15px;
`;

const ButtonSaved = styled(Button)`
  margin-left: 10px;
  padding: 6px 12px;
  height: auto;
`;

const DropdownBox = styled.div`
  padding: 15px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const ButtonContent = styled.div`
  width: 100%;
  padding-left: 10px;
`;

const ButtonLink = styled(Button)`
  color: #ccc;
  margin: 10px 0 0;
  padding: 0 3px;
  display: block;
`;

const RadioGroupStyle = styled(Radio.Group)`
  width: 100%;
`;

const RadioStyle = styled(Radio)`
  display: block;
  height: 30px;
  line-height: 30px;
  width: 100%;
`;

const SearchBox = styled(Search)`
  border-radius: 4px 0 0 4px;
  padding: 6px 12px 6px 35px !important;
`;

const ButtonBox = styled(Button)`
  padding: 6px 12px;
  height: auto;
  border-radius: 0;
  border-left: 0;
`;

const ButtonLast = styled(Button)`
  padding: 6px 12px;
  height: auto;
  border-radius: 0 4px 4px 0;
  border-left: 0;
`;

export default Filters;
