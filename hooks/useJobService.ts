import { useQuery, useMutation } from 'react-query';
import useAxios from 'hooks/use-axios';
import { JobProps } from 'types';

const createJob = async (props: JobProps) => {
  if (!props.uid || !props.email) {
    console.error('missing props for job create');
    return false;
  }

  return await useAxios.post(`jobs`, {
    ...props,
    category: parseInt(props.category),
    expirationDate: new Date(props.expirationDate),
  } as any);
};

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

  const CreateJob = () => {
    const CreateAJob = async (props: JobProps) => {
      if (
        !props ||
        !props.uid ||
        !props.title ||
        !props.lat ||
        !props.lng ||
        !props.address ||
        !props.expirationDate
      ) {
        throw new Error('missing jobs props');
      }
      return await createJob(props);
    };

    return useMutation(CreateAJob);
  };

  return { GetAllJobs, CreateJob };
};
