import React from 'react';
import Head from 'next/head';
import { Layout } from 'antd';
import Header from 'components/Header';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import styled from 'styled-components';
import Menu from 'components/Menu';
import { store } from 'store';

const { Content, Footer } = Layout;
interface MainLayoutPageProps {
  children: React.ReactNode;
}

const MainLayoutPage = ({ children }: MainLayoutPageProps) => {
  const state = store.getState();
  return (
    <>
      <Head>
        <title>Racket.ph</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:title" content="Racket.ph" key="title" />
      </Head>
      <Layout style={{ minHeight: '100vh' }}>
        <Header />
        {!state.user.user?.uid ? (
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
        ) : (
          <Menu />
        )}
        <ContentStyled>{children}</ContentStyled>
        <FooterContainer>2023 All rights reserved</FooterContainer>
      </Layout>
    </>
  );
};

const ContentStyled = styled(Content)`
  margin-top: -20px
  padding: 10px;
  box-sizing: border-box;
`;

const FooterContainer = styled(Footer)`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  width: 100%;
  padding: 10px;
  color: ${(props) => props.theme.colors.white} !important;
  background: ${(props) => props.theme.colors.primary} !important;
`;

export default MainLayoutPage;
