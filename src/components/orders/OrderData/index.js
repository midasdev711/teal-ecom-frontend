import React, { useState } from "react";
import styled from "styled-components";
import Link from "next/link";
// icon
import {
  CopyOutlined,
  PrinterOutlined,
  FundOutlined,
  EditOutlined,
  DownOutlined,
  CloseOutlined,
  AccountBookOutlined,
  FolderViewOutlined,
} from "@ant-design/icons";

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
  Dropdown,
  Menu,
  Timeline,
} from "antd";
import Tags from "../../Tags";

const { Content } = Layout;

const CustomerData = () => {
  const [isTimeline, setTimeline] = useState(true);

  return (
    <CustomerDataContent>
      <CustomerName display="flex" alignItems="center" fontSize={`28px`}>
        #1019
        <StyledText ml="10px">
          September 18, 2020 at 8:37 pm from Online Store
        </StyledText>
        <StyledTag ml="10px" color="#dfe3e8">
          <span>O</span> Paid
        </StyledTag>
        <StyledTag color="#ffea8a">
          <span>O</span> Unfulfilled
        </StyledTag>
      </CustomerName>
      <ItemContent padding="0">
        <StyledText>
          <PrinterOutlined /> Print
        </StyledText>
        <StyledText ml="30px">
          <FundOutlined /> Print
        </StyledText>
        <StyledText ml="30px">
          <EditOutlined /> Edit
        </StyledText>
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item>
                {" "}
                <CopyOutlined /> Duplicate
              </Menu.Item>
              <Menu.Item>
                <CloseOutlined /> Cancel
              </Menu.Item>
              <Menu.Item>
                {" "}
                <AccountBookOutlined /> Archive
              </Menu.Item>
              <Menu.Item>
                {" "}
                <FolderViewOutlined /> View order status page
              </Menu.Item>
            </Menu>
          }
          trigger={["click"]}
        >
          <span>
            More actions <DownOutlined />
          </span>
        </Dropdown>
      </ItemContent>
      <Row gutter={24}>
        <Col md={16}>
          <ContentBox padding="20px 0">
            <CustomerName ml="10px">
              <img alt="unfulied" src="/images/unfulied.png" />
              Unfulfilled (1)
            </CustomerName>
            <ItemContent padding="20px 15px">
              <ProductImage src="/images/shoes.jpg" />
              <Row className="product-row" gutter={24}>
                <Col md={14}>
                  <ItemTitle>
                    <Link href="/customers/[pid]" as="/customers/123456789">
                      <a>Indestructible Shoes</a>
                    </Link>
                    <StyledText>Black / US 10 | EU 44</StyledText>
                  </ItemTitle>
                </Col>
                <Col md={5}>
                  <StyledText>$59.99 × 1</StyledText>
                </Col>
                <Col md={5}>
                  <StyledText>$59.99</StyledText>
                </Col>
              </Row>
            </ItemContent>
            <OrderDetail>
              <ItemContent justifyContent="flex-end">
                <Button className="mark">Mark as fulfilled</Button>
                <Button type="primary">Create shipping lable</Button>
              </ItemContent>
            </OrderDetail>
          </ContentBox>
          <ContentBox>
            <CustomerName ml="-5px">
              <img alt="unfulied" src="/images/paid.png" />
              Paid
            </CustomerName>
            <Row className="total-price">
              <Col md={6}>
                <span>Subtotal</span>
              </Col>
              <Col md={12}>
                <TextDark>1 item</TextDark>{" "}
              </Col>
              <Col md={6}>
                <TextRight>
                  <p>$59.99</p>
                </TextRight>
              </Col>

              <Col md={6}>
                <span>Shipping</span>
              </Col>
              <Col md={12}>
                <TextDark>Expedited (0.0 lb)</TextDark>{" "}
              </Col>
              <Col md={6}>
                <TextRight>
                  <p>$6.90</p>
                </TextRight>
              </Col>

              <Col md={6}>
                <span>Tax</span>
              </Col>
              <Col md={12}></Col>
              <Col md={6}>
                <TextRight>
                  <p>$0.00</p>
                </TextRight>
              </Col>

              <Col md={6}>
                <span>Total</span>
              </Col>
              <Col md={12}></Col>
              <Col md={6}>
                <TextRight>
                  <p>$66.89</p>
                </TextRight>
              </Col>
            </Row>

            <FooterCard>
              <Row gutter={12}>
                <Col md={18}>
                  <span>To be paid by customer </span>
                </Col>
                <Col md={6}>
                  <TextRight>
                    <TextRight>$66.89</TextRight>
                  </TextRight>
                </Col>
              </Row>
            </FooterCard>
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
              <Avatar size="large" className="avatar">
                NL
              </Avatar>
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
              <CustomerName>Notes</CustomerName>
              <StyledLink>Edit</StyledLink>
            </LayoutTitles>
            <LayoutTitles>
              <StyledText>No notes from customer</StyledText>
            </LayoutTitles>
          </ContentBox>

          <ContentBox>
            <LayoutTitles>
              <TitleName>DEFAULT ADDRESS</TitleName>
              <StyledLink>Manage</StyledLink>
            </LayoutTitles>
            <StyledText>Ninh Le</StyledText>
            <StyledText>8524 Tocoi path</StyledText>
            <StyledText>Lakeland Florida 33810</StyledText>
            <StyledText>United States</StyledText>
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
              <CustomerName>Conversion summary</CustomerName>
            </LayoutTitles>
            <StyledText>
              <FundOutlined /> This is their 1st order
            </StyledText>
            <StyledText>
              <AccountBookOutlined /> 1st session from Facebook
            </StyledText>
            <StyledText>
              <FundOutlined /> 1 session over 1 day
            </StyledText>
            <StyledLink mt="15px">View conversion details</StyledLink>
          </ContentBox>

          <ContentBox bgColor="#f9fafb">
            <CustomerName>Fraud analysis</CustomerName>
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

          <ContentBox bgColor="#f9fafb">
            <LayoutTitles>
              <CustomerName>Tags</CustomerName>
              <StyledLink>View all tags</StyledLink>
            </LayoutTitles>
            <Tags />
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
  .product-row {
    width: 100%;
  }
  .total-price {
    font-size: 14px;
    margin-top: 20px;
  }
`;

const TextDark = styled.p`
  color: #777;
`;

const FooterCard = styled.div`
  padding-top: 15px;
  border-top: 1px solid #ddd;
`;

const TextRight = styled.div`
  text-align: right;
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
  display: ${(props) => props.display || null};
  align-items: ${(props) => props.alignItems || null};
  margin-left: ${(props) => props.ml || null};
  color: #212b36;
  font-weight: 600;
  margin-bottom: 0;
`;

const ItemContent = styled.div`
  display: ${(props) => props.display || "flex"};
  align-items: ${(props) => props.alignItems || null};
  justify-content: ${(props) => props.justifyContent || null};
  padding: ${(props) => props.padding || "20px 0"};
  .avatar {
    margin-left: 20px;
  }
  .ant-dropdown-trigger {
    font-size: 14px;
    margin-left: 30px;
  }
  .mark {
    margin-right: 15px;
  }
`;

const ItemTitle = styled.div`
  padding: 0 20px;
`;

const StyledText = styled.p`
  color: #637381;
  margin-left: ${(props) => props.ml || null};
  font-weight: 400;
  margin-bottom: 0px;
  font-size: 14px;
  svg {
    font-size: 20px;
    margin-bottom: -4px;
  }
`;

const OrderDetail = styled.div`
  border-top: 1px solid #bbc3c9;
  padding: 0 20px;
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

const StyledTag = styled(Tag)`
  color: #212b36;
  border-radius: 10px;
  font-weight: 400;
  margin-left: ${(props) => props.ml || null};
  span {
    font-weight: 900;
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
  margin-top: ${(props) => props.mt || null};
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

export default CustomerData;
