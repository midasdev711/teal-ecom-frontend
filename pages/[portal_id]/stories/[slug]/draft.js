import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import styled from "styled-components";
import { Button, Layout, notification } from "antd";
import Router from "next/router";
import { connect } from "react-redux";
// actions
import {
    getDetailArticle,
    updateArticle,
    clearArticleDetails,
} from "../../../../src/redux/actions/articles";
// components
import NewForm from "../../../../src/components/posts/NewForm";
// ui
import { message, Form } from "antd";
import { getUserData } from "../../../../src/utils";


const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
};

const EditPost = (props) => {
    const [form] = Form.useForm();
    const [editorHtml, setContentEditorHtml] = useState("");
    const [editorJson, setContentEditorJson] = useState({});
    const [imageData, setImage] = useState("");
    const [isStory, setIsStory] = useState(false);
    const [submit, setSubmit] = useState(false);
    const [saveFlag, setSaveFlag] = useState(false);
    const [count, setCount] = useState([]);
    const [postData, setPostData] = useState({});

    let userData = getUserData()
    const getDetailArticle = async () => {
        const {
            query: { slug },
        } = Router.router;
        await props.getDetailArticle(slug, true);
    };
    const { updateArticleDetail, articleDetail, saveState, saveData } = props;
    const prevProps = usePrevious({ updateArticleDetail });
    const onValuesChangePost = async () => {

        const { title, subTitle, imageData } = form.getFieldsValue();
        if (title || subTitle) {
            await updateDraft();
        }
    };

    const handleObjectData = (value) => {
        const { title, subTitle, imageData } = form.getFieldsValue()
        let _obj = {
            title: title,
            subTitle: subTitle,
            description: editorHtml,
            descriptionJson: editorJson,
            articleId: Number(articleDetail.ID),
            featureImage: postData?.featureImage || "",
            tags: postData?.tags ? postData?.tags : [],
            metaRobots: postData?.metaRobots ? postData?.metaRobots : "index,follow",
            article_SEO: [{
                metaTitle: postData?.SEOTitle !== "" ? postData?.SEOTitle : title,
                metaDescription: postData?.SEODescription !== "" ? postData?.SEODescription : subTitle,
                conicalUrl: postData?.SEOUrl !== "" ? postData?.SEOUrl : "",
                keyPhrases: postData?.keyPhrasesTags || []
            }],
            internalArticle: postData?.internalArticle || false
        };
        if (value === "live") {
            _obj.isDraft = false,
                _obj.isPublish = true
        }
        if (typeof (postData.featureImage) === "string") {
            delete _obj.featureImage
        }
        return _obj
    }

    const updateDraft = async () => {
        let _obj = handleObjectData()
        if (postData?.featureImage === "") {
            delete _obj.featureImage
        }
        if (saveState !== "saving...") {
            await props.updateArticle(_obj);
        }
    };

    const handleSaveData = async () => {
        if (articleDetail) {
            await onValuesChangePost();
        }
    };

    useEffect(() => {

        if (!articleDetail) {
            getDetailArticle();
        }
        if (articleDetail) {
            const { title, subTitle, description, descriptionJson } = articleDetail;
            // let { title, subTitle } = handleTitle()
            form.setFieldsValue({
                title,
                subTitle
            });

            if (description && description.trim().length) {
                setContentEditorHtml(description);
                setContentEditorJson(descriptionJson);
            }
        }
    }, [articleDetail]);

    useEffect(() => {
        if (
            prevProps &&
            prevProps.updateArticleDetail !== updateArticleDetail &&
            submit
        ) {
            notification.success({
                message: "Successfully!",
                description: "Publish article successfully!",
            });
            Router.router.push("/[portal_id]/stories/posts/[post_status]", { pathname: `/${userData?.uniqueID}/stories/posts/drafts` }, { shallow: true });
        }
    }, [props.updateArticleDetail]);

    useEffect(() => {
        if (props.msgErr) {
            notification.error({
                message: "Error",
                description: "Publish article failed!",
            });
        }
    }, [props.msgErr]);

    useEffect(() => {
        if (saveFlag) {
            let timer = null;
            if (!timer) {
                // console.log('set timer');
                timer = setInterval(async () => {
                    // console.log('called on every 5 seconds!', articleDetail)
                    await handleSaveData();
                }, 5000);
            }
            return () => {
                if (timer) {
                    clearInterval(timer);
                }
            }
        }
    }, [articleDetail, editorHtml, form, postData, count])

    useEffect(() => {
        saveFlag ? (setSaveFlag(false)) : null
    }, [])

    const onFinish = async (values) => {
        setSubmit(true);
        if (!editorHtml || (editorHtml && editorHtml.length < 1)) {
            setIsStory(true);
            setSubmit(false);
            return;
        }
        let _obj = handleObjectData("live")
        if (postData?.featureImage === "") {
            delete _obj.featureImage
        }
        await props.updateArticle(_obj);
    };

    const onChangeEditor = (value, jsonValue) => {
        if (value && articleDetail.description !== value && !saveFlag) {
            setSaveFlag(true);
        }
        if (value !== undefined) {
            setContentEditorHtml(value);
            setContentEditorJson(jsonValue)
        }
        setIsStory(false);
    };

    const newActions = () => {
        return (
            <ActionTopLayout>
                <ActionContent>
                    <NewPostAction>
                        <Link href="/">
                            <LinkBack>
                                <LogoImage className="logo" src="/favicon.svg" />
                            </LinkBack>
                        </Link>
                        <Link href="/[portal_id]/stories/posts/[post_status]" as={`/${userData?.uniqueID}/stories/posts/drafts`} shallow={true}>
                            <LinkBack>
                                <LogoImage className="logo" src="/images/back-icon.svg" />
                            </LinkBack>
                        </Link>
                        <StyledText>Draft</StyledText>
                        <StyledText>{saveState}</StyledText>
                    </NewPostAction>
                    <Button size="middle" type="primary" htmlType="button" onClick={onFinish}>
                        Publish
          </Button>
                </ActionContent>
            </ActionTopLayout>
        );
    };

    const handlePostData = (value) => {
        setPostData({ ...value })
    }

    const handleData = () => {
        setSaveFlag(true)
        setCount([1 + count])
    }

    return (
        <NewPageLayout>
            <Form
                form={form}
                layout="vertical"
                onChange={() => handleData()}
            >
                <NewContent>
                    {newActions()}

                    <ContentPage>
                        <NewForm
                            onChangeEditor={onChangeEditor}
                            postInformation={(value) => handlePostData(value)}
                            setImage={setImage}
                            isStory={isStory}
                            description={
                                articleDetail && articleDetail.description || ""
                            }
                            postInfo={
                                updateArticleDetail === null ? (articleDetail) : (updateArticleDetail)
                            }
                        />
                    </ContentPage>
                </NewContent>
            </Form>
        </NewPageLayout>
    );
};

