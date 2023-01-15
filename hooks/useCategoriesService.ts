import { useQuery } from 'react-query';
import * as api from 'api/categories';

export const CategoriesService = () => {
  const FindAllCategories = () => {
    return useQuery(['fetchCategories'], () => api.getPosts());
  };

  return { FindAllCategories };
};
