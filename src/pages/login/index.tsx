import React from 'react';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import Login from './login.component';
const LoginContainer = () => {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_RECAPTCHA_KEY as string}
      scriptProps={{
        async: false,
        defer: false,
        appendTo: 'head',
        nonce: undefined,
      }}
    >
      <Login />
    </GoogleReCaptchaProvider>
  );
};

export default LoginContainer;
