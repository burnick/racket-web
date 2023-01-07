import { useQuery, useMutation } from 'react-query';
import useAxios from 'hooks/use-axios';
import { LocationProps } from 'types';
import consoleHelper from 'utils/consoleHelper';

const addCoordinates = async (props: LocationProps) => {
  if (
    !props?.uid ||
    !props?.lng ||
    !props?.lat ||
    !props?.radius ||
    props?.radius <= 0
  ) {
    consoleHelper('missing coordinates props');
    return false;
  }

  return await useAxios.post(`coordinates`, {
    ...props,
    radius: props.radius,
  });
};

const findCoordinates = async (uid: string) => {
  if (!uid) {
    throw new Error('missing uid');
  }
  const { data: response } = await useAxios.get(`coordinates/${uid}`);
  return response ? response : false;
};

export const CoordinateService = () => {
  const GetCoordinates = (uid: string) => {
    const getCoordinates = async () => {
      return await findCoordinates(uid);
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
      const findLoc = await findCoordinates(props?.uid as string);
      if (findLoc.radius !== props.radius || findLoc.lat !== props.lat) {
        return await addCoordinates(props);
      }
      return findLoc;
    };

    return useMutation(pushCoodinates);
  };

  return { UpsertCoordinates, GetCoordinates };
};
