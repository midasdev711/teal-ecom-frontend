import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Link from "next/link";
import { TweenOneGroup } from "rc-tween-one";
import { TimeData } from "../../../utils/Consts";
import { ManageSalesMD } from "../Modals";
import { CountryDropdown } from "react-country-region-selector";

// icon
import {
  DownOutlined,
  CalendarOutlined,
  EditOutlined,
  CloseOutlined,
  FileTextOutlined,
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
  Dropdown,
  Menu,
  Upload,
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
  const [country, setCountry] = useState("United States");

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

  const onChangeFileCSV = (info) => {
    console.log(info);
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      console.log(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      console.error(`${info.file.name} file upload failed.`);
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
                <TextInput placeholder="Short sleeve t-shirt" />
              </Form.Item>
              <TitleStyle>Description</TitleStyle>
              <DescriptionContent>
                <RemirorEditor />
              </DescriptionContent>
            </ContentBox>
            <ContentBox marginTop="20px">
              <AlignItem className="margin-bottom">
                <TitleBox>Media</TitleBox>
                <Dropdown
                  trigger={["click"]}
                  overlay={
                    <Menu>
                      <Menu.Item key="0">Add image from URL</Menu.Item>
                      <Menu.Item key="1">Embed Youtube video</Menu.Item>
                    </Menu>
                  }
                >
                  <Button type="link">
                    Add media from URL <DownOutlined />
                  </Button>
                </Dropdown>
              </AlignItem>
              <StyleDragger
                accept=".jpg, .gif, .png"
                name="file"
                multiple={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                onChange={(info) => onChangeFileCSV(info)}
              >
                <p className="ant-upload-drag-icon">
                  <FileTextOutlined />
                </p>
                <Button>Add File</Button>
                <p className="ant-upload-hint">or drop files to upload</p>
              </StyleDragger>
            </ContentBox>
            <CardStyle>
              <TitleCardStyle>Pricing</TitleCardStyle>
              <Row gutter={24}>
                <Col md={12}>
                  <Form.Item label="Price">
                    <InputNumberStyle
                      placeholder="0.00"
                      formatter={(value) =>
                        `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                    />
                  </Form.Item>
                </Col>
                <Col md={12}>
                  <Form.Item label="Compare at price">
                    <InputNumberStyle
                      placeholder="0.00"
                      formatter={(value) =>
                        `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                    />
                  </Form.Item>
                </Col>
                <Col md={12}>
                  <Form.Item label="Cost per item">
                    <InputNumberStyle
                      placeholder="0.00"
                      formatter={(value) =>
                        `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                    />
                    <span>Customers won’t see this</span>
                  </Form.Item>
                </Col>
                <Col md={6}>
                  <StoreContent>
                    <TextStyle>Margin</TextStyle>
                    <span>-</span>
                  </StoreContent>
                </Col>
                <Col md={6}>
                  <StoreContent>
                    <TextStyle>Profit</TextStyle>
                    <span>-</span>
                  </StoreContent>
                </Col>
                <Col md={24}>
                  <Checkbox>Charge tax on this product</Checkbox>
                </Col>
              </Row>
            </CardStyle>

            <CardStyle>
              <TitleCardStyle>Inventory</TitleCardStyle>

              <Row gutter={24}>
                <Col md={12}>
                  <Form.Item label="SKU (Stock Keeping Unit)">
                    <InputStyle />
                  </Form.Item>
                </Col>
                <Col md={12}>
                  <Form.Item label="Barcode (ISBN, UPC, GTIN, etc.)">
                    <InputStyle />
                  </Form.Item>
                </Col>
                <Col md={24}>
                  <Checkbox.Group>
                    <CheckboxStyle>Track quantity</CheckboxStyle>
                    <CheckboxStyle>
                      Continue selling when out of stock
                    </CheckboxStyle>
                  </Checkbox.Group>
                </Col>
              </Row>

              <LineBorder />

              <TitleSmall>QUANTITY</TitleSmall>

              <Row gutter={24}>
                <Col md={12}>
                  <Form.Item label="Available">
                    <InputNumberStyle value="0" />
                  </Form.Item>
                </Col>
                <Col md={12}></Col>
              </Row>
            </CardStyle>

            <CardStyle>
              <TitleCardStyle>Shipping</TitleCardStyle>
              <CheckboxStyle>This is a physical product</CheckboxStyle>

              <LineBorder />

              <TitleSmall>WEIGHT</TitleSmall>
              <TextStyle>
                Used to calculate shipping rates at checkout and label prices
                during fulfillment.
              </TextStyle>
              <Row gutter={0}>
                <Col md={8}>
                  <Form.Item label="Weight">
                    <InputNumberStyle />
                  </Form.Item>
                </Col>
                <Col md={3}>
                  <Form.Item label=" " name="" initialValue="kg">
                    <Select>
                      <Option value="lb">lb</Option>
                      <Option value="oz">oz</Option>
                      <Option value="kg">kg</Option>
                      <Option value="g">g</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <LineBorder />

              <TitleSmall>CUSTOMS INFORMATION</TitleSmall>
              <p>
                Used by border officers to calculate duties when shipping
                internationally. Shown on customs forms you print during
                fulfillment.
              </p>

              <Form.Item label="Country of origin">
                <CountryDropdownStyle
                  defaultOptionLabel="Select a country."
                  value={country}
                  onChange={(val) => setCountry(val)}
                  blacklist={["CD", "SH", "KP", "GS", "HM", "VC"]}
                  className="dropDown"
                />
                <span>In most cases, where the product is manufactured.</span>
              </Form.Item>

              <Form.Item label="HS (Harmonized System) code">
                <SearchStyle
                  placeholder="Search by product keyword or HS code"
                  onSearch={(value) => console.log(value)}
                />
                <span>Used by border officers to classify this product.</span>
              </Form.Item>
            </CardStyle>
            <ContentBox marginTop="20px">
              <TitleBox>Variants</TitleBox>
              <Checkbox className="margin-top">
                This product has multiple options, like different sizes or
                colors
              </Checkbox>
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
                <TitleBox>Organization</TitleBox>
                <GroupContent>
                  <TitleStyle>Product type</TitleStyle>
                  <Input
                    placeholder="e.g. Shirts"
                    addonAfter={<EditOutlined />}
                  />
                </GroupContent>
                <GroupContent>
                  <TitleStyle>Vendor</TitleStyle>
                  <Input
                    placeholder="e.g. Nike"
                    addonAfter={<EditOutlined />}
                  />
                </GroupContent>
              </ItemContentBox>
              <Divider />
              <ItemContentBox>
                <TitleStyle className="title-box">COLLECTIONS</TitleStyle>
                <SearchBox
                  placeholder="Filter products"
                  onSearch={(value) => console.log(value)}
                />
                <TextStyle>
                  Add this product to a collection so it’s easy to find in your
                  store.
                </TextStyle>
              </ItemContentBox>
              <Divider />
              <ItemContentBox>
                <TitleStyle className="title-box">TAGS</TitleStyle>
                <Input
                  ref={saveInputRef}
                  type="text"
                  size="large"
                  placeholder="Vintage, cotton, summer"
                  value={inputValue}
                  onChange={handleInputChange}
                  onBlur={handleInputConfirm}
                  onPressEnter={handleInputConfirm}
                />
                <TweenOneGroup
                  className="tag-content"
                  enter={{
                    scale: 0.8,
                    opacity: 0,
                    type: "from",
                    duration: 100,
                    with: 10,
                    onComplete: (e) => {
                      e.target.style = "";
                    },
                  }}
                  leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
                  appear={false}
                >
                  {tagChild}
                </TweenOneGroup>
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

const CountryDropdownStyle = styled(CountryDropdown)`
  width: 100%;
  padding: 6px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: no-repeat;
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

export default newForm;
