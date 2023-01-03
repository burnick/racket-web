import React, { useCallback } from 'react';
import Head from 'next/head';
import { Layout } from 'antd';
import Middleware from 'pages/authRoute';
import { removeUser } from 'store/slice/user';
import { useAppDispatch } from 'store/hooks';
import Router from 'next/router';
import Header from 'components/Header';
import Menu from 'components/Menu';
import styled from 'styled-components';
const { Content } = Layout;

const Home = () => {
  const dispatch = useAppDispatch();

  const handleLogout = useCallback(() => {
    dispatch(removeUser());
    Router.push('/login');
  }, [dispatch]);

  return (
    <Middleware>
      <Head>
        <title>Racket.ph</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:title" content="Racket.ph" key="title" />
      </Head>
      <Layout style={{ minHeight: '100vh' }}>
        <Header />
        <Layout>
          <Menu />
          <ContentStyled>
            <a onClick={handleLogout}>main content</a>
          </ContentStyled>
        </Layout>
      </Layout>
    </Middleware>
  );
};

const ContentStyled = styled(Content)`
  padding: 10px;
  box-sizing: border-box;
  color: black;
`;

export default Home;
