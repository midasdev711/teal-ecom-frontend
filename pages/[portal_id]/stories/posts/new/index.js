import React, { useState, useEffect } from "react";
import Link from "next/link";
import styled from "styled-components";
import { Button, Layout } from "antd";
import { useRouter } from "next/router";
import { format } from "url";
import { connect } from "react-redux";
// apollo
import { apolloClient } from "../../../../../src/graphql";
import { CREATE_ARTICLE_MUTATION } from "../../../../../src/graphql/articles.query";
// actions
import {
  createDraftArticle,
  getListArticlesDraft,
  clearArticleDetails,
} from "../../../../../src/redux/actions/articles";
// components
import NewForm from "../../../../../src/components/posts/NewForm";
// ui
import { message, Form } from "antd";
import { getUserData } from "../../../../../src/utils";

const NewPost = (props) => {
  const [form] = Form.useForm();
  const [editorHtml, setContentEditorHtml] = useState("");
  const [imageData, setImage] = useState(null);
  const [isStory, setIsStory] = useState(false);
  const [creatingDraft, setCreatingDraft] = useState(false);
  const [saveValues, setSaveValues] = useState("saved");
  let userData = getUserData()


  const router = useRouter();
  const { articleDetail } = props;

  useEffect(() => {
    // returned function will be called on component unmount
    return () => {
      // const { title, subTitle, imageData } = form.getFieldsValue();
      // if (title || subTitle || imageData || editorHtml !== "") {
      //   createDraft();
      // }
      props.clearArticleDetails();
    };
  }, []);

  useEffect(() => {
    if (creatingDraft) {
      createDraft();
    }
  }, [creatingDraft])

  useEffect(() => {
    if (articleDetail) {
      console.log('articleDetail', articleDetail)
      const userData = JSON.parse(localStorage.getItem("userData"));
      const url = `/${userData && userData.uniqueID}/stories/${articleDetail.slug}/draft`;
      console.log('url', url);
      router.replace('/[portal_id]/stories/[slug]/draft', { pathname: url }, { shallow: true });
    }
  }, [articleDetail])

  const onChangeEditor = (value) => {
    setContentEditorHtml(value);
    setIsStory(false);
  }

  const onChangeTitle = async (ev) => {
    if (ev.target.value && ev.target.value.trim().length > 3 && !creatingDraft) {
      console.log('createDraft');
      setCreatingDraft(true);
      // await createDraft();
    }
  }

  const createDraft = async () => {
    setSaveValues("saving...");
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
    // await props.getListArticlesDraft(authorID, true, 100, 1);
  };

  const onFinish = async (values) => {
    const authorID = Number(localStorage.getItem("userID"));
    const { title, subTitle } = values;

    if (!editorHtml || (editorHtml && editorHtml.length < 1)) {
      setIsStory(true);
      return;
    }

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
          router.push("/[portal_id]/stories/posts/[post_status]", { pathname: `/${userData?.uniqueID}/stories/posts/live` }, { shallow: true });
        }
      })
      .catch((err) => {
        console.log(err);
        message.error("Created new post failed!");
      });
  };

  // const newActions = () => {
  //   return (
  //     );
  // };

  return (
    <NewPageLayout>
      <Form onFinish={onFinish} form={form} layout="vertical">
        <NewContent>
          {/* {newActions()} */}
          <ActionTopLayout>
            <ActionContent>
              <NewPostAction>
                <Link href="/[portal_id]/stories/posts/[post_status]" as={`/${userData?.uniqueID}/stories/posts/live`} shallow>
                  <LinkBack>
                    <LogoImage className="logo" src="/favicon.svg" />
                  </LinkBack>
                </Link>
                <Link href="/[portal_id]/stories/posts/[post_status]" as={`/${userData?.uniqueID}/stories/posts/live`} shallow>
                  <LinkBack>
                    <LogoImage className="logo" src="/images/back-icon.svg" />
                  </LinkBack>
                </Link>
                <StyledText>Draft</StyledText>
                <StyledText>{saveValues}</StyledText>
              </NewPostAction>
              <Button size="middle" type="primary" htmlType="submit">
                Publish
          </Button>
            </ActionContent>
          </ActionTopLayout>
          <ContentPage>
            <NewForm
              flag={true}
              onTitleChange={onChangeTitle}
              onChangeEditor={onChangeEditor}
              setImage={setImage}
              isStory={isStory}
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
  };
};

const mapDispatchToProps = {
  createDraftArticle,
  clearArticleDetails,
  getListArticlesDraft,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewPost);
