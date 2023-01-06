import { useQuery } from 'react-query';
import useAxios from 'hooks/use-axios';

const getAllJobs = async ({
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
}) =>
  await useAxios.get(
    `jobs?page=${page}&total=${total}&lng=${lng}&lat=${lat}&radius=${radius}`
  );

export const JobService = () => {
  const GetAllJobs = (props: {
    page?: number;
    total?: number;
    lng: number;
    lat: number;
    radius: number;
  }) => {
    const findJobs = async () => {
      return await getAllJobs(props);
    };

    return useQuery(['fetchAllJobs', props], findJobs, {
      staleTime: 120000,
      cacheTime: 120000,
      refetchOnWindowFocus: false,
      refetchInterval: 1800000,
    });
  };

  return { GetAllJobs };
};
