import React, { useEffect, useState, useCallback } from 'react';
import Router from 'next/router';
import { store } from 'store';
import { Spin } from 'antd';

import { useIdleTimer } from 'react-idle-timer';
import { removeUser } from 'store/slice/user';
import styled from 'styled-components';
//import consoleHelper from 'utils/consoleHelper';

export interface AuthRouteProps {
  children?: React.ReactNode;
}

const AuthRoute: React.FunctionComponent<AuthRouteProps> = ({ children }) => {
  const state = store.getState();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const onIdle = useCallback(() => {
    // Do some idle action like log out your user
    removeUser();
    Router.push('/');
  }, []);

  useEffect(() => {
    if (!isLoggedIn && state.user && state.user.user?.uid) {
      setIsLoggedIn(true);
    }
    if (!state || !state?.user || !state?.user.user?.uid) {
      Router.push('/');
    }
  }, [isLoggedIn, state.user, state]);

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
