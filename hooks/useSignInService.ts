import { useQuery } from 'react-query';
import useAxios from 'hooks/use-axios';
import { UserProps } from 'types';

const sendProp = async (secret: string) => {
  if (!secret) {
    console.error('missing value');
    return false;
  }

  const { data: userResponse } = await useAxios.get(`users/signin/${secret}`);
  if (!userResponse) {
    const { data: response } = await useAxios.post(`users`, {
      ...userResponse,
    });

    return response ? response : false;
  }

  return userResponse;
};

export const SignInService = ({ secret }: { secret: string }) => {
  const findUser = async (): Promise<UserProps | null> => {
    if (!secret) {
      return null;
      // throw new Error('missing secret value');
    }
    return await sendProp(secret);
  };

  return useQuery(['signInUser', secret], findUser, {
    staleTime: Infinity,
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
  });
};
