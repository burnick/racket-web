import useAxios from 'hooks/use-axios';

export const getPosts = async () => {
  const { data } = await useAxios.get(`categories`);
  return data;
};

export const getById = async (id: number) => {
  if (!id) {
    throw new Error('missing id');
  }
  const { data } = await useAxios.get(`categories/${id}`);
  return data;
};
