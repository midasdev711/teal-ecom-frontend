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
} from "../../../src/redux/actions/articles";
// components
import NewForm from "../../../src/components/posts/NewForm";
// ui
import { message, Form } from "antd";
import { getUserData } from "../../../src/utils";

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
  const [handlePageRefresh, setHandlePageRefresh] = useState(false)
  const [saveFlag, setSaveFlag] = useState(false);
  const [count, setCount] = useState([]);
  const [postData, setPostData] = useState({});
  const { updateArticleDetail, saveState, articleDetail } = props;
  const prevProps = usePrevious({ updateArticleDetail });
  let userData = getUserData()
  //const data = useSelector(state => state.articlesReducer.updateArticleDetail)
  // useEffect(() => {
  //   return () => {
  //     props.clearArticleDetails();
  //   }
  // }, []);
  useEffect(() => {
    const {
      query: { slug, getDraftPost },
    } = Router.router;
    const getDraft = getDraftPost === "Draft" ? true : false;

    props.getDetailArticle(slug, getDraft);
    return () => {
      props.clearArticleDetails();
    }
  }, []);
  useEffect(() => {
    if (saveFlag) {
      let timer = null;
      if (!timer) {
        timer = setInterval(async () => {
          await handleSaveOnInterval();
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
    if (articleDetail) {
      const { title, subTitle, description, descriptionJson } = articleDetail;
      form.setFieldsValue({
        title,
        subTitle,
      });
      if (description && description.trim().length) {
        setContentEditorHtml(description);
        setContentEditorJson(descriptionJson);
      }
    }

  }, [articleDetail]);

  useEffect(() => {
    if (prevProps && prevProps.updateArticleDetail !== updateArticleDetail && handlePageRefresh) {
      notification.success({
        message: "Successfully!",
        description: "Updated article successfully!",
      });
      Router.router.push("/[portal_id]/stories/posts/[post_status]", { pathname: `/${userData?.uniqueID}/stories/posts/live` }, { shallow: true });
    }
  }, [props.updateArticleDetail]);

  useEffect(() => {
    if (props.msgErr) {
      notification.error({
        message: "Error",
        description: "Update article failed!",
      });
    }
  }, [props.msgErr]);
  useEffect(() => {
    saveFlag ? (setSaveFlag(false)) : null
  }, [])

  const handleObjectData = () => {
    const { title, subTitle, imageData } = form.getFieldsValue();
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

    return _obj
  }
  const onFinish = async (values) => {
    if (!editorHtml || (editorHtml && editorHtml.length < 1)) {
      setIsStory(true);
      setHandlePageRefresh(false);
      return;
    }
    let _obj = handleObjectData()
    setHandlePageRefresh(true);
    if (postData?.featureImage === "") {
      delete _obj.featureImage
    }
    await props.updateArticle(_obj);
  };

  const handleSaveOnInterval = async () => {
    if (articleDetail) {
      await onValuesChangePost();
    }
  };

  const onValuesChangePost = async () => {
    const { title, subTitle, imageData } = form.getFieldsValue();
    if (title || subTitle) {
      await updateDraft();
    }
  };

  const updateDraft = async () => {
    let _obj = handleObjectData()
    if (postData?.featureImage === "") {
      delete _obj.featureImage
    }
    await props.updateArticle(_obj);
  };

  const onChangeEditor = (value, jsonValue) => {
    let data = count.slice()
    data.push({ name: "test" })
    setCount(data)
    if (value !== undefined) {
      setContentEditorHtml(value);
      setContentEditorJson(jsonValue)
    }
    setIsStory(false);
  };
  const handleFormData = () => {
    onChangeEditor()
  }
  const newActions = () => {
    let userData = getUserData()
    return (
      <ActionTopLayout>
        <ActionContent>
          <NewPostAction>
            <Link href="/">
              <LinkBack>
                <LogoImage className="logo" src="/favicon.svg" />
              </LinkBack>
            </Link>
            <Link href="/[portal_id]/stories/posts/[post_status]" as={`/${userData?.uniqueID}/stories/posts/live`} shallow={true}>
              <LinkBack>
                <LogoImage className="logo" src="/images/back-icon.svg" />
              </LinkBack>
            </Link>
            <StyledText>Draft</StyledText>
            <StyledText>{saveState}</StyledText>
          </NewPostAction>
          <Button size="middle" type="primary" htmlType="button" onClick={onFinish}>
            Save and publish
          </Button>
        </ActionContent>
      </ActionTopLayout>
    );
  };
  const handlePostData = (value) => {
    setPostData({ ...value })
  }
  if (count.length > 1) {
    !saveFlag ? setSaveFlag(true) : null
  } else {
    saveFlag ? setSaveFlag(false) : null
  }
  return (
    <NewPageLayout>
      <Form form={form} layout="vertical" onChange={() => handleFormData()}>
        <NewContent>
          {newActions()}
          <ContentPage>
            <NewForm
              flag={true}
              onChangeEditor={onChangeEditor}
              postInformation={(value) => handlePostData(value)}
              setImage={setImage}
              isStory={isStory}
              description={articleDetail && articleDetail.description || ""}
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
  max-width: 850px;
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
  max-width: 950px;
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
