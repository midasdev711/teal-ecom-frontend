import React from 'react';
import styled from 'styled-components';
import { Typography, Button } from "antd";
const { Text } = Typography;

const BlogGroup = ({title, onClick, image, count, isNew=false}) => {
    if (isNew) {
        var ButtonContent = (
            <AddBlog>
                <img src={'/images/new.svg'} />
                <NewTitle>Add new</NewTitle>
            </AddBlog>
        )
    } else {
        var ButtonContent = (
            <Blog onClick={onClick}>
                <BlogImage>
                    {image}
                </BlogImage>
                <BlogInformation>
                    <BlogText>{title}</BlogText>
                    <BlogText>{count} posts</BlogText>
                </BlogInformation>
            </Blog>
        )
    }
    return ButtonContent;
};

const NewTitle = styled(Text)`
    font-family: Proxima Nova;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 18px;
    color: #BAC3C9;
    padding-top: 10px;
`;

const BlogImage = styled.div`
    height: 150px;
`;

const BlogInformation = styled.div`
    height: 50px;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const AddBlog = styled(Button)`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 200px;
    height: 200px;
    padding: 0;
    border-radius: 10px;
    border: none;
    margin-bottom: 10px;
    overflow: hidden;
    &:hover {
        opacity: 0.8;
        box-shadow: 0px 0px 25px #989898;
    }
`;

const Blog = styled(Button)`
    width: 200px;
    height: 200px;
    padding: 0;
    border-radius: 10px;
    margin-bottom: 10px;
    margin-right: 45px;
    overflow: hidden;
    border: none;
    &:hover {
        opacity: 0.8;
        box-shadow: 0px 0px 25px #989898;
    }
`;

const BlogText = styled(Text)`
    font-family: Proxima Nova;
    font-style: normal;
    font-weight: normal;
    font-size: 13px;
    line-height: 14px;
    color: #404950;
`;

export default BlogGroup;
