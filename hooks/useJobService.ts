import { useQuery, useMutation, QueryClient } from '@tanstack/react-query';
import { JobProps } from 'types';
import * as api from 'api/jobs';

interface ExtendedJobProps extends JobProps {
  token: string;
}

const queryClient = new QueryClient();

export const JobService = () => {
  const FindJob = (props: { id: string }) => {
    const getJob = async () => {
      return await api.findJob(props);
    };
    return useQuery({
      queryKey: ['getJob'],
      queryFn: getJob,
      // , {
      //   staleTime: 120000,
      //   cacheTime: 120000,
      //   refetchOnWindowFocus: false,
      //   refetchInterval: 1800000,
      // }
    });
  };

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

    return useQuery({
      queryKey: ['fetchAllJobs'],
      queryFn: findJobs,
      // , {
      //   staleTime: 120000,
      //   cacheTime: 120000,
      //   refetchOnWindowFocus: false,
      //   refetchInterval: 1800000,
      // }
    });
  };

  const CreateJob = () => {
    const CreateAJob = async (props: ExtendedJobProps) => {
      if (
        !props ||
        !props.uid ||
        !props.title ||
        !props.lat ||
        !props.lng ||
        !props.address ||
        !props.expirationDate ||
        !props.token
      ) {
        throw new Error('missing jobs props');
      }
      return await api.createJob(props);
    };

    //return useMutation(CreateAJob);
    return useMutation({
      mutationFn: CreateAJob,
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries({
          queryKey: ['fetchAllJobs', 'getJob'],
        });
      },
    });
  };

  return { GetAllJobs, CreateJob, FindJob };
};
