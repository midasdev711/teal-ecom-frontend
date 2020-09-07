import React, { useState, useEffect } from "react";
import { PageLayout } from "../../src/components/views";
import styled from "styled-components";
import { ViewPosts } from "../../src/components/posts";
// apollo
import { apolloClient } from "../../src/graphql";
import { GET_ARTICLES_QUERY } from "../../src/graphql/articles.query";

const Posts = () => {
  const [isDataArticles, setIsDataArticles] = useState(false);

  useEffect(() => {
    getDataArticles();
  }, []);

  const getDataArticles = async () => {
    const userID = Number(localStorage.getItem("userID"));
    await apolloClient
      .query({
        query: GET_ARTICLES_QUERY,
        variables: {
          filters: {
            limit: 100,
            page: 1,
            authorId: userID,
          },
        },
      })
      .then(async (res) => {
        await setIsDataArticles(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <PageLayout>
      <CustomerContent>{isDataArticles && <ViewPosts />}</CustomerContent>
    </PageLayout>
  );
};

const CustomerContent = styled.div`
  padding: 50px;
`;

export default Posts;
