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
    <ActionItemBlock top={props.top} right={props.right} hideAddButton={props.hideAddButton}>
      {
        !props.hideAddButton && 
        <AddButton onClick={() => props.goToNewPage()}>
          <img src={'/images/new_small.svg'} />
          <AddButtonText>Add</AddButtonText>
        </AddButton>
      }

      <IconButton onClick={() => props.onOpen(true)}>
        <img src={'/images/icon_filter.svg'} />
      </IconButton>

      <IconButton onClick={() => props.onSearch(true)}>
        <img src={'/images/icon_search.svg'} />
      </IconButton>
    </ActionItemBlock>
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

const AddButton = styled(Button)`
    width: 70px;
    height: 30px;

    background: #0095F8;
    border-radius: 5px;

    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
        background-color: #0095F8;
        opacity: 0.8;
        box-shadow: 0px 0px 25px #989898;
    }
`;

const ActionItemBlock = styled.div`
    position: absolute;
    top: ${props => props.top ? props.top : '0'}px;
    right: ${props => props.right ? props.right : '0'}px;
    display: flex;
    width: ${props => props.hideAddButton ? '70' : '150'}px;
    justify-content: space-between;
    z-index: 10;
`;

const IconButton = styled(Button)`
    border: none;
    padding: 0;
    box-shadow: none;
    &:hover {
      box-shadow: 0px 0px 10px #989898;
    }
`;

const AddButtonText = styled.span`
    font-family: Proxima Nova;
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 14px;
    color: #FFFDFD;
    padding-left: 10px;
`;

export default Filters;
