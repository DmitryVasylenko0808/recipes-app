import { useQuery } from '@tanstack/react-query';
import { getTrendingRecipes } from '../../api';

export const useGetTrendingRecipes = () => {
  return useQuery({
    queryFn: getTrendingRecipes,
    queryKey: ['recipes', 'trending'],
  });
};
