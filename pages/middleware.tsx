import Router from 'next/router';
import { store } from 'store';
import { useCallback, useEffect, useState } from 'react';

export interface IAuthRouteProps {
  children?: React.ReactNode;
}

const Middleware: React.FunctionComponent<IAuthRouteProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const state = store.getState();

  useEffect(() => {
    if (state.user.uid) {
      setIsLoggedIn(true);
    } else {
      Router.push('/login');
    }
  }, []);

  return <>{isLoggedIn && children}</>;
};

export default Middleware;
