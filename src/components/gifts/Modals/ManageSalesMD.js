import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { Checkbox, Button, Modal } from "antd";

const ManageSalesMD = ({ open, close, values }) => {
  const [openModal, setopenModal] = useState(open);

  useEffect(() => {
    setopenModal(open);
  });

  return (
    <Modals
      visible={openModal}
      onOk={close}
      width="35%"
      onCancel={close}
      title="Manage sales channel visibility"
      footer={[
        <Button size="large" key="back" onClick={close}>
          Cancel
        </Button>,
        <Button key="submit" size="large" type="primary" onClick={close}>
          Done
        </Button>,
      ]}
    >
      <Wraper className="wrapper">
        <Checkbox checked>Online Store</Checkbox>
      </Wraper>
    </Modals>
  );
};

const Wraper = styled.div``;

const Modals = styled(Modal)`
  & .ant-modal-content {
    & .ant-modal-title {
      font-size: 22px;
    }
  }
`;

export default ManageSalesMD;
