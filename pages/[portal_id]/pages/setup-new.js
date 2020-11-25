import React, { useState, useEffect } from "react";
import { Form, Button, Typography, Input, Select, Upload, message } from 'antd'
import { InboxOutlined } from '@ant-design/icons';
import styled from "styled-components";
import { LayoutWithoutSidebar } from "../../../src/components/views";
import { connect } from "react-redux";
import Router from "next/router";
const { Title, Text } = Typography;
const { Option } = Select;
const { Dragger } = Upload;
const { TextArea } = Input;
import { AddPages } from '../../../src/redux/actions/pages';
import { getUserData } from "../../../src/utils";
import { useRouter } from "next/router"

let userData = {}
const NewPage = (props) => {
    const router = useRouter()
    const [form] = Form.useForm();
    const [, forceUpdate] = useState();

    // To disable submit button at the beginning.
    useEffect(() => {
        forceUpdate({});
    }, []);


    const uploadProps = {
        name: 'file',
        multiple: true,
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };

    const handleSubmit = () => {

        userData = JSON.parse(localStorage.getItem("userData"));

        let params = form.getFieldValue();

        let setdata = {
            PageTitle: params['pagename'],
            PageDescription: params['pageabout'],
            PageCategory: params['category'],
            PageUserName: userData.userName,
            PageEmail: userData.email,
            PagePhone: userData.mobileNo,
            PageWebsite: '',
            PageLocation: '',
            PageUserID: userData.ID
        }

        props.AddPages(setdata);
        router.push(`/[portal_id]/pages/`, { pathname: `/${userData?.uniqueID}/pages/` }, { shallow: true });
    }

    return (
        <LayoutWithoutSidebar title="New Page">
            <NewPageForm>
                <Form
                    form={form}
                    layout="vertical"
                >
                    <ImageBox>
                        <img src="/images/pages/startup.svg" />
                    </ImageBox>
                    <Title1>Create your Page</Title1>
                    <NameInputBlock>
                        <Form.Item name="pagename" rules={[{ required: true, message: 'Please input this field' }]}>
                            <FormInput placeholder="Page Name" size="large" />
                        </Form.Item>
                        <Form.Item name="category" rules={[{ required: true, message: 'Please input this field' }]}>
                            <FormSelect placeholder="Select category" size="large">
                                <FormSelectOption value="demo">Demo</FormSelectOption>
                            </FormSelect>
                        </Form.Item>
                    </NameInputBlock>
                    <Form.Item name="pageabout" rules={[{ required: true, message: 'Please input this field' }]}>
                        <FormTextArea placeholder="What's your page about?" size="large" />
                    </Form.Item>
                    <Form.Item shouldUpdate={true}>
                        {
                            () => (
                                <SubmitButtonArea>
                                    <FormSubmitButton type="primary" htmlType="submit" disabled={
                                        !form.isFieldsTouched(true) ||
                                        form.getFieldsError().filter(({ errors }) => errors.length).length
                                    } onClick={() => handleSubmit()}>Finish Creation</FormSubmitButton>
                                </SubmitButtonArea>

                            )
                        }
                    </Form.Item>
                </Form>
            </NewPageForm>
        </LayoutWithoutSidebar>
    );
}

const Title1 = styled(Title)`
    font-family: Proxima Nova;
    font-style: normal!important;
    font-weight: bold!important;
    font-size: 22px!important;
    line-height: 22px!important;
    text-align: center;
    color: #404950!important;
    margin-top: 20px!important;
    margin-bottom: 20px!important;
`;

const ImageBox = styled.div`
    text-align: center;
    width: 100%;
`;

const NewPageForm = styled.div`
    width: 600px;
    margin: 0 auto;
    margin-top: 83px;
    padding: 15px 50px;
    background-color: white;
`;

const NameInputBlock = styled.div`
    display: flex;
    justify-content: space-between;
    .ant-form-item {
        max-width: 240px;
        width: 50%;
    }
`;

const FormInput = styled(Input)`
    max-width: 240px;
    width: 100%;
    height: 45px;
    border: none;
    background-color: #F6F8F9;
`;

const FormTextArea = styled(TextArea)`
    max-width: 600px;
    width: 100%;
    height: 97px!important;
    border: none;
    font-size: 16px;
    background-color: #F6F8F9;
`;

const FormSelect = styled(Select)`
    max-width: 240px;
    width: 100%;
    height: 45px;
    border: none;
    text-align: left;
    .ant-select-selector {
        background-color: #F6F8F9!important;
        height: 45px!important;
        border: none!important;
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

const FormSubmitButton = styled(Button)`
    width: 305px;
    height: 45px;
    background: #0095F8!important;
    border-radius: 5px;
    font-family: Proxima Nova;
    font-style: normal;
    font-weight: bold;
    font-size: 15px;
    line-height: 15px;
    text-align: center;
    color: #FFFFFF;
    &[disabled] {
        background: #80CAFB!important;
        color: rgba(255, 255, 255, 0.7)!important;
    }
`;

const SubmitButtonArea = styled.div`
    width: 100%;
    text-align: center;
`

const mapStateToProps = (store) => {
    return {

    };
};

const mapDispatchToProps = {
    AddPages
};

export default connect(mapStateToProps, mapDispatchToProps)(NewPage);


