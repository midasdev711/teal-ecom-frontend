import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Link from "next/link";
// icon
import { SearchOutlined, PlusOutlined, CloseOutlined } from "@ant-design/icons";

// ui
import {
  Form,
  Input,
  Row,
  Col,
  Button,
  Checkbox,
  Card,
  Divider,
  InputNumber,
  Tag,
  Radio,
  Upload,
  Popover,
} from "antd";
import { customer } from "../../orders/fakeData";

const { Search } = Input;
const { Dragger } = Upload;

const newForm = () => {
  const [visiable, setVisible] = useState(false);
  const [searchCustomner, setSearchcustomer] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const data = (res) => {
    setSelectedCustomer(res);
  };

  const handleVisibleChange = (visible) => {
    setVisible(!visiable);
  };

  // Customer modal
  const handleCancel = (e) => {
    setopenCustumItem(false);
  };

  const handleColsecontact = (e) => {
    setSelectedCustomer(null);
  };

  useEffect(() => {}, [searchCustomner, selectedCustomer]);

  const content = (data, change) => {
    const [customerdata, setCustomerData] = useState([]);

    const UpdateData = () => {
      setCustomerData(customer.filter((res) => !res.name.search(data)));
    };

    useEffect(() => {
      UpdateData();
    }, [data]);

    return (
      <div>
        <PopoverHeader>
          <PlusOutlined />
          <p>Create a new customer</p>
        </PopoverHeader>
        {customerdata.map((res, index) => {
          return (
            <PopoverContent key={index} onClick={() => change(res)}>
              <StyledAvatar src={res.profile_url} alt="profile image" />
              <div className="customer-infor">
                <p>{res.name}</p>
                <p>{res.email}</p>
              </div>
            </PopoverContent>
          );
        })}
      </div>
    );
  };

  return (
    <Form
      name="basic"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      className="form-new"
      layout="vertical"
    >
      <SubForm>
        <Row gutter={24} className="margin-bottom">
          <Col md={16}>
            <ContentBox>
              <TitleBox className="margin-bottom">Gift card details</TitleBox>
              <Form.Item label="Gift card code" name="title">
                <TextInput value="124324325346" placeholder="" />
              </Form.Item>
              <Form.Item label="Initial value" name="title">
                <TextInput value="10" placeholder="" />
              </Form.Item>
            </ContentBox>
            <ContentBox marginTop="20px">
              <TitleBox className="margin-bottom">Expiration date</TitleBox>
              <TitleStyle>
                Countries have different laws for gift card expiry dates. Check
                the laws for your country before changing this date.
              </TitleStyle>
              <RadioGroupStyle
                // onChange={(e) => setValue(e.target.value)}
                value={1}
              >
                <RadioStyle value={1}>No expiration date</RadioStyle>
                <RadioStyle value={2}>Set expiration date</RadioStyle>
              </RadioGroupStyle>
            </ContentBox>
          </Col>
          <Col md={8}>
            {selectedCustomer === null && (
              <ContentBox>
                <TitleBox>Find and Create customer </TitleBox>
                <TitleStyle className="margin-top">
                  To send the gift card code, add a customer with an email
                  address or phone number.
                </TitleStyle>
                <Popover
                  content={() => content(searchCustomner, data)}
                  placement="bottom"
                  trigger="click"
                  visible={visiable}
                  onVisibleChange={handleVisibleChange}
                >
                  <SearchCustomerInput
                    placeholder="Search customers"
                    size="large"
                    prefix={<SearchOutlined />}
                    onClick={handleVisibleChange}
                    onChange={(e) => setSearchcustomer(e.target.value)}
                  />
                </Popover>
              </ContentBox>
            )}

            {selectedCustomer !== null && (
              <ContentBox>
                <AlignItem>
                  <TitleBox>Customer </TitleBox>
                  <CloseOutlined onClick={handleColsecontact} />
                </AlignItem>
                <AlignItem className="margin-top margin-bottom">
                  <StyledAvatar
                    width="35"
                    height="35"
                    src={selectedCustomer.profile_url}
                    alt="avatar"
                  />
                  <TitleStyle>{selectedCustomer.email}</TitleStyle>
                  <ContentTitle>Edit</ContentTitle>
                </AlignItem>
                <TitleStyle>
                  You can update customer details, but a gift card can only be
                  sent to one customer.
                </TitleStyle>
              </ContentBox>
            )}
            <ContentBox marginTop="20px">
              <TitleBox>Notes</TitleBox>
              <TextInput
                className="margin-top"
                placeholder="Add a note"
              ></TextInput>
              <TitleStyle>
                These notes are private and won’t be shared with the customer.
              </TitleStyle>
            </ContentBox>
          </Col>
        </Row>
        <ActionBottom>
          <Divider className="divider-bottom" />
          <Button size="large" type="primary">
            Save
          </Button>
        </ActionBottom>
      </SubForm>
    </Form>
  );
};

