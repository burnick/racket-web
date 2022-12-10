import Router from 'next/router';
import { store } from 'store';
import { useEffect, useState } from 'react';
import { useIdleTimer } from 'react-idle-timer';
import { removeUser } from 'store/slice/user';

export interface AuthRouteProps {
  children?: React.ReactNode;
}

const onIdle = () => {
  // Do some idle action like log out your user
  removeUser();
  Router.push('/login');
};

const AuthRoute: React.FunctionComponent<AuthRouteProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const state = store.getState();

  useEffect(() => {
    // console.log(state);
    if (state.user && state.user?.uid) {
      setIsLoggedIn(true);
    } else {
      Router.push('/login');
    }
  }, []);

  useIdleTimer({
    timeout: 1000 * 60 * 20,
    onIdle,
  });

  return <>{isLoggedIn && children}</>;
};

export default AuthRoute;
