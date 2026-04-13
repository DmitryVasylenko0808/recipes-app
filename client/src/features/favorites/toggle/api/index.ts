import type { FavoriteRecipe } from '@/entities/favorites';
import { apiClient, API_URL } from '@/shared';

export type AddFavoriteRecipeDto = FavoriteRecipe;
export const postAddFavoriteRecipe = async (recipeId: string) => {
  const response = await apiClient.post<AddFavoriteRecipeDto>(`${API_URL}/favorites`, { recipeId });

  return response.data;
};

export type DeleteFavoriteRecipeDto = FavoriteRecipe;
export const deleteFavoriteRecipe = async (recipeId: string) => {
  const response = await apiClient.delete<DeleteFavoriteRecipeDto>(`${API_URL}/favorites`, {
    data: { recipeId },
  });

  return response.data;
};
