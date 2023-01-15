import { useQuery, useMutation } from 'react-query';
import { LocationProps } from 'types';
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
    const pushCoodinates = async (props: LocationProps) => {
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

    return useMutation(pushCoodinates);
  };

  return { UpsertCoordinates, GetCoordinates };
};
