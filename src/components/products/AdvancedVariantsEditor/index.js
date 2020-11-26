import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Spin, Tabs } from 'antd';
const { TabPane } = Tabs;
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
import { connect, useSelector } from "react-redux";
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

const AdvancedVariantsEditor = (props) => {
    const [errors, setErrors] = useState({});
    const [step, setStep] = useState("1");
    const [profit, setProfit] = useState("");
    const [margin, setMargin] = useState("");
    const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
    const [showUnitSelection, setShowUnitSelection] = useState(false);
    const [shippingRate, setShippingRate] = useState(0);

    const setShippingRateOption = (e) => {
        if (e == 1) {
            props.handleChange(0, selectedVariantIndex, "shippingRate");
        }
    }

    const nextStep = () => {
        let currentStep = parseInt(step);
        if (currentStep < 7) {
            setStep('' + (currentStep + 1));
        } else {
            // handleSubmit('save');
        }
    }

    const handleImageUpload = (value) => {
        props.handleChange(value, selectedVariantIndex, 'images')
        if (value.length > 0) {
            props.handleChange(value[0], selectedVariantIndex, 'thumbnailImage')
            props.handleChange(value[0], selectedVariantIndex, 'featuredImage')
        } else {
            props.handleChange(null, selectedVariantIndex, 'thumbnailImage')
            props.handleChange(null, selectedVariantIndex, 'featuredImage')
        }
    }

    const handlePreviewImages = (value) => {
        props.handleChange(value, selectedVariantIndex, 'previewImages')
    }

    const variantDisplay = props.variantsData.map((variant, index) => {
        return (
            <VariantInfo onClick={() => { setSelectedVariantIndex(index) }} key={'variant' + index}>
                <VariantImage src={variant.thumbnailImage}></VariantImage>
                <span>{variant.name}</span>
            </VariantInfo>
        )
    })

    return (
        <FormLayout
            name="basic"
            className="form-new"
            layout="vertical"
        >
            <Content>
                <VariantsList>
                    <ProductInfo>
                        <ProductImage src={props.product.thumbnailImage}></ProductImage>
                        <span className="title">{props.product.productTitle}</span>
                        <span className="variants">{props.variantsData.length} variants</span>
                    </ProductInfo>
                    {variantDisplay}
                </VariantsList>
                <InputForm>
                    <ContentBox>
                        <SubFormTitle>Pricing</SubFormTitle>
                        <FormRow>
                            <FormItem>
                                <CustomLabel>Price</CustomLabel>
                                <Form.Item>
                                    <FormNumberInput
                                        min={0}
                                        value={props.variantsData[selectedVariantIndex].salePrice}
                                        onChange={(event) => props.handleChange(event, selectedVariantIndex, "salePrice")}
                                        placeholder="0.00"
                                        formatter={(value) =>
                                            `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                        }
                                    />
                                    {/* <label style={{ color: "red" }} >{errors?.productSalePrice}</label> */}
                                </Form.Item>
                            </FormItem>
                            <FormItem>
                                <CustomLabel>Compare Price</CustomLabel>
                                <Form.Item>
                                    <FormNumberInput
                                        min={0}
                                        value={props.variantsData[selectedVariantIndex].mrp}
                                        onChange={(event) => props.handleChange(event, selectedVariantIndex, "mrp")}
                                        placeholder="0"
                                        //  value={productDetails?.productMRP || 0}
                                        formatter={(value) =>
                                            `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                        }
                                    />
                                    {/* <label style={{ color: "red" }} >{errors?.productMRP}</label> */}
                                </Form.Item>
                            </FormItem>
                        </FormRow>
                        <FormRow>
                            <FormItem>
                                <CustomLabel>Cost per item</CustomLabel>
                                <Form.Item>
                                    <FormNumberInput
                                        min={0}
                                        value={props.variantsData[selectedVariantIndex].costPerItem}
                                        onChange={(event) => props.handleChange(event, selectedVariantIndex, "costPerItem")}
                                        placeholder="0.00"
                                        formatter={(value) =>
                                            `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                        }
                                    />
                                    {/* <label style={{ color: "red" }} >{errors?.productCostPerItem}</label> */}
                                    {/* <span>Customers won’t see this</span> */}
                                </Form.Item>
                            </FormItem>
                            <FormItem>
                                <CustomLabel>Your shipping cost</CustomLabel>
                                <Form.Item>
                                    <FormNumberInput
                                        min={0}
                                        value={props.variantsData[selectedVariantIndex].yourShippingCost}
                                        onChange={(event) => props.handleChange(event, selectedVariantIndex, "yourShippingCost")}
                                        placeholder="0.00"
                                        formatter={(value) =>
                                            `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                        }
                                    />
                                    {/* <label style={{ color: "red" }} >{errors?.yourShippingCost}</label> */}
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
                    <ContentBox>
                        <SubFormTitle>Images</SubFormTitle>
                        <ImageUpload index={selectedVariantIndex} existImages={props.variantsData[selectedVariantIndex].previewImages} imageData={(value) => handleImageUpload(value)} savePreviewData={(value) => handlePreviewImages(value)} />
                    </ContentBox>
                    <ContentBox>
                        <SubFormTitle>Inventory</SubFormTitle>
                        <FormRow>
                            <FormItem>
                                <CustomLabel>SKU (Stock Keeping Unit)</CustomLabel>
                                <Form.Item>
                                    <TextInput name="sku" value={props.variantsData[selectedVariantIndex].sku} onChange={(event) => props.handleChange(event.target.value, selectedVariantIndex, "sku")} />
                                    <label style={{ color: "red" }} >{errors?.sku}</label>
                                </Form.Item>
                            </FormItem>
                            <FormItem>
                                <CustomLabel>Available Quantity</CustomLabel>
                                <Form.Item>
                                    <FormNumberInput
                                        min={0}
                                        placeholder="0"
                                        value={props.variantsData[selectedVariantIndex].totalQuantity}
                                        onChange={(event) => props.handleChange(event, selectedVariantIndex, "totalQuantity")}
                                    />
                                    <label style={{ color: "red" }} >{errors?.totalQuantity}</label>
                                </Form.Item>
                            </FormItem>
                        </FormRow>
                    </ContentBox>

                    <ContentBox>
                        <SubFormTitle>Shipping</SubFormTitle>
                        <FormRow>
                            <FormItem>
                                <CustomLabel>WEIGHT</CustomLabel>
                                <Form.Item>
                                    <FormNumberInput value={props.variantsData[selectedVariantIndex].weight} min={0} name="attributeValues" onChange={(event) => { setShowUnitSelection(true); props.handleChange(event, selectedVariantIndex, "weight") }} />
                                    <label style={{ color: "red" }} >{errors?.attributeValues}</label>
                                </Form.Item>
                            </FormItem>
                            {
                                (showUnitSelection || props.variantsData[selectedVariantIndex].weight) &&
                                <FormItem>
                                    <CustomLabel>Unit</CustomLabel>
                                    <Form.Item name="" initialValue="kg">
                                        <FormSelect onChange={(event) => props.handleChange(event, selectedVariantIndex, "weightUnit")}>
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
                            <Radio.Group onChange={(event) => { setShippingRate(event.target.value); setShippingRateOption(event.target.value) }} value={shippingRate}>
                                <FormRadio value={1}>
                                    Free
                            </FormRadio>
                                <FormRadio value={2}>
                                    Calculate automatically based on my Shipping Settings
                            </FormRadio>
                                <FormRadio value={3}>
                                    Flat rate <br></br>
                                    <FormRadioInput disabled={shippingRate != 3} min={0} name="shippingRate" onChange={(event) => { props.handleChange(event, selectedVariantIndex, "shippingRate") }} />
                                    <label style={{ color: "red" }} >{errors?.flatRate}</label>
                                    <FormRadioText>This product will always be charged a flat rate unless otherwise specified in your Shipping Settings.</FormRadioText>
                                </FormRadio>
                            </Radio.Group>
                        </Form.Item>
                    </ContentBox>
                </InputForm>
            </Content>
        </FormLayout>
    );
}

const FormLayout = styled(Form)`
  max-width: 950px;
  height: 700px;
  background: white;
  border-radius: 5px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding-top: 30px;
`;

const Content = styled.div`
  width: 100%;
  display: flex;
`

const VariantsList = styled.div`
  width: 250px;
  margin-right: 100px;
`
const InputForm = styled.div`
  width: 550px;
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

const CustomLabel = styled(Text)`
  font-family: Proxima Nova;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 150%;
  color: #404950;
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

const ContentBox = styled.div`
  margin-bottom: 30px;
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

const ProductImage = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 5px;
  margin-right: 15px;
`;

const ProductInfo = styled.div`
    width: 100%;
    height: 100px;
    background: #F6F8F9;
    border: 1px solid #EDEDED;
    border-radius: 5px;
    margin-bottom: 15px;
    padding: 15px;
    .title {
        font-family: Proxima Nova;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 144.89%;
        color: #404950;
        margin-bottom: 15px;
    }
    .variants {
        font-family: Proxima Nova;
        font-style: normal;
        font-weight: normal;
        font-size: 12px;
        line-height: 144.89%;
        color: #404950;
    }
`;

const VariantInfo = styled(Button)`
    width: 100%;
    height: 60px;
    border: none;
    border-bottom: 1px solid #EDEDED;
    border-radius: 0;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    display: flex;
    align-items: center;
    &:hover {
        background: #F6F8F9;
    }
    span {
        font-family: Proxima Nova;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 144.89%;
        color: #404950;
    }
`;

const VariantImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 5px;
  margin-right: 20px;
`;

export default AdvancedVariantsEditor;
