import { useQueryClient, useMutation } from '@tanstack/react-query';
import { postCreateRecipe } from '../../api';

export const useCreateRecipe = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postCreateRecipe,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recipes'] });
    },
  });
};
