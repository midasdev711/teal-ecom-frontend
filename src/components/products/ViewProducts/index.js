import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Router from "next/router";
import Link from "next/link";
import { getProducts } from "../../../redux/actions/products";
// components
import Filters from "../Filters";
import { MDDeleteTags, MDAddTags, MDDeleteSelected } from "../../atoms";
// icons
import { CloseOutlined, DownOutlined } from "@ant-design/icons";
// ui
import {
  Table,
  Tabs,
  Tag,
  Select,
  Drawer,
  Button,
  Collapse,
  Radio,
  Checkbox,
  InputNumber,
  Dropdown,
  Menu,
  Input,
  message,
  Form,
  Typography
} from "antd";
import { getUserData } from "../../../utils";
import { getUserProductLists, getProductCategoryLists } from "../../../redux/actions/product";
import { connect, useSelector } from "react-redux";
import { TweenOneGroup } from "rc-tween-one";
const { TabPane } = Tabs;
const { Panel } = Collapse;
const { Search } = Input;
const { Option } = Select;
const { Text } = Typography;

const customerData = [
  {
    key: "1",
    product: {
      name: "Indestructible Shoes",
      img: `https://cdn.shopify.com/s/files/1/0451/1472/0419/products/0_Ryder-Shoes-Men-And-Women-Dropship-Indestructible-Steel-Toe-Air-Safety-Boots-Puncture-Proof-Work-Sneakers_grande_f861cbf4-1bf9-4357-a453-ffc48bdbd2ba_350x350.jpg?v=1596714398`,
    },
    inventory: "4,424 in stock for 39 variants",
    type: "",
    vendor: "mysolidshoes",
  },
  {
    key: "2",
    product: {
      name: "Nike Shoes",
      img: `https://cdn.shopify.com/s/files/1/0451/1472/0419/products/0_Ryder-Shoes-Men-And-Women-Dropship-Indestructible-Steel-Toe-Air-Safety-Boots-Puncture-Proof-Work-Sneakers_grande_f861cbf4-1bf9-4357-a453-ffc48bdbd2ba_350x350.jpg?v=1596714398`,
    },
    inventory: "50 in stock for 39 variants",
    type: "",
    vendor: "mysolidshoes",
  },
];
const filterInfo = {
  category: "",
  tags: [],
}

