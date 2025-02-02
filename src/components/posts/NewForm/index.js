import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import RemirorEditorNew from "../../atoms/RemirorEditorNew";
import { TweenOneGroup } from "rc-tween-one";
import { Upload, message, Drawer, Button } from 'antd';
import { CloseOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';

// ui
import { Col, Form, Input, Row, Select, Tag } from "antd";
import { Container } from "next/app";
import { Checkbox } from 'antd';
import { useSelector } from "react-redux";
import { updateArticle } from "../../../redux/actions/articles";
const { Option } = Select;

const postData = {
    tags: [],
    keyPhrasesTags: [],
    SEOTitle: "",
    SEODescription: "",
    SEOUrl: "",
    metaRobots: "",
    featureImage: "",
    keyPhrases: [],
    internalArticle: false
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
    const isLt2M = file.size / 1024 / 1024 < 10;
    if (!isLt2M) {
        message.error('Image must smaller than 10MB!');
    }
    return isJpgOrPng && isLt2M;
}
const NewForm = (props) => {
    const { onChangeEditor, isStory, onTitleChange, postInformation, postInfo, flag, model, modelClose, onFinish, live, updateArticle, firstTime } = props;
    const [postDetails, setPostDetails] = useState({ ...postData })
    const [inputVisible, setInputVisible] = useState(false);
    const [tags, setTags] = useState([]);
    const [keyPhrasesTags, setKeyPhrasesTags] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [loading, setLoading] = useState("");
    const [imageUrl, SetImageUrl] = useState("");
    const [check, setCheck] = useState(false);
    const [dummyFlag, setDummyFlag] = useState([1]);
    const apiCallResponse = useSelector(state => state.articlesReducer.updateArticleDetail)
    const [isOpenMoreFilter, setOpenMoreFilters] = useState(false);

    useEffect(() => {
        setOpenMoreFilters(model)
    }, [model])

    useEffect(() => {
        modelClose(isOpenMoreFilter)
    }, [isOpenMoreFilter])

    useEffect(() => {
        if (apiCallResponse !== null) {
            setPostDetails({
                ...postDetails,
                featureImage: ""
            })
            setDummyFlag([dummyFlag + 1])
        }
    }, [apiCallResponse])

    const getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener("load", () => callback(reader.result));
        reader.readAsDataURL(img);
    };
    const onChange = (content, jsonValue) => {
        onChangeEditor(content, jsonValue);
    };

    const onChangeImage = (e) => {
        if (e.target.files.length > 0) {
            let url = getBase64(e.target.files[0], (imageUrl) => {
                props.setImage(imageUrl);
            });
        }
    };

    useEffect(() => {
        let cloneData = { ...postDetails }
        if (postInfo !== null && postInfo !== undefined && Object.values(postInfo).length > 0) {
            cloneData.SEOTitle = firstTime === "oldData" ? postInfo?.article_SEO[0]?.metaTitle : cloneData.SEOTitle
            cloneData.SEODescription = firstTime === "oldData" ? postInfo?.article_SEO[0]?.metaDescription : cloneData.SEODescription
            cloneData.SEOUrl = firstTime === "oldData" ? postInfo?.article_SEO[0]?.conicalUrl : cloneData.SEOUrl
            cloneData.keyPhrasesTags = firstTime === "oldData" ? postInfo?.article_SEO[0]?.keyPhrases || [] : cloneData.keyPhrasesTags || []
            cloneData.metaRobots = firstTime === "oldData" ? postInfo?.metaRobots : cloneData.metaRobots
            cloneData.tags = firstTime === "oldData" ? postInfo?.tags || [] : cloneData.tags || []
            cloneData.internalArticle = firstTime === "oldData" ? postInfo?.internalArticle : cloneData.internalArticle || false
            cloneData.featureImage = firstTime === "oldData" ? postInfo?.featureImage : cloneData.featureImage
            setPostDetails(cloneData)
            setTags(firstTime === "oldData" ? postInfo?.tags : cloneData.tags || [])
            setKeyPhrasesTags(firstTime === "oldData" ? postInfo?.article_SEO[0]?.keyPhrases : cloneData.keyPhrasesTags || [])
            setCheck(firstTime === "oldData" ? postInfo?.internalArticle || false : cloneData.internalArticle || false)
        }
    }, [postInfo])

    useEffect(() => {
        let cloneData = { ...postDetails }
        cloneData.tags = tags
        setPostDetails(cloneData)
    }, [tags])

    useEffect(() => {
        let cloneData = { ...postDetails }
        cloneData.keyPhrasesTags = keyPhrasesTags
        setPostDetails(cloneData)
    }, [keyPhrasesTags])

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

    const handleInputKeyPhrases = () => {
        let keyTags = keyPhrasesTags;
        let val = (postDetails && postDetails.keyPhrases) || ""
        if (val.length > 0) {
            if (val && keyTags.indexOf(val) === -1) {
                keyTags = [...keyTags, val];
            }
            setKeyPhrasesTags(keyTags);
            setPostDetails(postDetails => ({
                ...postDetails,
                keyPhrases: ""
            }));
        }
    }

    const handleClose = (removedTag, type) => {
        if (type === "tag") {
            const removeTags = tags.filter((tag) => tag !== removedTag);
            setTags(removeTags);
        } else if (type === "keyPhrases") {
            const removeKeyPhrasesTags = keyPhrasesTags.filter((tag) => tag !== removedTag);
            setKeyPhrasesTags(removeKeyPhrasesTags);
        }
    };

    const forMap = (tag) => {
        const tagElem = (
            <TagContent
                closable
                onClose={(e) => {
                    e.preventDefault();
                    handleClose(tag, "tag");
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

    const phrasesTagsMap = (tag) => {
        const tagElem = (
            <TagContent
                closable
                onClose={(e) => {
                    e.preventDefault();
                    handleClose(tag, "keyPhrases");
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

    const tagPhrasesTagsChild = keyPhrasesTags.map(phrasesTagsMap);

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

    const handleCheckBox = (event) => {
        let cloneData = { ...postDetails }
        cloneData.internalArticle = event.target.checked
        setPostDetails(cloneData)
        setCheck(event.target.checked)
    }

    if (postInfo === null || postInfo === undefined && flag !== true) {
        return null;
    }

    let imageData = postInfo?.featureImage !== "" && postInfo?.featureImage !== undefined && postInfo?.featureImage !== null ? (<img src={postInfo?.featureImage} alt="avatar" style={{ width: '100%' }} />) : uploadButton

    return (
        <ContentBox>
            <Container>
                <Row gutter={30}>
                    <Col span={24}>
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
                            <Input bordered={false} onChange={onTitleChange} placeholder="Add a brief subtitle" />
                        </Form.Item>

                        <RemirorEditorNew
                            flag={props.flag}
                            onChangeEditor={onChange}
                            description={props.description}
                        />
                        {/* {isStory && <p style={{ color: "#f5222d" }}>Story is required!</p>} */}
                    </Col>

                    <DrawerStyle
                        title={
                            <DrawerTitle>
                                Post Details
                                  <TitleIconClose onClick={() => setOpenMoreFilters(false)} />
                            </DrawerTitle>
                        }
                        placement="right"
                        closable={false}
                        onClose={() => setOpenMoreFilters(false)}
                        visible={isOpenMoreFilter}
                        footer={
                            <>
                                <ButtonFooterRight type="primary" onClick={() => onFinish("addAllData")}>{live === "live" ? ("Save and publish") : ("Publish")}</ButtonFooterRight>
                            </>
                        }
                    >
                        <SidebarDrawer>

                            <H4>Feature Image</H4>
                            <Upload
                                name="avatar"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={false}
                                beforeUpload={beforeUpload}
                                onChange={handleChangeImage}
                            >
                                {
                                    imageUrl !== "" ? (<img src={`${imageUrl}`} alt="avatar" style={{ width: '100%' }} />) : (imageData)
                                }
                            </Upload>
                            <Form.Item
                                label="SEO Title"
                                name="SEOTitle"

                            >
                                <Input placeholder="SEO title" defaultValue={postInfo?.article_SEO && postInfo?.article_SEO[0]?.metaTitle || ""} name="SEOTitle" onChange={(event) => handleChange(event)} />
                            </Form.Item>
                            <Form.Item
                                label="SEO Description"
                                name="SEODescription"
                            >
                                <Input placeholder="SEO description" defaultValue={postInfo?.article_SEO && postInfo?.article_SEO[0]?.metaDescription || ""} name="SEODescription" onChange={(event) => handleChange(event)} />
                            </Form.Item>
                            <Form.Item
                                label="SEO Url"
                                name="SEOUrl"
                            >
                                <Input placeholder="SEO url" defaultValue={postInfo?.article_SEO && postInfo?.article_SEO[0]?.conicalUrl || ""} name="SEOUrl" onChange={(event) => handleChange(event)} />
                            </Form.Item>
                            <Form.Item label="SEO KeyPhrases" name="keyPhrases">
                                <Input
                                    placeholder="Tag one, Tag two, Tag three"
                                  //  defaultValue={postInfo?.article_SEO && postInfo?.article_SEO[0]?.keyPhrases}
                                    value={postDetails.keyPhrases || ""}
                                    name="keyPhrases"
                                    onBlur={handleInputKeyPhrases}
                                    onPressEnter={handleInputKeyPhrases}
                                    onChange={(event) => handleChange(event)} />
                                <TweenOneGroup
                                    className="tag-content"
                                    enter={{
                                        scale: 0.8,
                                        opacity: 0,
                                        type: "from",
                                        duration: 100,
                                        with: 10,
                                        onComplete: (e) => { e.target.style = "" },
                                    }}
                                    leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
                                    appear={false}>
                                    {tagPhrasesTagsChild}
                                </TweenOneGroup>
                            </Form.Item>
                            <Form.Item
                                label="Tag"
                                name="Tag"
                            >
                                <Input
                                    ref={saveInputRef}
                                    type="text"
                                    placeholder="Vintage, cotton, summer"
                                  //  defaultValue={postInfo?.tags && postInfo?.tags}
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
                                <Select defaultValue={postInfo?.metaRobots !== "" && postInfo?.metaRobots !== undefined ? (postInfo?.metaRobots) : ("Select")} name="metaRobots" onChange={(event) => handleChange(event, "metaRobots")}>
                                    <Option value="" disabled>Select</Option>
                                    <Option value="index,follow">Index,Follow</Option>
                                    <Option value="index,nofollow">Index,NoFollow</Option>
                                    <Option value="noindex,follow">NoIndex,Follow</Option>
                                    <Option value="noindex,nofollow">NoIndex,NoFollow</Option>
                                </Select>
                            </Form.Item>
                            <Checkbox checked={check} onChange={(event) => handleCheckBox(event)}>Internal Article ?</Checkbox>
                        </SidebarDrawer>
                    </DrawerStyle>


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
const DrawerStyle = styled(Drawer)``;
const DrawerTitle = styled.h3`
  margin: 0;
  font-weight: 500;
  position: relative;
  color: #000;
  font-size: 24px;
`;

const TitleIconClose = styled(CloseOutlined)`
  position: absolute;
  right: 0;
  font-size: 18px;
  cursor: pointer;
`;
const ButtonFooterLeft = styled(Button)`
  float: left;
`;

const ButtonFooterRight = styled(Button)`
  float: right;
  margin-right: 10px;
`;
const ButtonSave = styled(Button)`
  float: right;
  margin-right: 10px
`;

const SidebarDrawer = styled.div`
  padding: 0 25px;
  .ant-row {
      display: block;
  }
`

export default NewForm;
