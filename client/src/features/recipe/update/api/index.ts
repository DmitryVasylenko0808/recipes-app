import type { Difficulty, RecipePreview } from '@/entities/recipes';
import { apiClient, API_URL } from '@/shared';

export type UpdateRecipeArgs = {
  id: string;
  title?: string;
  description?: string;
  previewImage?: File;
  content?: string;
  categoryId?: string;
  difficulty?: Difficulty;
  cookingTime?: number;
  recipeTagIds?: string[];
  recipeIngredients?: {
    ingredientId: string;
    amount: number;
    unit: string;
  }[];
};
export type UpdateRecipeDto = RecipePreview;

export const patchUpdateRecipe = async (args: UpdateRecipeArgs) => {
  const { id, cookingTime, recipeTagIds, recipeIngredients, ...postData } = args;

  const formData = new FormData();
  Object.entries(postData).forEach(([k, v]) => formData.append(k, v));
  formData.append('cookingTime', String(cookingTime));
  formData.append('recipeTagIds', JSON.stringify(recipeTagIds));
  formData.append('recipeIngredients', JSON.stringify(recipeIngredients));

  const response = await apiClient.patch<UpdateRecipeDto>(`${API_URL}/recipes/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return response.data;
};
