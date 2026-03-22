import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchEditProfile } from '../../api';

export const useEditProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['authors'],
    mutationFn: patchEditProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['authors'] });
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
    },
  });
};
