import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { PageLayout } from "../src/components/views";
import { LeftContent, RightContent } from "../src/components/home";
import { getUserWithID } from "../src/redux/actions/users";
import { connect } from "react-redux";
import styled from "styled-components";

const Home = (props) => {
  const [isAuth, setIsAuth] = useState(false);
  const router = useRouter();
 
  useEffect(() => {
    let userID = localStorage.getItem("userID");
    setIsAuth(userID ? true : false);
    if (userID) {
      props.getUserWithID(userID);
    } else {
      router.push("/login");
    }
  });

  useEffect(() => {
    if (!props.isGetDetail) {
      router.push("/login");
    }
  }, [props.isGetDetail]);

  return (
    isAuth && (
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
    )
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
