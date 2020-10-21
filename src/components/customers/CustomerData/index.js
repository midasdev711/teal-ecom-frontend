import React, { useState, useEffect  } from "react";
import { useRouter } from 'next/router'
import styled from "styled-components";
import Link from "next/link";
import { getCustomers } from "../../../redux/actions/customers";
import { connect } from "react-redux";
// icon
import { CopyOutlined, InfoCircleOutlined } from "@ant-design/icons";
// ui
import {
  Input,
  Row,
  Col,
  Layout,
  Avatar,
  Tag,
  Tooltip,
  Button,
  Checkbox,
  Timeline,
} from "antd";
import Tags from "../../Tags";

const { Content } = Layout;

const CustomerData = (props) => {
  const router = useRouter()
  const { pid } = router.query

  const [isTimeline, setTimeline] = useState(true);
  let customerData = props.customerData && props.customerData.find(data=> data._id === pid)

  useEffect(() => {
    getCustomersCall();
  }, [props]);
  
  const getCustomersCall = async () => {
    await props.getCustomers();
  };
  return (
    <CustomerDataContent>
      <CustomerName fontSize={`28px`}> {customerData && customerData.BasicDetailsFirstName}{customerData && customerData.BasicDetailsLastName}</CustomerName>
      <Row gutter={24}>
        <Col md={16}>
          <ContentBox padding="0px">
            <ItemContent>
              <Avatar
                className="avatar"
                size="large"
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              />
              <ItemTitle>
                <CustomerName>{customerData && customerData.BasicDetailsFirstName}{customerData && customerData.BasicDetailsLastName}</CustomerName>
                <StyledText>{customerData && customerData.AddressDetailsApartment}, {customerData && customerData.AddressDetailsCity}, {customerData && customerData.AddressDetailsCountry}</StyledText>
                <StyledText>Customer for 1 day</StyledText>
              </ItemTitle>
            </ItemContent>
            <NoteInput>
              <p>Customer Note</p>
              <TextInput placeholder="Add a note" />
            </NoteInput>
            <OrderDetail>
              <Row gutter={24}>
                <Col md={8}>
                  <Link href="/customers/[pid]" as="/customers/123456789">
                    <a>Last Order</a>
                  </Link>
                  <CustomerName>1 day ago</CustomerName>
                  <StyledText>From Online Store</StyledText>
                </Col>
                <Col md={8}>
                  <StyledText>Total spent to date</StyledText>
                  <CustomerName>$66.89</CustomerName>
                  <StyledText>1 order</StyledText>
                </Col>
                <Col md={8}>
                  <StyledText>Average order value</StyledText>
                  <CustomerName>$66.89</CustomerName>
                </Col>
              </Row>
            </OrderDetail>
          </ContentBox>
          <ContentBox>
            <CustomerName>Orders placed</CustomerName>
            <OrderContent>
              <LayoutTitles>
                <Link href="/customers/[pid]" as="/customers/123456789">
                  <a>Order #1001</a>
                </Link>
                <StyledText>Yesterday at 10:43 PM</StyledText>
              </LayoutTitles>
              <StyledText>$66.89 from Online Store</StyledText>
              <Tag color="#ffea8a">
                <span>O</span> Unfulfilled
              </Tag>
              <ItemContent>
                <ProductImage src="/images/shoes.jpg" />
                <ItemTitle>
                  <Link href="/customers/[pid]" as="/customers/123456789">
                    <a>Indestructible Shoes</a>
                  </Link>
                  <StyledText>Black / US 10 | EU 44</StyledText>
                </ItemTitle>
              </ItemContent>
            </OrderContent>
          </ContentBox>
          <TimeLine>
            <LayoutTitles className="title">
              <CustomerName>Timeline</CustomerName>
              <Checkbox
                onChange={(e) => setTimeline(e.target.checked)}
                checked={isTimeline}
              >
                Show comments
              </Checkbox>
            </LayoutTitles>
            <TimeLineContent>
              <Avatar size="large" className="avatar">NL</Avatar>
              <Input
                placeholder="Leave a comment..."
                suffix={
                  <CommentAction>
                    <Button>Post</Button>
                  </CommentAction>
                }
              />
              <Timeline>
                <Timeline.Item className="nodeTop">TODAY</Timeline.Item>
                <Timeline.Item>
                  <span>You created this customer.</span>
                  <span>9:47 PM</span>
                </Timeline.Item>
                <Timeline.Item>
                  <span>
                    You added British Columbia reseller exemption to this
                    customer.
                  </span>
                  <span>9:47 PM</span>
                </Timeline.Item>
              </Timeline>
            </TimeLineContent>
          </TimeLine>
        </Col>
        <Col md={8}>
          <ContentBox>
            <LayoutTitles>
              <CustomerName>Customer overview</CustomerName>
              <StyledLink>Edit</StyledLink>
            </LayoutTitles>
            <LayoutTitles>
              <StyledLink>{customerData && customerData.BasicDetailsEmail}</StyledLink>
              <Tooltip placement="bottom" title="Copy email">
                <CopyOutlined className="copy-icon" />
              </Tooltip>
            </LayoutTitles>
          </ContentBox>

          <ContentBox marginTop>
            <LayoutTitles>
              <TitleName>DEFAULT ADDRESS</TitleName>
              <StyledLink>Manage</StyledLink>
            </LayoutTitles>
            <StyledText>{customerData && customerData.BasicDetailsFirstName}{customerData && customerData.BasicDetailsLastName}</StyledText>
            <StyledText>{customerData && customerData.AddressDetailsApartment}</StyledText>
            <StyledText>{customerData && customerData.AddressDetailsCity}{customerData && customerData.AddressDetailsPostalCode}</StyledText>
            <StyledText>{customerData && customerData.AddressDetailsCountry}</StyledText>
            <StyledLink className="add-address">Add new address</StyledLink>
          </ContentBox>

          <ContentBox marginTop>
            <LayoutTitles>
              <TitleName>TAX SETTINGS</TitleName>
              <StyledLink>Manage</StyledLink>
            </LayoutTitles>
            <StyledText>No exemptions</StyledText>
          </ContentBox>

          <ContentBox>
            <LayoutTitles>
              <CustomerName>Email Marketing</CustomerName>
              <StyledLink>Edit status</StyledLink>
            </LayoutTitles>
            <Tag>Not subscribed</Tag>
          </ContentBox>

          <ContentBox bgColor="#f9fafb">
            <LayoutTitles>
              <CustomerName>Tags</CustomerName>
              <StyledLink>View all tags</StyledLink>
            </LayoutTitles>
            <Tags />
          </ContentBox>

          <ContentBox bgColor="#f9fafb">
            <CustomerName>Customer privacy</CustomerName>
            <TitleName className="request">REQUEST CUSTOMER DATA</TitleName>
            <StyledText>
              Get a copy of this customer's data by email so you can forward it
              to them.
            </StyledText>
            <Link href="/customers/[pid]" as="/customers/123456789">
              <a>Learn more about requesting customer data.</a>
            </Link>
            <StyledButton>Request customer data</StyledButton>
          </ContentBox>

          <ContentBox marginTop bgColor="#f9fafb">
            <TitleName className="request">ERASE PERSONAL DATA</TitleName>
            <StyledText>
              Ask Shopify to remove this customer's personal information from
              your store.
            </StyledText>
            <Link href="/customers/[pid]" as="/customers/123456789">
              <a>Learn about the process of erasure requests.</a>
            </Link>
            <StyledButton>Erase personal data</StyledButton>
          </ContentBox>
        </Col>
      </Row>
    </CustomerDataContent>
  );
};

