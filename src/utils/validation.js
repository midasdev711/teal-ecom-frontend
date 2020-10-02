import { emailValidation, PLZNumber, DateOfBirth, PhoneNumber, PasswordValidation, confirmPassword, stringValue, isEmpty ,number } from './regex'
import moment from 'moment';

let password = '';
let min_age = 0;
let timefrom = 0;
let min_price = 0;
let starttime = 0;

export default (name, value) => {
  if (name === 'password') {
    password = value
  }
  if (name === "min_age") {
    min_age = value
  }
  if(name === "timefrom"){
    let start = moment(value).unix();
    timefrom = start
  }
  if(name === "starttime"){
    let timestart = moment(value).unix();
    starttime = timestart
  }
  if(name === "min_price"){
    min_price = value
  }
  const isValidString = stringValue(value);
  const isEmptyString = isEmpty(value);


  switch (name) {
      case 'ProductTitle':
      if (!isEmptyString) {
        return "Title is required";
      } else {
        return false;
      }
    case 'ProductDescription':
      if (!isEmptyString) {
        return "Product description is required";
      } else {
        return false;
      }
    case 'ProductSalePrice':
      if (!isEmptyString) {
        return "Product price is required";
      }
      // else if(!onlyNumber) {
      //   return "Only digit allow string not allowed";
      // }
      else {
        return false;
      }
    case 'ProductMRP':
      const onlyNumber = number(value)
      if (!isEmptyString) {
        return "Compare at price is required";
      }
      //  else if(!onlyNumber) {
      //   return "Only digit allow string not allowed";
      // }
      else{
        return false;
      }
    case 'ProductCostPerItem':
      if (!isEmptyString) {
        return "Product cost per item price is required";
      } else if(!onlyNumber) {
        return "Only digit allow string not allowed";
      }else {
        return false;
      }
  
    case 'InventorySKU':
      if (!isEmptyString) {
        return "Inventory SKU is required";
      } else {
        return false;
      }
    case 'InventoryBarcode':
      if (!isEmptyString) {
        return "Inventory barcode is required";
      } else {
        return false;
      }
    case 'ProductTotalQuantity':
      if (!isEmptyString) {
        return "Product quantity is required";
      } else {
        return false;
      }
    case 'productWeight':
      if (!isEmptyString) {
        return "Product weight is required";
      } else {
        return false;
      }
    case 'ProductCategory':
      if (!isEmptyString) {
        return "Product category is required";
      } else {
        return false;
      }
    case 'ProductSubcategory':
      if (!isEmptyString) {
        return "Product sub category is required";
      } else {
        return false;
      }
    // case 'ProductStartDate':
    //   if (!isEmptyString) {
    //     return "Product start state is required";
    //   } else {
    //     return false;
    //   }
  
    case 'ProductSearchEngineDescription':
      if (!isEmptyString) {
        return "Product search engine description is required";
      } else {
        return false;
      }
    case 'ProductSearchEngineTitle':
      if (!isEmptyString) {
        return "Product search engine title is required";
      } else {
        return false;
      }
   
    default:
      return false
  }
}