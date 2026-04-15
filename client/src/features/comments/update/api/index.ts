import type { CommentDto } from '@/entities/comments';
import { apiClient, API_URL } from '@/shared';

export type UpdateCommentArgs = {
  commentId: string;
  content?: string;
};
export type UpdateCommentDto = CommentDto;
export const patchUpdateComment = async (args: UpdateCommentArgs) => {
  const { commentId, ...data } = args;

  const response = await apiClient.patch<UpdateCommentDto>(
    `${API_URL}/comments/${commentId}`,
    data
  );

  return response.data;
};
