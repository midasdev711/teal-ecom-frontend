import React, { useEffect, useState } from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import Head from 'next/head';
import App from 'next/app';
import Router from 'next/router';
import GlobalStyles from '../src/components/styles/globalStyles';
import { TEPageLoader } from '../src/components/atoms';
import withData from '../src/config/configureClient';
import '../styles/antd.less';

import { apolloClient } from '../src/graphql';

function TealApp({ Component, pageProps, apollo }) {
  const [isLoading, setIsLoading] = useState();

  useEffect(() => {
    Router.events.on('routeChangeStart', () => {
      setIsLoading(true);
    });

    Router.events.on('routeChangeComplete', () => {
      setIsLoading(false);
    });

    Router.events.on('routeChangeError', () => {
      setIsLoading(false);
    });
  }, []);

  return (
    <div>
      <Head>
        <title>Teal Ecommerce</title>
        <link rel='icon' href='/favicon.svg' />
        <link
          href='https://fonts.googleapis.com/css?family=Proxima+Nova:300,300i,400,400i,700,700i,900,900i'
          rel='stylesheet'
          type='text/css'
        />
      </Head>
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
      </ApolloProvider>
      {isLoading && <TEPageLoader />}
      <GlobalStyles />
    </div>
  );
}

TealApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps };
};

export default withData(TealApp);
