import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import RemirorEditorNew from "../../atoms/RemirorEditorNew";
import { TweenOneGroup } from "rc-tween-one";
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

// ui
import { Col, Form, Input, Row, Select, Tag } from "antd";
import { Container } from "next/app";
import { Checkbox } from 'antd';
const { Option } = Select;

const postData = {
  tags: [],
  SEOTitle: "",
  SEODescription: "",
  SEOUrl: "",
  metaRobots: "",
  featureImage: "",
  keyPhrases:"",
  internalArticle:false
}
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}
const NewForm = (props) => {
  const { onChangeEditor, isStory, onTitleChange, postInformation , postInfo , flag } = props;
  const [postDetails, setPostDetails] = useState({ ...postData })
  const [inputVisible, setInputVisible] = useState(false);
  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState("");
  const [imageUrl, SetImageUrl] = useState("");
  const [check, setCheck] = useState(false);

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
  useEffect(()=>{
    let cloneData = {...postDetails}
      if(postInfo !== null){
         cloneData.SEOTitle = postInfo?.article_SEO[0]?.metaTitle
         cloneData.SEODescription= postInfo?.article_SEO[0]?.metaDescription
         cloneData.SEOUrl = postInfo?.article_SEO[0]?.conicalUrl
         cloneData.keyPhrases = postInfo?.article_SEO[0]?.keyPhrases
         cloneData.metaRobots = postInfo?.metaRobots
         cloneData.tags = postInfo?.tags || []
         cloneData.internalArticle = postInfo?.internalArticle || false
         setPostDetails(cloneData)
         setTags(postInfo?.tags || [])
         setCheck(postInfo?.internalArticle || false)
      }
  },[postInfo])

  useEffect(() => {
    let cloneData = { ...postDetails }
    cloneData.tags = tags
    setPostDetails(cloneData)
  }, [tags])

  useEffect(() => {
    postInformation(postDetails)
  }, [postDetails])

  const handleChange = (event, menu) => {
    let cloneData = { ...postDetails }
    if (menu !== undefined) {
      cloneData[menu] = event
    } else {
      const { name, value } = event?.target
      cloneData[name] = value
    }
    setPostDetails(cloneData)
  }

  const saveInputRef = (input) => {
    input = input;
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    let tag = tags;
    if (inputValue && tag.indexOf(inputValue) === -1) {
      tag = [...tag, inputValue];
    }
    setTags(tag);
    setInputVisible(false);
    setInputValue("");
  };

  const handleClose = (removedTag) => {
    const removeTags = tags.filter((tag) => tag !== removedTag);
    setTags(removeTags);
  };

  const forMap = (tag) => {
    const tagElem = (
      <TagContent
        closable
        onClose={(e) => {
          e.preventDefault();
          handleClose(tag);
        }}
      >
        {tag}
      </TagContent>
    );
    return (
      <span key={tag} style={{ display: "inline-block" }}>
        {tagElem}
      </span>
    );
  };

   const tagChild = tags.map(forMap);

  const handleChangeImage = info => {
    let cloneData = { ...postDetails }
    cloneData.featureImage = info.file.originFileObj
    setPostDetails(cloneData)
    if (info.file.status === 'uploading') {
      setLoading(true)
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        SetImageUrl(imageUrl),
        setLoading(false)
      );
    }
  };
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
const handleCheckBox = (event) =>{
  let cloneData = { ...postDetails }
    cloneData.internalArticle = event.target.checked
    setPostDetails(cloneData)
    setCheck(event.target.checked)
}
  if (postInfo === null || postInfo === undefined && flag !== true) {
    return null;
}
  return (
    <ContentBox>
      <Container>
        <Row gutter={30}>
          <Col span={16}>
            <Form.Item
              name="title"
              rules={[{ required: true, message: "Title is required!" }]}
            >
              <Input onChange={onTitleChange} bordered={false} size="large" placeholder="Title" />
            </Form.Item>
            <Form.Item
              name="subTitle"
              rules={[{ required: true, message: "Subtitle is required!" }]}
            >
              <Input bordered={false} placeholder="Add a brief subtitle" />
            </Form.Item>
            <H4>Feature Image</H4>
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              beforeUpload={beforeUpload}
              onChange={handleChangeImage}
            >
              {imageUrl || postInfo?.featureImage  ? <img src={postInfo?.featureImage !== "" && postInfo?.featureImage !== undefined ? (postInfo?.featureImage) : (imageUrl) } alt="avatar" style={{ width: '100%' }} /> : uploadButton}
            </Upload>
           
            {/* <Form.Item name="featureImage">
                  <Input bordered={false} type="file" accept="images/*" onChange={onChangeImage} />
               </Form.Item> */}
            <RemirorEditorNew
              flag={props.flag}
              onChangeEditor={onChange}
              description={props.description}
            />
            {/* {isStory && <p style={{ color: "#f5222d" }}>Story is required!</p>} */}
          </Col>
          <Col span={8}>
            <Form.Item
              label="SEO Title"
              name="SEOTitle"
               
            >
              <Input placeholder="SEO title" defaultValue={postInfo?.article_SEO[0]?.metaTitle}   name="SEOTitle" onChange={(event) => handleChange(event)} />
            </Form.Item>
            <Form.Item
              label="SEO Description"
              name="SEODescription"
            >
              <Input placeholder="SEO description" defaultValue={postInfo?.article_SEO[0]?.metaDescription} name="SEODescription" onChange={(event) => handleChange(event)} />
            </Form.Item>
            <Form.Item
              label="SEO Url"
              name="SEOUrl"
            >
              <Input placeholder="SEO url" defaultValue={postInfo?.article_SEO[0]?.conicalUrl}  name="SEOUrl" onChange={(event) => handleChange(event)} />
            </Form.Item>
            <Form.Item
              label="SEO KeyPhrases"
              name="keyPhrases"
            >
              <Input placeholder="SEO keyPhrases" defaultValue={postInfo?.article_SEO[0]?.keyPhrases} name="keyPhrases" onChange={(event) => handleChange(event)} />
            </Form.Item>
            <Form.Item
              label="Tag"
              name="Tag"
            >
              <Input
                ref={saveInputRef}
                type="text"
                placeholder="Vintage, cotton, summer"
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleInputConfirm}
                onPressEnter={handleInputConfirm}
              />
              <TweenOneGroup
                className="tag-content"
                enter={{
                  scale: 0.8,
                  opacity: 0,
                  type: "from",
                  duration: 100,
                  with: 10,
                  onComplete: (e) => {
                    e.target.style = "";
                  },
                }}
                leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
                appear={false}
              >
                {tagChild}
              </TweenOneGroup>

            </Form.Item>
            <Form.Item
              label="Meta Robots"
              name="metaRobots">
              <Select defaultValue={postInfo?.metaRobots !== "" ? (postInfo?.metaRobots) : ("Select")} name="metaRobots" onChange={(event) => handleChange(event, "metaRobots")}>
                <Option value="" disabled>Select</Option>
                <Option value="index,follow">Index,Follow</Option>
                <Option value="index,nofollow">Index,NoFollow</Option>
                <Option value="noindex,follow">NoIndex,Follow</Option>
                <Option value="noindex,nofollow">NoIndex,NoFollow</Option>
              </Select>
            </Form.Item>
            <Checkbox checked={check} onChange={(event)=>handleCheckBox(event)}>Internal Article ?</Checkbox>
          </Col>
        </Row>
      </Container>

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
const TagContent = styled(Tag)`
  padding: 5px 10px;
  marginbottom: 10px;
`;
const DIV = styled.div`
 
`;
const H4 = styled.h4`
 
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
