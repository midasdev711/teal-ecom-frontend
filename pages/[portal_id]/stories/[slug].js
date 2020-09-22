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
  const [handlePageRefresh, setHandlePageRefresh] = useState(false)

  const { updateArticleDetail, saveState, articleDetail, data } = props;
  const prevProps = usePrevious({ updateArticleDetail });
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
    let timer = null;
    if (!timer) {
      console.log('set timer');
      timer = setInterval(async () => {
        // console.log('called on every 5 seconds!', articleDetail)
        await handleSaveOnInterval();
      }, 5000);
    }

    return () => {
      if (timer) {
        console.log('clear interval');
        clearInterval(timer);
      }
    }
  }, [articleDetail, editorHtml, form])

  useEffect(() => {
    if (articleDetail) {
      const { description } = articleDetail;
      let { title, subTitle } = handleTitle()
      form.setFieldsValue({
        title,
        subTitle,
      });
      if (description && description.trim().length) {
        setContentEditorHtml(description);
      }
    }

  }, [articleDetail]);

  useEffect(() => {
    if (prevProps && prevProps.updateArticleDetail !== updateArticleDetail && handlePageRefresh) {
      notification.success({
        message: "Successfully!",
        description: "Updated article successfully!",
      });
      Router.router.push("/posts/[post_status]", { pathname: "/posts/live" }, { shallow: true });
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

  const onFinish = async (values) => {
    if (!editorHtml || (editorHtml && editorHtml.length < 1)) {
      setIsStory(true);
      setHandlePageRefresh(false);
      return;
    }
    const { title, subTitle } = values;
    let _variables = {
      title: title,
      subTitle: subTitle,
      description: editorHtml,
      articleId: Number(articleDetail.ID),
      featureImage: imageData ? imageData : "",
    };
    setHandlePageRefresh(true);

    await props.updateArticle(_variables);
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
    const { title, subTitle, imageData } = form.getFieldsValue();
    console.log('editorHtml', editorHtml)
    const _obj = {
      title: title,
      subTitle: subTitle,
      description: editorHtml,
      articleId: Number(articleDetail.ID),
      featureImage: imageData ? imageData : "",
    };
    await props.updateArticle(_obj);
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
            <Link href="/posts/[post_status]" as="/posts/live" shallow={true}>
              <LinkBack>
                <LogoImage className="logo" src="/images/back-icon.svg" />
              </LinkBack>
            </Link>
            <StyledText>Draft</StyledText>
            <StyledText>{saveState}</StyledText>
          </NewPostAction>
          <Button size="middle" type="primary" htmlType="submit" onClick={onFinish}>
            Save and publish
          </Button>
        </ActionContent>
      </ActionTopLayout>
    );
  };
  const handleData = () => {
    let description
    if (data !== undefined) {
      if (data?.ID === articleDetail?.ID) {
        description = data?.description
      } else {
        description = articleDetail?.description
      }
    } else {
      description = articleDetail?.description
    }
    return description
  }
  // console.log('data', data)
  // console.log('articleDetail', articleDetail)
  const handleTitle = () => {
    let title, subTitle
    if (data !== undefined) {
      if (data?.ID === articleDetail?.ID) {
        title = data?.title
        subTitle = data?.subTitle

      } else {
        title = articleDetail?.title
        subTitle = articleDetail?.subTitle
      }
    } else {
      title = articleDetail?.title
      subTitle = articleDetail?.subTitle
    }
    let datass = { title: title, subTitle: subTitle }
    return datass
  }
  return (
    <NewPageLayout>
      <Form form={form} layout="vertical">
        <NewContent>
          {newActions()}
          <ContentPage>
            <NewForm
              onChangeEditor={onChangeEditor}
              setImage={setImage}
              isStory={isStory}
              description={
                handleData()
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
    msgErr: store.articlesReducer.msgErr,
    data: store.articlesReducer.updateArticleDetail,
  };
};

const mapDispatchToProps = {
  getDetailArticle,
  updateArticle,
  clearArticleDetails,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditPost);
