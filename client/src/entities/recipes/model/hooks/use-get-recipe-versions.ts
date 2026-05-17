import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getRecipeVersions, type GetRecipeVersionsArgs } from '../../api';

export const useGetRecipeVersions = (args: GetRecipeVersionsArgs) => {
  const { id, ...restArgs } = args;

  return useQuery({
    queryKey: ['recipes', id, 'versions', { ...restArgs }],
    queryFn: () => getRecipeVersions(args),
    placeholderData: keepPreviousData,
  });
};
