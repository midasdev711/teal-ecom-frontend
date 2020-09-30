import { emailValidation, PLZNumber, DateOfBirth, PhoneNumber, PasswordValidation, confirmPassword, stringValue, isEmpty } from './regex'
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
    // case 'firstname':
    //   if (!isValidString) {
    //     return "First name is Required and space not allowed.";
    //   } else {
    //     return false;
    //   }
    // case 'lastname':
    //   if (!isValidString) {
    //     return "Last name is Required and space not allowed.";
    //   } else {
    //     return false;
    //   }
    // case 'email':
    //   const isValidEmail = emailValidation(value);
    //   if (!isEmptyString) {
    //     return "Email is Required";
    //   } else if (!isValidEmail) {
    //     return "Enter a valid email address";
    //   } else {
    //     return false;
    //   }
    // case 'password':
    //   const isValid = PasswordValidation(value);
    //   if (!isEmptyString) {
    //     return "Password is Required"
    //   } else if (!isValid) {
    //     return "Password must be at least 8 characters";
    //   } else {
    //     return false;
    //   }
    // case 'conformPassword':
    //   const isValidConfirmPassword = confirmPassword(value, password);
    //   if (!isValidConfirmPassword) {
    //     return "Password mismatch"
    //   } else {
    //     return false;
    //   }
    // case 'dateofbirth':
    //   const isValidDateOfBirth = DateOfBirth(value)
    //   if (!isEmptyString) {
    //     return "Date of birth is Required"
    //   } else if (!isValidDateOfBirth) {
    //     return "Date not valid, please enter proper date ex:dd/mm/yyyy";
    //   } else {
    //     return false;
    //   }
    // case 'phonenumber':
    //   const isValidPhoneNumber = PhoneNumber(value)
    //   if (!isEmptyString) {
    //     return "Phone number is Required"
    //   } else if (!isValidPhoneNumber) {
    //     return "Please enter proper number";
    //   } else {
    //     return false;
    //   }
    // case 'gender':
    //   if (!isEmptyString) {
    //     return "Gender is Required"
    //   } else {
    //     return false;
    //   }
    // case 'business_name':
    //   if (!isEmptyString) {
    //     return "company name is Required";
    //   } else {
    //     return false;
    //   }
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
      } else {
        return false;
      }
    case 'ProductMRP':
      if (!isEmptyString) {
        return "Compare at price is required";
      } else {
        return false;
      }
    // case 'ProductCostPerItem':
    //   if (!isEmptyString) {
    //     return "Product cost per item price is required";
    //   } else {
    //     return false;
    //   }
  
    // case 'InventorySKU':
    //   if (!isEmptyString) {
    //     return "Inventory SKU is required";
    //   } else {
    //     return false;
    //   }
    // case 'InventoryBarcode':
    //   if (!isEmptyString) {
    //     return "Inventory barcode is required";
    //   } else {
    //     return false;
    //   }
    case 'ProductTotalQuantity':
      if (!isEmptyString) {
        return "Product quantity is required";
      } else {
        return false;
      }
    // case 'productWeight':
    //   if (!isEmptyString) {
    //     return "Product weight is required";
    //   } else {
    //     return false;
    //   }
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
    // case 'oldPassword':
    //   const isValidPassword = PasswordValidation(value);
    //   if (!isEmptyString) {
    //     return "Old Password is required"
    //   } else if (!isValidPassword) {
    //     return "Old Password must be at least 8 characters";
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
    // case 'location':
    //   if (!isEmptyString) {
    //     return "Location is required";
    //   } else {
    //     return false;
    //   }
    // case 'description':
    //   if (!isEmptyString) {
    //     return "Description is required";
    //   } else {
    //     return false;
    //   }
    // case 'min_age':
    //   if (!isEmptyString) {
    //     return "Minimum age is required";
    //   } else if(value < 18) {
    //     return "Minimum age must be greter then 18";
    //   }else{
    //     return false;
    //   }
    // case 'max_age':
    //   if (!isEmptyString) {
    //     return "Maximum age is required";
    //   } else if (value > 100 || value < 18) {
    //     return "Max age must be less than 100 or greter then 18";
    //   } else {
    //     return false;
    //   }
    // case 'max_group_size':
    //   if (!isEmptyString) {
    //     return "Maximum group size is required";
    //   } else {
    //     return false;
    //   }
    // case 'timefrom':
    //   if (!isEmptyString) {
    //     return "From time is required";
    //   } else {
    //     return false;
    //   }
    // case 'timeto':
    //   let timeto = moment(value).unix();
    //   if (!isEmptyString) {
    //     return "End time is required";
    //   } else if(timeto < timefrom){
    //     return "End time must be greater than start time"
    //   }else{
    //     return false
    //   }
    // case 'date_from':
    //   if (!isEmptyString) {
    //     return "Start date is required";
    //   } else {
    //     return false;
    //   }
    // case 'date_to':
    //   if (!isEmptyString) {
    //     return "End date is required";
    //   } else {
    //     return false;
    //   }
    // case 'logo_image':
    //   if (!isEmptyString) {
    //     return "Logo image is required";
    //   } else {
    //     return false;
    //   }
    // case 'sponsor_logo_image':
    //   if (!isEmptyString) {
    //     return "Sponsor logo image is required";
    //   } else {
    //     return false;
    //   }
    // case 'wallet_logo_image':
    //   if (!isEmptyString) {
    //     return "Wallet logo image is required";
    //   } else {
    //     return false;
    //   }
    // case 'max_price':
    //   if (value <= min_price) {
    //     return "Max price must be greater than min price";
    //   } else {
    //     return false;
    //   }
    // case 'startdate':
    //   if (!isEmptyString) {
    //     return "Start date is required";
    //   } else {
    //     return false;
    //   }
    // case 'enddate':
    //   if (!isEmptyString) {
    //     return "End date is required";
    //   } else {
    //     return false;
    //   }
    // case 'starttime':
    //   if (!isEmptyString) {
    //     return "Start time is required";
    //   } else {
    //     return false;
    //   }
    // case 'endtime':
    //   let endtime = moment(value).unix();
    //   if (!isEmptyString) {
    //     return "To time is required";
    //   } else if(endtime <= starttime){
    //     return "To time must be greater than from time"
    //   }else{
    //     return false
    //   }
    // case 'description_2':
    //   if (!isEmptyString || value.trim() === "") {
    //     return "Description is required";
    //   } else {
    //     return false;
    //   }
    default:
      return false
  }
}