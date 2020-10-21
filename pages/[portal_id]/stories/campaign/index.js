import React, {useEffect, useState} from "react";
import { PageLayout } from "../../../../src/components/views";
const axios = require("axios");
import { connect } from "react-redux";
import styled from "styled-components";
import moment from "moment";
import { TEIcon } from "../../../../src/components/atoms";
import copy from 'copy-to-clipboard';
import {
  deleteArticleWithID,
  getListArticles,
  deleteMultiArticles,
  getListArticlesDeleted,
  getListArticlesDraft,
  clearArticleDetails,
} from "../../../../src/redux/actions/articles";
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
  Input,
  Popconfirm,
  Select,
  Modal,
  Tooltip
} from "antd";
import {
  CaretDownOutlined,
  PlusOutlined,
  CloseOutlined,
  CopyOutlined 
} from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";


function Campaign(props) {
  const [visible, toggleModal] = React.useState(false);

  const [campaignName, setCampaignName] = React.useState("");
  const [currentURL, setCurrentURL] = React.useState("facebook.com");
  const [successCampaign, setSuccessCampaign] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [articleId1, setArticleId1] = React.useState("0");
  const [camapignList, setCamapignList] = React.useState([]);
  const [articleId2, setArticleId2] = React.useState("0");
  const [editing, setEditing] = React.useState(false);
  const [item, selectItem]=React.useState({});


  //Columns for table

  const columns = [
    {
      title: 'SplitId',
      dataIndex: 'SplitId',
      key: 'SplitId',
      render: (title, item) =>
          true ? (
            <Dropdown
          overlay={
            <Menu>
              <Menu.Item>
                {true ? (
                  <span onClick={() => copy(`https://juicyfy.com?utm_source=facebook&utm_medium=ppc&split_id=${title}`)}>
                    Copy Url
                  </span>
                ) : (
                    <span>Copy Url</span>
                  )}
              </Menu.Item>
            </Menu>
          }
          placement="bottomRight"
          arrow
        >   
            <FullName>
              {title && title.length > 40 ? `${title.slice(0, 40)}...` : title}
            </FullName>
        </Dropdown>
          ) : (
              <span>
                {title && title.length > 40 ? `${title.slice(0, 40)}...` : title}
              </span>
            ),
    },
    {
      title: 'Name',
      dataIndex: 'CampaignName',
      key: 'CampaignName',
      render: (title, item) =>
          true ? (
            <Dropdown
            overlay={
              <Menu>
                <Menu.Item>
                  {true ? (
                    <span onClick={() => copy(`https://juicyfy.com?utm_source=facebook&utm_medium=ppc&split_id=${item.SplitId}`)}>
                      Copy Url
                    </span>
                  ) : (
                      <span>Copy Url</span>
                    )}
                </Menu.Item>
              </Menu>
            }
            placement="bottomRight"
            arrow
          >   
            <FullName>
              {title && title.length > 40 ? `${title.slice(0, 40)}...` : title}
            </FullName>
            </Dropdown>
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
        `${moment(new Date(new Number(Date.now()))).format("LL")}`,
    },
    {
      title: "Views",
      dataIndex: "viewCount",
      sorter: (a, b) => a.viewCount - b.viewCount,
      showSorterTooltip: false,
      render: (viewCount) => <span>{viewCount || 100}</span>,
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
      dataIndex: "ID",
      render: (title, item) => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item>
                {true ? (
                  <span onClick={() => handleEditButton(item)}>
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
  ]
  


  
  const showModal = () => {
    toggleModal(true);
  };
  const closeModal = () => {
    toggleModal(false);
    setCurrentURL("");
    setCampaignName("");
    setSuccessCampaign(false);
    setCopied(false);
    setEditing(false);
    setArticleId1(0);
    setArticleId2(0)
    selectItem({});
  };
  function handleChange(event) {
    console.log(event.target.value);
    setCampaignName(event.target.value);
  }

  // Adding campaign
  const handleSave = () => {
    if(successCampaign){
      closeModal();
      return;
    }
    setConfirmLoading(true)
    axios({
      url: "http://3.135.208.27:9200/graphql",
      method: "post",
      data: {
        query: `mutation {
              upsertCampaign(campaign: {CampaignName: "${campaignName}", ArticleId1: ${articleId1}, ArticleId2: ${articleId2}}) {
                ID
                CampaignName
                SplitId
              }
            }
          `
      }
      
    }).then((result) => {
      console.log(result.data)
      let SplitId=result.data.data.upsertCampaign.SplitId;
      setConfirmLoading(false)
      setSuccessCampaign(true)
      setCurrentURL(`https://juicyfy.com?utm_source=facebook&utm_medium=ppc&split_id=${SplitId}`)
      getCampaignData()
    }).catch(err=>{
      console.log(err)
    })
  };
  const textAreaRef = React.useRef(null);
  const [copied, setCopied] = React.useState(false);

  const copyToClipboard=()=>{
    copy(currentURL);
    setCopied(true);
  }
  //On Edit Click
  const handleEditButton=(item)=>{
    console.log("Selected", item)
    showModal();
    selectItem(item);
    setEditing(true)
    setCampaignName(item.CampaignName)
    setArticleId1(item.ArticleId1.ID)
    setArticleId2(item.ArticleId2.ID)
  }
  //Edit campaign
  const handleEdit = () => {
    axios({
      url: "http://localhost:9200/graphql",
      method: "post",
      data: {
        query: `mutation {
              upsertCampaign(campaign: {ID: ${item.ID},CampaignName: "${campaignName}", ArticleId1: ${articleId1}, ArticleId2: ${articleId2}}) {
                ID
                CampaignName
              }
            }
          `
      }
      
    }).then((result) => {
      let SplitId=item.SplitId;
      setConfirmLoading(false)
      setSuccessCampaign(true)
      setCurrentURL(`https://juicyfy.com?utm_source=facebook&utm_medium=ppc&split_id=${SplitId}`)
      getCampaignData()
    }).catch(err=>{
      console.log(err)
    })
  };

  const getCampaignData=()=>{
    axios({
      url: 'http://3.135.208.27:9200/graphql',
      method: 'post',
      data: {
        query: `query {
                campaign(filters: {}) {
                ID
                CampaignName
                ArticleId1 {
                  ID
                  title
                  description
                }
                ArticleId2 {
                  ID
                  title
                  description
                }
                createdDate
                Views
                Reactions
                CTR
                Revenue
                SplitId
              }
            }
          `
      }
    }).then((result) => {
      console.log("result.data",result.data)
      result.data.data.campaign.map(value=>{
        value.ArticleId1Name=value.ArticleId1.title
      })
      setCamapignList(result.data.data.campaign);
    }).catch(err=>{
      console.log(err)
    }) 
  }

  const handleDelete = () => {
    const IdArray=[]
    checkedList.map(data=>{
      IdArray.push(data.ID)
    })
    console.log("IdArray", IdArray)
    axios({
      url: "http://localhost:9200/graphql",
      method: "post",
      data: {
        query: `mutation {
              upsertCampaign(campaign: {IdArray: [${IdArray}], isDeleted: true}) {
                ID
                CampaignName
              }
            }
          `
      }
      
    }).then((result) => {
      getCampaignData()
    }).catch(err=>{
      console.log(err)
    })
  };

  const [checkedList, setCheckedList] = useState([]);

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log("selected",selectedRows)
      setCheckedList(selectedRows);
    },
  };

  useEffect(() => {
    const userID = Number(localStorage.getItem("userID"));
    props.getListArticles(userID, 100, 1).then(data=>{
      getCampaignData()
    }).catch(err=>{
      console.log(err)
    })
       
  }, []);

  return (
    <div>
      <PageLayout>
        <CustomerContent>
        <TitleDropdown>Splitter</TitleDropdown>

      <ActionsTable>
        <AlignItem>
        <div className="actions-left">
          <a>
            <Button
              onClick={showModal}
              type="primary"
              icon={<PlusOutlined />}
              size="middle"
            >
              Create
            </Button>
          </a>
          {checkedList.length > 0 && (
              <>
                <TEIcon path="/images/posts/download.svg" />
                {false ? (
                  <TEIcon path="/images/posts/delete.svg" />
                ) : (
                    <Popconfirm
                      className="popupDelete"
                      placement="bottomLeft"
                      title="Are you sure delete this post？"
                      okText="Yes"
                      cancelText="No"
                      onConfirm={() => handleDelete()}
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
        </CustomerContent>
        <Modal
          title={successCampaign ? "Campaign": editing ? "Edit Campaign": "Add Campaign" } 
          visible={visible}
          okText= {successCampaign ? "Ok": editing ? "Edit" : "Save"} 
          onOk={successCampaign ? closeModal : editing ? handleEdit: handleSave}
          confirmLoading={confirmLoading}
          onCancel={closeModal}
        >
          { successCampaign==false ? (
          <>
          <p>Campaign Title</p>
          <Input value={campaignName} onChange={handleChange} />
          <p style={{ marginTop: "5%" }}>Article 1</p>
          <Select
            onChange={(data) => {
              console.log("article1", data);
              setArticleId1(data);
            }}
            value={articleId1}
            style={{ width: "100%" }}
          >
            {props.articlesData.map((data) => {
              return (
                <Select.Option value={data.ID}>{data.title}</Select.Option>
              );
            })}
          </Select>
          <p style={{ marginTop: "5%" }}>Article 2</p>
          <Select
            onChange={(data) => {
              console.log("article2", data);
              setArticleId2(data);
            }}
            value={articleId2}
            style={{ width: "100%" }}
          >
            {props.articlesData.map((data) => {
              return (
                <Select.Option value={data.ID}>{data.title}</Select.Option>
              );
            })}
          </Select>
          </>
          ):(
            <>
              <h3 style={{color: "green"}}>Successfully {editing? "edited": "added"} the campaign</h3>
                <p>{currentURL}</p>
                <BTNDelete onClick={copyToClipboard}>
                    <CopyOutlined/>
                    {copied ? "Copied" : "Copy" }
                </BTNDelete>
            </>
          )}
        </Modal>
        <ViewContent>
          <Table 
          rowSelection={{
            type: "checkbox",
            ...rowSelection,
          }}
          className="table-content"  
          dataSource={camapignList} 
          columns={columns} 
          rowKey="ID"
          />
        </ViewContent>
      </PageLayout>
    </div>
  );
}
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
const CustomerContent = styled.div`
  padding: 50px;
  padding-bottom: initial

`;
const BTNDelete = styled.a`
  cursor: pointer;
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
    articlesData: store.articlesReducer.articlesData
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

export default connect(mapStateToProps, mapDispatchToProps)(Campaign);
