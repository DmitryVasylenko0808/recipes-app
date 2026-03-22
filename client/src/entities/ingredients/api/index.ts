import { apiClient, API_URL } from '@/shared';
import type { Ingredient } from '../model/types/ingredient';

export type GetIngredientsDto = Ingredient[];

export const getIngredients = async () => {
  const response = await apiClient.get<GetIngredientsDto>(`${API_URL}/ingredients`);

  return response.data;
};
