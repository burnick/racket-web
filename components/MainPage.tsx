import React, { useCallback, useMemo, useState } from 'react';
import Head from 'next/head';
import { Layout, Menu, Popconfirm } from 'antd';
import Middleware from 'pages/authRoute';
import { removeUser } from 'store/slice/user';
import { useAppDispatch } from 'store/hooks';
import Router from 'next/router';
import Header from 'components/Header';
import type { MenuProps } from 'antd';
import {
  // AppstoreOutlined,
  // MailOutlined,
  // SettingOutlined,
  HomeOutlined,
  BookOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import styled from 'styled-components';
const { Content } = Layout;
interface MainPageProps {
  children: React.ReactNode;
}

const MainPage = ({ children }: MainPageProps) => {
  const dispatch = useAppDispatch();
  const [collapsed, setCollapsed] = useState(false);
  const [open, setOpen] = useState(false);
  const handleLogout = useCallback(() => {
    setOpen(false);
    dispatch(removeUser());
    Router.push('/login');
  }, [dispatch]);

  const showPopConfirm = useCallback(() => {
    console.log('Clicked show button');
    setOpen((current) => !current);
    console.log(open);
  }, []);

  const hidePopConfirm = useCallback(() => {
    console.log('Clicked cancel button');
    setOpen(false);
  }, []);

  const handleAbout = useCallback(() => {
    Router.push('about');
  }, []);

  const handleHome = useCallback(() => {
    Router.push('/');
  }, []);

  const menuItems = useMemo(
    () => [
      {
        key: 1,
        icon: <HomeOutlined />,
        label: <a onClick={handleHome}>Home</a>,
      },
      {
        key: 4,
        icon: <BookOutlined />,
        label: <a onClick={handleAbout}>About us</a>,
      },
      {
        key: 5,
        icon: <LogoutOutlined />,
        label: (
          <Popconfirm
            title="Are you sure?"
            open={open}
            onOpenChange={showPopConfirm}
            onConfirm={handleLogout}
            // okButtonProps={{ loading: confirmLoading }}
            onCancel={hidePopConfirm}
          >
            Logout
          </Popconfirm>
        ),
      },
    ],
    [open]
  );

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
          <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
          >
            <Menu mode="inline" items={menuItems} />
          </Sider>
          <ContentStyled>{children}</ContentStyled>
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

const Sider = styled(Layout.Sider)`
  background: ${(props) => props.theme.colors.primary} !important;
  color: ${(props) => props.theme.colors.white} !important;

  .ant-layout-sider-trigger {
    background: ${(props) => props.theme.colors.primary} !important;
  }
`;

export default MainPage;
