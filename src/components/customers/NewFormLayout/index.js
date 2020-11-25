import React, { useState } from "react";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import { CountryDropdown } from "react-country-region-selector";
import styled from "styled-components";

// icon
import { FormOutlined } from "@ant-design/icons";
// ui
import { Form, Input, Row, Col, Checkbox, Select, Typography, Tabs, Button } from "antd";
import NewForm from '../NewForm';
import { AddCustomers, resetCustomerStatus, getCustomers } from "../../../redux/actions/customers";
const { Option } = Select;
const { Text } = Typography;
const { TabPane } = Tabs;

const NewFormLayout = (props) => {
    const [collect_tax, setCollectTax] = useState(true);
    const [exemptions, setExemptions] = useState([]);
    const [phone, setPhone] = useState("");
    const [address_phone, setAddressPhone] = useState("");
    const [country, setCountry] = useState("United States");

    const onFinish = (values) => {
        console.log("Success:", values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    const handleChangeExemptions = (values) => {
        setExemptions(values);
    };

    const handleChangeTags = (value) => {
        console.log(`selected ${value}`);
    };

    const { BasicDetails, AddressDetails, /* Tags, TaxFlag, Tax, Notes, */ handleChangeValue } = props

    const [step, setStep] = useState('1')
    const [selectedProducts, setSelectedProducts] = useState([]);

    const onTabClick = (e) => {
        setStep('' + e);
    }

    const nextStep = () => {
        props.saveData()
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
                <TabPane tab="Customer Info" key="1">
                    <ContentBox>
                        <NewForm Modal={true} BasicDetails={BasicDetails} AddressDetails={AddressDetails} /* TaxFlag={TaxFlag} Tax={Tax} Notes={Notes} Tags={Tags} */ handleChangeValue={handleChangeValue} />
                    </ContentBox>
                </TabPane>
            </InputTabs>
            <ActionBottom>
                <NextStepButton width={100} type="primary" onClick={() => nextStep()}>
                    Complete
            </NextStepButton>
            </ActionBottom>
        </FormLayout>
    );
};

const SubForm = styled.div`
  padding: 24px 0;
`;

const ContentBox = styled.div`
    padding-right: 50px;
`;

const DesCheckbox = styled.p`
  margin: 0;
  font-size: 14px;
  color: #637381;
  padding-left: 24px;
  margin-top: 5px;
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

const FormCountDropdown = styled(CountryDropdown)`
  max-width: ${props => props.maxWidth ? props.maxWidth : 265}px;
  width: 100%;
  text-align: left;
  background-color: #F6F8F9!important;
  height: 45px!important;
  border: none!important;
  font-weight: normal;
  font-size: 15px;
  line-height: 17px;
  color: #404950;
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

const FormSelectOption = styled(Option)`
  max-width: 240px;
  height: 45px;
`;

const mapDispatchToProps = {
    AddCustomers,
};

export default NewFormLayout;
