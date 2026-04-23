import { useQueryClient, useMutation } from '@tanstack/react-query';
import { putRateRecipe } from '../../api';

export const useRateRecipe = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: putRateRecipe,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recipes'] });
    },
  });
};
