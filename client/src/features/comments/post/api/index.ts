import type { CommentDto } from '@/entities/comments';
import { API_URL, apiClient } from '@/shared';

export type PostCommentArgs = {
  recipeId?: string;
  content: string;
};

export type PostCommentDto = CommentDto;

export const postComment = async (args: PostCommentArgs) => {
  const { recipeId, ...data } = args;

  const response = await apiClient.post<PostCommentDto>(
    `${API_URL}/recipes/${recipeId}/comments`,
    data
  );

  return response.data;
};
