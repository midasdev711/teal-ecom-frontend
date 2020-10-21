import React from "react";
import styled from "styled-components";
// ui
import { Modal, Button } from "antd";

const DeletePopUp = props => {
  const { isOpen, onCancel, onDelete, count, name  , message , buttonText} = props;

  return (
    <Modal
      title={`Delete ${name}`}
      centered
      visible={isOpen}
      footer={
        <FooterCustom>
          <Button onClick={() => onCancel(false)}>Cancel</Button>
          <Button type="primary" danger onClick={onDelete}>
           {buttonText}
          </Button>
        </FooterCustom>
      }
      onOk={() => onCancel(false)}
      onCancel={() => onCancel(false)}
    >
      <DescriptionForm>
      {message}
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

export default DeletePopUp;