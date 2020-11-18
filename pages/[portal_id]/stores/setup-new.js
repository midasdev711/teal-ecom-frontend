import React, { useState, useEffect } from "react";
import { Form, Button, Typography, Input, Select, Upload, message } from 'antd'
import styled from "styled-components";
import { LayoutWithoutSidebar } from "../../../src/components/views";

const { Title, Text } = Typography;
const { Option } = Select;
const { Dragger } = Upload;
const { TextArea } = Input;

export default function SetupNew() {
    const [form] = Form.useForm();
    const [, forceUpdate] = useState();
    const [step, setStep] = useState(0);

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

    const nextStep = (step) => {
        setStep(step);
    }

    return (
        <LayoutWithoutSidebar title="New Store">
            <NewPageForm>
                <Form
                    form={form}
                    layout="vertical"
                >
                    {
                        step == 0 ?
                            <>
                                <ImageBox>
                                    <img src="/images/stores/store_setup.svg" />
                                </ImageBox>
                                <Title1>Create your Store</Title1>
                                <NameInputBlock>
                                    <Form.Item name="storename" rules={[{ required: true, message: 'Please input this field' }]}>
                                        <FormInput placeholder="Store Name" size="large" maxWidth={240} />
                                    </Form.Item>
                                    <Form.Item name="industry" rules={[{ required: true, message: 'Please input this field' }]}>
                                        <FormSelect placeholder="Industry" size="large" maxwidth={240}>
                                            <FormSelectOption value="demo" maxwidth={240}>Demo</FormSelectOption>
                                        </FormSelect>
                                    </Form.Item>
                                </NameInputBlock>
                                <Form.Item name="pageabout" rules={[{ required: true, message: 'Please input this field' }]}>
                                    <FormTextArea placeholder="What's your store about?" size="large" />
                                </Form.Item>
                                <Form.Item shouldUpdate={true}>
                                    {
                                        () => (
                                            <SubmitButtonArea>
                                                <FormSubmitButton type="primary" onClick={() => nextStep(1)} disabled={
                                                    !form.isFieldsTouched(true) ||
                                                    form.getFieldsError().filter(({ errors }) => errors.length).length
                                                }>Next</FormSubmitButton>
                                            </SubmitButtonArea>
                                        )
                                    }
                                </Form.Item>
                            </>
                            :
                            <>
                                <Title1>Let's customize your store</Title1>
                                <Form.Item name="coverPicture" >
                                    <FormDragger {...uploadProps} >
                                        <DropBoxWrapper>
                                            <IconBox className="ant-upload-drag-icon">
                                                <img src="/images/blogs/image_upload.svg" />
                                            </IconBox>
                                            {/* <UploadText className="ant-upload-text">Page Picture</UploadText>
                                            <UploadHint className="ant-upload-hint">
                                                Click or drag an image file here to update your page picture.
                                            </UploadHint> */}
                                        </DropBoxWrapper>
                                    </FormDragger>
                                </Form.Item>
                                <Text1 noUnderline={true}>My new blog name</Text1>
                                <Form.Item name="alreadyselling" rules={[{ required: true, message: 'Please input this field' }]}>
                                    <FormSelect placeholder="Are you already selling?" size="large" maxwidth={500}>
                                        <FormSelectOption value="demo" maxwidth={500}>Demo</FormSelectOption>
                                    </FormSelect>
                                </Form.Item>
                                <Form.Item name="currentSalesVolume" rules={[{ required: true, message: 'Please input this field' }]}>
                                    <FormInput placeholder="What is your current sales volume?" size="large" maxWidth={500} />
                                </Form.Item>
                                <Form.Item shouldUpdate={true}>
                                    {
                                        () => (
                                            <SubmitButtonArea>
                                                <FormSubmitButton type="primary" onClick={() => nextStep(2)} disabled={
                                                    !form.isFieldsTouched(true) ||
                                                    form.getFieldsError().filter(({ errors }) => errors.length).length
                                                }>Next</FormSubmitButton>
                                            </SubmitButtonArea>
                                        )
                                    }
                                </Form.Item>

                            </>
                    }
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
    max-width: ${props => props.maxWidth}px;
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
    max-width: ${props => props.maxwidth}px;
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
    max-width: ${props => props.maxwidth}px;
    height: 45px;
`;

const FormSubmitButton = styled(Button)`
    width: 100px;
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

const FormDragger = styled(Dragger)`
    width: 100px!important;
    height: 100px!important;
    background-color: white!important;
    margin: 30px auto;
    margin-bottom: 0;
    border: none!important;
    .ant-form-item .ant-upload.ant-upload-drag {
        border: none;
    }
    .ant-upload-drag-container {
        padding: 0;
        border: none;
    }
    .ant-upload {
        padding: 0!important;
    }
`;

const IconBox = styled.p`
    margin-bottom: 0!important;
    font-size: 12px;
`;

const DropBoxWrapper = styled.div`
    height: 100%;
`;

const Text1 = styled.p`
    font-family: Proxima Nova;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 150%;
    text-align: center;
    color: #404950;
    cursor: pointer;
    margin-bottom: 15px;
    margin-top: 15px;
    &:hover {
        text-decoration: ${props => props.noUnderline ? 'none' : 'underline'};
    }
`;
