import { getMe } from '@/shared/api';
import { useQuery } from '@tanstack/react-query';

export const useAuth = () => {
  const { refetch, data } = useQuery({
    queryFn: getMe,
    queryKey: ['currentUser'],
    enabled: !!localStorage.getItem('access_token'),
    retry: false,
  });

  const authenticate = async (accessToken: string) => {
    try {
      localStorage.setItem('access_token', accessToken);

      const { isError } = await refetch();

      if (isError) throw new Error('Cannot get current user');
    } catch {
      localStorage.removeItem('access_token');
    }
  };

  const accessToken = localStorage.getItem('access_token');
  const currentUser = data;

  return { authenticate, accessToken, currentUser };
};