const ViewCustomers = (props) => {
  // const { productList } = props
  const productLists = useSelector(state => state.productReducer.merchantProductLists)
  //console.log(`productList`, productLists)
  const [tabIndex, setTabIndex] = useState(1);
  const [isOpenMoreFilter, setOpenMoreFilters] = useState(false);
  const [valuesCollapse, setShowCollapse] = useState([]);
  const [valueSubscription, setValueSubscription] = useState(0);
  const [tags, setTags] = useState([]);
  const [tagsFilter, setTagsFilter] = useState([]);
  const [nodeCheckbox, setNodeCheckbox] = useState(
    customerData.length > 10
      ? `Showing 10 of ${customerData.length} customers`
      : `Showing ${customerData.length} of ${customerData.length} customers`
  );
  const [checkedList, setCheckedList] = useState([]);
  const [isOpenAddTags, setMDAddTags] = useState(false);
  const [isOpenDeleteTags, setMDDeleteTags] = useState(false);
  const [isOpenDeleteSelected, setShowMDDeleteSelected] = useState(false);
  const [productList, setProductList] = useState([]);
  const [apiCallFlag, setApiCallFlag] = useState("start");
  const [originalProductList, setOriginalProductList] = useState([]);
  const [filterData, setFilterData] = useState({ ...filterInfo });
  const [inputValue, setInputValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Select");
  //const [refreshFlag, setRefreshFlag] = useState([0]);

  let userData = getUserData()
  const categoryLists = useSelector(state => state.productReducer.categoriesLists)

  useEffect(() => {
    let userId = userData?.ID
    props.getUserProductLists(userId)
  }, [apiCallFlag])
  useEffect(() => {
    props.getProductCategoryLists()
  }, [])
  useEffect(() => {
    if (productLists?.length > 0) {
      setProductList(productLists)
      setOriginalProductList(productLists)
    }
  }, [productLists])

  const goToNewPage = () => {
    Router.router.push(`/[portal_id]/ecom/products/new`, { pathname: `/${userData?.uniqueID}/ecom/products/new` }, { shallow: true });
  }

  const columns = [
    {
      title: "Product",
      dataIndex: "title",
      key: "ID",
      render: (title, productListsData) => {

        return (
          <div key={productListsData.ID}>
            <ProductImage src={productListsData.thumbnailImage}></ProductImage>
            <Link href={`/[portal_id]/ecom/products/[productId]`} as={`/${userData?.uniqueID}/ecom/products/${productListsData.ID}`} shallow={true}>
              <ProductTitle> {title || ""}</ProductTitle>
            </Link>
          </div>
        );
      },
    },
    {
      title: "Quantity",
      dataIndex: "totalQuantity",
      key: "ID",
      render: (quantity, index) => <div key={index}>{quantity || "0"}</div>,
      align: "left",
    },
    {
      title: "Views",
      dataIndex: "views",
      key: "ID",
      render: (views, index) => <div key={index}>{views || "0"}</div>,
      align: "left",
    },
    {
      title: "Revenue",
      dataIndex: "revenue",
      key: "ID",
      render: (revenue, index) => <div key={index}>{revenue || "0"}</div>,
      align: "left",
    },
    {
      title: "",
      dataIndex: "",
      key: "ID",
      render: (index) => <div key={index}>...</div>,
      align: "center",
    },
  ];

  const handleMenuClickCheckbox = (e) => { };

  const editCustomers = () => {
    Router.router.push("/customers/edit");
  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setCheckedList(selectedRows);

      if (selectedRows.length > 0) {
        let node = (
          <div>
            <LabelSelected>{selectedRows.length} selected</LabelSelected>
            <ButtonEditCustomer onClick={() => editCustomers()}>
              Edit customers
            </ButtonEditCustomer>
            <Dropdown
              overlay={
                <Menu onClick={handleMenuClickCheckbox}>
                  <Menu.Item
                    key="1"
                    onClick={() => setShowMDDeleteSelected(true)}
                  >
                    Delete selected customers
                  </Menu.Item>
                  <Menu.Item key="2" onClick={() => onShowMdAddTags(true)}>
                    Add tags
                  </Menu.Item>
                  <Menu.Item key="3" onClick={() => setMDDeleteTags(true)}>
                    Remove tags
                  </Menu.Item>
                </Menu>
              }
              trigger={["click"]}
            >
              <ButtonMoreActions>
                More actions <DownOutlined />
              </ButtonMoreActions>
            </Dropdown>
          </div>
        );
        setNodeCheckbox(node);
      } else {
        setNodeCheckbox(
          customerData.length > 10
            ? `Showing 10 of ${customerData.length} customers`
            : `Showing ${customerData.length} of ${customerData.length} customers`
        );
      }
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      name: record.name,
    }),
  };

  const onChangeSubscription = (e) => {
    setValueSubscription(e.target.value);
  };

  const onShowMdAddTags = (value) => {
    setMDAddTags(value);
  };

  const onSaveAddTags = (value) => { };

  const onFinishAddTags = (value) => { };

  // delete tags
  const onShowMdDeleteTags = (value) => {
    setMDDeleteTags(value);
  };

  const onSaveDeleteTags = (value) => { };

  const onFinishDeleteTags = (value) => { };

  // delete customers selected
  const onShowMdDeleteSelected = (value) => {
    //  console.log("value: ", value);
    setShowMDDeleteSelected(value);
  };

  const onDeleteSelected = () => {
    message.success("Deleted!");
    setShowMDDeleteSelected(false);
  };

  const handleFilterData = (value) => {
    //  console.log('value filters Data', value)
    setProductList(value)
  }
  const handleProductType = (value) => {

    let catName = categoryLists.length > 0 && categoryLists.find(({ ID }) => ID === value)
    //  console.log('catName', catName?.name)
    setSelectedCategory(catName?.name ? catName?.name : "Select")
    let cloneFilterData = { ...filterData }
    cloneFilterData.category = (value * 1)
    setFilterData(cloneFilterData)
  }
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
  const handleInputChange = (e) => {
    setInputValue(e.target.value);

  };

  const handleInputConfirm = () => {
    let tag = tags;
    if (inputValue && tag.indexOf(inputValue) === -1) {
      tag = [...tag, inputValue];
    }
    setTags(tag);
    //setInputVisible(false);
    setInputValue("");

  };
  const handleClose = (removedTag) => {
    const removeTags = tags.filter((tag) => tag !== removedTag);
    setTags(removeTags);
  };
  const handleClearTags = () => {
    setTags([])
    setFilterData(filterInfo)
  }
  useEffect(() => {
    let cloneFilterData = { ...filterData }
    cloneFilterData.tags = tags
    setFilterData(cloneFilterData)
  }, [tags])
  const tagChild = tags.map(forMap);
  // useEffect(() => {
  //   if (productLists !== undefined) {
  //     setOriginalProductLists(productLists)
  //        }
  // }, [props])
  const handleFilterResult = () => {
    let catList, tagLists = []
    let flag = {
      catFlag: false,
      tagFlag: false
    }
    // let  , tagFlag = false
    let array = []
    let cloneFilterData = { ...filterData }
    if (cloneFilterData.tags) {
      cloneFilterData.tags.forEach((tag) => {
        array = array.concat(originalProductList.filter((data) => data.tags.includes(tag)))
      })
    }
    if (cloneFilterData.category !== "") {
      originalProductList.length > 0 && originalProductList.forEach((data) => {
        catList = data?.category == cloneFilterData.category
        if (catList) {
          array.push(data)
        }
      })
      if (array.length) {
        flag.catFlag = false
      } else {
        flag.catFlag = true
      }
    }
    if (cloneFilterData.tags.length > 0 && cloneFilterData.category !== "") {
      array = []
      cloneFilterData.tags.forEach((tag) => {
        array = array.concat(originalProductList.filter((data) => data.tags.includes(tag)))
      })
      if (array.length) {
        originalProductList.length > 0 && originalProductList.forEach((data) => {
          catList = data?.category == cloneFilterData.category
          if (catList) {
            tagLists.push(data)
          }
        })
        if (tagLists.length) {
          array = array.concat(tagLists)
        } else {
          array = []
        }
      }
    }
    if (array.length) {
      const output = [...new Map(array.map(o => [o.ID, o])).values()]
      array = output
    }
    if (flag.catFlag === false && flag.tagFlag === false && cloneFilterData.category !== "" || cloneFilterData.tags.length > 0) {
      setProductList(array)
    } else if (cloneFilterData.category !== "") {
      setProductList([])
    }
  }
  const handleClearAllFilter = () => {

    setFilterData({ ...filterInfo })
    setProductList(originalProductList)
    setSelectedCategory("Select")
    handleClearTags()
    setShowCollapse([])
    // setRefreshFlag([refreshFlag + 1])
  }

  const [step, setStep] = useState("1");

  const onTabClick = (e) => {
    setStep('' + e);
  }

  return (
    <ViewContent>
      <InputTabs tabPosition={'top'} activeKey={step} onTabClick={(e) => onTabClick(e)}>
        <TabPane tab="All" key="1">
          <ContentBox>
            <DataTable
              rowSelection={{
                type: "checkbox",
                ...rowSelection,
              }}
              rowKey="ID"
              columns={columns}
              dataSource={productList}
              pagination={productList.length > 10}
            />
          </ContentBox>
        </TabPane>
        <TabPane tab="Drafts" key="2">
          <ContentBox>
            <DataTable
              rowSelection={{
                type: "checkbox",
                ...rowSelection,
              }}
              rowKey="ID"
              columns={columns}
              dataSource={productList.filter(item => item.editStatus == "draft")}
              pagination={productList.length > 10}
            />
          </ContentBox>
        </TabPane>
        <TabPane tab="Live" key="3">
          <ContentBox>
            <DataTable
              rowSelection={{
                type: "checkbox",
                ...rowSelection,
              }}
              rowKey="ID"
              columns={columns}
              dataSource={productList.filter(item => item.editStatus == "published")}
              pagination={productList.length > 10}
            />
          </ContentBox>
        </TabPane>
        <TabPane tab="Archived" key="4">
          <ContentBox>
            <DataTable
              rowSelection={{
                type: "checkbox",
                ...rowSelection,
              }}
              rowKey="ID"
              columns={columns}
              dataSource={productList.filter(item => item.editStatus == "archived")}
              pagination={productList.length > 10}
            />
          </ContentBox>
        </TabPane>
      </InputTabs>

      <Filters onOpen={setOpenMoreFilters} productLists={productLists} goToNewPage={() => goToNewPage()} getFilterData={(value) => handleFilterData(value)} />

      {tagsFilter && tagsFilter.length > 0 && (
        <TagsList>
          {tagsFilter.map((item, i) => (
            <Tag key={i} closable>
              {item}
            </Tag>
          ))}
        </TagsList>
      )}

      <MDAddTags
        name="customers"
        count={checkedList.length}
        onCancel={onShowMdAddTags}
        onSave={onSaveAddTags}
        isOpen={isOpenAddTags}
        onFinish={onFinishAddTags}
      />

      <MDDeleteTags
        name="customers"
        count={checkedList.length}
        onCancel={onShowMdDeleteTags}
        onSave={onSaveDeleteTags}
        isOpen={isOpenDeleteTags}
        onFinish={onFinishDeleteTags}
      />

      <MDDeleteSelected
        name="customer"
        count={checkedList.length}
        onCancel={onShowMdDeleteSelected}
        onDelete={onDeleteSelected}
        isOpen={isOpenDeleteSelected}
      />

      <DrawerStyle
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
            <ButtonFooterLeft type="default" onClick={() => handleClearAllFilter()}>
              Clear all filters
            </ButtonFooterLeft>
            <ButtonFooterRight type="primary" onClick={() => handleFilterResult()}>Done</ButtonFooterRight>
          </>
        }
      >
        <CollapseStyle
          defaultActiveKey={valuesCollapse}
          onChange={(values) => setShowCollapse(values)}
          expandIconPosition="right"
        >
          {/* <PanelStyle
            header={
              <div>
                <PanelTitle>Product vendor</PanelTitle>
              </div>
            }
            key="1"
          >
            <RadioGroupStyle
              onChange={onChangeSubscription}
              value={valueSubscription}
            >
              <RadioStyle value={1}>mysolidshoes</RadioStyle>
            </RadioGroupStyle>
            <ButtonLink type="text">Clear</ButtonLink>
          </PanelStyle> */}

          {/* <PanelStyle
            header={
              <div>
                <PanelTitle>Availability</PanelTitle>
              </div>
            }
            key="2"
          >
            <RadioGroupStyle
              onChange={onChangeSubscription}
              value={valueSubscription}
            >
              <RadioStyle value={1}>Available on Online Store</RadioStyle>
              <RadioStyle value={2}>Unavailable on Online Store</RadioStyle>
            </RadioGroupStyle>
            <ButtonLink type="text">Clear</ButtonLink>
          </PanelStyle> */}
          <PanelStyle
            header={
              <div>
                <PanelTitle>Tagged with</PanelTitle>
              </div>
            }
            key="3"
          >
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
            <TagsConformButtons>
              <ButtonLink type="text" onClick={() => handleClearTags()}>Clear</ButtonLink>
            </TagsConformButtons>
            {/* <SelectStyle mode="tags" onChange={setTags}>
              {tags}
            </SelectStyle>
            <ButtonLink type="text">Clear</ButtonLink> */}
          </PanelStyle>
          <PanelStyle
            header={
              <div>
                <PanelTitle>Product type</PanelTitle>
              </div>
            }
            key="4"
          >
            <Form.Item>
              <Select defaultValue="Select" value={selectedCategory} onChange={(event) => handleProductType(event)}>
                <Option value="Select" disabled>Select</Option>
                {
                  categoryLists && categoryLists.length > 0 && categoryLists.map((data, index) => {
                    return <Option key={index} name={data?.name} value={data?.ID}>{data?.name}</Option>
                  })
                }
              </Select>
            </Form.Item>

            <ButtonLink type="text">Clear</ButtonLink>

          </PanelStyle>
          {/* <PanelStyle
            header={
              <div>
                <PanelTitle>Collection</PanelTitle>
              </div>
            }
            key="5"
          >
            <Search placeholder="Search for collections" />
            <RadioStyle value={1}>Home page</RadioStyle>
            <ButtonLink type="text">Clear</ButtonLink>
          </PanelStyle>
          <PanelStyle
            header={
              <div>
                <PanelTitle>Publishing error</PanelTitle>
              </div>
            }
            key="6"
          >
            <RadioGroupStyle
              onChange={onChangeSubscription}
              value={valueSubscription}
            >
              <RadioStyle value={1}>Online Store</RadioStyle>
            </RadioGroupStyle>
            <ButtonLink type="text">Clear</ButtonLink>
          </PanelStyle> */}
        </CollapseStyle>
      </DrawerStyle>
    </ViewContent>
  );
};

