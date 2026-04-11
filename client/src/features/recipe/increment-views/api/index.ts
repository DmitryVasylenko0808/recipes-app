import { apiClient, API_URL } from '@/shared';

export const patchIncrementViews = async (id?: string) => {
  await apiClient.patch(`${API_URL}/recipes/${id}/views`);
};
