import useAxios from 'hooks/use-axios';
import { EmailProps } from 'types';

export const sendEmail = async ({ email, token }: EmailProps) => {
  if (!email || !token) {
    console.error('missing email');
    return false;
  }

  const { data } = await useAxios.post(`users`, {
    email,
    token,
  });

  return data;
};
