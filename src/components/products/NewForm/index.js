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
import { Spin, Tabs } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;

// ui
import { RemirorEditor, TEPageLoader } from "../../atoms";
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
  Typography
} from "antd";
import { validate } from "graphql";
import { resolve } from "url";
import { rejects } from "assert";
import { connect, useSelector } from "react-redux";
import product, { getProductCategoryLists, getProductSubCategoryLists } from "../../../redux/actions/product";
import ImageUpload from "../ImageUpload"
const { Search } = Input;
const { Option } = Select;
const { Dragger } = Upload;
const { Text } = Typography;
let productInfo = {
  productMerchantID: "",
  productMerchantName: "",
  productSKU: "",
  productTitle: "",
  productDescription: "",
  productSlug: "",
  productMRP: 0,
  productSalePrice: 0,
  productCostPerItem: 0,
  isPublish: "false",
  productTags: [],
  productStock: 0,
  productVariants: [{
    variantName: "",
    variantValues: "",
  }],
  productThumbnailImage: null,
  productImages: [],
  productSEO: {
    title: "",
    description: "",
    cronicalUrl: "",
  },
  productCategory: "",
  // productInventory: "",
  productSubcategory: "",
  productTotalQuantity: "",
  productStartDate: "",
  productEndDate: "",
  productFeaturedImage: "",

  productAttributes: [{
    //  attributeValues: ""
    attributeName: "productWeight",
    attributeValues: []
  }]

}

let cleanData = {
  productMerchantID: "",
  productMerchantName: "",
  productSKU: "",
  productTitle: "",
  productDescription: "",
  productSlug: "",
  productMRP: 0,
  productSalePrice: 0,
  productCostPerItem: 0,
  isPublish: "false",
  productTags: [],
  productStock: 0,
  productVariants: [{
    variantName: "",
    variantValues: "",
  }],
  productThumbnailImage: null,
  productImages: [],
  productSEO: {
    title: "",
    description: "",
    cronicalUrl: "",
  },
  productCategory: "",
  // productInventory: "",
  productSubcategory: "",
  productTotalQuantity: "",
  productStartDate: "",
  productEndDate: "",
  productFeaturedImage: "",

  productAttributes: [{
    //  attributeValues: ""
    attributeName: "productWeight",
    attributeValues: []
  }]

}
const antIcon = <LoadingOutlined style={{ fontSize: 30 }} spin />;
const ProductSEOInfo = ["title", "description", "cronicalUrl"]

