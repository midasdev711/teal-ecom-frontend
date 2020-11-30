import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { TweenOneGroup } from "rc-tween-one";
import { connect } from "react-redux";
import Link from "next/link";
import { getUserData } from "../../../utils";
import Filters from "../Filters";
// icon
import {
  SearchOutlined,
  FileTextOutlined,
  CreditCardOutlined,
  PlusOutlined,
  CloseOutlined,
} from "@ant-design/icons";
// ui
import {
  Form,
  Input,
  Row,
  Col,
  Button,
  Popover,
  Checkbox,
  Alert,
  Modal,
  Card,
  Divider,
  InputNumber,
  List,
  Tooltip,
  Tag,
  Dropdown,
  Typography,
  Tabs
} from "antd";
import { Formik } from "formik";
import MDSelectProducts from "../MDSelectProducts";
import {
  AddDiscount,
  Taxes,
  AddShipment,
  ViewTags,
  EditEmail,
  ShippingAddress,
} from "../Modal";
import { AddCustomers, resetCustomerStatus, getCustomers } from "../../../redux/actions/customers";
import { AddOrders, resetOrderStatus } from "../../../redux/actions/orders";
import { getUserProductLists } from "../../../redux/actions/product";
import NewForm from '../../customers/NewForm';
import CustomerFilters from '../../customers/Filters';
// import { customer } from "../fakeData";

const { Search } = Input;
const { Text } = Typography;
const { TabPane } = Tabs;

