import { useQuery, useQueryClient } from '@tanstack/react-query';
import { findUserById } from 'services/users';
import { findCoordinates } from 'services/coordinates';

export const InitialData = () => {
  const GetInitialData = (uid?: string) => {
    if (!uid) {
      return false;
    }

    const queryClient = useQueryClient();

    queryClient.invalidateQueries({ queryKey: ['getUserCoordinates'] });

    const { data: userData, status: userStatus } = useQuery({
      queryKey: ['fetchSingleUser', uid],
      queryFn: async () => {
        return await findUserById(uid);
      },
    });

    const userId = userData?.uid;

    // Then get  coordinates for this user
    const { data: coordinatesData, status: coordinateStatus } = useQuery({
      queryKey: ['getUserCoordinates'],
      queryFn: async () => {
        return await findCoordinates(userId);
      },

      // The query will not execute until the userId exists
      enabled: !!userId,
    });

    return {
      user: userData,
      coordinates: coordinatesData,
      status: userStatus && coordinateStatus,
    };
  };

  return { GetInitialData };
};
