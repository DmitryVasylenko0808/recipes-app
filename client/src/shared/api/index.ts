import { apiClient } from '../config/api-client';
import { API_URL } from '../config/contants';

export type GetMeDto = {
  id: string;
  firstname: string;
  secondname: string;
  avatar: string | null;
};

export const getMe = async () => {
  const response = await apiClient.get<GetMeDto>(`${API_URL}/auth/me`);

  return response.data;
};
