import { useQuery, useMutation } from 'react-query';
import useAxios from 'hooks/use-axios';
import { UserProps } from 'types';
import consoleHelper from 'utils/consoleHelper';

interface ExtraUserProps extends UserProps {
  token?: string;
}
const findingUser = async (secret: string) => {
  if (!secret) {
    console.error('missing value');
    return false;
  }

  const { data: userResponse } = await useAxios.get(`users/signin/${secret}`);
  if (!userResponse) {
    const { data: response } = await useAxios.post(`users`, {
      ...userResponse,
    });

    return response;
  }

  return userResponse;
};

const addingUser = async ({ user }: { user: UserProps }) => {
  if (!user.uid) {
    console.error('missing value');
    return false;
  }

  const { data: response } = await useAxios.post(`users`, {
    ...user,
  });

  return response;
};

export const SignInService = () => {
  const GetUser = ({ secret }: { secret: string }) => {
    const findUser = async (): Promise<UserProps | null> => {
      if (!secret) {
        return null;
        // throw new Error('missing secret value');
      }
      return await findingUser(secret);
    };

    return useQuery(['signInUser', secret], findUser, {
      staleTime: Infinity,
      cacheTime: Infinity,
      refetchOnWindowFocus: false,
    });
  };

  const AddUser = () => {
    const createAUser = async (props: ExtraUserProps) => {
      if (!props?.uid && !props?.token) {
        consoleHelper(props);
        throw new Error('missing user props');
      }
      return addingUser({ user: props });
    };

    return useMutation(createAUser);
  };

  return { GetUser, AddUser };
};
