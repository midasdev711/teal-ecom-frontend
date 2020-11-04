import React from "react";
import { Row, Button, Typography } from 'antd'
import styled from "styled-components";
import { useRouter } from "next/router"
import { getUserData } from '../../../src/utils'
import { LayoutWithNoSidebar } from "../../../src/components/views";
import { Banner, BlogGroup } from '../../../src/components/atoms'

const { Title, Text } = Typography;

export default function StoriesDashboard() {
    const router = useRouter()
    let userData = getUserData()

    const goToNewBlogPage = (url) => {
        router.push(`/[portal_id]/stories/setup-new`, { pathname: `/${userData?.uniqueID}/stories/setup-new` }, { shallow: true });
    }
    return (
        <LayoutWithNoSidebar>
            <Banner
                title="Write more."
                description="We write to taste life twice, in the moment and in retrospect. ― Anais Nin"
                image={<img alt="unfulied" src="/images/stories-dashboard-banner.png" />}
                backgroundColor="#C2FBD7"
            >
            </Banner>
            <BlogContainer>
                <BlogContainerHeader>
                    <Title1>Blogs</Title1>
                    <AddButton>
                        <img src={'/images/new_small.svg'} />
                        <AddButtonText>Add</AddButtonText>
                    </AddButton>
                </BlogContainerHeader>
                <BlogGroupContent>
                    <BlogGroup 
                        title="Default"
                        count="0"
                        image={<img alt="unfulied" src="/images/blog-thumbnail.png" />}
                    ></BlogGroup>
                    <BlogGroup 
                        isNew={true}
                        onClick={goToNewBlogPage}
                    ></BlogGroup>
                </BlogGroupContent>
            </BlogContainer>
        </LayoutWithNoSidebar>
    );
}

const BlogContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 50px;
`;

const BlogContainerHeader = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 30px;
`;

const BlogGroupContent = styled(Row)`
    width: 100%;
`;

const Title1 = styled(Title)`
    font-family: Proxima Nova;
    font-style: normal!important;
    font-weight: bold!important;
    font-size: 21px!important;
    line-height: 21px!important;
    color: #404950!important;
`;

const AddButtonText = styled(Text)`
    font-family: Proxima Nova;
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 14px;
    color: #FFFDFD;
    padding-left: 10px;
`;

const AddButton = styled(Button)`
    width: 70px;
    height: 30px;

    background: #0095F8;
    border-radius: 5px;

    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
        background-color: #0095F8;
        opacity: 0.8;
        box-shadow: 0px 0px 25px #989898;
    }
`;