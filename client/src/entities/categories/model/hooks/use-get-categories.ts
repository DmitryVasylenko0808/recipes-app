import { useQuery } from '@tanstack/react-query';
import { getCategories } from '../../api';

export const useGetCategories = () =>
  useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });
