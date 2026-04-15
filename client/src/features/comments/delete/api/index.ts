import type { CommentDto } from '@/entities/comments';
import { apiClient, API_URL } from '@/shared';

export type DeleteCommentDto = CommentDto;

export const deleteComment = async (id: string) => {
  const response = await apiClient.delete<DeleteCommentDto>(`${API_URL}/comments/${id}`);

  return response.data;
};
