import React, { useState } from "react";
import styled from "styled-components";
// icons
import { StarOutlined, DownOutlined } from "@ant-design/icons";
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
        <Col md={8}>
          <SearchBox
            placeholder="Filter customers"
            onSearch={(value) => console.log(value)}
          />
        </Col>
        <Col md={4}>
          <Dropdown
            overlay={
              <DropdownBox>
                <RadioGroupStyle
                  onChange={onChangeSubscription}
                  value={valueSubscription}
                >
                  <RadioStyle value={1}>Subscribed</RadioStyle>
                  <RadioStyle value={2}>Pending confirmation</RadioStyle>
                  <RadioStyle value={3}>Not subscribed</RadioStyle>
                </RadioGroupStyle>
                <ButtonLink type="text">Clear</ButtonLink>
              </DropdownBox>
            }
            trigger={["click"]}
          >
            <ButtonBox block type="default">
              Email subscription status <DownOutlined />
            </ButtonBox>
          </Dropdown>
        </Col>
        <Col md={3}>
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
        <Col md={4}>
          <Dropdown
            overlay={
              <DropdownBox>
                <RadioGroupStyle
                  onChange={onChangeSubscription}
                  value={valueSubscription}
                >
                  <RadioStyle value={1}>Active account</RadioStyle>
                  <RadioStyle value={2}>Disabled account</RadioStyle>
                  <RadioStyle value={3}>Invited to create account</RadioStyle>
                  <RadioStyle value={4}>Declined account invitation</RadioStyle>
                </RadioGroupStyle>
                <ButtonLink type="text">Clear</ButtonLink>
              </DropdownBox>
            }
            trigger={["click"]}
          >
            <ButtonBox block type="default">
              Customer account status <DownOutlined />
            </ButtonBox>
          </Dropdown>
        </Col>
        <Col md={2}>
          <ButtonLast block type="default" onClick={() => props.onOpen(true)}>
            More filters
          </ButtonLast>
        </Col>
        <Col md={3}>
          <ButtonSaved block type="default" disabled icon={<StarOutlined />}>
            Saved
          </ButtonSaved>
        </Col>
      </Row>
    </ContentFilters>
  );
};

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
