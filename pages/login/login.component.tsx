import React, { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { Form, Input, message, Checkbox, Button } from 'antd';
import PanelCard from 'components/PanelCard';
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from 'firebase/auth';
import { addUser } from 'store/slice/user';
import { useAppDispatch } from 'store/hooks';
import { GoogleOutlined, FacebookOutlined } from '@ant-design/icons';
import { SendEmailService } from 'hooks/useSendEmailService';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import consoleHelper from 'utils/consoleHelper';
import Router from 'next/router';
import { UserProps } from 'types';

const { Item } = Form;
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const Login: React.FC = () => {
  const auth = getAuth();
  const [form] = Form.useForm();
  const [googleAuthorization, setGoogleAuthorization] = useState(false);
  const [fbAuthorization, setFBAuthorization] = useState(false);
  const dispatch = useAppDispatch();
  const [currentUser, setCurrentUser] = useState<UserProps | null>(null);
  const [messageApi, contextHolder] = message.useMessage();
  const { mutate, isLoading, isSuccess, isError } = SendEmailService();
  //const email = Form.useWatch('email', form);
  const { executeRecaptcha } = useGoogleReCaptcha();

  const submitEnquiryForm = useCallback(
    ({ email, token }: { email: string; token: string }) => {
      mutate({ email, token });
    },
    [mutate]
  );

  useEffect(() => {
    if (currentUser && currentUser.uid) {
      dispatch(
        addUser({
          uid: currentUser.uid,
          displayName: currentUser.displayName ?? '',
          email: currentUser.email ?? '',
          nickname: currentUser.displayName ?? '',
        })
      );
      Router.push('/');
    }
  }, [currentUser, mutate, dispatch]);

  useEffect(() => {
    const AuthCheck = onAuthStateChanged(auth, (user) => {
      console.log('user', user);
      // if (user?.uid) {
      //   setCurrentUser(user);
      //   dispatch(
      //     addUser({
      //       uid: user.uid,
      //       displayName: user.displayName ?? '',
      //       email: user.email ?? '',
      //       nickname: user.displayName ?? '',
      //     })
      //   );
      //   Router.push('/');
      // }
    });

    return () => AuthCheck();
  }, [auth, dispatch]);

  const onFinish = useCallback(
    (values: { email: string; remember: boolean }) => {
      if (!executeRecaptcha) {
        console.log('Execute recaptcha not yet available');
        return;
      }
      executeRecaptcha('enquiryFormSubmit').then((gReCaptchaToken) => {
        console.log(gReCaptchaToken, 'response Google reCaptcha server');
        submitEnquiryForm({ email: values.email, token: gReCaptchaToken });
      });
    },
    [executeRecaptcha, submitEnquiryForm]
  );

  const onFinishFailed = (errorInfo: unknown) => {
    console.log('Failed:', errorInfo);
  };

  const handleReset = useCallback(() => {
    form.resetFields();
  }, [form]);

  const handleGoogleClick = useCallback(() => {
    const signInWithGoogle = async () => {
      setGoogleAuthorization(true);

      signInWithPopup(auth, new GoogleAuthProvider())
        .then((response) => {
          const responseUser = response.user;
          if (responseUser && responseUser.uid) {
            setCurrentUser({
              uid: responseUser.uid,
              displayName:
                responseUser.displayName || `unknown${responseUser.uid}`,
              email: responseUser.email || '',
              nickname:
                responseUser.displayName || `unknown${responseUser.uid}`,
            });
          }
        })
        .catch((error) => {
          consoleHelper(error);
          setGoogleAuthorization(false);
        });
    };
    signInWithGoogle();
  }, [auth]);

  const handleFBClick = useCallback(() => {
    const signInWitFB = async () => {
      setFBAuthorization(true);

      signInWithPopup(auth, new FacebookAuthProvider())
        .then((response) => {
          const responseUser = response.user;
          if (responseUser && responseUser.uid) {
            setCurrentUser({
              uid: responseUser.uid,
              displayName:
                responseUser.displayName || `unknown${responseUser.uid}`,
              email: responseUser.email || '',
              nickname:
                responseUser.displayName || `unknown${responseUser.uid}`,
            });
          }
        })
        .catch((error) => {
          consoleHelper(error);
          setFBAuthorization(false);
        });
    };
    signInWitFB();
  }, [auth]);

  useEffect(() => {
    if (isLoading) {
      messageApi.open({
        type: 'success',
        content: 'Please wait sending create user request',
        duration: 2,
      });
    }

    return () => {
      message.destroy();
    };
  }, [isLoading, messageApi]);

  useEffect(() => {
    if (isError) {
      messageApi.open({
        type: 'error',
        content: 'Unable to send login email link, please try again later',
        duration: 10,
      });
    }
    return () => {
      message.destroy();
    };
  }, [isError, messageApi]);

  return (
    <>
      {contextHolder}
      <Container>
        <Head>
          <title>Racket.ph Login</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <meta property="og:title" content="Racket.ph" key="title" />
        </Head>
        <PanelCard title={isSuccess ? 'Magic link sent' : 'Login'} width={30}>
          {isSuccess && (
            <>
              <p>Please check your email client</p>
              <p>you may now close this window/page</p>
            </>
          )}
          <CustomButton
            type="primary"
            htmlType="button"
            onClick={handleGoogleClick}
            disabled={googleAuthorization}
          >
            <GIcon />
            <CustomButtonText>Sign in with Google</CustomButtonText>
          </CustomButton>

          <FBButton onClick={handleFBClick} disabled={fbAuthorization}>
            <FBIcon />
            <ButtonText>Sign in with Facebook</ButtonText>
          </FBButton>
          {!isSuccess && (
            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              form={form}
              disabled={true}
            >
              * email login is disabled
              <StyledItem
                label="Email"
                name="email"
                rules={[
                  {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                  },
                  { required: true, message: 'Please input your email!' },
                ]}
              >
                <Input disabled={true || isLoading} />
              </StyledItem>
              <StyledItem
                name="remember"
                valuePropName="checked"
                wrapperCol={{ offset: 8, span: 16 }}
              >
                <Checkbox>Remember me</Checkbox>
              </StyledItem>
              <ButtonsContainer {...tailLayout}>
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={true || isLoading}
                >
                  Submit
                </Button>

                <Button htmlType="reset" onClick={handleReset}>
                  Reset
                </Button>
              </ButtonsContainer>
            </Form>
          )}
        </PanelCard>
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  color: #fff;
`;

const StyledItem = styled(Item)``;

const ButtonsContainer = styled(Item)`
  .ant-form-item-control-input-content {
    display: flex;
    margin-left: -20%;
    width: 100%;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    gap: 10px;
  }
`;

const GIcon = styled(GoogleOutlined)`
  width: 18px;
  height: 18px;
  margin-right: 10px;
  position: relative;
  z-index: 0;
`;

const FBIcon = styled(FacebookOutlined)`
  width: 18px;
  height: 18px;
  margin-right: 10px;
  position: relative;
  z-index: 0;
`;

const FBButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.fbBlue} !important;
  width: 100%;
  margin-bottom: 20px;
  span {
    color: ${({ theme }) => theme.colors.white};
  }
`;

const ButtonText = styled.span`
  background-color: ${({ theme }) => theme.colors.fbBlue} !important;

  span {
    color: ${({ theme }) => theme.colors.white};
  }
`;

const CustomButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.white} !important;
  border-color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 10px;
  width: 100%;
  span {
    color: ${({ theme }) => theme.colors.black};
  }
`;

const CustomButtonText = styled.span`
  background-color: ${({ theme }) => theme.colors.white} !important;
  span {
    color: ${({ theme }) => theme.colors.black};
  }
`;

export default Login;