const newForm = (props) => {
  let userData = getUserData()
  const { Products, OrderAmount, ShippingAddresss, DeliveryAddress, PaymentMethod, TransactionID, Notes, Tags, handleChangeValue } = props

  const [visiable, setVisible] = useState(false);
  const [openCustumItem, setopenCustumItem] = useState(false);
  const [searchCustomner, setSearchcustomer] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isOpenSelectProduct, setShowSelectProduct] = useState(false);
  const [listOrders, setListOrders] = useState([]);
  const [subTotal, setSubTotal] = useState(0.0);
  // const [tags, setTags] = useState(["test"]);
  const [inputValue, setInputValue] = useState("");
  const [inputVisible, setInputVisible] = useState(false);
  const [openEmailPopup, setOpenEmailPopup] = useState(false);
  const [openShippingPopup, setOpenShippingPopup] = useState({
    status: false,
    data: {},
    name: null
  });
  const [openViewTagsPopup, setOpenViewTagsPopup] = useState(false);
  const [newCustomerForm, setNewCustomerForm] = useState(false);

  useEffect(() => {
    getCustomersCall();
  }, [props.customerData]);
  useEffect(() => {
    getProductsCall();
  }, []);

  const getCustomersCall = async () => {
    await props.getCustomers();
  };
  const getProductsCall = async () => {
    let userData = getUserData()
    let userId = userData?.ID
    await props.getUserProductLists(userId)
  };

  const content = (data) => {

    const customer = props.customerData === undefined ? [] : props.customerData
    const [customerdata, setCustomerData] = useState([]);
    const UpdateData = () => {
      setCustomerData(customer.filter((res) => !res.BasicDetailsFullName.search(data)));
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
            <PopoverContent key={index} onClick={() => handleChangeValue(res, 'customer')}>
              <StyledAvatar src={res.profile_url} alt="profile image" />
              <div className="customer-infor">
                <p>{res.BasicDetailsFullName}</p>
                <p>{res.BasicDetailsEmail}</p>
              </div>
            </PopoverContent>
          );
        })}
      </div>
    );
  };

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleVisibleChange = (visible) => {
    setVisible(!visiable);
  };


  const showModal = () => {
    setopenCustumItem(!openCustumItem);
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
    let tag = Tags;
    if (inputValue && tag.indexOf(inputValue) === -1) {
      tag = [...tag, inputValue];
    }
    handleChangeValue(tag, 'Tags');
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

  const tagChild = Tags && Tags.map(forMap);

  // Tags modal
  const handleOpenViewTagsPopup = () => {
    setOpenViewTagsPopup(!openViewTagsPopup);
  };

  const handleCloseViewTagsPopup = () => {
    setOpenViewTagsPopup(false);
  };

  // Customer modal
  const handleCancel = (e) => {
    setopenCustumItem(false);
  };

  const handleColsecontact = (e) => {
    handleChangeValue(null, 'customer');
  };

  // Edit email
  const handleEmailEditModal = () => {
    setOpenEmailPopup(!openEmailPopup);
  };

  const handleCloseEmailPopup = () => {
    setOpenEmailPopup(false);
  };

  // Edit address
  const handleShippingEditModal = (value, data) => {
    setOpenShippingPopup({ status: !openShippingPopup.status, data: data, name: value });
  };

  const handleShippingEditValues = (e, data) => {

    let val = openShippingPopup.data
    if (data === 'AddressDetailsMobile' || data === 'AddressDetailsCountry') {
      setOpenShippingPopup({ ...openShippingPopup, ...val, [data]: e })
    } else {
      setOpenShippingPopup({ ...openShippingPopup, ...val, [data]: e.target.value });
    }
  };

  const handleCloseShippingPopup = () => {
    setOpenShippingPopup({ status: false, data: {}, name: null });
  };
  const saveShiipingDetails = (value, flag, element) => {
    handleChangeValue(value, flag, element)
    handleCloseShippingPopup();
  };

  const onChangeTotal = (e, index) => {
    let data = [];
    let subTotal = 0;
    // if (e >= 1) {
    //   Products[index].variants.total_value = e
    //   let _price = Products[index].variants.variantValues * Products[index].variants.total_value
    //   subtotal += _price;
    //   console.log('sssssssssssssssssssssssssssssssssssssss', _price)
    //   handleChangeValue(Products, 'product')
    // setSubTotal(subtotal);
    // }
    if (e >= 1) {
      for (let i = 0; i < Products.length; i++) {
        const item = Products[i];

        if (i === index) {
          item.variants.total_value = e;
          data.push(item);
        } else {
          data.push(item);
        }

        let _price = item.variants.variantValues * item.variants.total_value;
        subTotal += _price;
      }

      handleChangeValue(Products, 'product')
      setSubTotal(subTotal);
    }
  };

  const onAddProductsSearch = (num) => {
    let data = [];
    let subTotal = 0;
    num.map(item => {
      //  let value={...item}

      item.variants.map((val) => {
        let value = { ...item }
        value.variants = {}
        if (val.isChecked) {
          value.variants = val
          subTotal += parseFloat(val.variantValues)
          data.push(value)
        }

      })

    })

    // subTotal += 59.99;

    console.log('****************', data)
    handleChangeValue(data, 'product')
    // setListOrders(data);
    setShowSelectProduct(false);
    setSubTotal(subTotal);
  };

  const onRemoveOrderItem = async (index) => {
    let subTotal = 0;
    let data = await Products.filter((item, i) => {
      if (index !== i) {
        let _price = item.variants.variantValues * item.variants.total_value;
        subTotal += _price;
        return item;
      }
    });
    await handleChangeValue(data, 'product');
    // await setListOrders(data);
    await setSubTotal(subTotal);
  };

  const [step, setStep] = useState('1')
  const [selectedProducts, setSelectedProducts] = useState([]);

  const onTabClick = (e) => {
    setStep('' + e);
  }

  const nextStep = () => {
    let currentStep = parseInt(step);
    if (currentStep < 4) {
      setStep('' + (currentStep + 1));
    } else {
      let pro_data = []
      selectedProducts.map(data => {
        delete data.seo['__typename']
        delete data['_id']
        let newAttributes = data.attributes.map(item => {
          return {
            attributeName: item.attributeName,
            attributeValues: item.attributeValues
          }
        })
        data.attributes = Object.assign([], newAttributes)
        data.mrp = parseFloat(data.mrp)
        data.yourShippingCost = parseFloat(data.yourShippingCost)
        data.salePrice = parseFloat(data.salePrice)
        data.shippingCost = parseFloat(data.shippingCost)
        data.productCost = parseFloat(data.productCost)
        data.costPerItem = parseFloat(data.costPerItem)
        delete data['variants']
        delete data['createdAt']
        delete data['__typename']
        delete data['isChecked']
        delete data['newId']
        delete data['total_value']
        pro_data.push(data)
      })
  
      let userId = userData?.ID
      let total = 0;
      if (discountMode) {
        total = subTotal - discountAmount + parseFloat(shippingRate.rate);
      } else {
        total = subTotal - (subTotal * discountAmount / 100) + parseFloat(shippingRate.rate);
      }
      let customer = Object.assign({}, selectedCustomer);
      delete customer['__typename']
      delete customer['_id']
      let _variables = {
        userId: userId,
        status: 1,
        line_items:pro_data,
        orderAmount: total,
        customer: customer,
        fulfillment_status: 'unfulfilled',
        fulfillments: []
      };
      
      props.AddOrders(_variables)
    }
  }

  let products = props.productLists;

  const productsShow = products.map((product, index) => {
    const onChange = (e, product, variant) => {
      let tmp = Object.assign([], selectedProducts);
      let tmpSubTotal = subTotal;
      if (e.target.checked) {
        if (variant === true) {
          if (product.variants.length > 0) {
            for (let i = 0; i < product.variants.length; i ++) {
              let tmpProduct = Object.assign({}, product);
              let newId = product._id + product.variants[i]._id;
              if (selectedProducts.filter(item => item.newId == newId).length == 0) {
                tmpProduct = { ...product, ...product.variants[i] };
                tmpProduct['newId'] = newId;
                tmpProduct['count'] = 1;
                tmp.push(tmpProduct);
                tmpSubTotal += typeof(tmpProduct.salePrice) == 'string' ? parseFloat(tmpProduct.salePrice) : tmpProduct.salePrice;
              }
            }
          } else {
            let tmpProduct = Object.assign({}, product);
            tmpProduct['newId'] = product._id;
            tmpProduct['count'] = 1;
            tmp.push(tmpProduct)
            tmpSubTotal += typeof(tmpProduct.salePrice) == 'string' ? parseFloat(tmpProduct.salePrice) : tmpProduct.salePrice;
          }
        } else {
          let tmpProduct = Object.assign({}, product);
          let tmpVariant = Object.assign({}, variant);
          let newId = tmpProduct._id + variant._id;
          tmpProduct = { ...product, ...tmpVariant };
          tmpProduct['newId'] = newId;
          tmpProduct['count'] = 1;
          tmp.push(tmpProduct);
          tmpSubTotal +=  typeof(tmpVariant.salePrice) == 'string' ? parseFloat(tmpVariant.salePrice) : tmpVariant.salePrice;
        }
      } else {
        let newId = variant == true ? product._id : product._id + variant._id;
        
        if (variant == true) {
          if (product.variants.length > 0) {
            for (let i = 0; i < product.variants.length; i ++) {
              let newId = product._id + product.variants[i]._id;
              let index = 0;
              for (let j = 0; j < tmp.length; j ++) {
                if (newId == tmp[j].newId) {
                  index = j;
                  break;
                }
              }
              tmpSubTotal -= tmp[index].salePrice * tmp[index].count;
              tmp.splice(index, 1);
            }
          } else {
            let newId = product._id;
            let index = 0;
            for (let j = 0; j < selectedProducts.length; j ++) {
              if (newId == selectedProducts[j].newId) {
                index = j;
                break;
              }
            }
            tmpSubTotal -= selectedProducts[index].salePrice * selectedProducts[index].count;
            tmp.splice(index, 1);
          }
        } else {
          let newId = product._id + variant._id;
          let index = 0;
          for (let j = 0; j < selectedProducts.length; j ++) {
            if (newId == selectedProducts[j].newId) {
              index = j;
              break;
            }
          }
          tmpSubTotal -= selectedProducts[index].salePrice * selectedProducts[index].count;
          tmp.splice(index, 1);
        }
      }
      setSubTotal(tmpSubTotal);
      setSelectedProducts(tmp);
    }
    const variantsShow = product.variants.map((variant, variantIndex) => {
      let newId = product._id + variant._id;
      let selected = selectedProducts.filter(item => item.newId == newId).length > 0 ? true : false;
      return (
        <div key={product._id + 'variant' + variantIndex}>
          <VariantCheckbox checked={selected} onChange={(e) => onChange(e, product, variant)}>
            <div className="info">
              <span>{variant.name}</span>
              <span className="quantity">{variant.totalQuantity} available</span>
              <span className="price">${variant.salePrice}</span>
            </div>
          </VariantCheckbox>
        </div>
        )
    })
    let selected;
    if (product.variants.length == 0) {
      selected = selectedProducts.filter(item => item.newId == product._id).length > 0 ? true : false;
    } else {
      let allChecked = true;
      for (let i = 0; i < product.variants.length; i ++) {
        let newId = product._id + product.variants[i]._id;
        if (selectedProducts.filter(item => item.newId == newId).length == 0) {
          allChecked = false;
          break;
        }
      }
      selected = allChecked;
    }
    return (
      <div key={'product' + product._id + index}>
        <div>
          <ProductCheckbox checked={selected} onChange={(e) => onChange(e, product, true)}>
            <img src={product.thumbnailImage} width="30px" height="30px" />
            <span>{product.title}</span>
          </ProductCheckbox>
        </div>
        <div>
          {variantsShow}
        </div>
      </div>
      )
  });

  const selectedProductsShow = selectedProducts.map((product, index) => {
    const onProductCountChange = (e) => {
      let tmp = Object.assign([], selectedProducts);
      let index;
      for (let i = 0; i < selectedProducts.length; i ++) {
        if (product.newId == selectedProducts[i].newId) {
          index = i;
          break;
        }
      }
      tmp[index].count = e;
      let tmpSubTotal = 0;
      tmp.map(item => {
        tmpSubTotal += item.salePrice * item.count
      });
      setSubTotal(tmpSubTotal);
      setSelectedProducts(tmp);
    }

    const removeSelectedProduct = () => {
      let tmp = Object.assign([], selectedProducts);
      let index;
      for (let i = 0; i < selectedProducts.length; i ++) {
        if (product.newId == selectedProducts[i].newId) {
          index = i;
          break;
        }
      }
      tmp.splice(index, 1);
      let tmpSubTotal = 0;
      tmp.map(item => {
        tmpSubTotal += item.salePrice * item.count
      });
      setSubTotal(tmpSubTotal);
      setSelectedProducts(tmp);
    }
    return (
      <SummaryProductLine key={product.newId}>
        <div className="product-image">
          <img src={product.thumbnailImage} width="40px" height="40px" />
        </div>
        <div className="product-info">
          <span className="title price">{product.title}</span>
          <span className="sub-info">{product.name || ' '}</span>
        </div>
        <div className="product-price price">
          <span className="price">${product.salePrice}</span>
        </div>
        <div className="number-input price">
          <span>X</span> &nbsp; <ProductCountInput min={1} defaultValue={1} onChange={(e) => onProductCountChange(e)}></ProductCountInput>
        </div>
        <div className="product-price-sum">
          <span className="price">${product.salePrice}</span>
        </div>
        <CloseOutlined onClick={() => removeSelectedProduct()} />
      </SummaryProductLine>
      )
  });

  const closeNewCustomerForm = () => {
    setNewCustomerForm(false);
  }

  const openNewCustomerForm = () => {
    setNewCustomerForm(true);
  }

  const [BasicDetails, setBasicDetails] = useState({
    FullName: '',
    Email: '',
    Mobile: '',
  });
  const [AddressDetails, setAddressDetails] = useState({
    Address: '',
    Apartment: '',
    City: '',
    Country: '',
    State: '',
    PostalCode: '',
  });
  // const [TaxFlag, setTaxFlag] = useState(false);
  // const [Tax, setTax] = useState(0);
  // const [Notes, setNotes] = useState('');
  // const [Tags, setTags] = useState('');

  const handleCustomerFormChangeValue = (e, module, element) => {
    if (module === 'BasicDetails') {
      if (element === 'Mobile') {
        setBasicDetails({ ...BasicDetails, [element]: e })
      } else {
        let { name, value } = e.target
        setBasicDetails({ ...BasicDetails, [name]: value })
      }
    } else if (module === 'AddressDetails') {
      if (element === 'Mobile' || element === 'Country') {
        setAddressDetails({ ...AddressDetails, [element]: e })
      } else {
        let { name, value } = e.target
        setAddressDetails({ ...AddressDetails, [name]: value })
      }
    } else {
      let { name, value } = e.target
    }
  }

  const handleOk = () => {
    let _variables = {
      BasicDetailsFullName: BasicDetails.FullName,
      BasicDetailsEmail: BasicDetails.Email,
      BasicDetailsMobile: BasicDetails.Mobile,
      AddressDetailsAddress: AddressDetails.Address,
      AddressDetailsApartment: AddressDetails.Apartment,
      AddressDetailsCity: AddressDetails.City,
      AddressDetailsCountry: AddressDetails.Country,
      AddressDetailsPostalCode: AddressDetails.PostalCode,
      AddressDetailsState: AddressDetails.State,
    };
    props.AddCustomers(_variables)
    setNewCustomerForm(false);
  }

  const [isOpenMoreFilter, setOpenMoreFilters] = useState(false);

  const showCustomerFilter = () => {
    setOpenMoreFilters(true);
  }

  const customerDisplay = (props.customerData || []).map((customer, index) => {
    const onChange = (e) => {
      if (e.target.checked) {
        setSelectedCustomer(customer);
      } else {
        setSelectedCustomer(null);
      }
    }
    let selected = selectedCustomer ? selectedCustomer._id == customer._id : false;
    return (
    <div key={index}>
      <CustomerCheckbox checked={selected} onChange={(e) => onChange(e, customer)}>
        <div className="info">
          <span className="fullname">{customer.BasicDetailsFullName}</span>
          <span className="email">{customer.BasicDetailsEmail}</span>
        </div>
      </CustomerCheckbox>
    </div>)
  })

  const [discountPop, showDiscountPop] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [discountReason, setDiscountReason] = useState("");
  const [discountMode, setDiscountMode] = useState(true);

  const applyDiscount = (discountMode, discountAmount, discountReason) => {
    console.log("discount", discountMode, discountAmount, discountReason)
    setDiscountAmount(discountAmount)
    setDiscountReason(discountReason)
    setDiscountMode(discountMode)
    showDiscountPop(false);
  }

  const onShowDiscountPop = (show) => {
    showDiscountPop(show);
  }

  const [taxes, setTaxes] = useState(true);
  const [taxPop, showTaxPop] = useState(false);

  const applyTax = (charge) => {
    setTaxes(charge);
    showTaxPop(false);
  }

  const onShowTaxPop = (show) => {
    showTaxPop(show);
  }

  const [shippingRate, setShippingRate] = useState({name: "free", rate: 0});
  const [shippingPop, showShippingPop] = useState(false);

  const onSetShippingRate = (param) => {
    setShippingRate(param);
    showShippingPop(false);
  }

  const onShowShippingPop = (show) => {
    showShippingPop(show);
  }

  return (
    <FormLayout
      name="basic"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      className="form-new"
      layout="vertical"
    >
      <InputTabs tabPosition={'left'} activeKey={step} onTabClick={(e) => onTabClick(e)}>
        <TabPane tab="Product" key="1">
          <ContentBox>
            <SubFormTitle>Select products</SubFormTitle>
            <Filters onOpen={() => setShowSelectProduct(true)} hideAddButton={true} onSearch={() => setShowSelectProduct(true)} goToNewPage={() => goToNewPage()} top={0} right={0}/>
            <ProductList>
            {
              products && products.length > 0 && 
                productsShow
            }
            </ProductList>
          </ContentBox>

        </TabPane>
        <TabPane tab="Customer" key="2">
        <ContentBox>
          <SubFormTitle>Select a customer or <a onClick={() => openNewCustomerForm()}>create one</a></SubFormTitle>
          <Filters onOpen={() => setShowSelectProduct(true)} hideAddButton={true} onSearch={() => setShowSelectProduct(true)} goToNewPage={() => goToNewPage()} top={0} right={0}/>
          {/* <CustomerFilters onOpen={() => showCustomerFilter()}/> */}
          {customerDisplay}

          {/* {Object.keys(ShippingAddresss).length === 0 && (
              <ContentBox>
                <TitleBox>Find and Create customer </TitleBox>
                <Popover
                  content={() => content(searchCustomner)}
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
            {Object.keys(ShippingAddresss).length !== 0 && (
              <>
                <ContentBox>
                  <AlignItem>
                    <TitleBox>Customer </TitleBox>
                    <CloseOutlined onClick={handleColsecontact} />
                  </AlignItem>
                  <StyledAvatar
                    width="55"
                    height="55"
                    src={ShippingAddresss.profile_url}
                    alt="avatar"
                  />
                  <ContentTitle align="left">
                    {ShippingAddresss.BasicDetailsFirstName}
                  </ContentTitle>
                  <AlignItem>
                    <ContentTitle>{ShippingAddresss.BasicDetailsEmail}</ContentTitle>
                    <ContentTitle onClick={handleEmailEditModal}>
                      Edit
                    </ContentTitle>
                  </AlignItem>
                </ContentBox>
                <ContentBox>
                  <AlignItem>
                    <TitleBoxAddress>SHIPPING ADDRESS</TitleBoxAddress>
                    <ContentTitle
                      onClick={() => handleShippingEditModal("shipping", ShippingAddresss)}
                    >
                      Edit
                    </ContentTitle>
                  </AlignItem>
                  <p>
                    {ShippingAddresss.AddressDetailsApartment}
                    {ShippingAddresss.AddressDetailsCompany}
                  </p>
                  <p>
                    {ShippingAddresss.AddressDetailsCity}
                  </p>
                  <p>{ShippingAddresss.AddressDetailsCountry}</p>
                </ContentBox>
                <ContentBox>
                  <AlignItem>
                    <TitleBoxAddress>BILLING ADDRESS</TitleBoxAddress>
                    <ContentTitle
                      onClick={() => handleShippingEditModal("billing", DeliveryAddress)}
                    >
                      Edit
                    </ContentTitle>
                  </AlignItem>
                  <p>
                    {DeliveryAddress.AddressDetailsApartment}
                    {DeliveryAddress.AddressDetailsCompany}
                  </p>
                  <p>
                    {DeliveryAddress.AddressDetailsCity}
                  </p>
                  <p>{DeliveryAddress.AddressDetailsCountry}</p>
                </ContentBox>
              </>
            )} */}
           </ContentBox>
        </TabPane>
        <TabPane tab="Summary" key="3">
          <ContentBox>
            <SubFormTitle>Order Summary</SubFormTitle>
            {
              selectedProductsShow
            }
          </ContentBox>
        </TabPane>
        <TabPane tab="Payment" key="4">
          <ContentBox>
            <SubFormTitle>Payment</SubFormTitle>
            <PaymentCard>
              <div>
                <Popover
                  content={<AddDiscount onClose={() => onShowDiscountPop(false)} applyDiscount={(discountMode, discountAmount, discountReason) => applyDiscount(discountMode, discountAmount, discountReason)}/>}
                  placement="bottomRight"
                  trigger="click"
                  className="new-order"
                  visible={discountPop}
                >
                  <ContentTitle color={"#0095F8"} onClick={() => onShowDiscountPop(true)}>Add discount</ContentTitle>
                </Popover>
                <ContentTitle>SubTotal</ContentTitle>
                <Popover
                  content={<AddShipment onClose={() => onShowShippingPop(false)} onOk={(e) => onSetShippingRate(e)} />}
                  placement="bottom"
                  trigger="click"
                  visible={shippingPop}
                >
                  <ContentTitle color={"#0095F8"} onClick={() => onShowShippingPop(true)}>Add shipment</ContentTitle>
                </Popover>
                <Popover
                  content={<Taxes onClose={() => onShowTaxPop(false)} onOk={(e) => applyTax(e)}/>}
                  placement="bottomRight"
                  trigger="click"
                  visible={taxPop}
                >
                  <ContentTitle color={"#0095F8"} marginbottom={30} onClick={() => onShowTaxPop(true)}>Taxes</ContentTitle>
                </Popover>
                <ContentTitle fontWeight={'bold'} >Total</ContentTitle>
              </div>
              <div className="price">
                <ContentTitle align={"right"}>{discountAmount ? '-$' + (discountMode ? discountAmount : (subTotal * discountAmount / 100).toFixed(2)) : '-'}</ContentTitle>
                <ContentTitle align={"right"}>${subTotal}</ContentTitle>
                <ContentTitle align={"right"}>{shippingRate.rate > 0 ? '$' + shippingRate.rate : '-'}</ContentTitle>
                <ContentTitle align={"right"} marginbottom={30}>$0.00</ContentTitle>
                <ContentTitle align={"right"} fontWeight={'bold'}>${subTotal - discountAmount + parseFloat(shippingRate.rate)}</ContentTitle>
              </div>
            </PaymentCard>
          </ContentBox>
        </TabPane>
      </InputTabs>

      <ActionBottom>
        {
          step == "4" ?
          <NextStepButton width={100} type="primary" onClick={() => nextStep()}>
            Complete
          </NextStepButton> :
          <NextStepButton type="primary" onClick={() => nextStep()}>
            Next
          </NextStepButton>
        }
      </ActionBottom>

      <NewCustomerForm
        title={null}
        visible={newCustomerForm}
        onCancel={() => closeNewCustomerForm()}
        footer={[
          <div>
            <Button key="back" className="cancel-button" onClick={() => closeNewCustomerForm()}>
              Cancel
            </Button>
            <Button key="submit" className="save-button" type="primary" onClick={() => handleOk()}>
              Save
            </Button>
          </div>
        ]}
      >
        <NewForm Modal={true} BasicDetails={BasicDetails} AddressDetails={AddressDetails} /* TaxFlag={TaxFlag} Tax={Tax} Notes={Notes} Tags={Tags} */ handleChangeValue={handleCustomerFormChangeValue}/>
      </NewCustomerForm>

      {/* <SubForm>
        <Row gutter={24}>
          <Col md={16}>
            <Row gutter={24}>
              <Col md={24}>
                <ContentBox>
                  <AlignItem>
                    <TitleBox>Order details</TitleBox>
                    <ContentTitle className="TextAlign" onClick={showModal}>
                      Add custom item
                    </ContentTitle>
                  </AlignItem>

                  {Products && Products.length > 0 && (
                    <List
                      dataSource={Products}
                      renderItem={(item, i) => (
                        <List.Item>
                          <ProductDetail>
                            <ProductView>
                              <ImageView src={item.thumbnailImage} alt="" />
                              <div>
                                <Link href={`/products/[productId]`} as="/products/123456789">
                                  <a href="#">{item.variants.variantName}</a>
                                </Link>
                                <TextStyle>{item.style}</TextStyle>
                                <TextStyle>SKU: {item.sku}</TextStyle>
                              </div>
                            </ProductView>
                            <InputTotal>
                              <LabelPriceStyle title="Add item discount">
                                <Dropdown
                                  trigger={["click"]}
                                  overlay={
                                    <Card>
                                      <div>
                                        <LabelStyle>
                                          Discount this item by
                                        </LabelStyle>
                                      </div>
                                    </Card>
                                  }
                                >
                                  <a href="#">${item.variants.variantValues}</a>
                                </Dropdown>
                              </LabelPriceStyle>
                              <InputNumberStyle
                                onChange={(e) => onChangeTotal(e, i)}
                                value={item.variants.total_value}
                                min={0}
                                max={10}
                              />
                              {console.log('1111111111111', item.variants)}
                              <LabelStyle>
                                ${item.variants.total_value * parseFloat(item.variants.variantValues)}
                              </LabelStyle>
                            </InputTotal>

                            <ButtonRemove onClick={() => onRemoveOrderItem(i)}>
                              <CloseOutlined />
                            </ButtonRemove>
                          </ProductDetail>
                        </List.Item>
                      )}
                    />
                  )}

                  <Row className="price-content" gutter={24}>
                    <Col md={12}>
                      <Form.Item label="Notes" name="notes">
                        <TextInput placeholder="Add a note..." value={Notes} onChange={(e) => handleChangeValue(e, 'Notes')} />
                      </Form.Item>
                    </Col>
                    
                  </Row>
                </ContentBox>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col md={24}>
                <EmailSection>
                  <Labelsection>
                    <Icons>
                      <FileTextOutlined />
                    </Icons>
                    <ContentLabel> EMAIL INVOICE </ContentLabel>
                  </Labelsection>
                  <Button disabled>Email invoice</Button>
                </EmailSection>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col md={24}>
                <ContentBox>
                  <Labelsection>
                    <Icons>
                      <CreditCardOutlined />
                    </Icons>
                    <ContentLabel> ACCEPT PAYMENT </ContentLabel>
                  </Labelsection>
                  <PaymentSection>
                    <Button disabled>Mark as paid</Button>
                    <Button disabled>Mark as pending</Button>
                    <Button disabled>pay with credit card</Button>
                  </PaymentSection>
                </ContentBox>
              </Col>
            </Row>
          </Col>
          <Col md={8}>
            
            <ContentBox marginTop="20px">
              <Tagcontent>
                <TitleBox>Tags</TitleBox>
                <ContentTitle
                  className="TextAlign"
                  onClick={handleOpenViewTagsPopup}
                >
                  View all tags
                </ContentTitle>
              </Tagcontent>
              <TagBlock>
                <div>
                  <Input
                    ref={saveInputRef}
                    type="text"
                    size="large"
                    value={inputValue}
                    onChange={handleInputChange}
                    onBlur={handleInputConfirm}
                    onPressEnter={handleInputConfirm}
                  />
                  <TweenOneGroup
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
                </div>
              </TagBlock>
            </ContentBox>
          </Col>
        </Row>
      </SubForm> */}

      <MDSelectProducts
        isOpen={isOpenSelectProduct}
        onCancel={() => setShowSelectProduct(false)}
        onAdd={onAddProductsSearch}
        products={props.productLists}
      />

      {/*  add customer item modal */}
      <Modal
        visible={openCustumItem}
        width="35%"
        onCancel={handleCancel}
        footer={null}
      >
        <Wraper className="customer-item-content">
          <CardViews
            bordered={false}
            style={{ width: "100%" }}
            title="Add custom item"
          >
            <Formik
              initialValues={{
                item_name: "",
                price: "",
                qty: "",
                item_shipping: false,
                item_taxable: false,
              }}
              validate={(values) => {
                const errors = {};
                if (!values.item_name) {
                  errors.item_name = "Required";
                }
                if (!values.price) {
                  errors.price = "!Required";
                }
                if (!values.qty) {
                  errors.qty = "!Required";
                }
                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  alert(JSON.stringify(values, null, 2));
                  setSubmitting(false);
                }, 400);
              }}
            >
              {({
                values,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                errors,
                touched,
                /* and other goodies */
              }) => (
                  <form id="myForm" onSubmit={handleSubmit}>
                    <Row gutter={24}>
                      <Col className="gutter-row" span={12}>
                        <div>
                          <span>
                            <label>Line item name </label>
                          </span>
                          <Input
                            name="item_name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.item_name}
                            size="large"
                          />
                        </div>
                      </Col>
                      <Col className="gutter-row" span={6}>
                        <div>
                          <span>
                            <label>Price per item </label>
                          </span>
                          <Input
                            name="price"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.price}
                            prefix="$"
                            size="large"
                          />
                        </div>
                      </Col>
                      <Col className="gutter-row" span={6}>
                        <div>
                          <span>
                            <label>Quantity </label>
                          </span>
                          <Input
                            name="qty"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.qty}
                            type="number"
                            size="large"
                          />
                        </div>
                      </Col>
                    </Row>
                    <Row gutter={16} style={{ marginTop: "1rem" }}>
                      <Col className="gutter-row" span={16}>
                        <Checkbox
                          name="item_taxable"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          checked={values.item_taxable}
                        >
                          Item is taxable
                      </Checkbox>
                      </Col>
                    </Row>
                    <Row gutter={16} style={{ marginTop: "1rem" }}>
                      <Col className="gutter-row" span={16}>
                        <Checkbox
                          name="item_shipping"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          checked={values.item_shipping}
                        >
                          Item requires shipping
                      </Checkbox>
                      </Col>
                    </Row>
                    {values.item_shipping ? (
                      <StyledAlert
                        message={
                          <>
                            <Link href="#">
                              <a>Create a product</a>
                            </Link>{" "}
                          with weight specified to calculate shipping rates
                          accurately
                          </>
                        }
                        type="warning"
                      />
                    ) : null}
                    <Divider />
                    <ItemAction>
                      <Button size="large">Cancel</Button>
                      <Button
                        form="myForm"
                        key="submit"
                        size="large"
                        htmlType="submit"
                        type="primary"
                        disabled={isSubmitting}
                      >
                        Save line item
                    </Button>
                    </ItemAction>
                  </form>
                )}
            </Formik>
          </CardViews>
        </Wraper>
      </Modal>
      <ShippingAddress
        open={openShippingPopup.status}
        close={handleCloseShippingPopup}
        handleChange={handleShippingEditValues}
        values={openShippingPopup.data}
        name={openShippingPopup.name}
        onSave={saveShiipingDetails}
      />
      <EditEmail
        open={openEmailPopup}
        close={handleCloseEmailPopup}
        values={ShippingAddress.email}
      />
      <ViewTags
        open={openViewTagsPopup}
        close={handleCloseViewTagsPopup}
        closeTag={handleClose}
        values={Tags}
      />
    </FormLayout>
  );
};

