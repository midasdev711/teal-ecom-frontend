import React, { useState, useEffect, useRef } from "react";
import { PageLayout } from "../../../../src/components/views";
import styled from "styled-components";
import { ViewPosts } from "../../../../src/components/posts";
import { connect } from "react-redux";
import { useRouter } from "next/router";
// import Router from "next/router";

// actions
import {
    getListArticles,
    getListArticlesDeleted,
    getListArticlesDraft,
} from "../../../../src/redux/actions/articles";

// const usePrevious = (value) => {
//     const ref = useRef();
//     useEffect(() => {
//         ref.current = value;
//     });
//     return ref.current;
// };

const Posts = (props) => {
    const [userData, setUserData] = useState({});
    const [selectedStatus, setSelectedStatus] = useState('live');

    // const { articlesData } = props;
    // const prevProps = usePrevious({ articlesData });
    const router = useRouter();


    useEffect(() => {
        getDataArticles();
    }, [props]);

    useEffect(() => {
        const {
            query: { post_status },
        } = router;
        setSelectedStatus(post_status)
    }, [router.query]);

    useEffect(() => {
        console.log("selectedStatus", selectedStatus);
        getDataArticles();
    }, [selectedStatus])

    const getDataArticles = async () => {
        const userData = JSON.parse(localStorage.getItem("userData"));
        setUserData(userData);
        const userID = Number(localStorage.getItem("userID"));
        if (selectedStatus === "drafts") {
            props.getListArticlesDraft(userID, true, 100, 1);
        } else if (selectedStatus === "deleted") {
            props.getListArticlesDeleted(userID, userID, 100, 1);
        } else if (selectedStatus === "live") {
            await props.getListArticles(userID, 100, 1);
        }
    };
    useEffect(() => {
        router.prefetch('/[portal_id]/stories/posts/new')
        router.prefetch('/[portal_id]/stories/[slug]/draft')
        router.prefetch('/[portal_id]/stories/[slug]')
    }, [])

    return (
        <PageLayout>
            <CustomerContent>
                <ViewPosts userData={userData} currentTab={selectedStatus} />
            </CustomerContent>
        </PageLayout>
    );
};

const CustomerContent = styled.div`
  padding: 50px;
`;

const mapStateToProps = (store) => {
    return {
        // articlesData: store.articlesReducer.articlesData,
        msgErr: store.articlesReducer.msgErr,
    };
};

const mapDispatchToProps = {
    getListArticles,
    getListArticlesDeleted,
    getListArticlesDraft,
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