const ViewContent = styled.div`
  margin-top: 30px;
  background: #FFFFFF;
  box-shadow: 0px 2px 8px rgba(64, 73, 80, 0.15);
  border-radius: 5px;
  position: relative;
`;

const ProductImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 5px;
  margin-right: 20px;
`;

const ProductTitle = styled.a`
  font-family: Proxima Nova;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 144.89%;
  color: #0095F8;
`;

const DrawerStyle = styled(Drawer)``;

const DrawerTitle = styled.h3`
  margin: 0;
  font-weight: 500;
  position: relative;
  color: #000;
  font-size: 24px;
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
  .location {
    width: 100%;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
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

const SelectStyle = styled(Select)`
  width: 100%;
`;

const ButtonLink = styled(Button)`
  ${"" /* color: #ccc; */}
  margin: 10px 0 0;
  padding: 0 3px;
  display: block;
`;

const TagsList = styled.div`
  padding: 0 15px 15px;
`;

const LabelSelected = styled.span`
  margin-right: 15px;
  color: #0095f8;
  font-weight: bold;
`;

const ButtonEditCustomer = styled(Button)`
  border-radius: 4px 0 0 4px;
  border-right: 0;
`;

const ButtonMoreActions = styled(Button)`
  border-radius: 0 4px 4px 0px;
`;
const TagsConformButtons = styled.div`
  display:flex,
`;
const SearchTags = styled.div`

`;
const TagContent = styled(Tag)`
  padding: 5px 10px;
  marginbottom: 10px;
`;

const InputTabs = styled(Tabs)`
  .ant-tabs-nav {
    height: 50px;
    margin-left: 25px!important;
    margin-right: 93px;
    .ant-tabs-tab {
      padding-top: 7px!important;
      padding-bottom: 7px!important;
      font-family: Proxima Nova;
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 144.89%;
      color: #404950;
    }
  }
  .ant-tabs-content-holder {
    width: 100%;
    border-left: none;
    .ant-tabs-tabpane {
      padding-left: 0!important;
    }
  }

`;

const ContentBox = styled.div`
  padding-right: ${props => props.paddingRight ? props.paddingRight : 0}px;
  margin-top: ${(props) => (props.marginTop ? props.marginTop : "0px")};
`;

const DataTable = styled(Table)`
  thead {
    tr {
      height: 50px;
      border-top: 1px solid #EDEDED;
      th {
        background: white!important;
        font-family: Proxima Nova;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 144.89%;
        color: #404950;
        &:nth-child(1) {
          padding-left: 15px;
        }
        &:nth-child(2) {
          padding-left: 75px;
        }
      }
    }
  }
  tbody {
    tr {
      height: 80px;
      td {
        &:not(:nth-child(1)) {
          padding-left: 0px;
        }
        padding: 15px;
        font-family: Proxima Nova;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 16px;
        color: #404950;
      }
    }
  }
`;

const AddButtonText = styled(Text)`
    font-family: Proxima Nova;
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 14px;
    color: #FFFDFD;
    padding-left: 10px;
`;

const AddButton = styled(Button)`
    width: 70px;
    height: 30px;

    background: #0095F8;
    border-radius: 5px;

    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
        background-color: #0095F8;
        opacity: 0.8;
        box-shadow: 0px 0px 25px #989898;
    }
`;

const ActionItemBlock = styled.div`
    position: absolute;
    top: 10px;
    right: 30px;
    display: flex;
    width: 150px;
    justify-content: space-between;
    z-index: 10;
`;

const IconButton = styled(Button)`
    border: none;
    padding: 0;
    box-shadow: none;
    &:hover {
      box-shadow: 0px 0px 25px #989898;
    }
`;

const mapStateToProps = (store) => {
  return {

  };
};

const mapDispatchToProps = {
  getUserProductLists,
  getProductCategoryLists,
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewCustomers);