const ButtonRemove = styled.a`
  color: #ccc;
  margin-left: 30px;
`;

const TitleBoxAddress = styled.span`
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 0;
  line-height: 3;
`;

const InputNumberStyle = styled(InputNumber)`
  margin: 0 10px;
`;

const TextStyle = styled.p`
  margin: 0;
  font-size: 14px;
`;

const ProductDetail = styled.div`
  display: inline-flex;
  align-items: center;
  width: 100%;
`;

const ProductView = styled.div`
  display: inline-flex;
  align-items: center;
  width: calc(100% - 135px);
`;

const ImageView = styled.img`
  width: 60px;
  margin-right: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 5px;
`;

const InputTotal = styled.div`
  height: 100%;
  align-items: center;
  display: inline-flex;
`;

const LabelPriceStyle = styled(Tooltip)``;
const LabelStyle = styled.span``;

const SubForm = styled.div`
  padding: 15px 0;

  & .p {
    text-align: right;
    line-height: 2rem;
  }
`;

const ContentBox = styled.div`
  position: relative;
  padding-right: ${props => props.paddingRight ? props.paddingRight : 0}px;
  margin-top: ${(props) => (props.marginTop ? props.marginTop : "0px")};
`;

const TagContent = styled(Tag)`
  padding: 5px 10px;
  marginbottom: 10px;
`;

