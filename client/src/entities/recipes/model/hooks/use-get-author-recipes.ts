import { useQuery } from '@tanstack/react-query';
import { getAuthorRecipes, type GetAuthorRecipesArgs } from '../../api';

export const useGetAuthorRecipes = (args: GetAuthorRecipesArgs) => {
  return useQuery({
    queryKey: ['recipes', { ...args }],
    queryFn: () => getAuthorRecipes(args),
  });
};
