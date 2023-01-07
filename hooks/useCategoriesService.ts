import { useQuery } from 'react-query';
import useAxios from 'hooks/use-axios';

const getAll = async () => {
  const { data: response } = await useAxios.get(`categories`);
  return response ? response : false;
};

const getById = async (id: number) => {
  if (!id) {
    throw new Error('missing id');
  }
  const { data: response } = await useAxios.get(`categories/${id}`);
  return response ? response : false;
};

export const CategoriesService = () => {
  const FindAllCategories = () => {
    const findCategories = async (): Promise<Record<string, string>[]> => {
      return await getAll();
    };

    return useQuery(['fetchCategories'], findCategories, {
      staleTime: Infinity,
      cacheTime: Infinity,
      refetchOnWindowFocus: false,
    });
  };

  return { FindAllCategories };
};
