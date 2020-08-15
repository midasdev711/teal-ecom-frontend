import React, { useState } from "react";
import styled from "styled-components";
// ui
import { Modal, Button, Form, Tag, Select } from "antd";

const MDAddTags = props => {
  const [tagsNew, setTagsNew] = useState([]);

  const { isOpen, onCancel, onSave, count, name, onFinish } = props;

  return (
    <Modal
      title={`Tag ${count} ${name}`}
      centered
      visible={isOpen}
      okText="Save"
      cancelText="Cancel"
      onOk={() => onCancel(false)}
      onCancel={() => onCancel(false)}
    >
      <Form onFinish={onFinish} layout="vertical">
        <DescriptionForm>
          Use descriptive keywords to help organize {name}
        </DescriptionForm>
        <Form.Item label="Tag">
          <SelectStyle
            mode="tags"
            placeholder="Vintage, cotton, summer"
            onChange={values => setTagsNew(values)}
          >
            {tagsNew}
          </SelectStyle>
        </Form.Item>
      </Form>

      <ListTags>
        <TitleTags>EXISTING TAGS</TitleTags>
        <Tag color="#b1b1b1">Tags</Tag>
        <Tag color="#b1b1b1">asd</Tag>
        <Tag color="#b1b1b1">ddd</Tag>
        <Tag color="#b1b1b1">mmm</Tag>
      </ListTags>
    </Modal>
  );
};

const DescriptionForm = styled.p`
  font-size: 14px;
  margin-bottom: 15px;
`;

const SelectStyle = styled(Select)`
  width: 100%;
`;

const ListTags = styled.div`
  padding: 15px 0;
  border-top: 1px solid #ddd;
`;

const TitleTags = styled.h3`
  font-weight: bold;
`;

export default MDAddTags;