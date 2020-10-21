import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { Modal, Card, Tag, Button } from "antd";

const ViewTags = ({ open, close, closeTag, values }) => {
  const [openCustumItem, setopenCustumItem] = useState(open);

  useEffect(() => {
    setopenCustumItem(open);
  }, [open, values]);

  const forMap = (tag, index) => {
    const tagElem = (
      <TagContent
        closable
        onClose={(e) => {
          e.preventDefault();
          closeTag(tag);
        }}
      >
        {tag}
      </TagContent>
    );
    return (
      <span key={index} style={{ display: "inline-block" }}>
        {tagElem}
      </span>
    );
  };

  const tagChild = values && values.map(forMap);

  return (
    <Modals
      visible={openCustumItem}
      onOk={close}
      width="33.5%"
      onCancel={close}
      footer={[
        <Button key="back" onClick={close} size="large">
          Cancel
        </Button>,
        <Button key="submit" onClick={close} type="primary" size="large">
          Apply changes
        </Button>,
      ]}
    >
      <Wraper className="site-card-border-less-wrapper">
        <CardViews bordered={false} title="Tags">
          <Tagsection>
            <Hediangtext>APPLIED TAGS</Hediangtext>
            {values && values.length === 0 && (
              <Selecttext>
                Select previously used tags from the list below to add them to
                this order.
              </Selecttext>
            )}
            {values && values.length != 0 && <Nexttoken>{tagChild} </Nexttoken>}
          </Tagsection>
          <Alltage>
            <Alltagetext>All Tage</Alltagetext>
            <Stackitem>
              <Itemtext>Sort:</Itemtext>
              <Segmented>
                <Alphabetically>Alphabetically</Alphabetically>
                <Popularity>Popularity</Popularity>
              </Segmented>
            </Stackitem>
          </Alltage>
        </CardViews>
      </Wraper>
    </Modals>
  );
};

const Wraper = styled.div`
  .ant-card.ant-card-bordered {
    width: 40% !important;
  }
`;

const Modals = styled(Modal)`
  & .ant-modal-content {
    & .ant-modal-body {
      padding: 0;
    }
  }
`;

const CardViews = styled(Card)`
  color: black;
  width: 100%;
  & .ant-card-head {
    padding: 0;
    border-bottom: 1px solid #e6e6e6;
  }
  .ant-card-head-title {
    display: block;
    color: #212b36;
    font-size: 20px;
    padding: 0;
    font-weight: 400;
  }
  .ant-card-body {
    padding: 24px 0px 0px 0px;
    & span.anticon.anticon-close.ant-tag-close-icon {
      padding-left: 4px;
    }
  }
  .ant-card-head {
    padding: 20px;
  }
`;
const Tagsection = styled.div`
  padding: 0px 20px 20px 20px;
  border-bottom: 1px solid #e6e6e6;
`;
const Hediangtext = styled.div`
  & {
    font-weight: 600;
    text-transform: uppercase;
    font-size: 12px;
    color: #212b36;
    margin: 0 0 14px;
  }
`;
const Selecttext = styled.div`
  & {
    margin-bottom: 10px !important;
    font-weight: 400;
    font-size: 14px;
    color: #212b36;
  }
`;
const Alltage = styled.div`
  & {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 20px 35px 20px;
  }
`;
const Alltagetext = styled.div`
  & {
    font-weight: 600;
    text-transform: uppercase;
    font-size: 12px;
    color: #212b36;
  }
`;
const Stackitem = styled.div`
  & {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;
const Itemtext = styled.div`
  & {
    color: #212b36;
    padding-right: 8px;
  }
`;
const Segmented = styled.div`
  & {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid #c4cdd5;
  }
`;
const Alphabetically = styled.div`
  & {
    padding: 5px 10px;
    border-right: 1px solid #c4cdd5;
    cursor: pointer;
  }
`;
const Popularity = styled.div`
  & {
    padding: 5px 10px;
    cursor: pointer;
  }
`;

const Nexttoken = styled.div`
  & .ant-tag {
    background-color: #dfe3e8;
    color: #454f5b;
    display: inline-block;
    margin-right: 6px;
    margin-bottom: 6px;
    padding: 4px 8px;
    font-size: 14px;
    border-radius: 3px;
  }
`;

const TagContent = styled(Tag)`
  display: flex;
  justify-content: space-between;
`;

export default ViewTags;
