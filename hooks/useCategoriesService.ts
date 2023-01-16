import { useQuery } from 'react-query';
import * as api from 'api/categories';

export const CategoriesService = () => {
  const GetCategories = () => {
    return useQuery(['fetchCategories'], () => api.getPosts());
  };

  return { GetCategories };
};
