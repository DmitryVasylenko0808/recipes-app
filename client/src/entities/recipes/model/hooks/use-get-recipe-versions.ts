import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getRecipeVersions, type GetRecipeVersionsArgs } from '../../api';

type UseGetRecipeVersionsArgs = GetRecipeVersionsArgs & { enabled?: boolean };

export const useGetRecipeVersions = (args: UseGetRecipeVersionsArgs) => {
  const { enabled = true, id, ...restArgs } = args;

  return useQuery({
    queryKey: ['recipes', id, 'versions', { ...restArgs }],
    queryFn: () => getRecipeVersions(args),
    placeholderData: keepPreviousData,
    enabled,
  });
};
