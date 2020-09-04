import React, { useState } from "react";
import styled from "styled-components";
import { RemirorEditor } from "../../atoms";

// ui
import { Form, Input } from "antd";

const NewForm = (props) => {
  const [contentEditor, setContentEditor] = useState(null);

  const { onChangeEditor } = props;

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const onChange = (content) => {
    onChangeEditor(content.getHTML());
    setContentEditor(content.getHTML());
  };

  const onChangeImage = (e) => {
    if (e.target.files.length > 0) {
      let url = getBase64(e.target.files[0], (imageUrl) => {
        props.setImage(imageUrl);
      });
    }
  };

  return (
    <ContentBox>
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: "Please input title!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Sub Title"
        name="subTitle"
        rules={[{ required: true, message: "Please input sub-title!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Image"
        name="featureImage"
      >
        <Input type="file" accept="images/*" onChange={onChangeImage} />
      </Form.Item>
      <Form.Item
        label="Description"
        rules={[
          {
            required:
              contentEditor === null || contentEditor === "" ? true : false,
            message: "Please input description!",
          },
        ]}
      ></Form.Item>
      <RemirorEditor
        onChangeEditor={onChange}
        description={props.description}
      />
    </ContentBox>
  );
};

const ContentBox = styled.div`
  padding: 24px;
  width: 100%;
  background: #f6f8f9;
  border-radius: 3px;
  outline: 0.1rem solid transparent;
`;

const TitleBox = styled.h3`
  font-weight: 600;
  font-size: 16px;
  color: #000;
  opacity: 0.9;
`;

export default NewForm;
