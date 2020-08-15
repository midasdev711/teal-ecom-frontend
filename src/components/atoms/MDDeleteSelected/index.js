import React from "react";
import styled from "styled-components";
// ui
import { Modal, Button } from "antd";

const MDDeleteSelected = props => {
  const { isOpen, onCancel, onDelete, count, name } = props;

  return (
    <Modal
      title={`Delete ${count} ${name}?`}
      centered
      visible={isOpen}
      footer={
        <FooterCustom>
          <Button onClick={() => onCancel(false)}>Cancel</Button>
          <Button type="primary" danger onClick={onDelete}>
            Delete Customer
          </Button>
        </FooterCustom>
      }
      onOk={() => onCancel(false)}
      onCancel={() => onCancel(false)}
    >
      <DescriptionForm>
        1 out of the {count} selected {name}s won't be deleted because they have
        placed an order. Confirm you wish to delete 1 {name}.
      </DescriptionForm>
    </Modal>
  );
};

const DescriptionForm = styled.p`
  font-size: 14px;
  margin-bottom: 15px;
`;

const FooterCustom = styled.div`
  text-align: right;
`;

export default MDDeleteSelected;