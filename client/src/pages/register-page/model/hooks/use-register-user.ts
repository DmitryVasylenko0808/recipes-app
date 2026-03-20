import { useAuth } from '@/shared';
import { postRegisterUser } from '../../api';
import { useMutation } from '@tanstack/react-query';

export const useRegisterUser = () => {
  const { authenticate } = useAuth();

  return useMutation({
    mutationFn: postRegisterUser,
    onSuccess: (data) => {
      authenticate(data.accessToken);
    },
  });
};