const TagBlock = styled.div`
  margin-top: 10px;
  & div:first-child {
    margin-bottom: 16px;
    & input {
      margin: 10px 0px;
    }
  }
`;

const TitleBox = styled.h3`
  font-weight: 600;
  font-size: 16px;
  color: #000;
  opacity: 0.9;
`;

const AlignItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const StyledSearch = styled(Search)`
  padding-left: 0 !important;
  .ant-btn-primary {
    background: linear-gradient(to bottom, white, #f9fafb);
    border: 1px solid #ddd;
    color: #637381;
    font-size: 14px;
  }
  .ant-input-search {
    padding-left: 15px !important;
  }
`;

const StyledAvatar = styled.img`
  width: ${(props) => (props.width ? props.width : "45px")};
  height: ${(props) => (props.height ? props.height : "45px")};
  border-radius: 50%;
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

const Labelsection = styled.div`
  display: flex;
  margin: 0;
  font-size: 14px;
`;

const Icons = styled.div`
  font-size: 20px;
`;

const TextInput = styled(Input)`
  padding: 6px 12px;
`;

const ContentLabel = styled.span`
  margin-left: 20px;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 0;
  line-height: 2.5;
`;

const ContentTitle = styled.h4`
  font-family: Proxima Nova;
  font-style: normal;
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : "normal")};
  font-size: 14px;
  line-height: 16px;
  cursor: pointer;
  text-align: ${(props) => (props.align ? props.align : "left")};
  margin-bottom: ${(props) => (props.marginbottom ? props.marginbottom : "20")}px;
  color: ${props => props.color ? props.color : '#404950'};
