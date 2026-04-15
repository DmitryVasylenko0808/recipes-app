import { useQueryClient, useMutation } from '@tanstack/react-query';
import { deleteComment } from '../../api';

export const useDeleteComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteComment,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['comments', data.recipeId] });
    },
  });
};
