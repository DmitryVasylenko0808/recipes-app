import { useQuery } from '@tanstack/react-query';
import { getAuthorById } from '../../api';

export const useGetAuthorById = (id?: string) =>
  useQuery({
    queryKey: ['authors', id],
    queryFn: () => getAuthorById(id),
  });