`;

const PaymentSection = styled.div`
  text-align: right;
  & button {
    margin-right: 10px;
  }
  & button:last-child {
    margin-right: 0 !important;
  }
`;

const EmailSection = styled.div`
  padding: 24px 24px 24px 24px;
  background: #fff;
  box-shadow: 0px 4px 4px rgba(186, 195, 201, 0.25);
  border: 1px solid #ddd;
  border-radius: 3px;
  outline: 0.1rem solid transparent;
  display: flex;
  justify-content: space-between;
`;

const Total = styled.div`
  text-align: right;
  font-weight: 600;
  font-size: 14x;
`;

const SearchCustomerInput = styled(Input)`
  margin-top: 20px;
  position: relative;
`;

const Tagcontent = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ItemAction = styled.div`
  display: flex;
  align-item: center;
  justify-content: flex-end;
  button {
    margin-left: 10px;
  }
`;

const Wraper = styled.div``;

const StyledAlert = styled(Alert)`
  padding: 20px 25px !important;
  margin-top: 20px;
`;

const CardViews = styled(Card)`
  color: black;
  .ant-card-head-title {
    display: block;
    color: black;
    font-size: 24px;
  }
  .ant-card-body {
  }
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
    width: 600px;
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

const ProductCheckbox = styled(Checkbox)`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #EDEDED;
  .ant-checkbox {
    margin-left: 25px;
  }
  .ant-checkbox + span {
    padding: 0;
    font-family: Proxima Nova;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 144.89%;
    color: #404950;
  }
  img {
    border-radius: 5px;
    margin-left: 23px;
    margin-right: 10px;
  }
`;