const SubForm = styled.div`
  padding: 15px 0;
  .ant-divider {
    margin: 0;
  }
  .calendar-icon {
    font-size: 20px;
    cursor: pointer;
  }
  .tag-content {
    margin-top: 10px;
  }
  .date-picker {
    margin-right: 10px;
    width: 120px;
  }
`;

const ContentBox = styled.div`
  padding: ${(props) => (props.notPadding ? "0px" : "20px")};
  margin-top: ${(props) => (props.marginTop ? props.marginTop : "0px")};
  background: ${(props) => (props.bgColor ? props.bgColor : "#fff")};
  box-shadow: 0px 4px 4px rgba(186, 195, 201, 0.25);
  border-radius: 3px;
  outline: 0.1rem solid transparent;
  .margin-top {
    margin-top: 20px !important;
  }
  .margin-bottom {
    margin-bottom: 20px !important;
  }
  .condition-wrap {
    display: flex;
    margin-top: 15px;
  }
`;

const PopoverHeader = styled.div`
  display: flex;
  height: 50px;
  justify-content: cneter;
  align-items: center;
  font-size: 18px;
  padding: 20px;
  background: #5c6ac4;
  color: #fff;
  & p {
    margin: 0;
    margin-left: 5px;
  }
`;

const PopoverContent = styled.div`
  display: flex;
  margin: 5px 0;
  padding: 0 15px;
  .avatar {
    width: 45px;
    height: 45px;
    border-radius: 50%;
  }
  .customer-infor {
    padding-left: 10px;
    p {
      font-size: 14px;
      margin-bottom: 3px;
    }
  }
  &:hover {
    background: #5c6ac4;
  }
`;

const StyledAvatar = styled.img`
  width: ${(props) => (props.width ? props.width : "45px")};
  height: ${(props) => (props.height ? props.height : "45px")};
  border-radius: 50%;
`;

const RadioGroupStyle = styled(Radio.Group)`
  margin-top: 20px;
  display: block;
`;

const RadioStyle = styled(Radio)`
  display: block;
  margin-bottom: 10px;
`;

const InputNumberStyle = styled(InputNumber)`
  width: 100%;
  padding: 3px 5px;
  margin-right: 15px;
`;

const AlignItem = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TitleBox = styled.h3`
  font-weight: 600;
  font-size: 16px;
  color: #000;
  margin: 0;
  opacity: 0.9;
`;

const ContentTitle = styled.h4`
  color: rgb(0, 122, 206);
  font-size: 14px;
  cursor: pointer;
  text-align: ${(props) => (props.align ? props.align : "right")};
  font-weight: 400;
  margin-bottom: 5px;
`;

const TagContent = styled(Tag)`
  padding: 5px 10px;
  marginbottom: 10px;
`;

const TextInput = styled(Input)`
  padding: 8px 12px;
`;

const TitleStyle = styled.p`
  margin: 0;
  font-size: 14px;
`;

const TextStyle = styled.span`
  margin: 0;
  font-size: 14px;
  color: #637381;
`;

const DescriptionContent = styled.div`
  padding: 20px;
  border: 1px solid #ddd;
`;

const ItemContentBox = styled.div`
  padding: 20px;
`;

const GroupContent = styled.div`
  margin-top: 15px;
  input {
    padding: 8px 12px;
  }
`;

const SearchBox = styled(Search)`
  border-radius: 4px 0 0 4px;
  padding: 6px 12px 6px 35px !important;
`;

const StoreContent = styled.div`
  line-height: 6;
`;
const SelectContent = styled.div`
  position: relative;
  .delete-date-icon {
    font-size: 22px;
    position: absolute;
    top: 5px;
    right: -8px;
    cursor: pointer;
  }
`;

const StyleDragger = styled(Dragger)`
  height: 250px !important;
`;

const CardStyle = styled(Card)`
  margin-top: 20px;
  .ant-select-selector {
    height: 38px !important;
  }
`;

const TitleCardStyle = styled.h3`
  font-weight: 600;
  font-size: 16px;
  color: #000;
`;

const InputStyle = styled(Input)`
  width: 100%;
  padding: 8px 12px;
`;

const TextAreaStyle = styled(Input.TextArea)`
  width: 100%;
  padding: 8px 12px;
`;

const CheckboxStyle = styled(Checkbox)`
  margin-left: 0 !important;
  width: 100%;
  margin-bottom: 10px;
`;

const LineBorder = styled.div`
  width: 100%;
  height: 1px;
  border-top: 1px solid #ddd;
  margin: 15px 0;
`;

const TitleSmall = styled.h4`
  color: #212b36;
  font-weight: 600;
  font-size: 12px;
`;

const SearchStyle = styled(Search)`
  width: 100%;
`;

const ActionBottom = styled.div`
  margin-top: 20px;
  .divider-bottom {
    margin-bottom: 20px !important;
  }
  button {
    float: right;
  }
`;

const SearchCustomerInput = styled(Input)`
  margin-top: 20px;
  position: relative;
`;

export default newForm;
