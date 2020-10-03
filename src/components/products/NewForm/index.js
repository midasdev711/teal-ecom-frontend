import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Link from "next/link";
import { TweenOneGroup } from "rc-tween-one";
import { TimeData } from "../../../utils/Consts";
import { ManageSalesMD } from "../Modals";
import { CountryDropdown } from "react-country-region-selector";
import validation from "../../../utils/validation"
// icon
import {
  DownOutlined,
  CalendarOutlined,
  EditOutlined,
  CloseOutlined,
  FileTextOutlined,
  PlusCircleTwoTone,
  MinusCircleTwoTone, ZoomInOutlined, PlusOutlined, MinusOutlined
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
import { validate } from "graphql";
import { resolve } from "url";
import { rejects } from "assert";
import { connect } from "react-redux";
import { getProductCategoryLists } from "../../../redux/actions/product";
import ProductsImages from "../../../../pages/[portal_id]/ecom/products/new/productImages";

const { Search } = Input;
const { Option } = Select;
const { Dragger } = Upload;
const productInfo = {
  productMerchantID: "",
  productMerchantName: "",
  productSKU: "",
  productTitle: "",
  productDescription: "",
  productSlug: "",
  productMRP: "",
  ProductSalePrice: "",
  isPublish: "false",
  productTags: [],
  productStock: "",
  productVariants: {
    name: "",
    values: "",
  },
  productThumbnailImage: "",
  productImages: [],
  productSEO: {
    title: "",
    description: "",
    cronicalUrl: "",
  },
  ProductSearchEngineTitle: "",
  ProductSearchEngineDescription: "",
  ProductCategory: "1",
  productInventory: "",
  ProductSubcategory: "3",
  productTotalQuantity: "",
  productStartDate: "",
  productEndDate: "",
  productFeaturedImage: "",
  SearchEngineListingPreviewUrl: "",
  productAttributes: [{
    productWeight: ""
  }]
  // productImages: [],
  // productAttributes: 254,
  // productAttributes: [{

  //   ProductCostPerItem: "",
  //   // ProductCharge:false,
  //   InventoryBarcode: "",
  //   InventorySKU: "",
  //   // TrackQuantity: false,
  //   // ContinueSellingWhenOutOfStock:false,
  //   //  PhysicalProduct:false,
  //   productWeight: "",
  //   // ProductVariants:false,
  //   // Organization:{
  //   //   ProductType:"",
  //   //   Vendor:"",
  //   // },
  //   // ProductCollection:"",
  //   // ProductTags:[],
  //   CustomerInformation: {
  //     countryOrigin: "",
  //     HarmonizedSystemCode: ""
  //   }
  // }],
}

const newForm = ({ submit, flag, getProductCategoryLists }) => {
  const [visiable, setVisible] = useState(false);
  const [tags, setTags] = useState(["test"]);
  const [inputValue, setInputValue] = useState("");
  const [inputVisible, setInputVisible] = useState(false);
  const [isDatePicker, setIsDatePicker] = useState(false);
  const [openManageMD, setOpenManageMD] = useState(false);
  const [openEditSite, setOpenEditSite] = useState(true);
  const [country, setCountry] = useState("United States");
  const [productDetails, setProductDetails] = useState(productInfo);
  const [errors, setErrors] = useState({});
  const [dummyData, setDummyData] = useState([1]);
  const [imagesButtonDisable, setImagesButtonDisable] = useState(false);
  const [imagesFileList, setImagesFileList] = useState("");
  const [VariantsFlag, setVariantsFlag] = useState(false);
  const [variants, setVariants] = useState([{ name: "", value: "" }]);
  const [productFeaturedImageList, setProductFeaturedImageList] = useState([]);

  // useEffect(()=>{
  //   let cloneProduct = productDetails
  //   let cloneproductAttributes1 = productDetails?.productAttributes[0]
  //   let cloneproductAttributes = productDetails?.productAttributes[0]?.CustomerInformation
  //   cloneproductAttributes.countryOrigin = country
  //   cloneproductAttributes1.CustomerInformation = cloneproductAttributes
  //   cloneProduct.productAttributes[0] = cloneproductAttributes1
  //   setProductDetails(cloneProduct)
  //   setDummyData([dummyData + 1])
  //     },[country])
  useEffect(() => {
   // console.log('flag', flag)
    if (flag !== "") {
      console.log('object datas in side objects')
      handleSubmit()
    }
  }, [flag])
 
  useEffect(() => {
    getProductCategoryLists()
  }, [])
  const handleProductsImages = (value) => {
    setImagesFileList(value)
    let cloneProduct = productDetails
    cloneProduct.productImages = value
    if (value.length > 0) {
      cloneProduct.productThumbnailImage = value[0]
    } else {
      cloneProduct.productThumbnailImage = ""
    }
    setProductDetails(cloneProduct)
    setDummyData([dummyData + 1])
  }
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onChangeDate = (date, name) => {
    console.log(date?._d);
    let UTCDate = date?._d
    // let dateFormate
    // if (date !== null) {
    //   dateFormate = date.format("DD-MM-YYYY")
    // }
    let cloneProduct = productDetails
    cloneProduct[name] = date === null ? "" : UTCDate
    setProductDetails(cloneProduct)
    setDummyData([dummyData + 1])
  };

  const deleteDate = () => {
    setIsDatePicker(!isDatePicker);
  };

  const base64 = (file, names, fileData) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader()
      fileReader.onloadend = () => {
        let b64 = fileReader.result.replace(/^data:.+;base64,/, '');
        if (names === "featureProducts") {
          let cloneProductDetails = productDetails
          let cloneProductDetails1 = productDetails.productFeaturedImage
          cloneProductDetails1 = b64
          cloneProductDetails.productFeaturedImage = cloneProductDetails1
          setProductDetails(cloneProductDetails)
          setDummyData([dummyData + 1])
          setProductFeaturedImageList([fileData.file])
        } 
        // else {
        //   let cloneProductDetails = productDetails
        //   let cloneProductDetails1 = productDetails.productImages
        //   cloneProductDetails1.push(b64)
        //   cloneProductDetails.productImages = cloneProductDetails1
        //   setProductDetails(cloneProductDetails)
        //   setDummyData([dummyData + 1])
        // }
        resolve(b64);
      };
      fileReader.onerror = (error) => {
        reject(error)
      }
      fileReader.readAsDataURL(file);
    });
  }


  const onChangeFileCSV = async (info, name) => {
    
    const { status } = info.file;
    if (status !== "uploading") {
      console.log("file uploading");
    }
    if (status === "done") {
      let datas = await base64(info.file.originFileObj, name, info)
    } else if (status === "error") {
      console.error("file upload failed");
    }
    setDummyData([dummyData + 1])
  };
  const handleInventory = (event) => {
    console.log('event', event)

    console.log('name , value', event?.target?.name, event?.target?.value)
    const name = event?.target?.name
    const value = event?.target?.value
    console.log('name in', name)
    console.log('value in', value)
    let cloneProduct = productDetails
    let cloneproductAttributes = productDetails?.productAttributes[0]
    cloneproductAttributes[name] = value
    cloneProduct.productAttributes[0] = cloneproductAttributes
    setProductDetails(cloneProduct)
    handleAttributesValidation(name)
    setDummyData([dummyData + 1])
  }
  const handleChange = (event, names) => {
    console.log('event', event)
    console.log('names', names)
    console.log('name , value', event?.target?.name, event?.target?.value)
    const name = event?.target?.name
    const value = event?.target?.value
    let error
    let errorData = errors
    let cloneProduct = productDetails
    let cloneproductAttributes = productDetails?.productAttributes[0]
    let keys = Object.keys(cloneProduct)

    let found = keys.find(data => data === name)

    if (found !== undefined) {
      console.log('data available')
      if (found === "productTitle") {
        var b = value.toLowerCase().replace(/ /g, '-')
          .replace(/[^\w-]+/g, '');
        cloneProduct.productSlug = b
        setProductDetails(cloneProduct)
      }
      cloneProduct[found] = value
      setProductDetails(cloneProduct)
    } else {
      console.log('event valuesss', event)
      if (names === "ProductSalePrice") {
        cloneProduct.ProductSalePrice = event === null ? "" : event.toString()
        setProductDetails(cloneProduct)
        handleValidation(names)
      } else if (names === "productTotalQuantity") {
        cloneProduct.productTotalQuantity = event === null ? "" : event
        setProductDetails(cloneProduct)
        handleValidation(names)
      } else if (names === "productMRP") {
        cloneProduct.productMRP = event === null ? "" : event.toString()
        setProductDetails(cloneProduct)
        handleValidation(names)
        console.log('inside Data')
      } else {
        cloneproductAttributes[names] = event
        cloneProduct.productAttributes[0] = cloneproductAttributes
        setProductDetails(cloneProduct)
        handleAttributesValidation(names)
      }
      console.log(`data not available`);
    }

    error = validation(name, productDetails[name]);
    if (!error) {
      delete errorData[name]
      setErrors(errorData)
    } else {
      errorData[name] = error
      setErrors(errorData)
    }

    setDummyData([dummyData + 1])
  }
  console.log('productDetails', productDetails)
  // Tags group actions
  const handleClose = (removedTag) => {
    const removeTags = tags.filter((tag) => tag !== removedTag);
    setTags(removeTags);
  };
  const handleValidation = (name) => {
    let error
    let errorData = errors

    error = validation(name, productDetails[name]);
    if (!error) {
      delete errorData[name]
      setErrors(errorData)
    } else {
      errorData[name] = error
      setErrors(errorData)
    }
    setDummyData([dummyData + 1])
  }
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
  const handleHSCode = (event) => {
    let value = event.target.value
    let cloneProduct = productDetails
    let cloneproductAttributes1 = productDetails?.productAttributes[0]
    let cloneproductAttributes = productDetails?.productAttributes[0]?.CustomerInformation
    cloneproductAttributes.HarmonizedSystemCode = value
    cloneproductAttributes1.CustomerInformation = cloneproductAttributes
    cloneProduct.productAttributes = cloneproductAttributes1
    setProductDetails(cloneProduct)
    setDummyData([dummyData + 1])
  }


  const handleSubmit = () => {
    let validationErrors = {};
    console.log('inside submit 1')
    Object.keys(productDetails).forEach((name) => {
      const error = validation(name, productDetails[name]);
      if (error && error.length > 0) {
        validationErrors[name] = error;
      }
    });
    Object.keys(productDetails.productAttributes[0]).forEach((name) => {
      // console.log('productDetails.productAttributes[0][name]', productDetails.productAttributes[0][name])
      const error = validation(name, productDetails.productAttributes[0][name]);
      if (error && error.length > 0) {
        validationErrors[name] = error;
      }
    });


    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    console.log('inside submit 2')
    setErrors({});
    submit(productDetails)
    setDummyData([dummyData + 1])
  }
  console.log('errors', errors)
  const tagChild = tags.map(forMap);
  const handleDropDown = (event, names) => {
    console.log('event', event)
    console.log('names dd', names)

    let cloneProduct = productDetails
    let cloneproductAttributes = productDetails?.productAttributes[0]
    let data = ["oz", "kg", "g", "lb"]
    //  data.map((data,index)=>{
    //   cloneproductAttributes[names] = `${cloneproductAttributes[names] event)}`
    //  })
    if (names === "productWeight") {
      cloneproductAttributes[names] = `${cloneproductAttributes[names]} ${event}`
      cloneProduct.productAttributes[0] = cloneproductAttributes
      setProductDetails(cloneProduct)
      setDummyData([dummyData + 1])
    } else {
      cloneProduct[names] = event
      setProductDetails(cloneProduct)
      setDummyData([dummyData + 1])
    }

  }
  const handleRemove = (event) => {
    setProductFeaturedImageList([])
    console.log('event', event)
    let cloneProductDetails = productDetails
    cloneProductDetails.productFeaturedImage = ""
    setProductDetails(cloneProductDetails)
    //  setImagesFileList("")
    setDummyData([dummyData + 1])
  }
  const handleAttributesValidation = (name) => {
    let error
    let errorData = errors

    error = validation(name, productDetails.productAttributes[0][name]);
    if (!error) {
      delete errorData[name]
      setErrors(errorData)
    } else {
      errorData[name] = error
      setErrors(errorData)
    }
    setDummyData([dummyData + 1])
  }
  const handleAddVariants = () => {
    setVariants([...variants, { name: "", value: "" }])
  }
  const handleDeleteVariants = (data, index) => {
    let cloneVariant = variants
    cloneVariant.splice(index, 1)
    setVariants(cloneVariant)
    setDummyData([dummyData + 1])
  }
  const handleCheckBox = (event) => {
    const values = event.target.checked
    console.log('values', values)
    setVariantsFlag(values)
    setDummyData([dummyData + 1])
  }


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
              <Form.Item label="Title" name="productTitle" >
                <TextInput name="productTitle" onChange={(event) => handleChange(event)} placeholder="Short sleeve t-shirt" />
                <label style={{ color: "red" }} >{errors?.productTitle}</label>
              </Form.Item>
              <TitleStyle>Description</TitleStyle>
              <DescriptionContent>
                <TextAreaStyle rows={2} name="productDescription" onChange={(event) => handleChange(event)} />
                <label style={{ color: "red" }} >{errors?.productDescription}</label>
                {/* <RemirorEditor /> */}
              </DescriptionContent>
            </ContentBox>
            <ContentBox marginTop="20px">
              <ProductsImages imageData={(value) => handleProductsImages(value)} />
              {/* <AlignItem className="margin-bottom">
                <TitleBox>Product Images</TitleBox>
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
                multiple={true}
                onChange={(info) => onChangeFileCSV(info)}
              >
                <p className="ant-upload-drag-icon">
                  <FileTextOutlined />
                </p>
                <Button>Add File</Button>
                <p className="ant-upload-hint">or drop files to upload</p>
              </StyleDragger> */}
            </ContentBox>
            <ContentBox marginTop="20px">
              <AlignItem className="margin-bottom">
                <TitleBox>Product Featured Image </TitleBox>
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
                fileList={productFeaturedImageList}
                // disabled={imagesButtonDisable}
                onChange={(info) => onChangeFileCSV(info, "featureProducts")}
                onRemove={(file) => handleRemove(file)}
              >
                <p className="ant-upload-drag-icon">
                  <FileTextOutlined />
                </p>
                <Button disabled={imagesButtonDisable}>Add File</Button>
                <p className="ant-upload-hint">or drop files to upload</p>
              </StyleDragger>
            </ContentBox>
            <CardStyle>
              <TitleCardStyle>Pricing</TitleCardStyle>
              <Row gutter={24}>
                <Col md={12}>
                  <Form.Item label="Price">
                    <InputNumberStyle
                      onChange={(event) => handleChange(event, "ProductSalePrice")}
                      placeholder="0.00"
                      formatter={(value) =>
                        `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                    />
                    <label style={{ color: "red" }} >{errors?.ProductSalePrice}</label>

                  </Form.Item>
                </Col>
                <Col md={12}>
                  <Form.Item label="Compare at price">
                    <InputNumberStyle
                      onChange={(event) => handleChange(event, "productMRP")}
                      placeholder="0.00"
                      formatter={(value) =>
                        `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                    />
                    <label style={{ color: "red" }} >{errors?.productMRP}</label>

                  </Form.Item>
                </Col>
                <Col md={12}>
                  <Form.Item label="Cost per item">
                    <InputNumberStyle
                      onChange={(event) => handleChange(event, "ProductCostPerItem")}
                      placeholder="0.00"
                      formatter={(value) =>
                        `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                    />
                    <label style={{ color: "red" }} >{errors?.ProductCostPerItem}</label>

                    {/* <span>Customers won’t see this</span> */}
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
                    <InputStyle name="InventorySKU" onChange={(event) => handleInventory(event)} />
                    <label style={{ color: "red" }} >{errors?.InventorySKU}</label>

                  </Form.Item>
                </Col>
                {/* <Col md={12}>
                  <Form.Item label="Barcode (ISBN, UPC, GTIN, etc.)">
                    <InputStyle name="InventoryBarcode" onChange={(event) => handleInventory(event)} />
                    <label style={{ color: "red" }} >{errors?.InventoryBarcode}</label>

                  </Form.Item>
                </Col> */}
                {/* <Col md={24}>
                  <Checkbox.Group>
                    <CheckboxStyle>Track quantity</CheckboxStyle>
                    <CheckboxStyle>
                      Continue selling when out of stock
                    </CheckboxStyle>
                  </Checkbox.Group>
                </Col> */}
              </Row>

              <LineBorder />

              <TitleSmall>QUANTITY</TitleSmall>

              <Row gutter={24}>
                <Col md={12}>
                  <Form.Item label="Available">
                    <InputNumberStyle
                      placeholder="0"
                      onChange={(event) => handleChange(event, "productTotalQuantity")}
                    />
                    <label style={{ color: "red" }} >{errors?.productTotalQuantity}</label>

                  </Form.Item>
                </Col>
                <Col md={12}></Col>
              </Row>
            </CardStyle>

            <CardStyle>
              <TitleCardStyle>Shipping</TitleCardStyle>
              {/* <CheckboxStyle>This is a physical product</CheckboxStyle>

              <LineBorder /> */}

              <TitleSmall>WEIGHT</TitleSmall>
              <TextStyle>
                Used to calculate shipping rates at checkout and label prices
                during fulfillment.
              </TextStyle>
              <Row gutter={0}>
                <Col md={8}>
                  <Form.Item label="Weight">
                    <InputNumberStyle name="productWeight" onChange={(event) => handleChange(event, "productWeight")} />
                    <label style={{ color: "red" }} >{errors?.productWeight}</label>

                  </Form.Item>
                </Col>
                <Col md={3}>
                  <Form.Item label=" " name="" initialValue="kg">
                    <Select onChange={(event) => handleDropDown(event, "productWeight")}>
                      <Option value="lb">lb</Option>
                      <Option value="oz">oz</Option>
                      <Option value="kg">kg</Option>
                      <Option value="g">g</Option>
                    </Select>
                  </Form.Item>

                </Col>
              </Row>

              {/*           <LineBorder />

              <TitleSmall>CUSTOMS INFORMATION</TitleSmall>
              <p>
                Used by border officers to calculate duties when shipping
                internationally. Shown on customs forms you print during
                fulfillment.
              </p> */}

              {/* <Form.Item label="Country of origin">
                <CountryDropdownStyle
                  defaultOptionLabel="Select a country."
                  value={country}
                  onChange={(val) => setCountry(val)}
                  blacklist={["CD", "SH", "KP", "GS", "HM", "VC"]}
                  className="dropDown"
                />
                <span>In most cases, where the product is manufactured.</span>
              </Form.Item> */}

              {/* <Form.Item label="HS (Harmonized System) code">
                <SearchStyle
                  placeholder="Search by product keyword or HS code"
                  onSearch={(value) => console.log(value)}
                  onChange={(event) => handleHSCode(event)}
                />
                <span>Used by border officers to classify this product.</span>
              </Form.Item> */}
            </CardStyle>
            <ContentBox marginTop="20px">
              <TitleBox>Variants</TitleBox>
              <Checkbox className="margin-top"
                onChange={(event) => handleCheckBox(event)}
                checked={VariantsFlag}
              >
                This product has multiple options, like different sizes or
                colors
              </Checkbox>
              {
                VariantsFlag && variants && variants.length > 0 && variants.map((data, index) => {
                  return <Row gutter={0}>
                    <Col md={9}>
                      <Form.Item label="Variant Name" name="productTitle" >
                        <TextInput name="productTitle" onChange={(event) => handleChange(event)} placeholder="Short sleeve t-shirt" />
                        {/* <label style={{ color: "red" }} >{errors?.productTitle}</label> */}
                      </Form.Item>
                    </Col>
                    <Col md={9} style={{ marginLeft: "25px" }}>
                      <Form.Item label="Variant Value" name="productTitle" >
                        <TextInput name="productTitle" onChange={(event) => handleChange(event)} placeholder="Short sleeve t-shirt" />
                        {/* <label style={{ color: "red" }} >{errors?.productTitle}</label> */}
                      </Form.Item>
                    </Col>
                    <Col md={1}>
                      <Button
                        style={{ marginLeft: "10px", marginTop: "30px" }}
                        type="primary"
                        shape="circle"
                        icon={variants.length === (index + 1) ? (<PlusOutlined />) : (<MinusOutlined />)}
                        onClick={variants.length === (index + 1) ? (() => handleAddVariants()) : (() => handleDeleteVariants(data, index))}
                      >
                      </Button>
                    </Col>
                    {/* <Col md={1}>
                      <Button
                        style={{ marginLeft: "30px", marginTop: "30px" }}
                        type="primary"
                        shape="circle"
                        icon={<MinusOutlined />}
                        onClick={() => handleDeleteVariants()}
                      >
                      </Button>
                    </Col> */}
                  </Row>
                })
              }

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
                  <InputStyle name="ProductSearchEngineTitle" onChange={(event) => handleChange(event)} />
                  <label style={{ color: "red" }} >{errors?.ProductSearchEngineTitle}</label>

                  <TextStyle> 0 of 70 characters used</TextStyle>
                  <TitleStyle className="margin-top">Description</TitleStyle>
                  <TextAreaStyle rows={5} name="ProductSearchEngineDescription" onChange={(event) => handleChange(event)} />
                  <label style={{ color: "red" }} >{errors?.ProductSearchEngineDescription}</label>
                  <TextStyle> 0 of 320 characters used</TextStyle>
                  <TitleStyle className="margin-top">URL and handle</TitleStyle>
                  <InputStyle prefix="https://sale.mysolidshoes.com/products/" name="SearchEngineListingPreviewUrl" onChange={(event) => handleChange(event)} />
                </ContentBox>
              </>
            )}
          </Col>
          <Col md={8}>
            <ContentBox notPadding>
              <ItemContentBox>
                <AlignItem>
                  <TitleBox>Product availability</TitleBox>
                  {/* <ContentTitle onClick={() => setOpenManageMD(!openManageMD)}>
                    Manage
                  </ContentTitle> */}
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
                      <div style={{ display: "flex" }}>
                        <DatePicker
                          className="date-picker"
                          onChange={(date) => onChangeDate(date, "productStartDate")}
                        />
                        <DatePicker
                          className="date-picker"
                          onChange={(date) => onChangeDate(date, "productEndDate")}
                        />
                        <Tooltip
                          placement="bottom"
                          title="Remove the future publishing date. The product will be published immediately."
                        >
                          <CloseOutlined
                            style={{ marginLeft: "250px" }}
                            onClick={() => deleteDate()}
                            className="delete-date-icon"
                          />
                        </Tooltip>
                      </div>




                      {/* <Select
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
                      </Select> */}

                    </SelectContent>
                  </>
                )}
              </ItemContentBox>
            </ContentBox>
            <ContentBox marginTop="20px" notPadding bgColor="#f9fafb">
              {/* <ItemContentBox>
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
              <Divider /> */}
              <ItemContentBox>
                <TitleBox>Categories</TitleBox>
                <GroupContent>
                  <TitleStyle>Product Category</TitleStyle>
                  {/* <Input
                    placeholder="e.g. Shirts"
                    name="ProductCategory"
                    onChange={(event)=>handleChange(event)}
                  /> */}
                  <Form.Item name="ProductCategory" initialValue="kg">
                    <Select onChange={(event) => handleDropDown(event, "ProductCategory")}>
                      <Option value="lb">lb</Option>
                      <Option value="oz">oz</Option>
                      <Option value="kg">kg</Option>
                      <Option value="g">g</Option>
                    </Select>
                    <label style={{ color: "red" }} >{errors?.ProductCategory}</label>

                  </Form.Item>
                </GroupContent>
                <GroupContent>
                  <TitleStyle>Product Sub Category</TitleStyle>

                  {/* <Input
                    placeholder="e.g. Nike"
                    name="ProductSubcategory"
                    onChange={(event)=>handleChange(event)}
                    
                  /> */}
                  <Form.Item name="ProductSubcategory" initialValue="kg">
                    <Select onChange={(event) => handleDropDown(event, "ProductSubcategory")}>
                      <Option value="lb">lb</Option>
                      <Option value="oz">oz</Option>
                      <Option value="kg">kg</Option>
                      <Option value="g">g</Option>
                    </Select>
                    <label style={{ color: "red" }} >{errors?.ProductSubcategory}</label>

                  </Form.Item>
                </GroupContent>
              </ItemContentBox>
              {/* <Divider />
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
              </ItemContentBox> */}
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
          {/* <Button size="large" type="primary">
            Save
          </Button> */}
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

const mapStateToProps = (store) => {
  return {

  };
};

const mapDispatchToProps = {
  getProductCategoryLists,
};

export default connect(mapStateToProps, mapDispatchToProps)(newForm);


