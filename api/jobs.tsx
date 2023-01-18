import useAxios from 'hooks/use-axios';
import { JobProps } from 'types';

export const createJob = async (props: JobProps) => {
  if (!props.uid || !props.email) {
    console.error('missing props for job create');
    return false;
  }

  const { data } = await useAxios.post(`jobs`, {
    ...props,
    category: parseInt(props.category),
    expirationDate: new Date(props.expirationDate),
  } as any);

  return data;
};

export const getJobs = async ({
  page = 1,
  total = 10,
  lng,
  lat,
  radius,
}: {
  page?: number;
  total?: number;
  lng: number;
  lat: number;
  radius: number;
}) => {
  if (!lat || !lng) {
    console.error('missing props for job list');
    return false;
  }

  const data = await useAxios.get(
    `jobs?page=${page}&total=${total}&lng=${lng}&lat=${lat}&radius=${radius}`
  );

  return data;
};
