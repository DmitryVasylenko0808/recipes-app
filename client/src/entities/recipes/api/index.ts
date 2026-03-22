import { API_URL, apiClient } from '@/shared';
import type { Difficulty, RecipePreview } from '../model/types/recipe-preview';

export type GetRecipesArgs = {
  page: number;
  limit: number;
  search?: string;
  category_names?: string;
  min_cooking_time?: number;
  max_cooking_time?: number;
  tag_names?: string;
  ingredient_names?: string;
  difficulties?: string;
};

export type GetRecipesDto = {
  data: RecipePreview[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
};

export const getRecipes = async (args: GetRecipesArgs) => {
  const response = await apiClient.get<GetRecipesDto>(`${API_URL}/recipes`, {
    params: args,
  });

  return response.data;
};

export type GetAuthorRecipesDto = {
  data: RecipePreview[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
};

export type GetAuthorRecipesArgs = {
  authorId?: string;
  page: number;
  limit: number;
};

export const getAuthorRecipes = async (args: GetAuthorRecipesArgs) => {
  const response = await apiClient.get<GetAuthorRecipesDto>(
    `${API_URL}/authors/${args.authorId}/recipes`,
    {
      params: {
        page: args.page,
        limit: args.limit,
      },
    }
  );

  return response.data;
};
