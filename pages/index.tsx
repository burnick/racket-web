import React, { useCallback, useState } from 'react';
import Head from 'next/head';
import { Layout } from 'antd';
import Middleware from 'pages/authRoute';
import { removeUser } from 'store/slice/user';
import { useAppDispatch } from 'store/hooks';
import Router from 'next/router';
import Header from 'components/Header';
import Menu from 'components/Menu';
const { Content } = Layout;

const Home = () => {
  const [collapsed, setCollapsed] = useState(false);
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
          <Content>main content</Content>
        </Layout>
      </Layout>
    </Middleware>
  );
};

export default Home;
