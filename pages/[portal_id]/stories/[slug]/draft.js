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
  clearArticleDetails
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
  const [imageData, setImage] = useState("");
  const [isStory, setIsStory] = useState(false);
  const [submit, setSubmit] = useState(false);
  let userData = getUserData()

  const getDetailArticle = async () => {
    const {
      query: { slug },
    } = Router.router;

    await props.getDetailArticle(slug, true);
  };

  const { updateArticleDetail, articleDetail, saveState } = props;
  const prevProps = usePrevious({ updateArticleDetail });

  const onValuesChangePost = async () => {
   
    const { title, subTitle, imageData } = form.getFieldsValue();
    if (title || subTitle) {
      await updateDraft();
    }
  };

  const updateDraft = async () => {
    const { title, subTitle, imageData } = form.getFieldsValue();
    // console.log('editorHtml', editorHtml)
    const _obj = {
      title: title,
      subTitle: subTitle,
      description: editorHtml,
      articleId: Number(articleDetail.ID),
      featureImage: imageData ? imageData : "",
    };
    // console.log('update article')
    await props.updateArticle(_obj);
  };

  const handleSaveData = async () => {
    // console.log('articleDetail from interval', articleDetail);
    if (articleDetail) {
      await onValuesChangePost();
    }
  };

  useEffect(() => {

    if (!articleDetail) {
      getDetailArticle();
    }
    
    if (articleDetail) {
      const { title, subTitle, description } = articleDetail;
      // let { title, subTitle } = handleTitle()
      form.setFieldsValue({
        title,
        subTitle
      });

      if (description && description.trim().length) {
        console.log('set description', description);
        setContentEditorHtml(description);
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
    let timer = null;
    if (!timer) {
      // console.log('set timer');
      timer = setInterval(async () => {
        console.log('called on every 5 seconds!', articleDetail)
        await handleSaveData();
      }, 5000);
    }

    return () => {
      if (timer) {
        // console.log('clear interval');
        clearInterval(timer);
      }
    }
  }, [articleDetail, editorHtml, form])

  const onFinish = async (values) => {
    setSubmit(true);
    if (!editorHtml || (editorHtml && editorHtml.length < 1)) {
      setIsStory(true);
      setSubmit(false);
      return;
    }

    const { title, subTitle } = values;
    let _variables = {
      title: title,
      subTitle: subTitle,
      description: editorHtml,
      articleId: Number(articleDetail.ID),
      featureImage: imageData ? imageData : "",
      isDraft: false,
      isPublish: true,
    };

    await props.updateArticle(_variables);
  };

  const onChangeEditor = (value) => {
    console.log('change description', value)
    setContentEditorHtml(value);
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
          <Button size="middle" type="primary" htmlType="submit" onClick={onFinish}>
            Publish
          </Button>
        </ActionContent>
      </ActionTopLayout>
    );
  };
  

  return (
    <NewPageLayout>
      <Form
        form={form}
        layout="vertical"
      >
        <NewContent>
          {newActions()}

          <ContentPage>
            <NewForm
              onChangeEditor={onChangeEditor}
              setImage={setImage}
              isStory={isStory}
              description={
                articleDetail && articleDetail.description || ""
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
  clearArticleDetails
};

export default connect(mapStateToProps, mapDispatchToProps)(EditPost);
