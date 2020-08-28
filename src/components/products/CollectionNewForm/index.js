import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Link from "next/link";
import { TimeData } from "../fakeData";
import { ManageSalesMD } from "../Modals";

// icon
import {
  PlusOutlined,
  CalendarOutlined,
  CloseOutlined,
  DeleteOutlined,
  LoadingOutlined,
} from "@ant-design/icons";

// ui
import { RemirorEditor } from "../../atoms";
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
  Tooltip,
  Tag,
  Select,
  DatePicker,
  Upload,
  Radio,
} from "antd";

const { Search } = Input;
const { Option } = Select;
const { Dragger } = Upload;

const newForm = () => {
  const [visiable, setVisible] = useState(false);
  const [tags, setTags] = useState(["test"]);
  const [inputValue, setInputValue] = useState("");
  const [inputVisible, setInputVisible] = useState(false);
  const [isDatePicker, setIsDatePicker] = useState(false);
  const [openManageMD, setOpenManageMD] = useState(false);
  const [openEditSite, setOpenEditSite] = useState(false);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onChangeDate = (date, dateString) => {
    console.log(date, dateString);
  };

  const deleteDate = () => {
    setIsDatePicker(!isDatePicker);
  };

  // upload image
  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoadingUpload({ loadingUpload: true });
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl) => {
        setLoadingUpload({ loadingUpload: true });
        setImageUrl(imageUrl);
      });
    }
  };

  // Tags group actions
  const handleClose = (removedTag) => {
    const removeTags = tags.filter((tag) => tag !== removedTag);
    setTags(removeTags);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    let tag = tags;
    if (inputValue && tag.indexOf(inputValue) === -1) {
      tag = [...tag, inputValue];
    }
    setTags(tag);
    setInputVisible(false);
    setInputValue("");
  };

  const saveInputRef = (input) => {
    input = input;
  };

  const forMap = (tag) => {
    const tagElem = (
      <TagContent
        closable
        onClose={(e) => {
          e.preventDefault();
          handleClose(tag);
        }}
      >
        {tag}
      </TagContent>
    );
    return (
      <span key={tag} style={{ display: "inline-block" }}>
        {tagElem}
      </span>
    );
  };

  const tagChild = tags.map(forMap);
  const uploadButton = (
    <div>
      {loadingUpload ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="ant-upload-text">Upload</div>
    </div>
  );
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
              <Form.Item label="Title" name="title">
                <TextInput placeholder="e.g. Summer collection, Under $100, Staff picks" />
              </Form.Item>
              <TitleStyle>Description (optional)</TitleStyle>
              <DescriptionContent>
                <RemirorEditor />
              </DescriptionContent>
            </ContentBox>
            <ContentBox marginTop="20px">
              <TitleBox>Collection type</TitleBox>
              <Radio.Group>
                <RadioStyle value={1}>
                  Manual
                  <StyledRadioTitle>
                    Add products to this collection one by one. Learn more about
                    <Link href="#">
                      <a> manual collections</a>
                    </Link>
                  </StyledRadioTitle>
                </RadioStyle>
                <RadioStyle value={2}>
                  All customers
                  <StyledRadioTitle>
                    Existing and future products that match the conditions you
                    set will automatically be added to this collection. Learn
                    more about
                    <Link href="#">
                      <a> automated collections</a>
                    </Link>
                  </StyledRadioTitle>
                </RadioStyle>
              </Radio.Group>
            </ContentBox>
            <Divider />
            <ContentBox>
              <TitleBox className="title-box">CONDITIONS</TitleBox>
              <TextStyle>Products must match: </TextStyle>
              <Radio.Group>
                <Radio value={1}>all conditions</Radio>
                <Radio value={2}>any condition</Radio>
              </Radio.Group>
              <ConditionContent>
                <div className="condition-wrap">
                  <Select
                    placeholder=""
                    // onChange={(e) => onChange(e)}
                    value="TITLE"
                  >
                    <Option value="TITLE">Product title</Option>
                    <Option value="TYPE">Product type</Option>
                    <Option value="VENDOR">Product vendor</Option>
                    <Option value="VARIANT_PRICE">Product price</Option>
                    <Option value="TAG">Product tag</Option>
                    <Option value="VARIANT_COMPARE_AT_PRICE">
                      Compare at price
                    </Option>
                    <Option value="VARIANT_WEIGHT">Weight</Option>
                    <Option value="VARIANT_INVENTORY">Inventory stock</Option>
                    <Option value="VARIANT_TITLE">Variant’s title</Option>
                    <Option value="IS_PRICE_REDUCED">Compare at price</Option>
                  </Select>
                  <Select
                    placeholder=""
                    // onChange={(e) => onChange(e)}
                    value="EQUALS"
                  >
                    <Option value="EQUALS">is equal to</Option>
                    <Option value="GREATER_THAN">is greater than</Option>
                    <Option value="NOT_EQUALS">is not equal to</Option>
                    <Option value="LESS_THAN">is less than</Option>
                  </Select>
                  <InputNumberStyle />
                </div>
                <Button icon={<DeleteOutlined />} size="large" />
              </ConditionContent>
              <AddConditionBtn size="large">
                Add another condition
              </AddConditionBtn>
            </ContentBox>

            <ContentBox marginTop="20px">
              <AlignItem className="margin-bottom">
                <TitleBox>Search engine listing preview</TitleBox>
                {!openEditSite && (
                  <ContentTitle onClick={() => setOpenEditSite(!openEditSite)}>
                    Edit website SEO
                  </ContentTitle>
                )}
              </AlignItem>
              <TextStyle>
                Add a title and description to see how this product might appear
                in a search engine listing
              </TextStyle>
            </ContentBox>
            {openEditSite && (
              <>
                <Divider />
                <ContentBox>
                  <TitleStyle>Page title</TitleStyle>
                  <InputStyle />
                  <TextStyle>0 of 70 characters used</TextStyle>
                  <TitleStyle className="margin-top">Description</TitleStyle>
                  <TextAreaStyle rows={5} />
                  <TextStyle>0 of 320 characters used</TextStyle>
                  <TitleStyle className="margin-top">URL and handle</TitleStyle>
                  <InputStyle prefix="https://sale.mysolidshoes.com/products/" />
                </ContentBox>
              </>
            )}
          </Col>
          <Col md={8}>
            <ContentBox notPadding>
              <ItemContentBox>
                <AlignItem>
                  <TitleBox>Product availability</TitleBox>
                  <ContentTitle onClick={() => setOpenManageMD(!openManageMD)}>
                    Manage
                  </ContentTitle>
                  <ManageSalesMD
                    open={openManageMD}
                    close={() => setOpenManageMD(!openManageMD)}
                  />
                </AlignItem>
                <TextStyle>Available on 1 of 1 channels and apps</TextStyle>
              </ItemContentBox>
              <Divider />
              <ItemContentBox>
                <AlignItem>
                  <TitleStyle>Online Store</TitleStyle>
                  <Tooltip placement="bottom" title="Set publication date">
                    <CalendarOutlined
                      onClick={() => setIsDatePicker(!isDatePicker)}
                      className="calendar-icon"
                    />
                  </Tooltip>
                </AlignItem>
                {isDatePicker && (
                  <>
                    <TextStyle>Publish product on</TextStyle>
                    <SelectContent>
                      <DatePicker
                        className="date-picker"
                        onChange={onChangeDate}
                      />
                      <Select
                        placeholder="Select time"
                        // onChange={(e) => onChangeTime(e)}
                      >
                        {TimeData &&
                          TimeData.length > 0 &&
                          TimeData.map((item, i) => (
                            <Option key={i} value={item.value}>
                              {item.name}
                            </Option>
                          ))}
                      </Select>
                      <Tooltip
                        placement="bottom"
                        title="Remove the future publishing date. The product will be published immediately."
                      >
                        <CloseOutlined
                          onClick={() => deleteDate()}
                          className="delete-date-icon"
                        />
                      </Tooltip>
                    </SelectContent>
                  </>
                )}
              </ItemContentBox>
            </ContentBox>
            <ContentBox marginTop="20px" notPadding bgColor="#f9fafb">
              <ItemContentBox>
                <TitleBox>Collection image</TitleBox>
                <Upload
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  beforeUpload={beforeUpload}
                  onChange={handleChange}
                >
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt="avatar"
                      style={{ width: "100%" }}
                    />
                  ) : (
                    uploadButton
                  )}
                </Upload>
              </ItemContentBox>
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
  .title-box {
    font-size: 12px;
    font-weight: 600;
    margin-bottom: 10px;
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
  .ant-upload.ant-upload-select-picture-card {
    width: 100%;
    height: 180px;
  }
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

const StyledRadioTitle = styled.div`
  display: block;
  padding-left: 25px;
  color: #637381;
`;

const InputNumberStyle = styled(InputNumber)`
  width: 100%;
  padding: 3px 5px;
`;

const InputStyle = styled(Input)`
  width: 100%;
  padding: 8px 12px;
`;

const TextAreaStyle = styled(Input.TextArea)`
  width: 100%;
  padding: 8px 12px;
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

const RadioStyle = styled(Radio)`
  display: block;
  margin-bottom: 10px;
  white-space: break-spaces !important;
`;

const ConditionContent = styled.div`
  display: flex;
  margin-top: 15px;
  & .condition-wrap {
    margin-right: 10px;
    display: grid;
    flex-grow: 1;
    grid-gap: 0.8rem;
    grid-template-columns: repeat(auto-fit, minmax(1px, 1fr));
  }
  .ant-select-selector {
    height: 40px !important;
    .ant-select-selection-item {
      line-height: 3;
    }
  }
`;

const AddConditionBtn = styled(Button)`
  margin-top: 15px;
`;

export default newForm;
