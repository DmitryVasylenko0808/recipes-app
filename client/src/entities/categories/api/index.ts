import { apiClient, API_URL } from '@/shared';
import type { Category } from '../model/types/category';

type GetCategoriesDto = Category[];

export const getCategories = async () => {
  const response = await apiClient.get<GetCategoriesDto>(`${API_URL}/categories`);

  return response.data;
};
