import React, { useEffect, useState } from "react";
import { PageLayout } from "../src/components/views";
import { LeftContent, RightContent } from "../src/components/home";
import { getUserWithID } from "../src/redux/actions/users";
import { connect } from "react-redux";
import styled from "styled-components";
import { useRouter } from "next/router";
const Home = (props) => {

  const [userData, setUserData] = useState("")
  const [channelName, setChannelName] = useState("")
  const router = useRouter()
  let channelFlag

  useEffect(() => {
    let userID = localStorage.getItem("userID");
    if (userID) {
      props.getUserWithID(userID);
    }
  });
  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem("userData")))
    setChannelName(localStorage.getItem('channelName'))
  }, []);
  useEffect(() => {
    if (userData !== null && userData !== undefined && userData !== "") {
      if (router.pathname === "/") {
        channelName !== "" && channelName !== undefined && channelName !== null ? (channelName === "Ecommerce" ? (
          channelFlag = "ecom"
        ) : (channelFlag = channelName)) : (channelFlag = "ecom")
    			router.push(`/[portal_id]/${channelFlag.toLowerCase()}`, { pathname: `/${userData?.uniqueID}/${channelFlag.toLowerCase()}` }, { shallow: true });
      }
    }
  }, [userData])

  return (
    <PageLayout>
      <HomeContent>
        <HomeContainer>
          <div className="wrap-content">
            <LeftContent />
            <RightContent />
          </div>
        </HomeContainer>
      </HomeContent>
    </PageLayout>
  );
};

const HomeContent = styled.div`
  padding-top: 50px;
`;

const HomeContainer = styled.div`
  .wrap-content {
    display: flex;
    width: fit-content;
    margin: 0 auto;
  }
`;

const mapStateToProps = (store) => {
  return {
    // users
    userData: store.usersReducer.userData,
    isGetDetail: store.usersReducer.isGetDetail,
  };
};

const mapDispatchToProps = {
  getUserWithID,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
