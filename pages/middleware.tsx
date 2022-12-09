import Router from 'next/router';
import { store } from 'store';
import { useEffect, useState } from 'react';

export interface IAuthRouteProps {
  children?: React.ReactNode;
}

const Middleware: React.FunctionComponent<IAuthRouteProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const state = store.getState();

  useEffect(() => {
    console.log(state);
    if (state.user && state.user?.uid) {
      setIsLoggedIn(true);
    } else {
      Router.push('/login');
    }
  }, []);

  return <>{isLoggedIn && children}</>;
};

export default Middleware;
