import { API_URL, apiClient } from '@/shared';
import type { CommentLike } from '../model/types';

type CommentLikeDto = CommentLike;

export const postCommentLikes = async (commentId: string) => {
  const response = await apiClient.post<CommentLikeDto>(`${API_URL}/comments/${commentId}/likes`);

  return response.data;
};

export const deleteCommentLikes = async (commentId: string) => {
  const response = await apiClient.delete<CommentLikeDto>(`${API_URL}/comments/${commentId}/likes`);

  return response.data;
};
