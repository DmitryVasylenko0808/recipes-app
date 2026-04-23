import { useQuery } from '@tanstack/react-query';
import { getSimilarRecipes } from '../../api';

export const useGetSimilarRecipes = (id?: string) => {
  return useQuery({
    queryFn: () => getSimilarRecipes(id),
    queryKey: ['recipes', id, 'similar'],
  });
};
