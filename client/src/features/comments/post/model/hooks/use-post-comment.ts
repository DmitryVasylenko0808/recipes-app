import { useQueryClient, useMutation } from '@tanstack/react-query';
import { postComment } from '../../api';

export const usePostComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postComment,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
    },
  });
};
