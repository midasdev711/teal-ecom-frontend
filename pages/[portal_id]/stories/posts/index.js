import React, { useState, useEffect, useRef } from "react";
import { PageLayout } from "../../../../src/components/views";
import styled from "styled-components";
import { ViewPosts } from "../../../../src/components/posts";
import { connect } from "react-redux";

// actions
import { getListArticles } from "../../../../src/redux/actions/articles";

const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

const Posts = (props) => {
  const [userData, setUserData] = useState({});
  const { articlesData } = props;
  const prevProps = usePrevious({ articlesData });

  useEffect(() => {
    getDataArticles();
  }, [props]);

  const getDataArticles = async () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    setUserData(userData);
    const userID = Number(localStorage.getItem("userID"));
    await props.getListArticles(userID, 100, 1);
  };

  return (
    <PageLayout>
      <CustomerContent>
        <ViewPosts userData={userData} />
      </CustomerContent>
    </PageLayout>
  );
};

const CustomerContent = styled.div`
  padding: 50px;
`;

const mapStateToProps = (store) => {
  return {
    articlesData: store.articlesReducer.articlesData,
    msgErr: store.articlesReducer.msgErr,
  };
};

const mapDispatchToProps = {
  getListArticles,
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
