import { useQuery, useMutation, QueryClient } from '@tanstack/react-query';
import { UserProps } from 'types';
import consoleHelper from 'utils/consoleHelper';
import * as api from 'api/users';

interface ExtraUserProps extends UserProps {
  token?: string;
}
const queryClient = new QueryClient();

export const SignInService = () => {
  const GetUser = ({ secret }: { secret: string }) => {
    const findUser = async (): Promise<UserProps | null> => {
      if (!secret) {
        return null;
        // throw new Error('missing secret value');
      }
      return await api.findUser(secret);
    };

    return useQuery({
      queryKey: ['signInUser'],
      queryFn: findUser,
      // , {
      //   staleTime: Infinity,
      //   cacheTime: Infinity,
      //   refetchOnWindowFocus: false,
      // }
    });
  };

  const AddUser = () => {
    const createAUser = async (props: ExtraUserProps) => {
      if (!props?.uid && !props?.token) {
        consoleHelper(props);
        throw new Error('missing user props');
      }
      return api.createUser({ user: props });
    };

    return useMutation({
      mutationFn: createAUser,
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries({
          queryKey: ['signInUser'],
        });
      },
    });
  };

  return { GetUser, AddUser };
};
