import { apiClient, API_URL } from '@/shared';

export type PostRegisterUserArgs = {
  email: string;
  password: string;
  firstname: string;
  secondname: string;
};

export type PostRegisterUserDto = {
  accessToken: string;
};

export const postRegisterUser = async (args: PostRegisterUserArgs) => {
  const response = await apiClient.post(`${API_URL}/auth/register`, args);

  return response.data;
};
