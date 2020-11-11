import React, { useState, useEffect } from "react";
import { useRouter } from "next/router"
import { Radio, Form, Button, Typography, Input, Select, Upload, message } from 'antd'
import { InboxOutlined } from '@ant-design/icons';
import styled from "styled-components";
import { LayoutWithoutSidebar } from "../../../src/components/views";
import { getUserData } from '../../../src/utils'
// actions
import { getBlogs, AddBlogs } from "../../../src/redux/actions/blogs";
import { getPages } from "../../../src/redux/actions/pages";
import { connect } from "react-redux";

const { Title, Text } = Typography;
const { Option } = Select;
const { Dragger } = Upload;

const options = [
    { label: 'My Personal Profile', value: 'personalProfile' },
    { label: 'My Pages', value: 'myPages' },
];

// const pages = [
//     {
//         label: 'page1', value: 'page1'
//     }
// ]

export function StoriesNew(props) {
    const router = useRouter()
    const [form] = Form.useForm();
    const [publishing, setPublishing] = useState(null);
    const [step, setStep] = useState(0);
    let userData = getUserData()

    const [, forceUpdate] = useState();

    // To disable submit button at the beginning.
    useEffect(() => {
        forceUpdate({});
        getDataBlogs();
        getDataPages();
    }, []);


    const getDataBlogs = () => {
        props.getBlogs();
    };

    const getDataPages = () => {
        props.getPages();
    };


    const { blogsData, pagesData } = props;

    const pages = [
        {
            label: 'page1', value: 'page1'
        }
    ]

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

    const onPublishChange = e => {
        setPublishing(e.target.value)
    }

    const goToNewPage = () => {
        router.push(`/[portal_id]/pages/setup-new`, { pathname: `/${userData?.uniqueID}/pages/setup-new` }, { shallow: true });
        // localStorage.setItem('channelName', url === 'ecom' ? 'Ecommerce' : 'stories')
    }

    const nextStep = () => {
        setStep(1);
    }

    const handleSubmit = () => {
       
        userData = JSON.parse(localStorage.getItem("userData"));

        let params = form.getFieldValue();
        
        let urls = []
        const images = params['coverPicture'].fileList.map((item, i)=>{   
            if(item.response && item.response.url){
                 urls.push(item.response.url) 
            }
        });   

        let setdata = {
            BlogTitle: params['blogname'],
            BlogPublishingPlace: publishing,
            BlogCategory: params['category'],
            BlogPicture: urls.join(", "),
            // BlogPicture: '',
            BlogUserID: userData.ID,
            BlogPageID: params['publishLocation']
        }

        props.AddBlogs(setdata);
    }


    return (
        <LayoutWithoutSidebar title="New">
            <NewBlogForm>
                <Form
                    form={form}
                    layout="vertical"
                >
                    {
                        step == 0 ?
                            <>
                                <ImageBox>
                                    <img src="/images/blogs/thinking.svg" />
                                </ImageBox>
                                <Title1>Create your Blog</Title1>
                                <NameInputBlock>
                                    <Form.Item name="blogname" rules={[{ required: true, message: 'Please input this field' }]}>
                                        <FormInput placeholder="Name" size="large" />
                                    </Form.Item>
                                    <Form.Item name="category" rules={[{ required: true, message: 'Please input this field' }]}>
                                        <FormSelect placeholder="Select category" size="large">
                                            <FormSelectOption value="demo">Demo</FormSelectOption>
                                        </FormSelect>
                                    </Form.Item>
                                </NameInputBlock>

                                <Label>Where are you publishing?</Label>
                                <PublishOption
                                    options={options}
                                    onChange={onPublishChange}
                                    value={publishing}
                                    optionType="button"
                                ></PublishOption>
                                <Text1>I'm publishing on my own website</Text1>
                                {
                                    publishing == 'myPages' &&
                                    (
                                        pagesData.length > 0 ?
                                            <Form.Item name="publishLocation" rules={[{ required: true, message: 'Please input this field' }]}>
                                                <PageSelect placeholder="I am publishing on ..." size="large">
                                                    {pagesData.map((page) => (
                                                        <PageSelectOption value={page._id}>{page.PageTitle}</PageSelectOption>
                                                    ))}

                                                </PageSelect>
                                            </Form.Item>
                                            :
                                            <NoPageBox>
                                                <p>You have no pages. <span onClick={() => goToNewPage()}>Create one.</span></p>
                                            </NoPageBox>
                                    )
                                }
                                <Form.Item shouldUpdate={true}>
                                    {
                                        () => (
                                            <ButtonBlock>
                                                <FormSubmitButton type="primary" disabled={
                                                    !form.isFieldsTouched(true) ||
                                                    form.getFieldsError().filter(({ errors }) => errors.length).length
                                                } onClick={() => nextStep()}>Next</FormSubmitButton>
                                            </ButtonBlock>

                                        )
                                    }
                                </Form.Item>
                            </>
                            :
                            <>
                                <Form.Item name="coverPicture" >
                                    <FormDragger {...uploadProps} >
                                        <DropBoxWrapper>
                                            <IconBox className="ant-upload-drag-icon">
                                                <InboxOutlined />
                                            </IconBox>
                                            <UploadText className="ant-upload-text">Page Picture</UploadText>
                                            <UploadHint className="ant-upload-hint">
                                                Click or drag an image file here to update your page picture.
                                        </UploadHint>
                                        </DropBoxWrapper>
                                    </FormDragger>
                                </Form.Item>
                                <Form.Item shouldUpdate={true}>
                                    {
                                        () => (
                                            <ButtonBlock>
                                                <FormSubmitButton type="primary" htmlType="submit" disabled={
                                                    !form.isFieldsTouched(true) ||
                                                    form.getFieldsError().filter(({ errors }) => errors.length).length
                                                } onClick={() => handleSubmit()}>Finish Creation</FormSubmitButton>
                                            </ButtonBlock>


                                        )
                                    }

                                </Form.Item>
                            </>
                    }

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
    width: 600px;
    max-height: 697px;
    min-height: 697px;
    height: 100%;
    margin: 0 auto;
    margin-top: 73px;
    padding: 15px 50px;
    background-color: white;
`;

const ImageBox = styled.div`
    text-align: center;
    width: 100%;
`;

const NameInputBlock = styled.div`
    display: flex;
    justify-content: space-between;
    .ant-form-item {
        max-width: 240px;
        width: 50%;
    }
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
        text-decoration: underline;
    }
`;

const PublishOption = styled(Radio.Group)`
    width: 100%;
    display: flex;
    justify-content: space-between;
    .ant-radio-button-wrapper {
        width: 50%;
        max-width: 240px;
        height: 150px;
        border-radius: 5px!important;
        border-left-width: 1px;
        background-color: #F6F8F9;
        border-width: 0;
        font-family: Proxima Nova;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 150%;
        /* or 24px */

        text-align: center;

        color: #404950;
        display: flex;
        justify-content: center;
        align-items: center;
        &.ant-radio-button-wrapper-checked {
            border-width: 1px;
        }
        &:before {
            width: 0;
        }
        span:not(.ant-radio-button) {
            width: 100px;
        }
    }
`;

const FormInput = styled(Input)`
    max-width: 240px;
    width: 100%;
    height: 45px;
    border: none;
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
`;

const FormSelectOption = styled(Option)`
    max-width: 240px;
    height: 45px;
`;

const PageSelect = styled(Select)`
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
`;

const PageSelectOption = styled(Option)`
    width: 100%;
    height: 45px;
`;

const NoPageBox = styled.div`
    width: 500px;
    height: 45px;
    background: #FFFFFF;
    border: 1px solid #BAC3C9;
    box-sizing: border-box;
    border-radius: 5px;
    display: flex;
    align-items: center;
    padding-left: 17px;
    p {
        font-family: Proxima Nova;
        font-style: normal;
        font-weight: normal;
        font-size: 15px;
        line-height: 17px;
        color: #404950;
        margin-bottom: 0;
    }
    span {
        color: #0095F8;
        cursor: pointer;
    }
`;

const FormDragger = styled(Dragger)`
    width: 310px!important;
    height: 147px!important;
    border: 5px solid #F6F8F9!important;
    background-color: white!important;
    margin: 0 auto;
    .ant-upload-drag-container {
        padding: 0;
    }
    .ant-upload {
        padding: 0!important;
    }
`;

const IconBox = styled.p`
    margin-bottom: 0!important;
    font-size: 12px;
`;

const UploadHint = styled.p`
    font-size: 12px!important;
    margin-bottom: 10px;
`;

const UploadText = styled.p`
    font-size: 14px!important;
    margin-bottom: 0;
    color: black!important;
`;

const DropBoxWrapper = styled.div`
    border: 1px dashed #E6E8E9;
    height: 100%;
`;

const ButtonBlock = styled.div`
    width: 100%;
    text-align: center;
`;

const FormSubmitButton = styled(Button)`
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

const mapStateToProps = (store) => {
    return {
        blogsData: store.blogReducer.blogsData,
        pagesData: store.pageReducer.pagesData
    };
};

const mapDispatchToProps = {
  getBlogs,
  getPages,
  AddBlogs
};

export default connect(mapStateToProps, mapDispatchToProps)(StoriesNew);