const newForm = ({ submit, flag, getProductCategoryLists, saveSubmit, saveFlag, getProductSubCategoryLists }) => {
  const [visiable, setVisible] = useState(false);
  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [inputVisible, setInputVisible] = useState(false);
  const [isDatePicker, setIsDatePicker] = useState(false);
  const [loadingFlag, setLoadingFlag] = useState(false);
  const [openManageMD, setOpenManageMD] = useState(false);
  const [openEditSite, setOpenEditSite] = useState(true);
  const [country, setCountry] = useState("United States");
  const [clearFlag, setClearFlag] = useState("");
  const [productDetails, setProductDetails] = useState(productInfo);
  const [errors, setErrors] = useState({});
  const [dummyData, setDummyData] = useState([1]);
  const [imagesButtonDisable, setImagesButtonDisable] = useState(false);
  const [imagesFileList, setImagesFileList] = useState("");
  const [VariantsFlag, setVariantsFlag] = useState(false);
  const [variants, setVariants] = useState([{ variantName: "", variantValues: "" }]);
  const [productFeaturedImageList, setProductFeaturedImageList] = useState([]);
  const [profit, setProfit] = useState("");
  const [margin, setMargin] = useState("");
  const [unit, setUnit] = useState("kg");
  const categoryLists = useSelector(state => state.productReducer.categoriesLists)
  const subCategories = useSelector(state => state.productReducer.subCategoriesLists)
  const loading = useSelector(state => state.productReducer.status)
  const [step, setStep] = useState("1");


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
    productInfo = cleanData
    setProductDetails(cleanData)
    setErrors({})

  }, [clearFlag])
  useEffect(() => {
    if (loading === "start") {
      setLoadingFlag(true)
    } else {
      setLoadingFlag(false)
    }

  }, [loading])
  useEffect(() => {
    if (flag !== "") {
      handleSubmit("save")
    }
  }, [flag])
  useEffect(() => {
    if (saveFlag !== "") {
      handleSubmit("saveAndPublish")
    }
  }, [saveFlag])
  useEffect(() => {
    Object.values(errors).length > 0 ? (
      errors?.productEndDate || errors?.productStartDate ? (setIsDatePicker(true)) : ("")
    ) : ("")
  }, [errors])
  let tagData = errors
  useEffect(() => {
    tags && tags.length > 0 ? (
      errors?.productTags ? (
        delete tagData.productTags,
        setErrors(tagData)
      ) : ("")
    ) : ("")
  }, [tags])

  useEffect(() => {
    getProductCategoryLists()
  }, [])

  useEffect(() => {
    let cloneProduct = productDetails
    cloneProduct.productTags = tags
    setProductDetails(cloneProduct)
    setDummyData([dummyData + 1])
  }, [tags])
  useEffect(() => {
    setVariantsFlag
    let cloneProduct = productDetails
    if (VariantsFlag) {
      cloneProduct.productVariants = variants
      handleProductInventoryTotal()
    } else {
      cloneProduct.productVariants = [{ variantName: "", variantValues: "" }]
      cloneProduct.productStock = 0
    }
    setProductDetails(cloneProduct)
    setDummyData([dummyData + 1])
  }, [VariantsFlag])


  const handleImageUpload = (value) => {
    setImagesFileList(value)
    let cloneProduct = productDetails
    cloneProduct.productImages = value
    if (value.length > 0) {
      cloneProduct.productThumbnailImage = value[0]
    } else {
      cloneProduct.productThumbnailImage = null
    }
    let cloneError = errors
    delete cloneError.productImages
    setProductDetails(cloneProduct)
    setErrors(cloneError)
    setDummyData([dummyData + 1])
  }

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onChangeDate = (date, name) => {

    let UTCDate = date?._d
    // let dateFormate
    // if (date !== null) {
    //   dateFormate = date.format("DD-MM-YYYY")
    // }
    let cloneProduct = productDetails
    cloneProduct[name] = date === null ? "" : UTCDate
    setProductDetails(cloneProduct)
    handleValidation(name)
    setDummyData([dummyData + 1])
  };

  const deleteDate = () => {
    setIsDatePicker(!isDatePicker);
  };

  const base64 = (file, names, fileData) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader()
      fileReader.onloadend = () => {
        let b64 = fileReader.result
        if (names === "featureProducts") {
          let cloneProductDetails = {
            ...productDetails
          }
          // let cloneProductDetails1 = productDetails.productFeaturedImage
          let cloneError = {
            ...errors
          };
          // cloneProductDetails1 = b64
          cloneProductDetails.productFeaturedImage = file;
          setProductDetails(cloneProductDetails)
          setProductFeaturedImageList([fileData.file])
          delete cloneError.productFeaturedImage
          delete cloneError.productImages
          setErrors(cloneError)
          setDummyData([dummyData + 1])
        }
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
  // const handleInventory = (event) => {
  //     console.log('event', event)

  //     console.log('name , value', event?.target?.name, event?.target?.value)
  //     const name = event?.target?.name
  //     const value = event?.target?.value
  //     console.log('name in', name)
  //     console.log('value in', value)
  //     let cloneProduct = productDetails
  //     let cloneproductAttributes = productDetails?.productAttributes[0]
  //     cloneproductAttributes[name] = value
  //     cloneProduct.productAttributes[0] = cloneproductAttributes
  //     setProductDetails(cloneProduct)
  //     handleAttributesValidation(name)
  //     setDummyData([dummyData + 1])
  // }

  const handleChange = (event, names) => {

    const name = event?.target?.name
    const value = event?.target?.value
    let error
    let errorData = errors
    let cloneProduct = productDetails
    let cloneproductAttributes = productDetails?.productAttributes[0]
    let keys = Object.keys(cloneProduct)

    let found = keys.find(data => data === name)
    let SEO = ProductSEOInfo.find(data => data === name)


    if (found !== undefined) {

      if (found === "productTitle") {
        var b = value.toLowerCase().replace(/ /g, '-')
          .replace(/[^\w-]+/g, '');
        cloneProduct.productSlug = b
        setProductDetails(cloneProduct)
      }
      cloneProduct[found] = value
      setProductDetails(cloneProduct)
    } else {


      if (names === "productSalePrice") {
        cloneProduct.productSalePrice = event === null ? ("") : event
        setProductDetails(cloneProduct)
        handleValidation(names)
        handleProductCompareAtPrice()
        handleProfitAndMargin()
      } else if (names === "productTotalQuantity") {
        cloneProduct.productTotalQuantity = event === null ? "" : event
        setProductDetails(cloneProduct)
        handleValidation(names)
      } else if (names === "productMRP") {
        cloneProduct.productMRP = event === null ? "" : event
        setProductDetails(cloneProduct)
        handleValidation(names)
      } else if (names === "productCostPerItem") {
        cloneProduct.productCostPerItem = event === null ? "" : event
        setProductDetails(cloneProduct)
        handleValidation(names)
        handleProfitAndMargin()

      } else if (names === "attributeValues") {
        cloneproductAttributes[names] = [`${event}`, `${unit}`]
        cloneProduct.productAttributes[0] = cloneproductAttributes
        setProductDetails(cloneProduct)
        handleAttributesValidation(names)
      } else if (name === SEO) {
        cloneProduct.productSEO[name] = value
        setProductDetails(cloneProduct)
      } else {

        cloneproductAttributes[names] = event
        cloneProduct.productAttributes[0] = cloneproductAttributes
        setProductDetails(cloneProduct)
        handleAttributesValidation(names)
      }

    }
    if (name === SEO) {
      error = validation(name, productDetails.productSEO[name]);
    } else if (names === "attributeValues") {
      error = validation(names, productDetails?.productAttributes[0][names]);
    } else {
      error = validation(name, productDetails[name]);
    }
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
    handleValidation("productTags")
  };

  const handleInputConfirm = () => {
    let tag = tags;
    if (inputValue && tag.indexOf(inputValue) === -1) {
      tag = [...tag, inputValue];
    }
    setTags(tag);
    setInputVisible(false);
    setInputValue("");
    handleValidation("productTags")
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
  // const handleHSCode = (event) => {
  //     let value = event.target.value
  //     let cloneProduct = productDetails
  //     let cloneproductAttributes1 = productDetails?.productAttributes[0]
  //     let cloneproductAttributes = productDetails?.productAttributes[0]?.CustomerInformation
  //     cloneproductAttributes.HarmonizedSystemCode = value
  //     cloneproductAttributes1.CustomerInformation = cloneproductAttributes
  //     cloneProduct.productAttributes = cloneproductAttributes1
  //     setProductDetails(cloneProduct)
  //     setDummyData([dummyData + 1])
  // }


  const handleSubmit = (info) => {

    let validationErrors = {};

    Object.keys(productDetails).forEach((name) => {
      const error = validation(name, productDetails[name]);
      if (error && error.length > 0) {
        validationErrors[name] = error;
      }
    });
    Object.keys(productDetails.productAttributes[0]).forEach((name) => {
      const error = validation(name, productDetails.productAttributes[0][name]);
      if (error && error.length > 0) {
        validationErrors[name] = error;
      }
    });
    Object.keys(productDetails.productSEO).forEach((name) => {
      const error = validation(name, productDetails.productSEO[name]);
      if (error && error.length > 0) {
        validationErrors[name] = error;
      }
    });
    // Object.keys(productDetails.productVariants).forEach((name) => {
    //     console.log('name', name)
    //     const error = validation("variantName", productDetails?.productVariants?.variantName);
    //     if (error && error.length > 0) {
    //         validationErrors.variantName = error;
    //     }
    // });
    // Object.keys(productDetails.productVariants).forEach((name) => {
    //     console.log('name', name)
    //     const error = validation("variantValues", productDetails?.productVariants?.variantValues);
    //     if (error && error.length > 0) {
    //         validationErrors.variantValues = error;
    //     }
    // });
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    if (info === "save") {
      submit(productDetails)
    } else {
      saveSubmit(productDetails)
    }
    setDummyData([dummyData + 1])
  }
  //console.log('errors', errors)
  const tagChild = tags.map(forMap);
  const handleDropDown = (event, names) => {

    if (names === "attributeValues") {
      setUnit(event)
    }

    if (names === "productCategory") {
      getProductSubCategoryLists(event)
    }
    let cloneProduct = productDetails
    let cloneproductAttributes = productDetails?.productAttributes[0]
    if (names === "attributeValues") {
      let data = cloneproductAttributes[names]
      cloneproductAttributes[names] = [`${data[0]}`, `${event}`]
      cloneProduct.productAttributes[0] = cloneproductAttributes
      setProductDetails(cloneProduct)
      setDummyData([dummyData + 1])
    } else {
      cloneProduct[names] = event
      setProductDetails(cloneProduct)
      setDummyData([dummyData + 1])
      handleValidation(names)
    }
  }
  const handleRemove = (event) => {
    setProductFeaturedImageList([])

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
    setVariants([...variants, { variantName: "", variantValues: "" }])
    handleProductInventoryTotal()
  }
  const handleDeleteVariants = (data, index) => {

    let cloneVariant = variants
    cloneVariant.splice(index, 1)
    setVariants(cloneVariant)
    let cloneProductDetails = productDetails
    cloneProductDetails.productVariants = cloneVariant
    setProductDetails(cloneProductDetails)
    setDummyData([dummyData + 1])
    handleProductInventoryTotal()
  }

  const handleCheckBox = (event) => {
    const values = event.target.checked


    setVariantsFlag(values)
    setDummyData([dummyData + 1])
    handleProductInventoryTotal()
  }
  const handleChangeVariants = (event, index, names) => {

    let cloneProductDetails = productDetails
    let cloneVariant = variants
    if (names !== undefined) {
      let cloneProductDetails = productDetails
      let cloneVariant = variants

      cloneVariant[index][names] = event === null ? ("") : (event.toString())
    } else {
      const { name, value } = event.target

      cloneVariant[index][name] = value
    }
    setVariants(cloneVariant)
    cloneProductDetails.productVariants = cloneVariant
    setProductDetails(cloneProductDetails)
    setDummyData([dummyData + 1])
    handleProductInventoryTotal()
  }
  const handleProductInventoryTotal = () => {
    let cloneProduct = productDetails
    let inventoryTotal = 0
    cloneProduct?.productVariants.map((data) => {

      inventoryTotal = inventoryTotal + (data.variantValues * 1)
    })
    cloneProduct.productStock = inventoryTotal === NaN && inventoryTotal === undefined ? (0) : (inventoryTotal)
    setProductDetails(cloneProduct)
    setDummyData([dummyData + 1])

  }
  const handleProductCompareAtPrice = () => {

    let cloneProduct = productDetails
    let actualPrice = cloneProduct.productSalePrice * 1
    let MrpValue = actualPrice * 80 / 100
    let productMrpValues = actualPrice + MrpValue

    cloneProduct.productMRP = productMrpValues
    setProductDetails(cloneProduct)
    setDummyData([dummyData + 1])
  }
  const handleProfitAndMargin = () => {
    let cloneProduct = productDetails
    let actualPrice = cloneProduct.productSalePrice * 1
    let costPrice = cloneProduct.productCostPerItem * 1
    let profit = actualPrice - costPrice
    let margin = (profit * 100) / actualPrice
    setProfit(`$ ${profit}`)
    let data = margin.toString().substr(0, 5)
    setMargin(`${data} %`)
    setDummyData([dummyData + 1])
  }

  const nextStep = () => {
    let currentStep = parseInt(step);
    setStep('' + (currentStep + 1));
  }

  const onTabClick = (e) => {
    setStep('' + e);
  }


  return (

    <FormLayout
      name="basic"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      className="form-new"
      layout="vertical"
    >
      {
        loadingFlag ? (<Loader className="loader_wrap"> <Spin indicator={antIcon} />   </Loader>) : ("")
      }
      <InputTabs tabPosition={'left'} activeKey={step} onTabClick={(e) => onTabClick(e)}>
        <TabPane tab="Product Info" key="1">
          <ContentBox>
            <SubFormTitle>Product Info</SubFormTitle>
            <Form.Item name="productTitle">
              <CustomLabel>Product Name</CustomLabel>
              <TextInput name="productTitle" placeholder="Product Name" onChange={(event) => handleChange(event)} />
              <label style={{ color: "red" }} >{errors?.productTitle}</label>
            </Form.Item>
            <Form.Item name="productDescription">
              <CustomLabel>Description</CustomLabel>
              <TextAreaInput rows={2} name="productDescription" placeholder="Briefly describe your product" onChange={(event) => handleChange(event)} />
              <label style={{ color: "red" }} >{errors?.productDescription}</label>
              {/* <RemirorEditor /> */}
            </Form.Item>
            <FormRow>
              <FormItem>
                <CustomLabel>Category</CustomLabel>
                <Form.Item>
                  <FormSelect defaultValue="Select" maxWidth={265} onChange={(event) => handleDropDown(event, "productCategory")}>
                    <FormSelectOption value="Select" disabled>Select</FormSelectOption>
                    {
                      categoryLists && categoryLists.length > 0 && categoryLists.map((data, index) => {
                        return <FormSelectOption key={index} value={data?.ID}>{data?.name}</FormSelectOption>
                      })
                    }
                  </FormSelect>
                  <label style={{ color: "red" }} >{errors?.productCategory}</label>
                </Form.Item>
              </FormItem>
              <FormItem>
                <CustomLabel>Sub Category</CustomLabel>
                <Form.Item>
                  <FormSelect defaultValue="Select" maxWidth={265} onChange={(event) => handleDropDown(event, "productSubcategory")}>
                    <FormSelectOption value="Select" disabled>Select</FormSelectOption>
                    {
                      subCategories && subCategories.length > 0 && subCategories.map((data, index) => {
                        return <FormSelectOption key={index} value={data?.ID}>{data?.name}</FormSelectOption>
                      })
                    }

                  </FormSelect>
                  <label style={{ color: "red" }} >{errors?.productSubcategory}</label>
                </Form.Item>
              </FormItem>
            </FormRow>
          </ContentBox>
        </TabPane>
        <TabPane tab="Images" key="2">
          <ContentBox paddingRight={100}>
            <SubFormTitle>Images</SubFormTitle>
            <ImageUpload imageData={(value) => handleImageUpload(value)} />
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
            <label style={{ color: "red" }} >{errors?.productImages}</label>
          </ContentBox>
        </TabPane>
        <TabPane tab="Pricing" key="3">
          <ContentBox>
            <SubFormTitle>Pricing</SubFormTitle>
            <Row gutter={24}>
              <Col md={12}>
                <CustomLabel>Price</CustomLabel>
                <Form.Item>
                  <FormNumberInput
                    min={0}
                    onChange={(event) => handleChange(event, "productSalePrice")}
                    placeholder="0.00"
                    formatter={(value) =>
                      `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                  />
                  <label style={{ color: "red" }} >{errors?.productSalePrice}</label>

                </Form.Item>
              </Col>
              <Col md={12}>
                <CustomLabel>Compare Price</CustomLabel>
                <Form.Item>
                  <FormNumberInput
                    min={0}
                    onChange={(event) => handleChange(event, "productMRP")}
                    placeholder="0"
                    //  value={productDetails?.productMRP || 0}
                    formatter={(value) =>
                      `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                  />
                  <label style={{ color: "red" }} >{errors?.productMRP}</label>

                </Form.Item>
              </Col>
              <Col md={12}>
                <CustomLabel>Cost per item</CustomLabel>
                <Form.Item>
                  <FormNumberInput
                    min={0}
                    onChange={(event) => handleChange(event, "productCostPerItem")}
                    placeholder="0.00"
                    formatter={(value) =>
                      `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                  />
                  <label style={{ color: "red" }} >{errors?.productCostPerItem}</label>
                  {/* <span>Customers won’t see this</span> */}
                </Form.Item>
              </Col>
              <Col md={6}>
                <StoreContent>
                  <TextStyle>Margin</TextStyle>
                  <span>: {margin.trim()}</span>
                </StoreContent>
              </Col>
              <Col md={6}>
                <StoreContent>
                  <TextStyle>Profit</TextStyle>
                  <span>: {profit}</span>
                </StoreContent>
              </Col>
              <Col md={24}>
                <Checkbox>Charge tax on this product</Checkbox>
              </Col>
            </Row>
          </ContentBox>
        </TabPane>
        <TabPane tab="Inventory" key="4">
          <ContentBox>
            <SubFormTitle>Inventory</SubFormTitle>
            <FormRow>
              <FormItem>
                <CustomLabel>SKU (Stock Keeping Unit)</CustomLabel>
                <Form.Item>
                  <TextInput name="productSKU" onChange={(event) => handleChange(event)} />
                  <label style={{ color: "red" }} >{errors?.productSKU}</label>
                </Form.Item>
              </FormItem>
              <FormItem>
                <CustomLabel>Available Quantity</CustomLabel>
                <Form.Item>
                  <FormNumberInput
                    min={0}
                    placeholder="0"
                    onChange={(event) => handleChange(event, "productTotalQuantity")}
                  />
                  <label style={{ color: "red" }} >{errors?.productTotalQuantity}</label>
                </Form.Item>
              </FormItem>
            </FormRow>
          </ContentBox>
        </TabPane>
        <TabPane tab="Shipping" key="5">
          <ContentBox>
            <SubFormTitle>Shipping</SubFormTitle>
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
                  <FormNumberInput min={0} name="attributeValues" onChange={(event) => handleChange(event, "attributeValues")} />
                  <label style={{ color: "red" }} >{errors?.attributeValues}</label>

                </Form.Item>
              </Col>
              <Col md={3}>
                <Form.Item label=" " name="" initialValue="kg">
                  <Select onChange={(event) => handleDropDown(event, "attributeValues")}>
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
          </ContentBox>
        </TabPane>
        <TabPane tab="Variants" key="6">
          <ContentBox>
            <SubFormTitle>Variants</SubFormTitle>
            <Checkbox className="margin-top"
              onChange={(event) => handleCheckBox(event)}
              checked={VariantsFlag}
            >
              This product has multiple options, like different sizes or
              colors
            </Checkbox> <br></br>
            {
              VariantsFlag && variants && variants.length > 0 && variants.map((data, index) => {
                return <Row gutter={0} key={index}>
                  <Col md={9}>
                    <Form.Item label="Variant Name" key={index}>
                      <TextInput keys={index} name="variantName" value={variants[index]?.variantName || ""} onChange={(event) => handleChangeVariants(event, index)} placeholder="Enter variant name" />
                      {/* <label style={{ color: "red" }} >{errors?.productTitle}</label> */}
                    </Form.Item>
                  </Col>
                  <Col md={9} style={{ marginLeft: "25px" }}>
                    <Form.Item label="Variant Value" key={index}>
                      <FormNumberInput
                        key={index}
                        min={0}
                        onChange={(event) => handleChangeVariants(event, index, "variantValues")}
                        value={variants[index]?.variantValues || ""}
                        name="variantValues"
                        placeholder="0.00"
                        formatter={(value) =>
                          `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }
                      />
                      {/* <TextInput name="variantValues" value={variants[index]?.variantValues || ""} onChange={(event) => handleChangeVariants(event, index)} placeholder="Enter variant value" /> */}
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
            <label style={{ color: "red" }} >{errors?.variantName}</label> <br />
            <label style={{ color: "red" }} >{errors?.variantValues}</label>

          </ContentBox>
        </TabPane>
        <TabPane tab="SEO &amp; Tags" key="7">
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
                <InputStyle name="title" onChange={(event) => handleChange(event)} />
                <label style={{ color: "red" }} >{errors?.title}</label>

                <TextStyle> 0 of 70 characters used</TextStyle>
                <TitleStyle className="margin-top">Description</TitleStyle>
                <TextAreaInput rows={5} name="description" onChange={(event) => handleChange(event)} />
                <label style={{ color: "red" }} >{errors?.description}</label>
                <TextStyle> 0 of 320 characters used</TextStyle>
                <TitleStyle className="margin-top">URL and handle</TitleStyle>
                <InputStyle prefix="https://sale.mysolidshoes.com/products/" name="cronicalUrl" onChange={(event) => handleChange(event)} />
                <label style={{ color: "red" }} >{errors?.cronicalUrl}</label>

              </ContentBox>
            </>
          )}
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
            <label style={{ color: "red" }} >{errors?.productTags}</label>

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
        </TabPane>
      </InputTabs>
      <ActionBottom>
        <NextStepButton type="primary" onClick={() => nextStep()}>
          Next
        </NextStepButton>
      </ActionBottom>
    </FormLayout>
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
  padding-right: ${props => props.paddingRight ? props.paddingRight : 0}px;
  margin-top: ${(props) => (props.marginTop ? props.marginTop : "0px")};
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
  max-width: 550px!important;
  width: 100%;
  height: 45px;
  border: none;
  background-color: #F6F8F9;
  border-radius: 5px;
  font-family: Proxima Nova;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 17px;
  color: #404950;
`;

const FormSelect = styled(Select)`
  max-width: ${props => props.maxWidth ? props.maxWidth : 250}px;
  width: 100%;
  height: 45px;
  border: none;
  text-align: left;
  .ant-select-selector {
    background-color: #F6F8F9!important;
    height: 45px!important;
    border: none!important;
    .ant-select-selection-item {
      font-weight: normal;
      font-size: 15px;
      line-height: 17px;
      color: #404950;
      padding-top: 14px;
    }
    .ant-select-selection-search-input {
        height: 45px!important;
    }
  }
  .ant-select-arrow {
    display: none;
  }
`;

const FormSelectOption = styled(Option)`
  max-width: 240px;
  height: 45px;
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
const Loader = styled.div`
  position: fixed;
  left: 250px;
  right: 0;
  top: 0;
  bottom: 0;
  text-align: center;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255,255,255,0.7);
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

const FormNumberInput = styled(InputNumber)`
  max-width: 550px!important;
  width: 100%;
  height: 45px;
  border: none;
  background-color: #F6F8F9;
  border-radius: 5px;
  font-family: Proxima Nova;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 17px;
  color: #404950;
  .ant-input-number-input {
    height: 45px;
  }
`;

const InputStyle = styled(Input)`
  width: 100%;
  padding: 8px 12px;
`;

const TextAreaInput = styled(Input.TextArea)`
  width: 100%;
  padding: 8px 12px;
  max-width: 550px!important;
  height: 97px!important;
  background: #F6F8F9;
  border: none;
  border-radius: 5px;
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
  height: 50px;
  width: 100%;
  box-shadow: 0px -5px 30px rgba(64, 73, 80, 0.07);
  border-radius: 0px 0px 5px 5px;
  margin-top: auto;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 20px;
`;

const FormLayout = styled(Form)`
  max-width: 950px;
  height: 700px;
  box-shadow: 0px 2px 8px rgba(64, 73, 80, 0.15);
  background: white;
  border-radius: 5px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding-top: 30px;
`;

const CustomLabel = styled(Text)`
  font-family: Proxima Nova;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 150%;
  color: #404950;
`;

const InputTabs = styled(Tabs)`
  margin-left: 35px;
  .ant-tabs-nav {
    width: 141px;
    margin-right: 93px;
    .ant-tabs-tab {
      padding-top: 7px!important;
      padding-bottom: 7px!important;
      .ant-tabs-tab-btn {
        font-family: Proxima Nova;
        font-style: normal;
        font-weight: bold;
        font-size: 14px;
        line-height: 16px;
        color: #0095F8;
      }
    }
  }
  .ant-tabs-content-holder {
    width: 550px;
    border-left: none;
    .ant-tabs-tabpane {
      padding-left: 0!important;
    }
  }

`;

const SubFormTitle = styled.p`
  font-family: Proxima Nova;
  font-style: normal;
  font-weight: bold;
  font-size: 19px;
  line-height: 19px;
  color: #404950;
`;

const FormRow = styled(Row)`
  justify-content: space-between;
`;

const FormItem = styled.div`
  max-width: 265px;
  width: 50%;
`;

const NextStepButton = styled(Button)`
  width: 85px;
  height: 30px;
  background: #80CAFB;
  border-radius: 5px;
  font-family: Proxima Nova;
  font-style: normal;
  font-weight: bold;
  font-size: 15px;
  line-height: 15px;
  text-align: center;
  color: rgba(255, 255, 255, 0.7);
`;

const mapStateToProps = (store) => {
  return {

  };
};

const mapDispatchToProps = {
  getProductCategoryLists,
  getProductSubCategoryLists,
};

export default connect(mapStateToProps, mapDispatchToProps)(newForm);
