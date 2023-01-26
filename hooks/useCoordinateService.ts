import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
} from '@tanstack/react-query';
import { CoordinatesProps, LocationProps } from 'types';
//import consoleHelper from 'utils/consoleHelper';
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
    const queryClient = new QueryClient();
    const pushCoordinates = async (props: LocationProps) => {
      if (
        !props?.uid ||
        !props?.lat ||
        !props?.lng ||
        !props?.radius ||
        props?.radius <= 0
      ) {
        //  consoleHelper(props);
        throw new Error('missing location props');
      }
      const findLoc = await api.findCoordinates(props?.uid as string);
      if (findLoc.radius !== props.radius || findLoc.lat !== props.lat) {
        return await api.addCoordinates(props);
      }
      return findLoc;
    };

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

  const UpsertRadius = () => {
    const queryClient = new QueryClient();
    const pushCoordinateRadius = async (props: LocationProps) => {
      if (!props?.uid || !props?.radius || props?.radius <= 0) {
        //  consoleHelper(props);
        throw new Error('missing location props');
      }
      const findLoc = await api.findCoordinates(props?.uid as string);
      if (findLoc.radius !== props.radius) {
        return await api.updateRadius(props);
      }
      return findLoc;
    };

    return useMutation({
      mutationFn: pushCoordinateRadius,
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries({
          queryKey: ['getUserCoordinates'],
        });
      },
    });
  };

  return { UpsertCoordinates, GetCoordinates, UpsertRadius };
};
