import { useAuth } from '@/shared';
import { useMutation } from '@tanstack/react-query';
import { postSignInUser } from '../../api';

export const useSignInUser = () => {
  const { authenticate } = useAuth();

  return useMutation({
    mutationFn: postSignInUser,
    onSuccess: (data) => {
      authenticate(data.accessToken);
    },
  });
};
