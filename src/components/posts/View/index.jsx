import React, { useState, useEffect } from "react";
import styled from "styled-components";
import moment from "moment";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import { Row, Col, Tabs, Button, Table, Dropdown, Menu } from "antd";

import { TEIcon } from "../../atoms";
// actions
import {
  deleteArticleWithID,
  getListArticles,
  deleteMultiArticles,
  getListArticlesDeleted,
  getListArticlesDraft,
  clearArticleDetails,
} from "../../../redux/actions/articles";

const { TabPane } = Tabs;

const ListTabs = [
  {
    key: "1",
    name: "Drafts",
  },
  {
    key: "2",
    name: "Live",
  },
  {
    key: "3",
    name: "Archived",
  },
  {
    key: "4",
    name: "Deleted",
  },
];

const ViewPosts = (props) => {
  const [tabActive, setTabActive] = useState("1");
  const [dataTable, setDataTable] = useState([]);
  const [checkedList, setCheckedList] = useState([]);

  const router = useRouter();
  const { userData } = props;

  useEffect(() => {
    const userID = Number(localStorage.getItem("userID"));
    props.getListArticlesDraft(userID, true, 100, 1);
  }, []);

  useEffect(() => {
    switch (tabActive) {
      case "1":
        setDataTable(props.articlesDraft);
        break;
      case "2":
        setDataTable(props.articlesData);
        break;
      case "3":
        setDataTable(props.articlesData);
        break;
      case "4":
        setDataTable(props.articlesDeleted);
        break;
      default:
        break;
    }
  }, [props.articlesDraft, props.articlesData, props.articlesDeleted]);

  useEffect(() => {
    const userID = Number(localStorage.getItem("userID"));
    switch (tabActive) {
      case "1":
        props.getListArticlesDraft(userID, true, 100, 1);
        break;
      case "2":
        props.getListArticles(userID, 100, 1);
        break;
      case "3":
        props.getListArticles(userID, 100, 1);
        break;
      case "4":
        props.getListArticlesDeleted(userID, userID, 100, 1);
        break;
      default:
        break;
    }
  }, [tabActive]);

  const handleChangeTabs = (tabIndex) => {
    setTabActive(tabIndex);
  };

  const getArticleDetail = (item) => {
    const url =
      tabActive === "1"
        ? `/${userData && userData.uniqueID}/stories/${item.slug}/draft`
        : `/${userData && userData.uniqueID}/stories/${item.slug}`;

    const route =
      tabActive === "1"
        ? `/${userData.uniqueID}/stories/[slug]/draft`
        : `/${userData.uniqueID}/stories/[slug]`;
    url && router.push(route, { pathname: url }, { shallow: true });
  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setCheckedList(selectedRows);
    },
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      sorter: (a, b) => a.title > b.title,
      showSorterTooltip: false,
      width: "30%",
      render: (title, item) =>
        tabActive !== "4" ? (
          <FullName onClick={() => getArticleDetail(item)}>
            {title && title.length > 40 ? `${title.slice(0, 40)}...` : title}
          </FullName>
        ) : (
          <span>
            {title && title.length > 40 ? `${title.slice(0, 40)}...` : title}
          </span>
        ),
    },
    {
      title: "Date",
      dataIndex: "createdDate",
      sorter: (a, b) => a.createdDate > b.createdDate,
      showSorterTooltip: false,
      render: (createdDate) =>
        `${moment(new Date(new Number(createdDate))).format("LL")}`,
    },
    {
      title: "Views",
      dataIndex: "viewCount",
      sorter: (a, b) => a.viewCount - b.viewCount,
      showSorterTooltip: false,
      render: (viewCount) => <span>{viewCount}</span>,
    },
    {
      title: "Reactions",
      dataIndex: "reaction",
      sorter: (a, b) => a.reaction - b.reaction,
      showSorterTooltip: false,
      render: (reaction) => <span>{reaction || 230}</span>,
    },
    {
      title: "CTR",
      dataIndex: "CTR",
      sorter: (a, b) => a.CTR > b.CTR,
      showSorterTooltip: false,
      render: (CTR) => <span>{CTR || "5,67%"}</span>,
    },
    {
      title: "Revenue",
      dataIndex: "revenue",
      sorter: (a, b) => a.revenue > b.revenue,
      showSorterTooltip: false,
      render: (revenue) => <span>{revenue || "$7.6K"}</span>,
    },
    {
      title: "",
      dataIndex: "title",
      render: (title, item) => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item>
                {tabActive !== "4" ? (
                  <span onClick={() => getArticleDetail(item)}>Edit</span>
                ) : (
                  <span>Edit</span>
                )}
              </Menu.Item>
              <Menu.Item>Stats</Menu.Item>
            </Menu>
          }
          placement="bottomRight"
          arrow
        >
          <div>
            <TEIcon path="/images/posts/dots.svg" />
          </div>
        </Dropdown>
      ),
    },
  ];

  return (
    <Wrapper>
      <TitlePage>Posts</TitlePage>
      <WrapperContent>
        <Tabs
          tabBarExtraContent={
            <>
              {checkedList.length > 0 && (
                <>
                  <Button
                    type="text"
                    icon={<img src="/images/down.svg" alt="" />}
                  />
                  <Button
                    type="text"
                    icon={<img src="/images/delete.svg" alt="" />}
                  />
                </>
              )}

              <Button
                type="text"
                icon={<img src="/images/slider.svg" alt="" />}
              />
              <Button
                type="text"
                icon={<img src="/images/search.svg" alt="" />}
              />
            </>
          }
          defaultActiveKey={tabActive}
          onChange={handleChangeTabs}
        >
          {ListTabs.map((tab) => (
            <TabPane tab={tab.name} key={tab.key} />
          ))}
        </Tabs>

        <TableStyle
          rowSelection={{
            type: "checkbox",
            ...rowSelection,
          }}
          columns={columns}
          dataSource={dataTable}
          pagination={dataTable.length > 10}
          rowKey="ID"
          className="table-content"
        />
      </WrapperContent>
    </Wrapper>
  );
};

const FullName = styled.a`
  font-size: 14px;
  font-weight: 600;
`;

const TableStyle = styled(Table)`
  margin-top: 20px;
`;
const WrapperContent = styled.div``;

const Wrapper = styled.div``;

const TitlePage = styled.h1`
  font-size: 24px;
  color: #404950;
  font-family: Proxima Nova;
  font-style: normal;
  font-weight: bold;
  line-height: 24px;
  margin: 0;
  margin-bottom: 30px;
`;

const mapStateToProps = (store) => {
  return {
    articlesData: store.articlesReducer.articlesData,
    isDeleted: store.articlesReducer.isDeleted,
    msgErr: store.articlesReducer.msgErr,
    articlesDeleted: store.articlesReducer.articlesDeleted,
    isDeletedMulti: store.articlesReducer.isDeletedMulti,
    articlesDraft: store.articlesReducer.articlesDraft,
    isCreatedDraft: store.articlesReducer.isCreatedDraft,
  };
};

const mapDispatchToProps = {
  deleteArticleWithID,
  getListArticles,
  deleteMultiArticles,
  clearArticleDetails,
  getListArticlesDeleted,
  getListArticlesDraft,
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewPosts);
