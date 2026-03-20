import axios from 'axios';

export const apiClient = axios.create();

apiClient.interceptors.request.use((cfg) => {
  const accessToken = localStorage.getItem('access_token');

  cfg.headers.Authorization = `Bearer ${accessToken}`;

  return cfg;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const baseErrorMessage = 'Ooopss... something went wrong';

    if (axios.isAxiosError(error)) {
      return Promise.reject(new Error(error.response?.data?.message || baseErrorMessage));
    }

    return Promise.reject(new Error(baseErrorMessage));
  }
);
