import type { Author } from '@/entities/authors';
import { apiClient, API_URL } from '@/shared';

export type EditProfileArgs = {
  firstname?: string;
  secondname?: string;
  bio?: string;
  avatar?: File;
};
export type EditProfileDto = Author;

export const patchEditProfile = async (args: EditProfileArgs) => {
  const formData = new FormData();

  Object.entries(args).forEach(([k, v]) => formData.append(k, v));

  const response = await apiClient.patch<EditProfileDto>(`${API_URL}/authors`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return response.data;
};
