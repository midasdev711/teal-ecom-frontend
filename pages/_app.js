import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import App from 'next/app';
import Router from 'next/router';
import GlobalStyles from '../components/styles/globalStyles';
import { TEPageLoader } from '../components/atoms';
import '../styles/antd.less';

function TealApp({ Component, pageProps }) {
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
      <Component {...pageProps} />
      {isLoading && <TEPageLoader />}
      <GlobalStyles />
    </div>
  );
}

TealApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps };
};

export default TealApp;
