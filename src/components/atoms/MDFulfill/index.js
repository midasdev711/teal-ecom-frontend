import React from "react";
import styled from "styled-components";
// ui
import { Modal, Checkbox, Button } from "antd";

const MDFulfill = props => {
  const { isOpen, onCancel, onOk, title, content, okText, cancelText } = props;

  return (
    <Modal
      title={title}
      centered
      visible={isOpen}
      cancelText={cancelText}
      onOk={() => onCancel(false)}
      onCancel={() => onOk(false)}
      okText={okText}
      footer={
        <CustomFooter>
          <CheckboxStyle>
            Send a <a href="">notification</a> to the customer
          </CheckboxStyle>
          <Button type="default">{cancelText}</Button>
          <Button type="primary">{okText}</Button>
        </CustomFooter>
      }
    >
      {content}
    </Modal>
  );
};

const CustomFooter = styled.div`
  width: 100%;
`;

const CheckboxStyle = styled(Checkbox)`
  float: left;
  margin-top: 10px;
`;

export default MDFulfill;