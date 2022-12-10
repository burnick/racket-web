import Router from 'next/router';
import { store } from 'store';
import { useEffect, useState } from 'react';

export interface AuthRouteProps {
  children?: React.ReactNode;
}

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

  return <>{isLoggedIn && children}</>;
};

export default AuthRoute;
