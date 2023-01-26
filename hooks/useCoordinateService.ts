import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
} from '@tanstack/react-query';
import { CoordinatesProps, LocationProps } from 'types';
import consoleHelper from 'utils/consoleHelper';
import * as api from 'api/coordinates';

export const CoordinateService = () => {
  const GetCoordinates = (uid: string) => {
    const getCoordinates = async () => {
      if (!uid) {
        return false;
      }
      return await api.findCoordinates(uid);
    };

    return useQuery({
      queryKey: ['fetchAllCoordinates', uid],
      queryFn: getCoordinates,
    });
  };

  const UpsertCoordinates = () => {
    const pushCoordinates = async (props: LocationProps) => {
      if (
        !props?.uid ||
        !props?.lat ||
        !props?.lng ||
        !props?.radius ||
        props?.radius <= 0
      ) {
        consoleHelper(props);
        throw new Error('missing location props');
      }
      const findLoc = await api.findCoordinates(props?.uid as string);
      if (findLoc.radius !== props.radius || findLoc.lat !== props.lat) {
        return await api.addCoordinates(props);
      }
      return findLoc;
    };
    const queryClient = new QueryClient();

    return useMutation({
      mutationFn: pushCoordinates,
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries({
          queryKey: ['getUserCoordinates'],
        });
      },
    });
  };

  return { UpsertCoordinates, GetCoordinates };
};
