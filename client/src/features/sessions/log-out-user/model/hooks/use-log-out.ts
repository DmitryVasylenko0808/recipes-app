import { useQueryClient } from '@tanstack/react-query';

export const useLogOut = () => {
  const queryClient = useQueryClient();

  const logout = async () => {
    localStorage.removeItem('access_token');
    queryClient.setQueryData(['currentUser'], null);
  };

  return logout;
};
