import React, { useState, useEffect } from "react";
import styled from "styled-components";
import RemirorEditorNew from "../../atoms/RemirorEditorNew";

// ui
import { Form, Input } from "antd";

const { TextArea } = Input;

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
      <TitleInput>
        <Form.Item
          name="title"
          className="title-input"
          rules={[{ required: true, message: "Title is required!" }]}
        >
          <TextArea
            bordered={false}
            onChange={onTitleChange}
            size="large"
            placeholder="Title"
            autoSize={{ maxRows: 4 }}
            maxLength="200"
            style={{
              fontSize: "26px"
            }}
          />
          {/* <Input onChange={onTitleChange} bordered={false} size="large" placeholder="Title" /> */}
        </Form.Item>
      {/* </TitleInput>
      <SubTitleInput> */}
        <Form.Item
          name="subTitle"
          className="subtitle-input"
          rules={[{ required: true, message: "Subtitle is required!" }]}
        >
          <TextArea
            bordered={false}
            placeholder="Add a brief subtitle"
            autoSize={{ maxRows: 3 }}
            maxLength="200"
            style={{
              fontSize: "18px"
            }}
          />
          {/* <Input bordered={false} placeholder="Add a brief subtitle" /> */}
        </Form.Item>
      </TitleInput>
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
  padding: 0 0 24px 0;
  width: 100%;
  background: #f6f8f9;
  border-radius: 3px;
  outline: 0.1rem solid transparent;
  position: relative;
  background-color: white;
  border-radius: 10px;
`;

const TitleBox = styled.h3`
  font-weight: 600;
  font-size: 16px;
  color: #000;
  opacity: 0.9;
`;

const TitleInput = styled.div`
  margin: 0 auto;
  padding-top: 100px;
  width: calc(100% - 200px);
  .title-input .ant-input {
    font-family: Proxima Nova;
    font-style: normal;
    font-weight: bold;
    font-size: 26px;
    line-height: 26px;
  }
  .subtitle-input .ant-input {
    font-family: Proxima Nova;
    font-style: normal;
  }
`;

export default NewForm;
