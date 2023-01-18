import React from 'react';
import Head from 'next/head';
import { Layout } from 'antd';
import Header from 'components/Header';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import styled from 'styled-components';
import Menu from 'components/Menu';

const { Content, Footer } = Layout;
interface MainLayoutPageProps {
  children: React.ReactNode;
}

const MainLayoutPage = ({ children }: MainLayoutPageProps) => {
  return (
    <>
      <Head>
        <title>Racket.ph</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:title" content="Racket.ph" key="title" />
      </Head>
      <Layout style={{ minHeight: '100vh' }}>
        <Header />
        <GoogleReCaptchaProvider
          reCaptchaKey={process.env.NEXT_RECAPTCHA_KEY as string}
          scriptProps={{
            async: false,
            defer: false,
            appendTo: 'head',
            nonce: undefined,
          }}
        >
          <Menu />
        </GoogleReCaptchaProvider>
        <ContentStyled>{children}</ContentStyled>
        <Footer>Footer</Footer>
      </Layout>
    </>
  );
};

const ContentStyled = styled(Content)`
  margin-top: -20px
  padding: 10px;
  box-sizing: border-box;
`;

export default MainLayoutPage;
