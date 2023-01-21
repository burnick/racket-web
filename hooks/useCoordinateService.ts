import { useQuery, useMutation, useQueryClient } from 'react-query';
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

    return useQuery(['fetchAllJobs', uid], getCoordinates, {
      staleTime: 120000,
      cacheTime: 120000,
      refetchOnWindowFocus: false,
      refetchInterval: 1800000,
    });
  };

  const UpsertCoordinates = () => {
    // const pushCoodinates = async (props: LocationProps) => {
    //   if (
    //     !props?.uid ||
    //     !props?.lat ||
    //     !props?.lng ||
    //     !props?.radius ||
    //     props?.radius <= 0
    //   ) {
    //     consoleHelper(props);
    //     throw new Error('missing location props');
    //   }
    //   const findLoc = await api.findCoordinates(props?.uid as string);
    //   if (findLoc.radius !== props.radius || findLoc.lat !== props.lat) {
    //     return await api.addCoordinates(props);
    //   }
    //   return findLoc;
    // };

    // return useMutation(pushCoodinates);
    const queryClient = useQueryClient();
    queryClient.setMutationDefaults(['add-coordinates'], {
      mutationFn: (data) => api.addCoordinates(data),
      onMutate: async (variables) => {
        const { successCb, errorCb } = variables;
        // cancel queries against this query key
        // so that if any other component is consuming this data
        // is not able to get the old data
        await queryClient.cancelQueries(['get-coordinates']);
        // get the cached values of 'get-planets'
        const previousValue: CoordinatesProps | undefined =
          queryClient.getQueryData(['get-coordinates']);

        // set the cached data with an added object
        // i.e the new planet posted
        queryClient.setQueryData(
          ['get-coordinates'],
          [previousValue, { ...variables }]
        );

        // return previousValue here
        // we will use it in the next section
        return { successCb, errorCb, previousValue };
      },
      onSuccess: (result, _, context) => {
        if (context.successCb) {
          context.successCb(result);
        }
      },
      onError: (error, _, context) => {
        queryClient.setQueryData(['get-coordinates'], context?.previousValue);
        if (context.errorCb) {
          context.errorCb(error);
        }
      },
    });
    return useMutation(['add-coordinates']);
  };

  return { UpsertCoordinates, GetCoordinates };
};
