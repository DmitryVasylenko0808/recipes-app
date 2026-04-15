import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { getRecipeComments, type GetRecipeCommentsArgs } from '../../api';

export const useGetRecipeComments = (args: GetRecipeCommentsArgs) => {
  return useQuery({
    queryFn: () => getRecipeComments(args),
    queryKey: ['comments', { ...args }],
    placeholderData: keepPreviousData,
  });
};
