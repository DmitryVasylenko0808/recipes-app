import { useQuery } from '@tanstack/react-query';
import { getRecipeversion } from '../../api';

export const useGetRecipeVersion = (id?: string, version?: number) => {
  return useQuery({
    queryFn: () => getRecipeversion({ id, version }),
    queryKey: ['recipes', id, 'versions', version],
  });
};
