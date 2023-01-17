import React, { useCallback, useMemo, useState } from 'react';
import Head from 'next/head';
import { Layout, Popconfirm, Menu } from 'antd';
import Middleware from 'pages/authRoute';
import { removeUser } from 'store/slice/user';
import { removeLocation } from 'store/slice/location';
import { useAppDispatch } from 'store/hooks';
import Router from 'next/router';
import Header from 'components/Header';
import { getAuth, signOut } from 'firebase/auth';
import { useRouter } from 'next/router';
import {
  // AppstoreOutlined,
  // MailOutlined,
  // SettingOutlined,
  ProjectOutlined,
  HomeOutlined,
  BookOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import styled from 'styled-components';
const { Content, Footer } = Layout;
interface MainLayoutPageProps {
  children: React.ReactNode;
}

const MainLayoutPage = ({ children }: MainLayoutPageProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const auth = getAuth();
  const [open, setOpen] = useState(false);
  const handleLogout = useCallback(() => {
    signOut(auth);
    dispatch(removeUser());
    dispatch(removeLocation());
    Router.push('/login');
    setOpen(false);
  }, [dispatch, auth]);

  const showPopConfirm = useCallback(() => {
    // /console.log('Clicked show button');
    setOpen((current) => !current);
  }, []);

  const hidePopConfirm = useCallback(() => {
    //console.log('Clicked cancel button');
    setOpen(false);
  }, []);

  const handleAbout = useCallback(() => {
    Router.push('about');
  }, []);

  const handleHome = useCallback(() => {
    Router.push('/');
  }, []);

  const handleJob = useCallback(() => {
    Router.push('/postjob');
  }, []);

  const menuItems = useMemo(
    () => [
      {
        key: 1,
        icon: <HomeOutlined />,
        label: <a onClick={handleHome}>Home</a>,
      },
      {
        key: 2,
        icon: <ProjectOutlined />,
        label: <a onClick={handleJob}>Post Job</a>,
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
            <a>Logout</a>
          </Popconfirm>
        ),
      },
    ],
    [
      open,
      handleAbout,
      handleHome,
      handleLogout,
      hidePopConfirm,
      showPopConfirm,
      handleJob,
    ]
  );

  return (
    <>
      <Head>
        <title>Racket.ph</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:title" content="Racket.ph" key="title" />
      </Head>
      <Layout style={{ minHeight: '100vh' }}>
        <Header />
        {!['/login', '/about'].includes(router.pathname) && (
          <StyledMenu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            items={menuItems}
          />
        )}

        <ContentStyled>
          {['/login', '/about'].includes(router.pathname) ? (
            children
          ) : (
            <Middleware>{children}</Middleware>
          )}
        </ContentStyled>
        <Footer>Footer</Footer>
      </Layout>
    </>
  );
};

const ContentStyled = styled(Content)`
  margin-top: -20px
  padding-left: 10px;
  box-sizing: border-box;
`;

// const Sider = styled(Layout.Sider)`
//   background: ${(props) => props.theme.colors.primary} !important;
//   color: ${(props) => props.theme.colors.white} !important;

//   .ant-layout-sider-trigger {
//     background: ${(props) => props.theme.colors.primary} !important;
//   }
// `;

const StyledMenu = styled(Menu)`
  width: 100%;
  height: 100%;

  .ant-menu-item-selected {
    background-color: #483d8b !important;
  }
`;

export default MainLayoutPage;
