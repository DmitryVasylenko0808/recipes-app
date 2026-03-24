import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchUpdateRecipe } from '../../api';

export const useUpdateRecipe = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchUpdateRecipe,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recipes'] });
    },
  });
};
