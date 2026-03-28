import { API_URL, apiClient } from '@/shared';

export type PostSignInUserArgs = {
  email: string;
  password: string;
};

export type PostSignInUserDto = {
  accessToken: string;
};

export const postSignInUser = async (args: PostSignInUserArgs) => {
  const response = await apiClient.post<PostSignInUserDto>(`${API_URL}/auth/sign-in`, args);

  return response.data;
};
