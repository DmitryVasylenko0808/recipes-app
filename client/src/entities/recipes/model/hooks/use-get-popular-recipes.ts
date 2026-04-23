import { useQuery } from '@tanstack/react-query';
import { getPopularRecipes } from '../../api';

export const useGetPopularRecipes = () => {
  return useQuery({
    queryFn: getPopularRecipes,
    queryKey: ['recipes', 'popular'],
  });
};
