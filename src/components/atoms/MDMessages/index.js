import React from "react";
// ui
import { Modal } from "antd";

const MDMessages = props => {

  const {
    isOpen,
    onCancel,
    onOk,
    title,
    content,
    okText,
    cancelText
  } = props;

  return (
    <Modal
      title={title}
      centered
      visible={isOpen}
      cancelText={cancelText}
      onOk={() => onCancel(false)}
      onCancel={() => onOk(false)}
      okText={okText}
    >
      {content}
    </Modal>
  );
};

export default MDMessages;