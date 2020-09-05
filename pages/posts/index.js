import React, { useState, useEffect } from "react";
import { Layout, Empty, Button } from "antd";
import { PageLayout } from "../../src/components/views";
import styled from "styled-components";
import Link from "next/link";
import { ViewPosts } from "../../src/components/posts";
// apollo
import { apolloClient } from "../../src/graphql";
import { GET_ARTICLES_QUERY } from "../../src/graphql/articles.query";

const Posts = () => {
  const [dataArticles, setDataArticles] = useState([]);

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
        await setDataArticles(res.data.articles);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <PageLayout>
      <CustomerContent>
        {dataArticles && dataArticles.length > 0 ? (
          <ViewPosts data={dataArticles} />
        ) : (
          <EmptyCustomerContent>
            <EmptyDataContent>
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}>
                <Message>Currently you do not have any post to manage.</Message>
                <CreateButton size="large">
                  <Link href="/posts/new">
                    <a>Create post</a>
                  </Link>
                </CreateButton>
              </Empty>
            </EmptyDataContent>
          </EmptyCustomerContent>
        )}
      </CustomerContent>
    </PageLayout>
  );
};

const CustomerContent = styled.div`
  padding: 50px;
`;

const EmptyCustomerContent = styled.div`
  padding: 20px;
  max-width: 60rem;
  margin: 0 auto;
`;

const EmptyDataContent = styled(Layout.Content)`
  padding: 20px;
  width: 100%;
  border: none;
  outline: none;
  display: flex;
  justify-content: center;
  min-height: 50vh;
  align-items: center;
  background: white;
  box-shadow: 0px 4px 4px rgba(186, 195, 201, 0.25);
  border-radius: 5px;
`;

const CreateButton = styled(Button)`
  background: #1890ff;
  border: 1px solid #1890ff;
  color: #fff;
  &:hover {
    background: #1890ff;
    border: 1px solid #1890ff;
    color: #fff;
    opacity: 0.8;
  }
`;

const Message = styled.p`
  color: #637381;
  font-size: 14px;
`;

export default Posts;