const NewPageLayout = styled.div`
  background: #f6f8f9;
  min-height: 100vh;
`;

const LogoImage = styled.img`
  margin: 0px 10px;
`;

const StyledText = styled.span`
  font-family: Proxima Nova;
  font-weight: normal;
  font-size: 14px;
  margin-right: 10px;
  color: #777b7c;
`;

const NewContent = styled.div`
  width: 100%;
`;

const ContentPage = styled.div`
  width: 100%;
  max-width: 1170px;
  margin: 0 auto;
  padding: 80px 0;
`;

const LinkBack = styled.a`
  color: #333;
`;

const ActionTopLayout = styled(Layout)`
  width: 100%;
  height: 55px;
  position: fixed;
  z-index: 10;
  top: 0;
`;

const ActionContent = styled.div`
  padding: 10px 20px;
  height: 55px;
  position: ;
  top: 0;
  right: 0;
  width: 100%;
  max-width: 1170px;
  background: #eef1f2;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NewPostAction = styled.div`
  display: flex;
`;

const mapStateToProps = (store) => {
    return {
        articleDetail: store.articlesReducer.articleDetail,
        updateArticleDetail: store.articlesReducer.updateArticleDetail,
        saveState: store.articlesReducer.postSaveState,
        msgErr: store.articlesReducer.msgErr
    };
};

const mapDispatchToProps = {
    getDetailArticle,
    updateArticle,
    clearArticleDetails,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditPost);
