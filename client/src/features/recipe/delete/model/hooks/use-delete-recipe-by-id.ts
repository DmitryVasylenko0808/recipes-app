import { useQueryClient, useMutation } from '@tanstack/react-query';
import { deleteRecipeById } from '../../api';

export const useDeleteRecipeById = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id?: string) => deleteRecipeById(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recipes'] });
    },
  });
};
