import React from 'react';
import Router from 'next/router';
import { store } from 'store';
import { Spin } from 'antd';
import { useEffect, useState } from 'react';
import { useIdleTimer } from 'react-idle-timer';
import { removeUser } from 'store/slice/user';
import styled from 'styled-components';

export interface AuthRouteProps {
  children?: React.ReactNode;
}

const onIdle = () => {
  // Do some idle action like log out your user
  removeUser();
  Router.push('/login');
};

const AuthRoute: React.FunctionComponent<AuthRouteProps> = ({ children }) => {
  const state = store.getState();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    if (!isLoggedIn && state.user && state.user?.uid) {
      setIsLoggedIn(true);
    }
    if (!state?.user.uid) {
      Router.push('/login');
    }
  }, [isLoggedIn, state.user]);

  useIdleTimer({
    timeout: 1000 * 60 * 20,
    onIdle,
    debounce: 5000,
  });

  return (
    <Container>
      {!isLoggedIn && <Spin tip="Loading" size="large" />}
      {isLoggedIn && children}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
`;

export default AuthRoute;
