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
} from "../../src/redux/actions/articles";
// apollo
import { apolloClient } from "../../src/graphql";
import { CREATE_ARTICLE_MUTATION } from "../../src/graphql/articles.query";
// components
import { PageLayout } from "../../src/components/views";
import NewForm from "../../src/components/posts/NewForm";
// icons
import { LeftOutlined } from "@ant-design/icons";
// ui
import { message, Form } from "antd";

const EditPost = (props) => {
  const [form] = Form.useForm();
  const [editorHtml, setContentEditorHtml] = useState("");
  const [imageData, setImage] = useState("");

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
    const authorID = Number(localStorage.getItem("userID"));

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

  const newActions = () => {
    return (
      <ActionTopLayout>
        <ActionContent>
          <span>Unsaved changes</span>
          <EditPostAction>
            <Button className="cancel" size="large">
              Cancel
            </Button>
            <Button size="large" type="primary" htmlType="submit">
              Save
            </Button>
          </EditPostAction>
        </ActionContent>
      </ActionTopLayout>
    );
  };

  return (
    <PageLayout>
      <Form onFinish={onFinish} form={form} layout="vertical">
        <NewContent>
          {newActions()}
          <ContentPage>
            <ContentHeader>
              <Link href="/posts">
                <LinkBack>
                  <LeftOutlined /> Edit post
                </LinkBack>
              </Link>
              <TittleHeader>Edit Post</TittleHeader>
            </ContentHeader>
            <NewForm
              onChangeEditor={setContentEditorHtml}
              setImage={setImage}
              description={
                props.articleDetail ? props.articleDetail.description : ""
              }
            />
          </ContentPage>
        </NewContent>
      </Form>
    </PageLayout>
  );
};

const NewContent = styled.div`
  width: 100%;
`;

const ContentPage = styled.div`
  max-width: 65rem;
  margin: 80px auto;
  padding: 0 3.2rem;
`;

const ContentHeader = styled.div`
  padding-bottom: 10px;
`;

const TittleHeader = styled.h3`
  font-size: 28px;
  color: #000;
  font-weight: bold;
  margin-bottom: 0;
`;

const LinkBack = styled.a`
  color: #333;
`;

const ActionTopLayout = styled(Layout)`
  width: 100%;
  height: 55px;
  background: #fff;
  position: fixed;
  z-index: 10;
  top: 0;
  box-shadow: 0px 4px 4px rgba(186, 195, 201, 0.25);
`;

const ActionContent = styled.div`
  padding: 10px 50px;
  height: 55px;
  position: ;
  top: 0;
  left: 250px;
  position: fixed;
  right: 0;
  max-width: 65rem;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const EditPostAction = styled.div`
  display: flex;
  .cancel {
    margin-right: 15px;
  }
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
