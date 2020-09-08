import React, { useState, useEffect } from "react";
import Link from "next/link";
import styled from "styled-components";
import { Button, Layout } from "antd";
import { useRouter } from "next/router";
import { connect } from "react-redux";
// apollo
import { apolloClient } from "../../../src/graphql";
import { CREATE_ARTICLE_MUTATION } from "../../../src/graphql/articles.query";
// actions
import {
  createDraftArticle,
  getListArticlesDraft,
} from "../../../src/redux/actions/articles";
// components
import { PageLayout } from "../../../src/components/views";
import NewForm from "../../../src/components/posts/NewForm";
// icons
import { LeftOutlined } from "@ant-design/icons";
// ui
import { message, Form } from "antd";

const NewPost = (props) => {
  const [form] = Form.useForm();
  const [editorHtml, setContentEditorHtml] = useState("");
  const [imageData, setImage] = useState(null);

  const router = useRouter();

  useEffect(() => {
    // returned function will be called on component unmount
    return () => {
      const { title, subTitle, imageData } = form.getFieldsValue();
      if (title || subTitle || imageData || editorHtml !== "") {
        createDraft();
      }
    };
  }, []);

  const createDraft = async () => {
    const authorID = Number(localStorage.getItem("userID"));

    const { title, subTitle, imageData } = form.getFieldsValue();
    const _obj = {
      title: title || "",
      subTitle: subTitle || "",
      description: editorHtml,
      authorID: authorID,
      featureImage: imageData ? imageData : "",
      isDraft: true,
    };

    await props.createDraftArticle(_obj);
    await props.getListArticlesDraft(authorID, true, 100, 1);
  };

  const onFinish = async (values) => {
    const authorID = Number(localStorage.getItem("userID"));

    const { title, subTitle } = values;
    let _variables = {
      title: title,
      subTitle: subTitle,
      description: editorHtml,
      authorID: authorID,
      featureImage: imageData ? imageData : "",
      categories: [
        {
          ID: 21,
          name: "Media",
        },
      ],
    };

    apolloClient
      .mutate({
        mutation: CREATE_ARTICLE_MUTATION,
        variables: _variables,
      })
      .then((res) => {
        if (res.data) {
          message.success("Created new post successfully!");
          form.resetFields();
          router.push("/posts");
        }
      })
      .catch((err) => {
        console.log(err);
        message.error("Created new post failed!");
      });
  };

  const newActions = () => {
    return (
      <ActionTopLayout>
        <ActionContent>
          <span>Unsaved changes</span>
          <NewPostAction>
            <Link href="/posts">
              <LinkBack>
                <Button className="cancel" size="large">
                  Cancel
                </Button>
              </LinkBack>
            </Link>
            <Button size="large" type="primary" htmlType="submit">
              Save
            </Button>
          </NewPostAction>
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
                  <LeftOutlined /> Create post
                </LinkBack>
              </Link>
              <TittleHeader>Posts</TittleHeader>
            </ContentHeader>
            <NewForm
              onChangeEditor={setContentEditorHtml}
              setImage={setImage}
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

const NewPostAction = styled.div`
  display: flex;
  .cancel {
    margin-right: 15px;
  }
`;

const mapStateToProps = (store) => {
  return {
    isCreatedDraft: store.articlesReducer.isCreatedDraft,
  };
};

const mapDispatchToProps = {
  createDraftArticle,
  getListArticlesDraft,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewPost);
