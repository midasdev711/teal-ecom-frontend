import React, { useState, useEffect } from "react";
import Link from "next/link";
import styled from "styled-components";
import { Button, Layout, notification } from "antd";
import Router from "next/router";
import { connect } from "react-redux";
// actions
import {
  getDetailArticle,
  updateArticle,
} from "../../../src/redux/actions/articles";
// components
import NewForm from "../../../src/components/posts/NewForm";
// ui
import { message, Form } from "antd";

const EditPost = (props) => {
  const [form] = Form.useForm();
  const [editorHtml, setContentEditorHtml] = useState("");
  const [imageData, setImage] = useState("");
  const [isStory, setIsStory] = useState(false);

  useEffect(() => {
    const {
      query: { slug },
    } = Router.router;
    props.getDetailArticle(slug);
  });

  useEffect(() => {
    if (props.articleDetail) {
      const { title, subTitle } = props.articleDetail;
      form.setFieldsValue({
        title,
        subTitle,
      });
    }
  }, [props.articleDetail]);

  useEffect(() => {
    if (props.isUpdated) {
      notification.success({
        message: "Successfully!",
        description: "Updated article successfully!",
      });

      window.location.href = "/posts";
    }
  }, [props.isUpdated]);

  useEffect(() => {
    if (props.msgErr) {
      notification.error({
        message: "Error",
        description: "Update article failed!",
      });
    }
  }, [props.msgErr]);

  const onFinish = async (values) => {

    if (!editorHtml || (editorHtml && editorHtml.length < 1)) {
      setIsStory(true);
      return;
    }

    const { title, subTitle } = values;
    let _variables = {
      title: title,
      subTitle: subTitle,
      description: editorHtml,
      articleId: Number(props.articleDetail.ID),
      featureImage: imageData ? imageData : "",
    };

    await props.updateArticle(_variables);
  };

  const onChangeEditor = (value) => {
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
            <Link href="/posts">
              <LinkBack>
                <LogoImage className="logo" src="/images/back-icon.svg" />
              </LinkBack>
            </Link>
            <StyledText>Draft</StyledText>
            <StyledText>Saved</StyledText>
          </NewPostAction>
          <Button size="middle" type="primary" htmlType="submit">
            Publish
          </Button>
        </ActionContent>
      </ActionTopLayout>
    );
  };

  return (
    <NewPageLayout>
      <Form onFinish={onFinish} form={form} layout="vertical">
        <NewContent>
          {newActions()}
          <ContentPage>
            <NewForm
              onChangeEditor={onChangeEditor}
              setImage={setImage}
              isStory={isStory}
              description={
                props.articleDetail ? props.articleDetail.description : ""
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
    isUpdated: store.articlesReducer.isUpdated,
    msgErr: store.articlesReducer.msgErr,
  };
};

const mapDispatchToProps = {
  getDetailArticle,
  updateArticle,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditPost);
