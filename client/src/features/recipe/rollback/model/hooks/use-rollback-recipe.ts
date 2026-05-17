import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchRollbackRecipe } from '../../api';

export const useRollbackRecipe = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchRollbackRecipe,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recipes'] });
    },
  });
};
