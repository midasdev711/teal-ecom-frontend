import React, { useState, useEffect } from "react";
import { Form, Button, Typography, Input, Select, Upload, message } from 'antd'
import styled from "styled-components";
import { LayoutWithoutSidebar } from "../../../src/components/views";

const { Title, Text } = Typography;
const { Option } = Select;
const { Dragger } = Upload;

export default function SetupNew() {
    const [form] = Form.useForm();
    const [requiredMark, setRequiredMarkType] = useState('optional');

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

    return (
        <LayoutWithoutSidebar title="New">
            <NewBlogForm>
                <Title1>Let's get you set up</Title1>
                <Form
                    form={form}
                    layout="vertical"
                >
                    <Label>Name your blog</Label>
                    <Form.Item name="blogname" rules={[{ required: true, message: 'Please input this field' }]}>
                        <FormInput placeholder="Name" size="large" />
                    </Form.Item>
                    <Label>Where are you publishing?</Label>
                    <Form.Item name="publishLocation" rules={[{ required: true, message: 'Please input this field' }]}>
                        <FormSelect placeholder="I am publishing on ..." size="large">
                            <FormSelectOption value="personal">My personal profile</FormSelectOption>
                            <FormSelectOption value="pages">My page(s)</FormSelectOption>
                            <FormSelectOption value="outside">Outside JuicyPie</FormSelectOption>
                        </FormSelect>
                    </Form.Item>
                    <Label>Select a category</Label>
                    <Form.Item name="category" rules={[{ required: true, message: 'Please input this field' }]}>
                        <FormSelect placeholder="Select category" size="large">
                            <FormSelectOption value="demo">Demo</FormSelectOption>
                        </FormSelect>
                    </Form.Item>
                    <Label>Cover picture</Label>
                    <Form.Item name="coverPicture" >
                        <FormDragger {...uploadProps} ></FormDragger>
                    </Form.Item>
                    <Form.Item shouldUpdate={true}>
                        {
                            () => (
                                <FormSubmitButton type="primary" htmlType="submit" disabled={
                                    !form.isFieldsTouched(true) ||
                                    form.getFieldsError().filter(({ errors }) => errors.length).length
                                }>Finish Creation</FormSubmitButton>
                            )
                        }

                    </Form.Item>
                </Form>
            </NewBlogForm>
        </LayoutWithoutSidebar>
    );
}

const Title1 = styled(Title)`
    font-family: Proxima Nova;
    font-style: normal!important;
    font-weight: bold!important;
    font-size: 30px!important;
    line-height: 30px!important;
    text-align: center;
    color: #404950!important;
    margin-bottom: 50px!important;
`;

const Label = styled(Text)`
    font-family: Proxima Nova;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 20px;
    color: #404950;
    margin-bottom: 15px;
    display: block;
`;

const NewBlogForm = styled.div`
    width: 305px;
    margin: 0 auto;
    padding-top: 83px;
`;

const FormInput = styled(Input)`
    width: 305px;
    height: 45px;
    filter: drop-shadow(0px 16px 60px rgba(78, 79, 114, 0.08));
    border: none;
`;

const FormSelect = styled(Select)`
    width: 305px;
    height: 45px;
    border: none;
    filter: drop-shadow(0px 16px 60px rgba(78, 79, 114, 0.08));
    .ant-select-selector {
        height: 45px!important;
        border: none!important;
        .ant-select-selection-search-input {
            height: 45px!important;
        }
    }
`;

const FormSelectOption = styled(Option)`
    width: 305px;
    height: 45px;
`;

const FormDragger = styled(Dragger)`
    width: 305px;
    height: 163px!important;
    border: none!important;
`;

const FormSubmitButton = styled(Button)`
    width: 305px;
    height: 45px;
    background: #0095F8;
    border-radius: 5px;
    font-family: Proxima Nova;
    font-style: normal;
    font-weight: bold;
    font-size: 15px;
    line-height: 15px;
    text-align: center;
    color: #FFFFFF;
    &[disabled] {
        background: #80CAFB;
        color: rgba(255, 255, 255, 0.7);
    }
`;
