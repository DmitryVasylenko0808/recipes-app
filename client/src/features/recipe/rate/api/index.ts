import { apiClient, API_URL } from '@/shared';

export type PutRateRecipeArgs = {
  id: string;
  value: number;
};

export type RatingDto = {
  id: string;
  userId: string;
  recipeId: string;
  value: number;
};

export const putRateRecipe = async (args: PutRateRecipeArgs) => {
  const { id, ...data } = args;

  const response = await apiClient.put<RatingDto>(`${API_URL}/recipes/${id}/ratings`, data);

  return response.data;
};
