import { useQuery } from '@tanstack/react-query';
import { getTags } from '../../api';

export const useGetTags = () =>
  useQuery({
    queryKey: ['tags'],
    queryFn: getTags,
  });
