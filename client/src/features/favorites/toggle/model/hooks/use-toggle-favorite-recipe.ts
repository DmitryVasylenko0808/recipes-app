import type { RecipePreview, Recipe } from '@/entities/recipes';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteFavoriteRecipe, postAddFavoriteRecipe } from '../../api';

export const useToggleFavoriteRecipe = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (recipe: RecipePreview | Recipe) =>
      recipe.isFavorite ? deleteFavoriteRecipe(recipe.id) : postAddFavoriteRecipe(recipe.id),
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: ['recipes'] });

      const previous = queryClient.getQueriesData({ queryKey: ['recipes'] });

      queryClient.setQueryData(
        ['recipes', variables.id],
        (old: any) =>
          old && {
            ...old,
            isFavorite: !old.isFavorite,
          }
      );
      queryClient.setQueriesData({ queryKey: ['recipes'] }, (oldData: any) => {
        if (!oldData?.data) return oldData;

        return {
          ...oldData,
          data: oldData.data.map((item: any) =>
            item.id === variables.id ? { ...item, isFavorite: !item.isFavorite } : item
          ),
        };
      });
      queryClient.setQueryData(['favorites'], (oldData: any) => {
        if (!oldData?.data) return oldData;

        return {
          ...oldData,
          data: oldData.data.map((item: any) =>
            item.recipe.id === variables.id
              ? { ...item, recipe: { ...item.recipe, isFavorite: !item.recipe.isFavorite } }
              : item
          ),
        };
      });

      return { previous };
    },
    onError: (_error, _variables, onMutateResult) => {
      onMutateResult?.previous?.forEach(([key, data]) => {
        queryClient.setQueryData(key, data);
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['recipes'] });
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
    },
  });
};
