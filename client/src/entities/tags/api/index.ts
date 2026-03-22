import { apiClient, API_URL } from '@/shared';
import type { Tag } from '../model/types/tag';

export type GetTagsDto = Tag[];

export const getTags = async () => {
  const response = await apiClient.get<GetTagsDto>(`${API_URL}/tags`);

  return response.data;
};
