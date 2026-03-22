import { useQuery } from '@tanstack/react-query';
import { getIngredients } from '../../api';

export const useGetIngredients = () =>
  useQuery({
    queryKey: ['ingredients'],
    queryFn: getIngredients,
  });
