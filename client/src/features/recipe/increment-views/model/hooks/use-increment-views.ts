import { useMutation } from '@tanstack/react-query';
import { patchIncrementViews } from '../../api';

export const useIncrementViews = () => {
  return useMutation({
    mutationFn: patchIncrementViews,
  });
};