const VariantCheckbox = styled(Checkbox)`
  width: 100%;
  height: 50px;
  display: flex;
  border-bottom: 1px solid #EDEDED;
  align-items: center;
  .ant-checkbox {
    margin-left: 55px;
  }
  .ant-checkbox + span {
    padding: 0;
    margin-left: 10px;
    font-family: Proxima Nova;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 144.89%;
    color: #404950;
    width: 100%;
    .info {
      width: 100%;
      display: flex;
      span.quantity {
        margin-left: auto;
      }
      span.price {
        margin-right: 23px;
        margin-left: 30px;
      }
    }
  }
  img {
    border-radius: 5px;
    margin-left: 23px;
    margin-right: 10px;
  }
`;

const CustomerCheckbox = styled(Checkbox)`
  width: 100%;
  height: 60px;
  display: flex;
  border-bottom: 1px solid #EDEDED;
  align-items: center;
  .ant-checkbox {
    margin-left: 25px;
  }
  .ant-checkbox + span {
    padding: 0;
    margin-left: 23px;
    width: 100%;
    .info {
      width: 100%;
      display: flex;
      flex-direction: column;
      span.fullname {
        font-family: Proxima Nova;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 144.89%;
        color: #404950;
      }
      span.email {
        font-family: Proxima Nova;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 144.89%;
        color: #83898D;
      }
    }
  }
`;

