import { useQueryClient, useMutation } from '@tanstack/react-query';
import { putRateRecipe } from '../../api';

export const useRateRecipe = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: putRateRecipe,
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: ['recipes', variables.id] });

      const prev = queryClient.getQueryData(['recipes', variables.id]);

      queryClient.setQueryData(
        ['recipes', variables.id],
        (old: any) =>
          old && { ...old, ratingsCount: old.ratingsCount + 1, userRating: variables.value }
      );

      return { prev };
    },
    onError: (_, variables, onMutateResult) => {
      queryClient.setQueryData(['recipes', variables.id], onMutateResult?.prev);
    },
    onSettled: (data) => {
      queryClient.invalidateQueries({ queryKey: ['recipes', data?.recipeId] });
    },
  });
};
