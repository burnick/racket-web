import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import PanelCard from 'components/PanelCard';
import { SignInService } from 'hooks/useSignInService';
import { useAppDispatch } from 'store/hooks';
import { addUser } from 'store/slice/user';
import Router from 'next/router';
import { Spin } from 'antd';

const SignIn = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [secret] = (router.query.slug as string[]) || [];
  const { data: userDetails, isLoading, isError } = SignInService({ secret });

  if (userDetails && userDetails.uid) {
    dispatch(
      addUser({
        ...userDetails,
        displayName: !userDetails.displayName
          ? userDetails.nickname
          : userDetails.displayName,
      })
    );
    Router.push('/');
  }

  if (isError) {
    Router.push('/login');
  }

  return (
    <Container>
      <PanelCard title="Validating sign-in...." loading={isLoading}>
        <p>
          Please wait <Spin size="small" />
        </p>
      </PanelCard>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  color: #fff;
`;

export default SignIn;
