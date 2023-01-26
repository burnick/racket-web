import { useQuery } from '@tanstack/react-query';
import * as api from 'api/categories';

export const CategoriesService = () => {
  const GetCategories = () => {
    return useQuery(['fetchCategories'], () => api.getPosts());
  };

  return { GetCategories };
};
