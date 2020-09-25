import React, { useEffect, useState } from "react";
import { PageLayout } from "../src/components/views";
import { LeftContent, RightContent } from "../src/components/home";
import { getUserWithID } from "../src/redux/actions/users";
import { connect } from "react-redux";
import styled from "styled-components";

const Home = (props) => {

  useEffect(() => {
    let userID = localStorage.getItem("userID");
    if (userID) {
      props.getUserWithID(userID);
    }
  });
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
