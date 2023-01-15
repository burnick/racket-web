import useAxios from 'hooks/use-axios';
import { UserProps } from 'types';

export const findUser = async (secret: string) => {
  if (!secret) {
    console.error('missing value');
    return false;
  }

  const { data: findUserData } = await useAxios.get(`users/signin/${secret}`);
  if (!findUserData) {
    const { data: createUserData } = await useAxios.post(`users`, {
      ...findUserData,
    });

    return createUserData;
  }

  return findUserData;
};

export const createUser = async ({ user }: { user: UserProps }) => {
  if (!user.uid) {
    console.error('missing value');
    return false;
  }

  const { data } = await useAxios.post(`users`, {
    ...user,
  });

  return data;
};
