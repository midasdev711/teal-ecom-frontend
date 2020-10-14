import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Router from "next/router";
import Link from "next/link";
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
} from "antd";
import { getUserData } from "../../../utils";
import { getUserProductLists , getProductCategoryLists} from "../../../redux/actions/product";
import { connect , useSelector } from "react-redux";
const { TabPane } = Tabs;
const { Panel } = Collapse;
const { Search } = Input;
const { Option } = Select;

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

const ViewCustomers = (props) => {
  // const { productList } = props
  const productLists = useSelector(state =>state.productReducer.merchantProductLists)
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
    if(productLists?.length > 0){
         setProductList(productLists)
    }
     }, [productLists])

  const columns = [
    {
      title: "Product",
      dataIndex: "title",
      key:"title",
      render: (title, productListsData ) => {
      
     //   console.log('productListsData', productListsData)
      //  console.log('title', title)
        return (
          <div key={productListsData.ID}>
            <ProductImage src={productListsData.thumbnailImage}></ProductImage>
            <Link href={`/[portal_id]/ecom/products/[productId]`} as={`/${userData?.uniqueID}/ecom/products/${productListsData.ID}`} shallow={true}>
              <a> {title || ""}</a>
            </Link>
          </div>
        );
      },
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key:"stock",
      render: (stock) => <div key={stock}>{stock || ""}</div>,
    },
    {
      title: "Price",
      dataIndex: "salePrice",
      key:"price",
      render: (salePrice) => <div key={salePrice}>{`$ ${salePrice}` || ""}</div>,
    },
    {
      title: "Quantity",
      dataIndex: "totalQuantity",
      key:"Qty",
      render: (totalQuantity) => <div key={totalQuantity}>{totalQuantity || ""}</div>,
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

  const handleFilterData = (value) =>{
    //  console.log('value filters Data', value)
      setProductList(value)
  }
  return (
    <ViewContent>
      <Tabs defaultActiveKey={tabIndex}>
        <TabPane tab="All" key="1" />
      </Tabs>

      <Filters onOpen={setOpenMoreFilters} productLists={productLists} getFilterData={(value)=>handleFilterData(value)} />

      {tagsFilter && tagsFilter.length > 0 && (
        <TagsList>
          {tagsFilter.map((item, i) => (
            <Tag key={i} closable>
              {item}
            </Tag>
          ))}
        </TagsList>
      )}

      {nodeCheckbox && (
        <ContentTab>
          {tabIndex === 1 && (
            <Table
              rowSelection={{
                type: "checkbox",
                ...rowSelection,
              }}
              columns={columns}
              dataSource={productList}
              pagination={productList.length > 10}
            />
          )}
        </ContentTab>
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
            <SelectStyle mode="tags" onChange={setTags}>
              {tags}
            </SelectStyle>
            <ButtonLink type="text">Clear</ButtonLink>
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
            {/* onChange={(event) => handleDropDown(event, "productCategory")} */}
                    <Select defaultValue="Select" >
                      <Option value="Select" disabled>Select</Option>
                      {
                        categoryLists && categoryLists.length > 0 && categoryLists.map((data, index) => {
                          return <Option key={index} value={data?.ID}>{data?.name}</Option>
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
  border: 1px solid #ddd;
  background: #fff;
  box-shadow: var(
    --p-card-shadow,
    0 0 0 1px rgba(63, 63, 68, 0.05),
    0 1px 3px 0 rgba(63, 63, 68, 0.15)
  );
  border-radius: 3px;
`;

const ProductImage = styled.img`
  width: 60px;
  height: 60px;
  margin-right: 10px;
  border: 1px solid #bbc3c9;
`;

const ContentTab = styled.div``;
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

const mapStateToProps = (store) => {
  return {

    // productList: store.productReducer.merchantProductLists,

  };
};

const mapDispatchToProps = {
  getUserProductLists,
  getProductCategoryLists,
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewCustomers);
