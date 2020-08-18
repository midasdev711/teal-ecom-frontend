import React, { useState } from "react";
import styled from "styled-components";
// icons
import {
  StarOutlined,
  DownOutlined,
  SortAscendingOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
// ui
import { Row, Col, Input, Button, Dropdown, Radio, Checkbox, Tag } from "antd";

const { Search } = Input;

const Filters = (props) => {
  const [valueSubscription, setValueSubscription] = useState(0);
  const [isVisible, setIsVisible] = useState({ name: "", value: false });
  // const [valueCheckbox, setValueCheckbox] = useState([]);

  const onChangeSubscription = (e) => {
    setValueSubscription(e.target.value);
  };

  const onChangeCheckbox = (fieldName, e) => {
    setIsVisible({ name: fieldName, value: true });
  };

  const onVisibleChangeCheckbox = (fieldName, visible) => {
    setIsVisible({ name: fieldName, value: visible });
  };

  return (
    <ContentFilters>
      <Row gutter={0}>
        <Col md={6}>
          <SearchBox
            placeholder="Filter orders"
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
              Status <DownOutlined />
            </ButtonBox>
          </Dropdown>
        </Col>
        <Col md={4}>
          <Dropdown
            overlay={
              <DropdownBox>
                <CheckboxGroupStyle
                  onChange={(e) => onChangeCheckbox("payment", e)}
                >
                  <CheckboxStyle value={1}>Authorized</CheckboxStyle>
                  <CheckboxStyle value={2}>Paid</CheckboxStyle>
                  <CheckboxStyle value={3}>Partially refunded</CheckboxStyle>
                  <CheckboxStyle value={4}>Partially paid</CheckboxStyle>
                  <CheckboxStyle value={5}>Pending</CheckboxStyle>
                  <CheckboxStyle value={6}>Refunded</CheckboxStyle>
                  <CheckboxStyle value={7}>Unpaid</CheckboxStyle>
                  <CheckboxStyle value={8}>Voided</CheckboxStyle>
                </CheckboxGroupStyle>
                <ButtonLink type="text">Clear</ButtonLink>
              </DropdownBox>
            }
            trigger={["click"]}
            visible={isVisible.name === "payment" ? isVisible.value : false}
            onVisibleChange={(visible) =>
              onVisibleChangeCheckbox("payment", visible)
            }
          >
            <ButtonBox block type="default">
              Payment status <DownOutlined />
            </ButtonBox>
          </Dropdown>
        </Col>
        <Col md={4}>
          <Dropdown
            overlay={
              <DropdownBox>
                <CheckboxGroupStyle
                  onChange={(e) => onChangeCheckbox("fulfillment", e)}
                >
                  <CheckboxStyle value={1}>Fulfilled</CheckboxStyle>
                  <CheckboxStyle value={2}>Unfulfilled</CheckboxStyle>
                  <CheckboxStyle value={3}>Partially fulfilled</CheckboxStyle>
                </CheckboxGroupStyle>
                <ButtonLink type="text">Clear</ButtonLink>
              </DropdownBox>
            }
            trigger={["click"]}
            visible={isVisible.name === "fulfillment" ? isVisible.value : false}
            onVisibleChange={(visible) =>
              onVisibleChangeCheckbox("fulfillment", visible)
            }
          >
            <ButtonBox block type="default">
              Fulfillment status <DownOutlined />
            </ButtonBox>
          </Dropdown>
        </Col>
        <Col md={2}>
          <ButtonLast block type="default" onClick={() => props.onOpen(true)}>
            More filters
          </ButtonLast>
        </Col>
        <Col md={3}>
          <Dropdown
            trigger={["click"]}
            placement="bottomRight"
            overlay={
              <DropdownBox>
                <Tag>Canceled</Tag>
                <Tag>Tagged with test</Tag>
                <PopupTitleView>View name</PopupTitleView>
                <Row gutter={0}>
                  <Col md={16}>
                    <InputStyle />
                  </Col>
                  <Col md={8}>
                    <ButtonSaveView block type="primary">
                      Save view
                    </ButtonSaveView>
                  </Col>
                </Row>
                <ActionStyle>
                  <ButtonDeleteView type="link" icon={<DeleteOutlined />}>
                    Delete view
                  </ButtonDeleteView>
                </ActionStyle>
              </DropdownBox>
            }
          >
            <ButtonContent>
              <ButtonSaved block type="default" icon={<StarOutlined />}>
                Save View
              </ButtonSaved>
            </ButtonContent>
          </Dropdown>
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
};

const ContentFilters = styled.div`
  padding: 15px;
`;

const ButtonContent = styled.div`
  width: 100%;
  padding-left: 10px;
`;

const ButtonSaved = styled(Button)`
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

const CheckboxGroupStyle = styled(Checkbox.Group)`
  width: 100%;
`;

const CheckboxStyle = styled(Checkbox)`
  display: block;
  height: 30px;
  line-height: 30px;
  width: 100%;
  margin-left: 0 !important;
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

const ActionStyle = styled.div`
  border-top: 1px solid #ddd;
  padding-top: 10px;
  margin-top: 15px;
`;

const PopupTitleView = styled.p`
  margin: 15px 0;
`;

const ButtonDeleteView = styled(Button)`
  color: #666;
`;

const InputStyle = styled(Input)`
  border-radius: 0;
`;

const ButtonSaveView = styled(Button)`
  border-radius: 0;
`;

export default Filters;
