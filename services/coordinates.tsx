import useAxios from 'hooks/use-axios';
import { LocationProps } from 'types';
import consoleHelper from 'src/utils/consoleHelper';

export const addCoordinates = async (props: LocationProps) => {
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

  const { data } = await useAxios.post(`coordinates`, {
    ...props,
    radius: props?.radius,
  });
  return data;
};

export const findCoordinates = async (uid: string) => {
  if (!uid) {
    throw new Error('missing uid');
  }
  const { data } = await useAxios.get(`coordinates/${uid}`);
  return data;
};

export const updateRadius = async (props: LocationProps) => {
  if (!props?.uid || !props?.radius || props?.radius <= 0) {
    consoleHelper('missing coordinates props');
    return false;
  }

  const { data } = await useAxios.post(`coordinates/radius`, {
    uid: props?.uid,
    radius: props?.radius,
  });
  return data;
};
