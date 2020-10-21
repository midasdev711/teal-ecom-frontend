import React, { useState, useEffect } from "react";
import styled from "styled-components";
import RemirorEditorNew from "../../atoms/RemirorEditorNew";

// ui
import { Form, Input } from "antd";

const NewForm = (props) => {
  const { onChangeEditor, isStory, onTitleChange } = props;

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const onChange = (content) => {
    onChangeEditor(content);
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
        name="title"
        rules={[{ required: true, message: "Title is required!" }]}
      >
        <Input onBlur={onTitleChange} bordered={false} size="large" placeholder="Title" />
      </Form.Item>
      <Form.Item
        name="subTitle"
        rules={[{ required: true, message: "Subtitle is required!" }]}
      >
        <Input bordered={false} placeholder="Add a brief subtitle" />
      </Form.Item>

      {/* <Form.Item name="featureImage">
        <Input bordered={false} type="file" accept="images/*" onChange={onChangeImage} />
      </Form.Item> */}
      <RemirorEditorNew
        flag={props.flag} 
        onChangeEditor={onChange}
        description={props.description}
      />
      {/* {isStory && <p style={{ color: "#f5222d" }}>Story is required!</p>} */}
    </ContentBox >
  );
};

const ContentBox = styled.div`
  padding: 24px 0;
  width: 100%;
  background: #f6f8f9;
  border-radius: 3px;
  outline: 0.1rem solid transparent;
  .ant-input-lg {
    font-family: Proxima Nova;
    font-style: normal;
    font-weight: bold;
    font-size: 26px;
    line-height: 26px;
  }
`;

const TitleBox = styled.h3`
  font-weight: 600;
  font-size: 16px;
  color: #000;
  opacity: 0.9;
`;

export default NewForm;
