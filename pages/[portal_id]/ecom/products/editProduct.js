import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Link from "next/link";
import { TweenOneGroup } from "rc-tween-one";
import { CountryDropdown } from "react-country-region-selector";

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
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
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
import { connect, useSelector } from "react-redux";
import product, { getProductCategoryLists, getProductSubCategoryLists, getMerchantProductByID, UpdateMerchantProduct } from "../../../../src/redux/actions/product";

import validation from "../../../../src/utils/validation";
import { ManageSalesMD } from "../../../../src/components/products/Modals";
import { useRouter } from 'next/router'
import { dateFormat } from "../../../../src/utils";
import moment from 'moment';

import EditProductsImages from "./editProductImage"

const { Search } = Input;
const { Option } = Select;
const { Dragger } = Upload;
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
    productCategory: null,
    productSubcategory: null,
    productTotalQuantity: "",
    productStartDate: "",
    productEndDate: "",
    productFeaturedImage: null,
    productAttributes: [{
        attributeName: "productWeight",
        attributeValues: []
    }],
    productExistingImages: []
}

const antIcon = <LoadingOutlined style={{ fontSize: 30 }} spin />;
const ProductSEOInfo = ["title", "description", "cronicalUrl"]
const clearData = {
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
    productCategory: null,
    productSubcategory: null,
    productTotalQuantity: "",
    productStartDate: "",
    productEndDate: "",
    productFeaturedImage: null,
    productAttributes: [{
        attributeName: "productWeight",
        attributeValues: []
    }],
    productExistingImages: []
}

