import { useQuery } from '@tanstack/react-query';
import { getOneRecipe } from '../../api';

export const useGetOneRecipe = (id?: string) =>
  useQuery({
    queryKey: ['recipes', id],
    queryFn: () => getOneRecipe(id),
  });
