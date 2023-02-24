import React, { useCallback, useMemo, useState, useEffect } from 'react';
import { Popconfirm, Menu, Button } from 'antd';
import { removeUser } from 'src/store/slice/user';
import { removeLocation } from 'src/store/slice/location';
import { useAppDispatch } from 'src/store/hooks';
import Router from 'next/router';
import { store } from 'src/store';
import consoleHelper from 'src/utils/consoleHelper';
import { UserProps } from 'types';
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  //onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import { addUser } from 'src/store/slice/user';
import {
  // AppstoreOutlined,
  // MailOutlined,
  // SettingOutlined,
  ProjectOutlined,
  HomeOutlined,
  BookOutlined,
  LogoutOutlined,
  LoginOutlined,
  GoogleOutlined,
  FacebookOutlined,
} from '@ant-design/icons';
import styled from 'styled-components';
import { SignInService } from 'hooks/useSignInService';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

const App = () => {
  const [open, setOpen] = useState(false);
  const state = store.getState();
  const dispatch = useAppDispatch();
  const { AddUser } = SignInService();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [currentUser, setCurrentUser] = useState<UserProps | null>(null);
  const { mutate: mutateCurrentUser, isSuccess: addUserSuccess } = AddUser();
  const [googleAuthorization, setGoogleAuthorization] = useState(false);
  const [fbAuthorization, setFBAuthorization] = useState(false);
  //const router = useRouter();
  const auth = getAuth();

  const user = state.user.user;
  const handleLogout = useCallback(() => {
    signOut(auth);
    dispatch(removeUser());
    dispatch(removeLocation());
    Router.push('/');
    setOpen(false);
  }, [dispatch, auth]);

  const showPopConfirm = useCallback(() => {
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

  useEffect(() => {
    if (addUserSuccess && currentUser && currentUser.uid) {
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
  }, [addUserSuccess, dispatch, currentUser]);

  useEffect(() => {
    if (currentUser && currentUser.uid) {
      if (!executeRecaptcha) {
        consoleHelper('Execute recaptcha not yet available');
        return;
      }
      executeRecaptcha('enquiryFormSubmit').then((gReCaptchaToken) => {
        consoleHelper(gReCaptchaToken, 'response Google reCaptcha server');
        mutateCurrentUser({ ...currentUser, token: gReCaptchaToken });
      });
    }
  }, [currentUser?.uid, currentUser, executeRecaptcha, mutateCurrentUser]);

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
      {
        key: 6,
        icon: <LoginOutlined />,
        label: 'Login',
        children: [
          {
            label: (
              <FBButton onClick={handleFBClick} disabled={fbAuthorization}>
                <FBIcon />
                <ButtonText>Facebook</ButtonText>
              </FBButton>
            ),
          },
          {
            label: (
              <CustomButton
                type="primary"
                htmlType="button"
                onClick={handleGoogleClick}
                disabled={googleAuthorization}
              >
                <GIcon />
                <CustomButtonText>Google</CustomButtonText>
              </CustomButton>
            ),
          },
        ],
      },
    ],
    [
      open,
      fbAuthorization,
      handleAbout,
      handleFBClick,
      handleGoogleClick,
      handleHome,
      handleJob,
      handleLogout,
      googleAuthorization,
      hidePopConfirm,
      showPopConfirm,
    ]
  );

  const newMenuItems = !user.uid
    ? menuItems.filter((_, index) => {
        return [1, 3].indexOf(index) == -1;
      })
    : menuItems.filter((_, index) => {
        return [4].indexOf(index) == -1;
      });

  return (
    <StyledMenu
      //theme="dark"
      mode="horizontal"
      defaultSelectedKeys={['1']}
      items={newMenuItems}
    />
  );
};

const StyledMenu = styled(Menu)`
  width: 100%;
  color: white;
  background: #483d8b !important;
  border-bottom: none !important;
  display: flex;
  justify-content: flex-start;
  .ant-menu-overflow-item.ant-menu-item {
    color: white !important;
    text-decoration: none !important;
    a {
      color: white;
      text-decoration: none !important;
    }
    a:hover {
      color: gray;
      text-decoration: none !important;
    }
    border-bottom-color: #483d8b !important;
  }

  .ant-menu-overflow-item.ant-menu-item.ant-menu-item-selected:after {
    border-bottom-color: white !important;
    text-decoration: none;
  }
  .ant-menu-overflow-item.ant-menu-item.ant-menu-item-selected:hover {
    border-bottom-color: transparent !important;
    text-decoration: none;
  }

  .ant-menu-overflow-item.ant-menu-item.ant-menu-item-active:after {
    border-bottom-color: transparent !important;
    text-decoration: none;
  }

  .ant-menu-submenu-selected > .ant-menu-submenu-title,
  .ant-menu-submenu-title:hover {
    color: gray !important;
    text-decoration: none !important;
    border-bottom-color: transparent !important;
    text-decoration: none;
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

export default App;
