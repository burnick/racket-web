import { useQuery, useMutation } from 'react-query';
import useAxios from 'hooks/use-axios';
import { JobProps } from 'types';
import * as api from 'api/jobs';

export const JobService = () => {
  const GetAllJobs = (props: {
    page?: number;
    total?: number;
    lng: number;
    lat: number;
    radius: number;
  }) => {
    const findJobs = async () => {
      return await api.getJobs(props);
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
      return await api.createJob(props);
    };

    return useMutation(CreateAJob);
  };

  return { GetAllJobs, CreateJob };
};
