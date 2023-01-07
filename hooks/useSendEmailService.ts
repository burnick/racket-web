import { useMutation } from 'react-query';
import useAxios from 'hooks/use-axios';

interface EmailProps {
  email: string;
  token: string;
}

const sendProp = async ({ email, token }: EmailProps) => {
  if (!email) {
    console.error('missing email');
    return false;
  }

  const { data: response } = await useAxios.post(`users`, {
    email,
    token,
  });

  return response;
};

export const SendEmailService = () => {
  const result = async ({ email, token }: EmailProps) => {
    return await sendProp({ email, token });
  };
  return useMutation(result);
};
