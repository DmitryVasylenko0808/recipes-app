import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { getRecipeComments, type GetRecipeCommentsArgs } from '../../api';

export const useGetRecipeComments = (args: GetRecipeCommentsArgs) => {
  const { recipeId, ...restArgs } = args;

  return useQuery({
    queryFn: () => getRecipeComments(args),
    queryKey: ['comments', recipeId, { ...restArgs }],
    placeholderData: keepPreviousData,
  });
};
