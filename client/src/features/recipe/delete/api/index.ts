import type { RecipeShort } from '@/entities/recipes';
import { apiClient, API_URL } from '@/shared';

export type DeleteRecipeDto = RecipeShort;

export const deleteRecipeById = async (id?: string) => {
  const response = await apiClient.delete<DeleteRecipeDto>(`${API_URL}/recipes/${id}`);

  return response.data;
};
