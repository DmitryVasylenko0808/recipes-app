import { apiClient, API_URL } from '@/shared';
import type { FavoriteRecipeDetails } from '../model/types';

export type GetFavoriteRecipesArgs = {
  page: number;
  limit: number;
};

export type GetFavoriteRecipesDto = {
  data: FavoriteRecipeDetails[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
};

export const getFavoriteRecipes = async (args: GetFavoriteRecipesArgs) => {
  const response = await apiClient.get<GetFavoriteRecipesDto>(`${API_URL}/favorites`, {
    params: args,
  });

  return response.data;
};
