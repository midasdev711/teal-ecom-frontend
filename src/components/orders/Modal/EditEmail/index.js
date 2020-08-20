import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { Form, Input, Button, Modal, Card } from "antd";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const EditEmail = ({ open, close, values }) => {
  const [openCustumItem, setopenCustumItem] = useState(open);
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    setopenCustumItem(open);
    form.setFieldsValue({
      email: values,
    });
  }, [open, values]);

  return (
    <Modals
      visible={openCustumItem}
      onOk={close}
      width="35%"
      onCancel={close}
      footer={[
        <Button size="large" key="back" onClick={close}>
          Cancel
        </Button>,
        <Button
          key="submit"
          size="large"
          type="primary"
          onClick={close}
        >
          Apply
        </Button>,
      ]}
    >
      <Wraper className="site-card-border-less-wrapper">
        <CardViews bordered={false} title="Edit Email">
          <p>Notification emails will be sent to this address.</p>
          <Form
            {...layout}
            name="basic"
            onFinish={onFinish}
            form={form}
            onFinishFailed={onFinishFailed}
          >
            <Label
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input size="large" placeholder="Add a note..." />
            </Label>
          </Form>
        </CardViews>
      </Wraper>
    </Modals>
  );
};

const Wraper = styled.div`
  .ant-card.ant-card-bordered {
    width: 40% !important;
  }
`;

const Modals = styled(Modal)`
  & .ant-modal-content {
    & .ant-modal-body {
      padding: 0;
    }
  }
`;

const CardViews = styled(Card)`
  color: black;
  width: 100%;
  & .ant-card-head {
    padding: 0;
  }
  .ant-card-head-title {
    display: block;
    color: black;
    font-size: 24px;
    padding: 0;
  }
  .ant-card-body {
    & p {
      font-size: 16px;
      margin-bottom: 10px;
    }
  }
  .ant-card-head {
    padding: 20px;
  }
`;

const Label = styled(Form.Item)`
  display: block;
  margin: 0;
  & .ant-form-item-label {
    display: unset;
    width: 100%;
    & label {
      color: #000;
      font-size: 16px;
    }
    & label::before {
      content: "";
      margin: 0;
    }
  }
  & .ant-form-item-control {
    max-width: 100%;
  }
`;

export default EditEmail;
