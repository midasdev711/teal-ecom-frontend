import React, { useState, useEffect } from "react";
import Link from "next/link";
import styled from "styled-components";
import { Button, Layout } from "antd";
import Router from "next/router";
// apollo
import { apolloClient } from "../../../src/graphql";
import {
  CREATE_ARTICLE_MUTATION,
} from "../../../src/graphql/articles.query";
// components
import { PageLayout } from "../../../src/components/views";
import NewForm from "../../../src/components/posts/NewForm";
// icons
import { LeftOutlined } from "@ant-design/icons";
// ui
import { message, Form } from "antd";

const NewCustomer = () => {
  const [editorHtml, setContentEditorHtml] = useState("");
  const authorID = Number(localStorage.getItem('userID'));

  const onFinish = async (values) => {
    const { title, subTitle } = values;
    let _variables = {
      title: title,
      subTitle: subTitle,
      description: editorHtml,
      authorID: authorID,
      featureImage: "",
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
          window.location.href = '/posts';
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
          <NewCustomerAction>
            <Button className="cancel" size="large">
              Cancel
            </Button>
            <Button size="large" type="primary" htmlType="submit">
              Save
            </Button>
          </NewCustomerAction>
        </ActionContent>
      </ActionTopLayout>
    );
  };

  return (
    <PageLayout>
      <Form onFinish={onFinish} layout="vertical">
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
            <NewForm onChangeEditor={setContentEditorHtml} />
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

const NewCustomerAction = styled.div`
  display: flex;
  .cancel {
    margin-right: 15px;
  }
`;

export default NewCustomer;
