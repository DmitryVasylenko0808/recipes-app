import { useQuery } from '@tanstack/react-query';
import { getFavoriteRecipes, type GetFavoriteRecipesArgs } from '../../api';

export const useGetFavoriteRecipes = (args: GetFavoriteRecipesArgs) => {
  return useQuery({
    queryFn: () => getFavoriteRecipes(args),
    queryKey: ['favorites'],
  });
};
