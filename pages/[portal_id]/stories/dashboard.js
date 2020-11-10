import React, { useEffect } from "react";
import { Row, Button, Typography } from 'antd'
import styled from "styled-components";
import { useRouter } from "next/router"
import { getUserData } from '../../../src/utils'
import { LayoutWithNoSidebar } from "../../../src/components/views";
import { Banner, BlogGroup } from '../../../src/components/atoms';
import { connect } from "react-redux";
// actions
import { getBlogs } from "../../../src/redux/actions/blogs";
import { getPages } from "../../../src/redux/actions/pages";
import { getStores } from "../../../src/redux/actions/stores";

const { Title, Text } = Typography;

export function StoriesDashboard(props) {
    const router = useRouter();
    let userData = getUserData();

    const handleDefaultAction = (url) => {
        router.push(`/[portal_id]/${url}`, { pathname: `/${userData?.uniqueID}/${url}` }, { shallow: true });
    }

    useEffect(() => {
        getDataBlogs();
        getDataPages();
        getDataStores();
    }, []);

    const getDataBlogs = async () => {
        await props.getBlogs;
    };

    const getDataPages = async () => {
        await props.getPages;
    };

     const getDataStores = async () => {
        await props.getStores;
    };

    const { blogsData, pagesData, storesData } = props;

    console.log(pagesData)
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
                    {console.log('-----------')}
                    {console.log(pagesData)}
                    {console.log('-----------')}
                    { blogsData && blogsData.map((item) => (

                        <BlogGroup 
                            title="Default"
                            count="0"
                            image={<img alt="unfulied" src="/images/blog-thumbnail.png" 
                            onClick={() => handleDefaultAction('stories')} />}
                        ></BlogGroup>
                    )) }    
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

const mapStateToProps = (store) => {
    return {
        blogsData: store.blogReducer.blogData,
        pagesData: store.pageReducer.pageData,
        storesData: store.storeReducer.storeData
    };
};

const mapDispatchToProps = {
  getBlogs,
  getPages,
  getStores
};

export default connect(mapStateToProps, mapDispatchToProps)(StoriesDashboard);