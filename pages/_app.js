import Head from 'next/head';
import GlobalStyles from '../components/styles/globalStyles';
import '../styles/antd.less';

function MyApp({ Component, pageProps }) {
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
      <GlobalStyles />
    </div>
  );
}

export default MyApp;
