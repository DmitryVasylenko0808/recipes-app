import { apiClient, API_URL } from '@/shared';
import type { Author } from '../model/types/author';

export type GetAuthorDto = Author;

export const getAuthorById = async (id?: string) => {
  const response = await apiClient.get<GetAuthorDto>(`${API_URL}/authors/${id}`);

  return response.data;
};
