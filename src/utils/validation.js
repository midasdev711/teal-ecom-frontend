import { emailValidation, PLZNumber, DateOfBirth, PhoneNumber, PasswordValidation, confirmPassword, stringValue, isEmpty, number , nullArray } from './regex'
import moment from 'moment';

let password = '';
let min_age = 0;
let timefrom = 0;
let min_price = 0;
let starttime = 0;

export default (name, value) => {
  // if (name === 'password') {
  //   password = value
  // }
  // if (name === "min_age") {
  //   min_age = value
  // }
  // if (name === "timefrom") {
  //   let start = moment(value).unix();
  //   timefrom = start
  // }
  // if (name === "starttime") {
  //   let timestart = moment(value).unix();
  //   starttime = timestart
  // }
  // if (name === "min_price") {
  //   min_price = value
  // }
  const isValidString = stringValue(value);
  const isEmptyString = isEmpty(value);
  


  switch (name) {
    case 'productTitle':
      if (!isEmptyString) {
        return "Title is required";
      } else {
        return false;
      }
    case 'productDescription':
      if (!isEmptyString) {
        return "Product description is required";
      } else {
        return false;
      }
    case 'productSalePrice':
      if (!isEmptyString) {
        return "Product price is required";
      }
      // else if(!onlyNumber) {
      //   return "Only digit allow string not allowed";
      // }
      else {
        return false;
      }
    // case 'productImages':
    //   let nullArrayData = nullArray(value)
    //   if (!isEmptyString) {
    //     return "Products images are required";
    //   }else if(nullArrayData){
    //     return "Products images are required";  
    //   } else {
    //     return false;
    //   }
    // case 'productFeaturedImage':
    //   if (!isEmptyString) {
    //     return "Product featured image is required";
    //   } else {
    //     return false;
    //   }
    case 'variantName':
      if (!isEmptyString) {
        return "Products variant name is required";
      } else {
        return false;
      }
    case 'variantValues':
      if (!isEmptyString) {
        return "Product variant value is required";
      } else {
        return false;
      }
    case 'productMRP':
      const onlyNumber = number(value)
      if (!isEmptyString) {
        return "Compare at price is required";
      }
      //  else if(!onlyNumber) {
      //   return "Only digit allow string not allowed";
      // }
      else {
        return false;
      }
    case 'productCostPerItem':
      if (!isEmptyString) {
        return "Product cost per item price is required";
      }
      // else if(!onlyNumber) {
      //   return "Only digit allow string not allowed";
      // }
      else {
        return false;
      }

    case 'productSKU':
      if (!isEmptyString) {
        return "Product SKU is required";
      } else {
        return false;
      }
    // case 'productTags':
    //   console.log('object called into web site')
    //   const nullArrayData1 = nullArray(value)
    //   if (!isEmptyString) {
    //     return "Product tags is required";
    //   }else if(nullArrayData1){
    //     console.log('dataa insde tags')
    //     return "Product tags is required";
    //   } else {
    //     return false;
    //   }
    // case 'InventoryBarcode':
    //   if (!isEmptyString) {
    //     return "Inventory barcode is required";
    //   } else {
    //     return false;
    //   }
    case 'productTotalQuantity':
      if (!isEmptyString) {
        return "Product quantity is required";
      } else {
        return false;
      }
    case 'attributeValues':
      const nullArrayData2 = nullArray(value)
      if (!isEmptyString) {
        return "Product weight is required";
      }else if(nullArrayData2){
       
        return "Product weight is required";
      } else{
        return false;
      }
    case 'productCategory':
      if (!isEmptyString) {
        return "Product category is required";
      } else {
        return false;
      }
    case 'productSubcategory':
      if (!isEmptyString) {
        return "Product sub category is required";
      } else {
        return false;
      }
    // case 'productStartDate':
    //   if (!isEmptyString) {
    //     return "Product start date is required";
    //   } else {
    //     return false;
    //   }
    // case 'productEndDate':
    //   if (!isEmptyString) {
    //     return "Product end date is required";
    //   } else {
    //     return false;
    //   }

    case 'description':
      if (!isEmptyString) {
        return "Product search engine description is required";
      } else {
        return false;
      }
    case 'title':
      if (!isEmptyString) {
        return "Product search engine title is required";
      } else {
        return false;
      }
    case 'cronicalUrl':
      if (!isEmptyString) {
        return "Product search engine url is required";
      } else {
        return false;
      }

    default:
      return false
  }
}