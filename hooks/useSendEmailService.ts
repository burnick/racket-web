import { useMutation } from 'react-query';
import useAxios from 'hooks/use-axios';

const sendProp = async (email: string) => {
  if (!email) {
    console.error('missing email');
    return false;
  }

  const { data: userResponse } = await useAxios.get(`users/email/${email}`);
  if (!userResponse) {
    const { data: response } = await useAxios.post(`users`, {
      email,
    });

    return response;
  }

  return userResponse;
};

export const SendEmailService = () => {
  const result = async (email: string) => {
    return await sendProp(email, true);
  };
  return useMutation(result);
};