const ProductDetail = ({ productName, submit, flag, getProductCategoryLists, saveSubmit, saveFlag, getProductSubCategoryLists, getMerchantProductByID, UpdateMerchantProduct }) => {
    const [visiable, setVisible] = useState(false);
    const [getFlag, setGetFlag] = useState(false);
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
    const router = useRouter()
    const { productId } = router.query
    const merchantProductDetails = useSelector(state => state.productReducer.productById)
    const [oldImagesData, setOldImagesData] = useState([]);
    const apiResponse = useSelector(state => state.productReducer.status)
    //console.log('loading', loading)
    //console.log('merchantProductDetails', merchantProductDetails)
    //console.log('subCategories', subCategories)
    //console.log('categoryLists', categoryLists)
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
    //console.log('productInfo', productInfo)
    useEffect(() => {
        getMerchantProductByID((productId * 1))
    }, [getFlag || productId])
    useEffect(() => {
        handleProfitAndMargin()
    }, [productDetails])
    // useEffect(() => {
    //    if(apiResponse === "updated"){
    //     productInfo = clearData
    //     setProductDetails(clearData)
    //    }
    // }, [apiResponse])
    useEffect(() => {
       if(apiResponse === "start"){
        setLoadingFlag(true)
   }else{
    setLoadingFlag(false)
       }
    }, [apiResponse])
    useEffect(() => {
        let image = []
        let data = { ...productDetails }
        data.productImages.length > 0 ? (
            // console.log('inside'),
            data.productImages.map((data1, index) => {
                // console.log('data1', data1)
                if (data1 === undefined || data1 === "undefined") {

                } else {
                    image.push(data1)
                }
            }),
            //  console.log('image', image),
            data.productImages = image,
            // data.productThumbnailImage = data.productExistingImages.length > 0 ? (delete data.productThumbnailImage) : (image[0]),
            // data.productFeaturedImage = data.productExistingImages.length > 0 ? ("") : (image[0]),
            //  console.log('data', data),
            //  console.log('image', image),
            setProductDetails(data),
            setDummyData([dummyData + 1])
        ) : ("")
    }, [imagesFileList])
    useEffect(() => {
        if (merchantProductDetails && merchantProductDetails !== undefined && merchantProductDetails.length > 0) {
            let cloneData = productDetails
            let cloneDataProduct = merchantProductDetails[0]
            cloneData.productTitle = cloneDataProduct.title
            productName(cloneDataProduct.title)
            cloneData.productDescription = cloneDataProduct.description
            //  cloneData.productImages = cloneDataProduct.images
            cloneData.productExistingImages = cloneDataProduct.images

            setOldImagesData(cloneDataProduct.images)

            cloneDataProduct.featuredImage !== "" && cloneDataProduct.featuredImage !== undefined && cloneDataProduct.featuredImage !== null ? (
                setProductFeaturedImageList([{
                    uid: 1,
                    name: `${cloneDataProduct.featuredImage}`,
                    status: 'done',
                    url: `${cloneDataProduct.featuredImage}`
                }])
            ) : (setProductFeaturedImageList([]))

            cloneData.productSalePrice = cloneDataProduct?.salePrice || 0
            cloneData.productMRP = cloneDataProduct?.mrp || 0
            cloneData.productCostPerItem = cloneDataProduct?.productCost || 0
            cloneData.productSKU = cloneDataProduct?.sku || 0
            cloneData.productTotalQuantity = cloneDataProduct?.totalQuantity || 0
            cloneData.productEndDate = cloneDataProduct?.endDate || ""
            cloneData.productStartDate = cloneDataProduct?.startDate || ""
            cloneData.isPublish = cloneDataProduct?.isPublish || "false"
            // cloneData.productVariants =  cloneDataProduct.variants
            cloneData.productAttributes[0].attributeName = cloneDataProduct?.attributes.length > 0 ? cloneDataProduct.attributes[0].attributeName : ""
            cloneData.productAttributes[0].attributeValues = cloneDataProduct?.attributes.length > 0 ? cloneDataProduct.attributes[0].attributeValues : 0
            cloneData.productSEO.title = cloneDataProduct?.seo.title || ""
            cloneData.productSEO.description = cloneDataProduct?.seo.description || ""
            cloneData.productSEO.cronicalUrl = cloneDataProduct?.seo.cronicalUrl || ""
            cloneData.productSlug = cloneDataProduct?.slug || ""
            cloneData.productTags = cloneDataProduct?.tags || []
            cloneData.productMerchantID = cloneDataProduct?.merchantID || ""
            cloneData.productMerchantName = cloneDataProduct?.merchantName || ""
            cloneData.productStock = cloneDataProduct?.stock || 0
            //  cloneData.productThumbnailImage = cloneDataProduct.thumbnailImage
             cloneData.productCategory = cloneDataProduct?.category || null
             cloneData.productSubcategory = cloneDataProduct?.subCategory || null
            // cloneData.productCategory = cloneDataProduct?.category.length > 0 ? cloneDataProduct.category[0].ID : null
            // cloneData.productSubcategory = cloneDataProduct?.subCategory.length > 0 ? cloneDataProduct.subCategory[0].ID : null
            cloneData.ID = cloneDataProduct.ID || ""
            cloneData._id = cloneDataProduct._id || ""

            setDummyData([dummyData + 1])
            setTags(cloneDataProduct.tags)
            let cloneVariant = []
            if (cloneDataProduct.variants && cloneDataProduct.variants.length > 0) {
                if (cloneDataProduct.variants[0].variantName !== null || cloneDataProduct.variants[0].variantValues !== null || cloneDataProduct.variants[0].variantValues !== "" || cloneDataProduct.variants[0].variantName !== "") {

                    cloneDataProduct.variants.map((data, index) => {
                        cloneVariant.push({
                            variantName: data.variantName,
                            variantValues: data.variantValues,
                        })
                    })
                    cloneData.productVariants = cloneVariant
                    //    console.log('cloneVariant', cloneVariant)
                    setVariants(cloneVariant)
                    setVariantsFlag(true)
                } else {
                    setVariantsFlag(false)
                }
            }

            setProductDetails(cloneData)

        }
    }, [merchantProductDetails])

    useEffect(() => {
        setErrors({})
    }, [clearFlag])
    useEffect(() => {
        productName(productDetails.productTitle)
    }, [dummyData])
    useEffect(() => {
        if (loading === "start") {
            setLoadingFlag(true)
        } else {
            setLoadingFlag(false)
        }
    }, [loading])
    useEffect(() => {
        if (flag !== "" && flag !== undefined) {
            handleSubmit("save")
        }
    }, [flag])
    useEffect(() => {
        if (saveFlag !== "" && saveFlag !== undefined) {
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

    // useEffect(() => {
    //     getProductCategoryLists()
    // }, [getFlag])

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
            cloneProduct.productStock = ""
        }
        setProductDetails(cloneProduct)
        setDummyData([dummyData + 1])
    }, [VariantsFlag])


    const handleProductsImages = (value) => {
        setImagesFileList(value)
        let cloneProduct = { ...productDetails }
        cloneProduct.productImages = value
        if (value.length > 0) {
            cloneProduct.productThumbnailImage = value[0]
        } else {
            delete cloneProduct.productThumbnailImage
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
        // console.log(date?._d);
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
                    //  console.log('file inside base 64', file)
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
            // console.log('data available')
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

    const handleClose = (removedTag) => {
        const removeTags = tags.filter((tag) => tag !== removedTag);
        setTags(removeTags);
    };
    const handleValidation = (name) => {
        //console.log('name validatiojn', name)
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
        //  console.log('info', info)
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
    const tagChild = tags?.length > 0 && tags.map(forMap);
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
        //  console.log('event', event)
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
        //  console.log('values', values)

        setVariantsFlag(values)
        setDummyData([dummyData + 1])
        handleProductInventoryTotal()
    }
    const handleChangeVariants = (event, index, names) => {
        //  console.log('event', event)
        let cloneProductDetails = productDetails
        let cloneVariant = variants
        if (names !== undefined) {
            let cloneProductDetails = productDetails
            let cloneVariant = variants

            cloneVariant[index][names] = event === null ? ("") : (event.toString())
        } else {
            const { name, value } = event.target
            //   console.log('name , value', name, value)
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
        console.log('InventoryTotal', inventoryTotal)
    }
    const handleProductCompareAtPrice = () => {
        // console.log('method called')
        let cloneProduct = productDetails
        let actualPrice = cloneProduct.productSalePrice * 1
        let MrpValue = actualPrice * 80 / 100
        let productMrpValues = actualPrice + MrpValue
        // console.log('MrpValue', MrpValue)
        //  console.log('productMrpValues', productMrpValues)
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
    const handleProductWeight = () => {
        let values = 0
        productDetails?.productAttributes !== null && productDetails?.productAttributes.length > 0 && productDetails?.productAttributes.map((data, index) => {
            if (data.attributeName === "productWeight") {
                values = data.attributeValues === null && data.attributeValues === undefined ? 0 : data.attributeValues
            } else {
                values = 0
            }
        })
        return values
    }
    const handleCategory = (value) => {
        let categoryValue = "Select"
        let cateName
        if (categoryLists.length) {
            if (value !== undefined && value !== "") {
                let cloneProduct = { ...productDetails }
                let catId = cloneProduct.productCategory !== null ? cloneProduct.productCategory : null
                if (catId !== null && catId !== "") {
                    if (!subCategories.length) {
                        getProductSubCategoryLists(catId)
                    }

                    cateName = categoryLists.find(({ ID }) => ID == catId)
                }
            }
            let name = cateName?.name
            if (cateName !== undefined) {
                return name
            } else {
                return categoryValue
            }
        } else {
            getProductCategoryLists()
            return categoryValue
        }
    }
    const handleSubCategory = (value) => {
        let categoryValue = "Select"
        let cateName
        if (subCategories.length) {
            if (value !== undefined && value !== "") {
                let cloneProduct = { ...productDetails }
                let catId = cloneProduct.productSubcategory !== null ? cloneProduct.productSubcategory : null

                if (catId !== null && catId !== "") {
                    cateName = subCategories.find(({ ID }) => ID == catId)
                }
            }
            let name = cateName?.name

            if (cateName !== undefined) {
                return name
            } else {
                return categoryValue
            }
        } else {
            return categoryValue
        }
    }
    const handleDeletedImages = (value) => {

        let cloneProduct = { ...productDetails }
        let index
        cloneProduct.productExistingImages.length > 0 ? (
            index = cloneProduct.productExistingImages.findIndex((name) => name === value.name),
            index !== -1 ? (cloneProduct.productExistingImages.splice(index, 1)) : (""),
            setProductDetails(cloneProduct)

        ) : ("")
    }
    return (

        <Form
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            className="form-new"
            layout="vertical"
        >
            {loadingFlag ? (<Loader className="loader_wrap"> <Spin indicator={antIcon} />   </Loader>) : ("")}
            <SubForm>
                <Row gutter={24} className="margin-bottom">
                    <Col md={16}>
                        <ContentBox>
                            <Form.Item label="Title" name="productTitle" >
                                <TextInput value={productDetails?.productTitle || ""} name="productTitle" onChange={(event) => handleChange(event)} placeholder="Short sleeve t-shirt" />
                                <label style={{ color: "red" }} >{errors?.productTitle}</label>
                            </Form.Item>
                            <TitleStyle>Description</TitleStyle>
                            <DescriptionContent>
                                <TextAreaStyle value={productDetails?.productDescription || ""} rows={2} name="productDescription" onChange={(event) => handleChange(event)} />
                                <label style={{ color: "red" }} >{errors?.productDescription}</label>
                                {/* <RemirorEditor /> */}
                            </DescriptionContent>
                        </ContentBox>
                        <ContentBox marginTop="20px">
                            <EditProductsImages imageData={(value) => handleProductsImages(value)} existImages={oldImagesData} deletedImage={(value) => handleDeletedImages(value)} />
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
                            <label style={{ color: "red" }} >{errors?.productFeaturedImage}</label>

                        </ContentBox>
                        <CardStyle>
                            <TitleCardStyle>Pricing</TitleCardStyle>
                            <Row gutter={24}>
                                <Col md={12}>
                                    <Form.Item label="Price">
                                        <InputNumberStyle
                                            min={0}
                                            onChange={(event) => handleChange(event, "productSalePrice")}
                                            placeholder="0.00"
                                            formatter={(value) =>
                                                `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                            }
                                            value={productDetails?.productSalePrice || 0}
                                        />
                                        <label style={{ color: "red" }} >{errors?.productSalePrice}</label>

                                    </Form.Item>
                                </Col>
                                <Col md={12}>
                                    <Form.Item label="Compare at price">
                                        <InputNumberStyle
                                            value={productDetails?.productMRP || 0}
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
                                    <Form.Item label="Cost per item">
                                        <InputNumberStyle
                                            value={productDetails?.productCostPerItem || ""}
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
                        </CardStyle>

                        <CardStyle>
                            <TitleCardStyle>Inventory</TitleCardStyle>

                            <Row gutter={24}>
                                <Col md={12}>
                                    <Form.Item label="SKU (Stock Keeping Unit)">
                                        <InputStyle value={productDetails?.productSKU || ""} name="productSKU" onChange={(event) => handleChange(event)} />
                                        <label style={{ color: "red" }} >{errors?.productSKU}</label>

                                    </Form.Item>
                                </Col>
                                {/* <Col md={12}>
                  <Form.Item label="Product Inventory">
                    <InputStyle name="productInventory" disabled />

                    <label style={{ color: "red" }} >{errors?.InventorySKU}</label>

                  </Form.Item>
                </Col> */}
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
                                            value={productDetails?.productTotalQuantity || 0}
                                            min={0}
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
                                        <InputNumberStyle value={handleProductWeight()} min={0} name="attributeValues" onChange={(event) => handleChange(event, "attributeValues")} />
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
                        </CardStyle>
                        <ContentBox marginTop="20px">
                            <TitleBox>Variants</TitleBox>
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
                                            <Form.Item label="Variant Name" >
                                                <TextInput name="variantName" value={variants[index]?.variantName || ""} onChange={(event) => handleChangeVariants(event, index)} placeholder="Enter variant name" />
                                                {/* <label style={{ color: "red" }} >{errors?.productTitle}</label> */}
                                            </Form.Item>
                                        </Col>
                                        <Col md={9} style={{ marginLeft: "25px" }}>
                                            <Form.Item label="Variant Value" >
                                                <InputNumberStyle
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
                                    <InputStyle value={productDetails?.productSEO?.title || ""} name="title" onChange={(event) => handleChange(event)} />
                                    <label style={{ color: "red" }} >{errors?.title}</label>

                                    <TextStyle> 0 of 70 characters used</TextStyle>
                                    <TitleStyle className="margin-top">Description</TitleStyle>
                                    <TextAreaStyle value={productDetails?.productSEO?.description || ""} rows={5} name="description" onChange={(event) => handleChange(event)} />
                                    <label style={{ color: "red" }} >{errors?.description}</label>
                                    <TextStyle> 0 of 320 characters used</TextStyle>
                                    <TitleStyle className="margin-top">URL and handle</TitleStyle>
                                    <InputStyle value={productDetails?.productSEO?.cronicalUrl || ""} prefix="https://sale.mysolidshoes.com/products/" name="cronicalUrl" onChange={(event) => handleChange(event)} />
                                    <label style={{ color: "red" }} >{errors?.cronicalUrl}</label>

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

                                                {
                                                    productDetails.productStartDate === "" || productDetails.productStartDate === null ? (
                                                        <DatePicker
                                                            className="date-picker"
                                                            onChange={(date) => onChangeDate(date, "productStartDate")}

                                                        />
                                                    ) : (
                                                            <DatePicker
                                                                className="date-picker"
                                                                onChange={(date) => onChangeDate(date, "productStartDate")}
                                                                defaultValue={moment(dateFormat(productDetails.productStartDate || ""))}
                                                            />
                                                        )
                                                }

                                                {

                                                    productDetails.productEndDate === "" || productDetails.productEndDate === null ? (
                                                        <DatePicker
                                                            className="date-picker"
                                                            onChange={(date) => onChangeDate(date, "productEndDate")}

                                                        />
                                                    ) : (
                                                            <DatePicker
                                                                className="date-picker"
                                                                onChange={(date) => onChangeDate(date, "productEndDate")}
                                                                defaultValue={moment(dateFormat(productDetails.productEndDate || ""))}
                                                            />
                                                        )
                                                }


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
                                        <label style={{ color: "red" }} >{errors?.productStartDate}</label><br />
                                        <label style={{ color: "red" }} >{errors?.productEndDate}</label>
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
                    name="productCategory"
                    onChange={(event)=>handleChange(event)}
                  /> */}
                                    {/* <Form.Item > */}
                                    <Form.Item shouldUpdate>
                                        <Select value={handleCategory(productDetails.productCategory) || ""} onChange={(event) => handleDropDown(event, "productCategory")}>
                                            <Option value="Select" disabled>Select</Option>
                                            {
                                                categoryLists && categoryLists.length > 0 && categoryLists.map((data, index) => {
                                                    return <Option key={index} value={data?.ID}>{data?.name}</Option>
                                                })
                                            }
                                        </Select>
                                        <label style={{ color: "red" }} >{errors?.productCategory}</label>

                                    </Form.Item>
                                </GroupContent>
                                <GroupContent>
                                    <TitleStyle>Product Sub Category</TitleStyle>

                                    {/* <Input
                    placeholder="e.g. Nike"
                    name="productSubcategory"
                    onChange={(event)=>handleChange(event)}
                    
                  /> */}
                                    <Form.Item shouldUpdate>
                                        <Select value={handleSubCategory(productDetails.productSubcategory || "")} onChange={(event) => handleDropDown(event, "productSubcategory")}>
                                            <Option value="Select" disabled>Select</Option>
                                            {
                                                subCategories && subCategories.length > 0 && subCategories.map((data, index) => {
                                                    return <Option key={index} value={data?.ID}>{data?.name}</Option>
                                                })
                                            }

                                        </Select>
                                        <label style={{ color: "red" }} >{errors?.productSubcategory}</label>

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
    getProductSubCategoryLists,
    getMerchantProductByID,
    UpdateMerchantProduct,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);