import React, { useState, useEffect, Fragment } from "react";
import styled from "styled-components";
import Link from "next/link";
import moment from "moment";
import { format } from "url";
import { connect } from "react-redux";
import { useRouter } from "next/router";
// actions
import {
  deleteArticleWithID,
  getListArticles,
  deleteMultiArticles,
  getListArticlesDeleted,
  getListArticlesDraft,
  clearArticleDetails,
} from "../../../redux/actions/articles";
// icons
import {
  CaretDownOutlined,
  PlusOutlined,
  CloseOutlined,
} from "@ant-design/icons";
// ui
import {
  Table,
  Button,
  Menu,
  Dropdown,
  Drawer,
  Collapse,
  Radio,
  notification,
  Checkbox,
  Popconfirm,
} from "antd";
import { TEIcon } from "../../atoms";
import { getUserData } from "../../../utils";
const { Panel } = Collapse;


const postStatusList = [
  {
    name: 'Live Stories',
    value: 'live'
  },
  {
    name: 'Drafts',
    value: 'drafts'
  },
  {
    name: 'Archived',
    value: 'archived'
  },
  {
    name: 'Deleted',
    value: 'deleted'
  }
];

const postStatusNames = {
  live: 'Live Stories',
  drafts: 'Drafts',
  archived: 'Archived',
  deleted: 'Deleted',
};

const postStatusTypes = {
  live: 'live',
  drafts: 'drafts',
  archived: 'archived',
  deleted: 'deleted',
};