const CustomerDataContent = styled(Content)`
  padding-bottom: 20px;
  a {
    font-size: 14px;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const ContentBox = styled.div`
  padding: ${(props) => (props.padding ? props.padding : "20px")};
  border-bottom: ${(props) => (props.border ? "1px solid #bbc3c9" : 0)};
  margin-top: ${(props) => (props.marginTop ? 0 : "20px")};
  background: ${(props) => (props.bgColor ? props.bgColor : "#fff")};
  box-shadow: 0px 4px 4px rgba(186, 195, 201, 0.25);
  border: 1px solid #ddd;
  border-radius: 3px;
  outline: 0.1rem solid transparent;
  .add-address {
    margin-top: 15px;
  }
  .request {
    margin-top: 20px;
    margin-bottom: 10px;
  }
`;

const CustomerName = styled.h3`
  font-size: ${(props) => (props.fontSize ? props.fontSize : "16px")};
  color: #212b36;
  font-weight: 600;
  margin-bottom: 0;
`;

const ItemContent = styled.div`
  display: flex;
  padding: 20px 0;
  .avatar {
    margin-left: 20px;
  }
`;

const ItemTitle = styled.div`
  padding: 0 20px;
`;

const StyledText = styled.p`
  color: #637381;
  font-weight: 400;
  margin-bottom: 0px;
  font-size: 14px;
`;

const TextInput = styled(Input)`
  padding: 8px 12px;
`;

const NoteInput = styled.div`
  padding: 0 20px 20px 20px;
  p {
    margin-bottom: 0;
    font-size: 14px;
  }
`;

const OrderDetail = styled.div`
  border-top: 1px solid #bbc3c9;
  padding: 20px;
  text-align: center;
`;

const OrderContent = styled(Layout.Content)`
  padding: 20px 0;
  .ant-tag-has-color {
    color: #595130;
    font-size: 14px;
    span {
      font-weight: 800;
    }
  }
`;

const LayoutTitles = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  .copy-icon {
    font-size: 18px;
    cursor: pointer;
    color: #212b36;
  }
`;

const ProductImage = styled.img`
  width: 60px;
  height: 60px;
  border: 1px solid #bbc3c9;
`;

const TitleName = styled.p`
  font-size: 12px;
  color: #212b36;
  margin-bottom: 0;
`;

const StyledLink = styled.p`
  color: #006fbb;
  margin-bottom: 0;
  font-size: 14px;
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const StyledButton = styled(Button)`
  display: block;
  margin-top: 10px;
  font-size: 14px;
`;

const TimeLine = styled.div`
  margin-top: 20px;
  .title {
    padding: 20px;
  }
`;

const TimeLineContent = styled.div`
  border-top: 1px solid #bbc3c9;
  padding: 20px;
  .ant-timeline {
    padding: 0 14px;
    .nodeTop {
      padding-top: 70px;
      margin-top: -10px;
      .ant-timeline-item-head-blue {
        display: none;
      }
    }
    .ant-timeline-item-content {
      display: flex;
      justify-content: space-between;
    }
  }
  .ant-input-affix-wrapper {
    width: 90%;
    margin-left: 45px;
  }
  .avatar {
    margin-top: 3px;
    color: #fff;
    z-index: 10;
    background: #47c1bf;
    position: absolute;
  }
`;

const CommentAction = styled.div``;
const mapStateToProps = (store) => {
  return {
    customerData: store.customerReducer.customerData,
  };
};
const mapDispatchToProps = {
  getCustomers,
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerData);
