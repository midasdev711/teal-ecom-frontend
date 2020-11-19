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
  Typography,
  Radio,
  Modal
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
  productYourShippingCost: 0,
  productShippingRate: 0,
  productEditStatus: "published",
  productTags: [],
  productStock: 0,
  productVariants: [],
  productThumbnailImage: null,
  productImages: [],
  productSEO: {
    title: "",
    description: "",
    // cronicalUrl: "",
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
  productYourShippingCost: 0,
  productShippingRate: 0,
  productEditStatus: "published",
  productTags: [],
  productStock: 0,
  productVariants: [],
  productThumbnailImage: null,
  productImages: [],
  productSEO: {
    title: "",
    description: "",
    // cronicalUrl: "",
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
const ProductSEOInfo = ["title", "description"]

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
  const [variants, setVariants] = useState([]);
  const [productFeaturedImageList, setProductFeaturedImageList] = useState([]);
  const [profit, setProfit] = useState("");
  const [margin, setMargin] = useState("");
  const [unit, setUnit] = useState("kg");
  // const categoryLists = useSelector(state => state.productReducer.categoriesLists)
  // const subCategories = useSelector(state => state.productReducer.subCategoriesLists)
  const loading = useSelector(state => state.productReducer.status)
  const [step, setStep] = useState("1");
  const [variantsData, setVariantsData] = useState([]);
  const [variantsOption, setVariantsOptions] = useState([]);


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
  // useEffect(() => {
  //   setVariantsFlag
  //   let cloneProduct = productDetails
  //   if (VariantsFlag) {
  //     cloneProduct.productVariants = variants
  //     handleProductInventoryTotal()
  //   } else {
  //     cloneProduct.productVariants = []
  //     cloneProduct.productStock = 0
  //   }
  //   setProductDetails(cloneProduct)
  //   setDummyData([dummyData + 1])
  // }, [VariantsFlag])

  const variantsOptionChanged = (e, index, key) => {
    let current = variantsOption;
    current[index][key] = e;
    let keys = [];
    if (current.length > 0) {
      keys = current[0].values;
    }
    if (current.length > 1 && current[1].values.length > 0) {
      let tmp = Object.assign([], keys);
      keys = [];
      for (let j = 0; j < current[0].values.length; j ++) {
        for (let i = 0; i < current[1].values.length; i ++) {
          keys.push(`${current[0].values[j]} / ${current[1].values[i]}`);
        }
      }
    }
    if (current.length > 2 && current[2].values.length > 0) {
      let tmp = Object.assign([], keys);
      keys = [];
      for (let j = 0; j < tmp.length; j ++) {
        for (let i = 0; i < current[2].values.length; i ++) {
          keys.push(`${tmp[j]} / ${current[2].values[i]}`);
        }
      }
    }
    let variantData = [];
    for (let i = 0; i < keys.length; i ++) {
      variantData.push({selected: false, variant: keys[i], price: 0, quantity: 0, sku: null})
    }
    setVariantsData([...variantData]);
    setVariantsOptions([...current]);
  }

  const variantsDataChanged = (e, index, key) => {
    let current = variantsData;
    variantsData[index][key] = e;
    setVariantsData([...current]);
  }

  const handleImageUpload = (value) => {
    setImagesFileList(value)
    let cloneProduct = productDetails
    cloneProduct.productImages = value
    if (value.length > 0) {
      cloneProduct.productThumbnailImage = value[0]
      cloneProduct.productFeaturedImage = value[0]
    } else {
      cloneProduct.productThumbnailImage = null
      cloneProduct.productFeaturedImage = null
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
      } else if (names === "yourShippingCost") {
        cloneProduct.productYourShippingCost = event === null ? "" : event
        setProductDetails(cloneProduct)
        handleValidation(names)
        handleProfitAndMargin()
      } else if (names == "productShippingRate") {
        cloneProduct.productShippingRate = event === null ? "" : event
        setProductDetails(cloneProduct)
        handleValidation(names)
      } else if (names === "attributeValues") {
        cloneproductAttributes[names] = [`${event}`, `${unit}`]
        cloneProduct.productAttributes[0] = cloneproductAttributes
        setProductDetails(cloneProduct)
        handleAttributesValidation(names)
      } else if (names === 'SEO') {
        if (name == SEO) {
          cloneProduct.productSEO[name] = value
          setProductDetails(cloneProduct)
        }
      } else if (names == "productTags") {
        cloneProduct.productTags = event
        setProductDetails(cloneProduct)
      } else {
        cloneproductAttributes[names] = event
        cloneProduct.productAttributes[0] = cloneproductAttributes
        setProductDetails(cloneProduct)
        handleAttributesValidation(names)
      }

    }
    if (names === 'SEO') {
      if (name == SEO) {
        error = validation(name, productDetails.productSEO[name]);
      }
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
    console.log(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    let payload = Object.assign({}, productDetails);
    payload['productShippingRate'] = shippingRate == 2 ? payload['productYourShippingRate'] : payload['productShippingRate'];
    if (info === "save") {
      submit(payload)
    } else {
      saveSubmit(payload)
    }
    setDummyData([dummyData + 1])
  }
  //console.log('errors', errors)
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
    let current = variantsOption;
    if (current.length < 3) {
      current.push({option: "", values: []});
      setVariantsOptions([...current]);
    }
    // handleProductInventoryTotal()
  }

  const handleCheckBox = (event) => {
    const values = event.target.checked
    setVariantsFlag(values)
    setVariantsOptions([{option: '', values: []}])
    // setDummyData([dummyData + 1])
    // handleProductInventoryTotal()
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
    if (currentStep < 7) {
      setStep('' + (currentStep + 1));
    } else {
      handleSubmit('save');
    }
  }

  const handleOk = () => {
    let cloneProduct = Object.assign({}, productDetails)
    for (let i = 0; i < variantsData.length; i ++) {
      let tmp = Object.assign({}, variantsData[i]);
      delete tmp['selected'];
      cloneProduct.productVariants.push(tmp)
    }
    console.log(variantsData, cloneProduct)
    // setProductDetails(value =>({
    //   ...value,
    //   productVariants: [...variantsData]
    // }))
    setVariantsFlag(false);
    // handleValidation('')
  }

  const handleCancel = () => {
    setVariantsData([]);
    setVariantsOptions([]);
    setVariantsFlag(false);
  }

  const onTabClick = (e) => {
    setStep('' + e);
  }

  const [showUnitSelection, setShowUnitSelection] = useState(false);
  const [shippingRate, setShippingRate] = useState(0);

  const setShippingRateOption = (e) => {
    if (e == 1) {
      handleChange(0, "productShippingRate");
    }
  }

  const categoryLists = [{
    ID: 1,
    name: 'Consumer Goods'
  },{
    ID: 2,
    name: 'Convenience'
  },{
    ID: 3,
    name: 'Shopping'
  }]

  const subCategories = [{
    ID: 4,
    name: 'Foods'
  },{
    ID: 5,
    name: 'Convenience'
  },{
    ID: 6,
    name: 'Shopping'
  }]

  useEffect(() => {
    console.log('productDetails', productDetails)
  }, [productDetails])

  const saveAsDraft = () => {
    handleSubmit("save")
  }

  const saveAndPublish = () => {
    handleSubmit("saveAndPublish")
  }

  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={() => saveAsDraft()}>
        Save as draft
      </Menu.Item>
      <Menu.Item key="2" onClick={() => saveAndPublish()}>
        Save &amp; Publish
      </Menu.Item>
    </Menu>
  )

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
            <label style={{ color: "red" }} >{errors?.productImages}</label>
          </ContentBox>
        </TabPane>
        <TabPane tab="Pricing" key="3">
          <ContentBox>
            <SubFormTitle>Pricing</SubFormTitle>
            <FormRow>
              <FormItem>
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
              </FormItem>
              <FormItem>
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
              </FormItem>
            </FormRow>
            <FormRow>
              <FormItem>
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
              </FormItem>
              <FormItem>
                <CustomLabel>Your shipping cost</CustomLabel>
                <Form.Item>
                  <FormNumberInput
                    min={0}
                    onChange={(event) => handleChange(event, "yourShippingCost")}
                    placeholder="0.00"
                    formatter={(value) =>
                      `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                  />
                  <label style={{ color: "red" }} >{errors?.yourShippingCost}</label>
                  {/* <span>Customers won’t see this</span> */}
                </Form.Item>
              </FormItem>
            </FormRow>
            <FormRow marginbottom={11}>
              <div className="mb-3">
                <TextStyle>Margin</TextStyle>
                <span>: {margin.trim()} | </span>
                <TextStyle>Profit</TextStyle>
                <span>: {profit}</span>
              </div>
            </FormRow>
            <FormRow>
              <Checkbox>Charge tax on this product</Checkbox>
            </FormRow>
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
            <FormRow>
              <FormItem>
                <CustomLabel>WEIGHT</CustomLabel>
                <Form.Item>
                  <FormNumberInput min={0} name="attributeValues" onChange={(event) => { setShowUnitSelection(true); handleChange(event, "attributeValues")}} />
                  <label style={{ color: "red" }} >{errors?.attributeValues}</label>
                </Form.Item>
              </FormItem>
              {
                showUnitSelection && 
                <FormItem>
                  <CustomLabel>Unit</CustomLabel>
                  <Form.Item name="" initialValue="kg">
                    <FormSelect onChange={(event) => handleDropDown(event, "attributeValues")}>
                      <FormSelectOption value="lb">lb</FormSelectOption>
                      <FormSelectOption value="oz">oz</FormSelectOption>
                      <FormSelectOption value="kg">kg</FormSelectOption>
                      <FormSelectOption value="g">g</FormSelectOption>
                    </FormSelect>
                  </Form.Item>
                </FormItem>
              }
            </FormRow>
            <SubFormTitle fontSize={17}>Shipping Rates</SubFormTitle>
            <Form.Item>
              <Radio.Group onChange={(event) => { setShippingRate(event.target.value); setShippingRateOption(event.target.value)}} value={shippingRate}>
                <FormRadio value={1}>
                  Free
                </FormRadio>
                <FormRadio value={2}>
                  Calculate automatically based on my Shipping Settings
                </FormRadio>
                <FormRadio value={3}>
                  Flat rate <br></br>
                  <FormRadioInput disabled={shippingRate != 3} min={0} name="productShippingRate" onChange={(event) => { handleChange(event, "productShippingRate")}} />
                  <label style={{ color: "red" }} >{errors?.flatRate}</label>
                  <FormRadioText>This product will always be charged a flat rate unless otherwise specified in your Shipping Settings.</FormRadioText>
                </FormRadio>
              </Radio.Group>
            </Form.Item>
          </ContentBox>
        </TabPane>
        <TabPane tab="Variants" key="6">
          <ContentBox>
            <SubFormTitle>Variants</SubFormTitle>
            <CheckboxWrapper marginbottom={15}>
              <Checkbox
                onChange={(event) => handleCheckBox(event)}
                checked={VariantsFlag}
              >
                This product has different options, like different size or color
              </Checkbox>
            </CheckboxWrapper>
            <VariantModal
              visible={VariantsFlag}
              onCancel={() => handleCancel()}
              footer={[
                <span>{variantsData.length} total variants</span>,
                <div>
                  <Button key="back" className="cancel-button" onClick={() => handleCancel()}>
                    Cancel
                  </Button>
                  <Button key="submit" className="save-button" type="primary" onClick={() => handleOk()}>
                    Next
                  </Button>
                </div>
              ]}
            >
              <SubFormTitle>Variants</SubFormTitle>
              {
                VariantsFlag && variantsOption && variantsOption.length > 0 && variantsOption.map((data, index) => {
                  return (
                  <FormRow key={index}>
                    <FormItem>
                      <CustomLabel>Variant</CustomLabel>
                      <Form.Item key={index}>
                        <FormSelect keys={index} name="variantName" value={variantsOption[index]["option"]} onChange={(event) => variantsOptionChanged(event, index, "option")} placeholder="Select">
                          <FormSelectOption value="size">Size</FormSelectOption>
                          <FormSelectOption value="color">Color</FormSelectOption>
                          <FormSelectOption value="material">Material</FormSelectOption>
                          <FormSelectOption value="style">Style</FormSelectOption>
                          <FormSelectOption value="title">Title</FormSelectOption>
                        </FormSelect>
                      </Form.Item>
                    </FormItem>
                    <FormItem>
                      <CustomLabel>Options</CustomLabel>
                      <Form.Item key={index}>
                        <FormSelect mode="tags" style={{ width: '100%' }} value={variantsOption[index]?.values || []} onChange={(event) => variantsOptionChanged(event, index, "values")} tokenSeparators={[',']}>
                        </FormSelect>
                      </Form.Item>
                    </FormItem>
                  </FormRow>
                  )
                })
              }
              <label style={{ color: "red" }} >{errors?.variantName}</label> <br />
              <label style={{ color: "red" }} >{errors?.variantValues}</label>
              {
                VariantsFlag && variantsOption.length < 3 &&
                <Button
                  className="add-variant"
                  onClick={() => handleAddVariants()}
                >
                  <PlusOutlined /> Add another variant
                </Button>
              }
              <Divider/>
              <SubFormTitle>Your Variants</SubFormTitle>
              {VariantsFlag && variantsData.length > 0 &&
                <VariantTable>
                  <thead>
                    <tr>
                      <th>
                        <Checkbox></Checkbox>
                      </th>
                      <th><VariantTableText>Variant</VariantTableText></th>
                      <th className="price-header"><VariantTableText>Price</VariantTableText></th>
                      <th className="quantity-header"><VariantTableText>Quantity</VariantTableText></th>
                      <th className="sku-header"><VariantTableText>SKU</VariantTableText></th>
                    </tr>
                  </thead>
                  <tbody>
                    {variantsData.map((data, index) => {
                      return (
                        <tr key={'variant' + index}>
                          <td><Checkbox></Checkbox></td>
                          <td><VariantTableText>{data.variant}</VariantTableText></td>
                          <td className="price"><FormNumberInput maxWidth={135} onChange={(event) => variantsDataChanged(event, index, 'price')}></FormNumberInput></td>
                          <td className="quantity"><FormNumberInput maxWidth={90} onChange={(event) => variantsDataChanged(event, index, 'quantity')} ></FormNumberInput></td>
                          <td className="sku"><FormNumberInput maxWidth={80} onChange={(event) => variantsDataChanged(event, index, 'sku')} ></FormNumberInput></td>
                        </tr>
                      )
                    })}
                  </tbody>
                </VariantTable>
              }
            </VariantModal>
          </ContentBox>
        </TabPane>
        <TabPane tab="SEO &amp; Tags" key="7">
          <ContentBox>
            <AlignItem className="margin-bottom">
              <SubFormTitle>SEO &amp; Tags</SubFormTitle>
              {!openEditSite && (
                <ContentTitle onClick={() => setOpenEditSite(!openEditSite)}>
                  Edit website SEO
                </ContentTitle>
              )}
            </AlignItem>
            <CheckboxWrapper marginbottom={15}>
              <Checkbox>Auto optimize for SEO</Checkbox>
            </CheckboxWrapper>
            {openEditSite && (
              <>
                <FormItem fullWidth={true}>
                  <Form.Item>
                    <CustomLabel>Page title</CustomLabel>
                    <TextInput name="title" onChange={(event) => handleChange(event, 'SEO')} placeholder="Page title"></TextInput>
                    <label style={{ color: "red" }} >{errors?.title}</label>
                  </Form.Item>
                </FormItem>
                <FormItem fullWidth={true}>
                  <Form.Item name="description">
                    <CustomLabel>Description</CustomLabel>
                    <TextAreaInput rows={2} name="description" placeholder="Add a brief description" onChange={(event) => handleChange(event, 'SEO')} />
                    <label style={{ color: "red" }} >{errors?.description}</label>
                  </Form.Item>
                </FormItem>
                {/* <TitleStyle className="margin-top">URL and handle</TitleStyle>
                <InputStyle prefix="https://sale.mysolidshoes.com/products/" name="cronicalUrl" onChange={(event) => handleChange(event)} />
                <label style={{ color: "red" }} >{errors?.cronicalUrl}</label> */}
              </>
            )}
            <CustomLabel>Tags</CustomLabel>
            <Form.Item>
              <FormSelect mode="tags" maxWidth={550} placeholder="Add product tags separated by commas" onChange={(event) => handleChange(event, "productTags")} tokenSeparators={[',']}>
              </FormSelect>
            </Form.Item>
            <label style={{ color: "red" }} >{errors?.productTags}</label>
          </ContentBox>
        </TabPane>
      </InputTabs>
      <ActionBottom>
        {
          step == "7" ?
          <Dropdown overlay={menu} trigger={['click']}>
            <NextStepButton width={100}>
              Complete
            </NextStepButton>
          </Dropdown> :
          <NextStepButton type="primary" onClick={() => nextStep()}>
            Next
          </NextStepButton>
        }
      </ActionBottom>
    </FormLayout>
  );
};

const ContentBox = styled.div`
  padding-right: ${props => props.paddingRight ? props.paddingRight : 0}px;
  margin-top: ${(props) => (props.marginTop ? props.marginTop : "0px")};
`;

const AlignItem = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ContentTitle = styled.h4`
  color: rgb(0, 122, 206);
  font-size: 14px;
  cursor: pointer;
  text-align: ${(props) => (props.align ? props.align : "right")};
  font-weight: 400;
  margin-bottom: 5px;
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
      display: flex;
      align-items: center;
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

const TextStyle = styled.span`
  margin: 0;
  font-family: Proxima Nova;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 150%;
  color: #404950;
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

const FormNumberInput = styled(InputNumber)`
  max-width: ${props => props.maxWidth ? props.maxWidth : '550'}px!important;
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

const TextAreaInput = styled(Input.TextArea)`
  width: 100%;
  padding: 8px 12px;
  max-width: 550px!important;
  height: 97px!important;
  background: #F6F8F9;
  border: none;
  border-radius: 5px;
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
  font-size: ${props => props.fontSize ? props.fontSize : '19'}px;
  line-height: ${props => props.fontSize ? props.fontSize : '19'}px;
  color: #404950;
`;

const FormRow = styled(Row)`
  justify-content: space-between;
  margin-bottom: ${props => props.marginbottom ? props.marginbottom : '0'}px;
`;

const FormItem = styled.div`
  max-width: ${props => props.fullWidth ? '100%' : '265px'};
  width: 100%;
  .ant-form-item {
    margin-bottom: 15px;
  }
`;

const NextStepButton = styled(Button)`
  width: ${props => props.width ? props.width: '85'}px;
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

const FormRadio = styled(Radio)`
  width: 550px;
  background: #F6F8F9;
  border: 1px solid #F6F8F9;
  box-sizing: border-box;
  border-radius: 5px;
  margin-bottom: 15px;
  font-family: Proxima Nova;
  font-style: normal;
  font-weight: normal;
  font-size: 15px!important;
  line-height: 17px;
  color: #404950;
  padding: 15px;
`;

const FormRadioInput = styled(InputNumber)`
  max-width: 265px!important;
  background: #FFFFFF;
  width: 100%;
  height: 45px;
  border: none;
  border-radius: 5px;
  font-family: Proxima Nova;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 17px;
  color: #404950;
  margin-top: 10px;
  margin-left: 24px;
  .ant-input-number-input {
    height: 45px;
  }
`;

const FormRadioText = styled.div`
  font-family: Proxima Nova;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 150%;
  color: #404950;
  margin-left: 24px;
  margin-top: 10px;
  max-width: 450px;
  white-space: break-spaces;
`;

const CheckboxWrapper = styled.div`
  width: 100%;
  max-width: 550px;
  height: 50px;
  background: #F6F8F9;
  border: 1px solid #F6F8F9;
  border-radius: 5px;
  padding: 15px;
  margin-bottom: ${(props) => (props.marginbottom ? props.marginbottom : "0")}px;
`;

const VariantTable = styled.table`
  width: 100%;
  thead {
    th.price-header {
      max-width: 155px;
    }

    th.quantity-header {
      max-width: 110px;
    }

    th.sku-header {
      max-width: 80px; 
    }
  }

  td, th {
    padding-top: 17px;
    padding-bottom: 17px;
  }

  tr {
    border-bottom: 1px solid #BAC3C9;
  }
`;

const VariantTableText = styled(Text)`
  font-family: Proxima Nova;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 144.89%;
  color: #404950;
`;

const VariantModal = styled(Modal)`
  width: 600px!important;
  height: 615px;
  .ant-modal-body {
    overflow-y: auto;
    height: 565px;
    .add-variant {
      font-family: Proxima Nova;
      font-style: normal;
      font-weight: bold;
      font-size: 14px;
      line-height: 150%;
      color: #0095F8;
      padding: 0;
      border: none;
      box-shadow: none;
    }
  }
  .ant-modal-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0px -5px 30px rgba(64, 73, 80, 0.07);
    >span {
      font-family: Proxima Nova;
      font-style: normal;
      font-weight: bold;
      font-size: 14px;
      line-height: 14px;
      color: #404950;
    }
    button {
      width: 85px;
      height: 30px;
      font-family: Proxima Nova;
      font-style: normal;
      font-weight: bold;
      font-size: 15px;
      line-height: 15px;
      text-align: center;
      &.save-button {
        background: #80CAFB;
        border-radius: 5px;
        color: rgba(255, 255, 255, 0.7);
      }
      &.cancel-button {
        color: #FF0000;
        border: 1px solid #FF0000;
        border-radius: 5px;
      }
    }
  }
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