const SummaryProductLine = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  background: #F6F8F9;
  border-radius: 5px;
  padding: 30px 25px;
  border-bottom: 1px solid #EDEDED;
  .price {
    font-family: Proxima Nova;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 144.89%;
    color: #404950;
  }
  .product-image {
    margin-right: 10px;
  }
  .product-info {
    display: flex;
    flex-direction: column;
    width: 40%;
  }
  .number-input {
    width: 25%;
    display: flex;
    align-items: center;
  }
  .product-price {
    width: 20%;
    display: flex;
    align-items: center;
  }
  .product-price-sum {
    width: 20%;
    display: flex;
    align-items: center;
  }
  .sub-info {
    font-family: Proxima Nova;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 144.89%;
    color: #83898D;
  }
`;

const ProductCountInput = styled(InputNumber)`
  width: 80px;
  height: 45px;
  background: #FFFFFF;
  border: 1px solid #E4EAEE;
  border-radius: 5px;
  margin-right: 20px;
  .ant-input-number-input {
    height: 45px;
  }
`;

const PaymentCard = styled.div`
  width: 100%;
  height: 211px;
  display: flex;
  justify-content: space-between;
  background: #F6F8F9;
  border-radius: 5px;
  padding: 22px 20px 15px 25px;
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

const NewCustomerForm = styled(Modal)`
  width: 600px!important;
  height: 615px;
  .ant-modal-footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    box-shadow: 0px -5px 30px rgba(64, 73, 80, 0.07);
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

const ProductList = styled.div`
  width: 100%;
  max-height: 520px;
  overflow-y: auto;
`;

const mapStateToProps = (store) => {
  return {
    customerData: store.customerReducer.customerData,
    productLists: store.productReducer.merchantProductLists
  };
};
const mapDispatchToProps = {
  getCustomers,
  getUserProductLists,
  AddCustomers,
  resetCustomerStatus,
  AddOrders
};

export default connect(mapStateToProps, mapDispatchToProps)(newForm);
