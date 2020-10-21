import React, { useEffect, useState } from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import Head from "next/head";
import App from "next/app";
import Router from "next/router";
import GlobalStyles from "../src/components/styles/globalStyles";
import { TEPageLoader } from "../src/components/atoms";
import withData from "../src/config/configureClient";
import { parseCookies } from "../src/utils/parseCookies";
import { KEY_SESSION_USER } from "../src/utils/Consts";
import "../styles/antd.less";

import { apolloClient } from "../src/graphql";

// redux
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension"
import { applyMiddleware, createStore } from "redux";
import rootReducer from "../src/redux/reducers";

// const store = createStore(rootReducer, applyMiddleware(thunk));
const middlewares = [thunk];
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middlewares)));

function TealApp({ Component, pageProps, apollo }) {
  const [isLoading, setIsLoading] = useState();

  useEffect(() => {
    Router.events.on("routeChangeStart", () => {
      setIsLoading(true);
    });

    Router.events.on("routeChangeComplete", () => {
      setIsLoading(false);
    });

    Router.events.on("routeChangeError", () => {
      setIsLoading(false);
    });

    let userID = Number(localStorage.getItem("userID"));
    if (!userID) {
      Router.router.push("/login");
    }
  }, []);

  return (
    <div>
      <Head>
        <title>Juicy Pie Ecommerce</title>
        <link rel="icon" href="/favicon.svg" />
        <link
          href="https://fonts.googleapis.com/css?family=Proxima+Nova:300,300i,400,400i,700,700i,900,900i"
          rel="stylesheet"
          type="text/css"
        />
      </Head>
      <ApolloProvider client={apolloClient}>
        <Provider store={store}>
          {!isLoading && <Component {...pageProps} />}
        </Provider>
      </ApolloProvider>
      {isLoading && <TEPageLoader />}
      <GlobalStyles />
    </div>
  );
}

TealApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  const {
    ctx: { req, res },
  } = appContext;

  const cookies = parseCookies(req);
  let authUser;
  let accessToken = "";
  try {
    authUser =
      cookies[KEY_SESSION_USER] && JSON.parse(cookies[KEY_SESSION_USER]);
    accessToken = authUser && authUser.token;
  } catch (e) {
    console.log(e);
  }

  return { ...appProps, authUser, accessToken };
};

export default withData(TealApp);