const ViewPosts = (props) => {
  const [tabValue, setTabValue] = useState(postStatusTypes.live);
  const [checkedList, setCheckedList] = useState([]);
  const [isOpenMoreFilter, setOpenMoreFilters] = useState(false);
  const [valuesCollapse, setShowCollapse] = useState([]);
  const [valueSubscription, setValueSubscription] = useState(0);

  const { userData } = props;
  const router = useRouter();
  

  useEffect(() => {
    return () => {
      props.clearArticleDetails();
    }
  }, [])

  useEffect(() => {
    setTabValue(props.currentTab);
  }, [props.currentTab])

  useEffect(() => {
    if (props.isDeleted) {
      notification.success({
        message: "Successfully!",
        description: "Deleted article!",
      });

      setTabValue(postStatusTypes.deleted);
      setCheckedList([]);
    }
  }, [props.isDeleted]);

  useEffect(() => {
    if (props.isDeletedMulti) {
      notification.success({
        message: "Successfully!",
        description: "Deleted articles!",
      });
      setCheckedList([]);
      setTabValue(postStatusTypes.deleted);
    }
  }, [props.isDeletedMulti]);

  useEffect(() => {
    if (props.msgErr) {
      notification.error({
        message: "Error",
        description: props.msgErr,
      });
    }
  }, [props.msgErr]);

  const getArticleDetail = (item) => {
    const url =
      tabValue === postStatusTypes.drafts
        ? `/${userData && userData.uniqueID}/stories/${item.slug}/draft`
        : `/${userData && userData.uniqueID}/stories/${item.slug}`;

    const route = tabValue === postStatusTypes.drafts ? `/${userData.uniqueID}/stories/[slug]/draft` : `/${userData.uniqueID}/stories/[slug]`;
    url && router.push(route, { pathname: url }, { shallow: true });
  };

  const handleChangeTable = ({ key }) => {
    console.log('key', key)
    // const userID = Number(localStorage.getItem("userID"));
    // setTabValue(key);
    // if (key === "Drafts") {
    //   props.getListArticlesDraft(userID, true, 100, 1);
    // } else if (key === "Deleted") {
    //   props.getListArticlesDeleted(userID, userID, 100, 1);
    // }
    router.push("/[portal_id]/stories/posts/[post_status]", { pathname: `/${userData?.uniqueID}/stories/posts/` + key }, { shallow: true });
  };

  const onChangeSubscription = (e) => {
    setValueSubscription(e.target.value);
  };

  const tableMenu = (
    <Menu onClick={handleChangeTable}>
      {
        postStatusList.map(status => (
          <Menu.Item key={status.value}>{status.name}</Menu.Item>
        ))
      }
      {/* <Menu.Item key="Live Stories">Live Stories</Menu.Item>
      <Menu.Item key="Drafts">Drafts</Menu.Item>
      <Menu.Item key="Archived">Archived</Menu.Item>
      <Menu.Item key="Deleted">Deleted</Menu.Item> */}
    </Menu>
  );

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      sorter: (a, b) => a.title > b.title,
      showSorterTooltip: false,
      width: "30%",
      render: (title, item) =>
        tabValue !== postStatusTypes.deleted ? (
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
                {tabValue !== postStatusTypes.deleted ? (
                  <span onClick={() => getArticleDetail(item)}>
                    Edit
                  </span>
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

  const onDeletePosts = async () => {
    let ids = [];
    for (let i = 0; i < checkedList.length; i++) {
      const el = checkedList[i];
      ids.push(Number(el.ID));
    }
    await props.deleteMultiArticles(ids);
    const userID = Number(localStorage.getItem("userID"));
    await props.getListArticles(userID, 100, 1);
    await props.getListArticlesDeleted(userID, userID, 100, 1);
  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setCheckedList(selectedRows);
    },
  };

  return (
    <ViewContent>
      <ContentHeader>
        <StyledDropdown defaultValue="all">
          <TitleDropdown>{postStatusNames[tabValue]}</TitleDropdown>
          <Dropdown overlay={(
            <Menu onClick={handleChangeTable}>
              {postStatusList.map(status => (<Menu.Item key={status.value}>{status.name}</Menu.Item>))}
            </Menu>
          )} placement="bottomCenter" arrow>
            <CaretDownOutlined />
          </Dropdown>
        </StyledDropdown>
      </ContentHeader>
      <ActionsTable>
        <AlignItem>
          <div className="actions-left">
          <Link href="/[portal_id]/stories/posts/new" as={`/${userData?.uniqueID}/stories/posts/new`} shallow={true}>

            {/* <Link href="/posts/new"> */}
              <a>
                <Button type="primary" icon={<PlusOutlined />} size="middle">
                  Create
                </Button>
              </a>
            </Link>
            {checkedList.length > 0 && (
              <>
                <TEIcon path="/images/posts/download.svg" />
                {tabValue === postStatusTypes.deleted || tabValue === postStatusTypes.drafts ? (
                  <TEIcon path="/images/posts/delete.svg" />
                ) : (
                    <Popconfirm
                      className="popupDelete"
                      placement="bottomLeft"
                      title="Are you sure delete this post？"
                      okText="Yes"
                      cancelText="No"
                      onConfirm={() => onDeletePosts()}
                    >
                      <BTNDelete>
                        <TEIcon path="/images/posts/delete.svg" />
                      </BTNDelete>
                    </Popconfirm>
                  )}
              </>
            )}
          </div>
          <div className="actions-right">
            <span onClick={() => setOpenMoreFilters(true)}>
              <TEIcon path="/images/posts/filter.svg" />
            </span>
            <TEIcon path="/images/posts/search.svg" />
          </div>
        </AlignItem>
      </ActionsTable>

      {/* {tabValue === "Live Stories" && ( */}
      <Table
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        columns={columns}
        dataSource={
          tabValue === postStatusTypes.live
            ? props.articlesData
            : tabValue === postStatusTypes.deleted
              ? props.articlesDeleted
              : tabValue === postStatusTypes.drafts
                ? props.articlesDraft
                : []
        }
        pagination={props.articlesData.length > 10}
        rowKey="ID"
        className="table-content"
      />

      <Drawer
        title={
          <DrawerTitle>
            More filters
            <TitleIconClose onClick={() => setOpenMoreFilters(false)} />
          </DrawerTitle>
        }
        placement="right"
        closable={false}
        onClose={() => setOpenMoreFilters(false)}
        visible={isOpenMoreFilter}
        footer={
          <>
            <ButtonFooterLeft type="default">
              Clear all filters
            </ButtonFooterLeft>
            <ButtonFooterRight type="primary">Done</ButtonFooterRight>
          </>
        }
      >
        <CollapseStyle
          defaultActiveKey={valuesCollapse}
          onChange={(values) => setShowCollapse(values)}
          expandIconPosition="right"
        >
          <PanelStyle
            header={
              <div>
                <PanelTitle>Story Type</PanelTitle>
              </div>
            }
            key="1"
          >
            <CheckboxGroupStyle>
              <CheckboxStyle value={1}>Free</CheckboxStyle>
              <CheckboxStyle value={2}>Premium</CheckboxStyle>
            </CheckboxGroupStyle>

            <ButtonLink type="text">Clear</ButtonLink>
          </PanelStyle>
          <PanelStyle
            header={
              <div>
                <PanelTitle>Category</PanelTitle>
              </div>
            }
            key="2"
          >
            <RadioGroupStyle
              onChange={onChangeSubscription}
              value={valueSubscription}
            >
              <RadioStyle value={1}>Open</RadioStyle>
              <RadioStyle value={2}>Archived</RadioStyle>
              <RadioStyle value={3}>Canceled</RadioStyle>
            </RadioGroupStyle>
            <ButtonLink type="text">Clear</ButtonLink>
          </PanelStyle>

          <PanelStyle
            header={
              <div>
                <PanelTitle>Authors</PanelTitle>
              </div>
            }
            key="3"
          >
            <CheckboxGroupStyle>
              <CheckboxStyle value={1}>Authorized</CheckboxStyle>
            </CheckboxGroupStyle>
            <ButtonLink type="text">Clear</ButtonLink>
          </PanelStyle>

          <PanelStyle
            header={
              <div>
                <PanelTitle>Link</PanelTitle>
              </div>
            }
            key="4"
          >
            <CheckboxGroupStyle>
              <CheckboxStyle value={1}>Internal</CheckboxStyle>
              <CheckboxStyle value={1}>External</CheckboxStyle>
            </CheckboxGroupStyle>
            <ButtonLink type="text">Clear</ButtonLink>
          </PanelStyle>
        </CollapseStyle>
      </Drawer>
    </ViewContent>
  );
};

const ViewContent = styled.div`
  border-radius: 3px;
  .ant-table {
    background: #f6f8f9;
    .ant-table-thead > tr > th {
      background: #eef1f2;
      color: #404950;
    }
    .ant-table-tbody tr {
      :hover {
        background: #ffffff;
      }
    }
  }
`;

const ContentHeader = styled.div`
  padding: 10px 0px;
`;

const StyledDropdown = styled.div`
  display: flex;
  align-items: center;
  svg {
    margin-left: 10px;
  }
`;

const DrawerTitle = styled.h3`
  margin: 0;
  font-weight: 500;
  position: relative;
  color: #000;
  font-size: 24px;
`;

const TitleDropdown = styled.p`
  font-size: 24px;
  color: #404950;
  font-family: Proxima Nova;
  font-style: normal;
  font-weight: bold;
  line-height: 24px;
  margin: 0;
`;

const AlignItem = styled.div`
  display: flex;
  justify-content: space-between;
`;

const FullName = styled.a`
  font-size: 14px;
  font-weight: 600;
`;

const TitleIconClose = styled(CloseOutlined)`
  position: absolute;
  right: 0;
  font-size: 18px;
  cursor: pointer;
`;

const ButtonFooterLeft = styled(Button)`
  float: left;
`;

const ButtonFooterRight = styled(Button)`
  float: right;
`;

const CollapseStyle = styled(Collapse)`
  background: none;
  border: none;
  padding: 0 10px;
`;

const PanelStyle = styled(Panel)`
  background: none;
  border: none;
`;

const PanelTitle = styled.h3`
  margin: 0px;
  font-weight: 600;
  color: #000;
  font-size: 16px;
  opacity: 0.8;
`;

const RadioGroupStyle = styled(Radio.Group)`
  width: 100%;
`;

const RadioStyle = styled(Radio)`
  display: block;
  height: 30px;
  line-height: 30px;
  width: 100%;
`;

const ButtonLink = styled(Button)`
  margin: 10px 0 0;
  padding: 0 3px;
  display: block;
`;

const CheckboxGroupStyle = styled(Checkbox.Group)`
  width: 100%;
`;

const BTNDelete = styled.a`
  cursor: pointer;
`;

const CheckboxStyle = styled(Checkbox)`
  width: 100%;
  margin: 0 0 7px !important;
`;

const ActionsTable = styled.div`
  padding: 24px 0;
  img {
    margin-left: 10px;
    padding: 7px;
    width: 30px;
    height: 30px;
    cursor: pointer;
    :hover {
      background: #eef1f2;
      border-radius: 5px;
    }
  }
  .actions-left {
    button {
      font-size: 14px;
      line-height: 14px;
      color: #fffdfd;
      font-weight: bold;
      svg {
        font-size: 20px;
        margin-bottom: -5px;
      }
    }
  }
  .actions-right {
  }
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
