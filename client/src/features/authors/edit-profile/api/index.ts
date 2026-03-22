import type { Author } from '@/entities/authors';
import { apiClient, API_URL } from '@/shared';

export type EditProfileArgs = {
  firstname?: string;
  secondname?: string;
  bio?: string;
};
export type EditProfileDto = Author;

export const patchEditProfile = async (args: EditProfileArgs) => {
  const response = await apiClient.patch<EditProfileDto>(`${API_URL}/authors`, args);

  return response.data;
};
