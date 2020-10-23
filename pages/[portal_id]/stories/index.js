import React from "react";
import styled from "styled-components";
import HomeView from "../../../src/components/home/View";
import { PageLayout } from "../../../src/components/views";
// import Home from "../../index"

export default function StoriesHomePage() {
  return (
    // <Home />
    <PageLayout>
      <CustomerContent>
        <HomeView />
      </CustomerContent>
    </PageLayout>
  );
}

const CustomerContent = styled.div`
  padding: 50px;
`;
