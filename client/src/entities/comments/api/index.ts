import { apiClient, API_URL } from '@/shared';
import type { Comment } from '../model/types/comment';

export type CommentDto = {
  id: string;
  userId: string;
  recipeId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
};

export type GetRecipeCommentsArgs = {
  recipeId?: string;
  page: number;
  limit: number;
};

export type GetRecipeCommentsDto = {
  data: Comment[];
  totalCount: number;
  totalPage: number;
  currentPage: number;
};

export const getRecipeComments = async (args: GetRecipeCommentsArgs) => {
  const { recipeId, ...params } = args;

  const response = await apiClient.get<GetRecipeCommentsDto>(
    `${API_URL}/recipes/${recipeId}/comments`,
    { params }
  );

  return response.data;
};
