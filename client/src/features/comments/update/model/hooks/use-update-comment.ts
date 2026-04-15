import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchUpdateComment } from '../../api';

export const useUpdateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchUpdateComment,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['comments', data.recipeId] });
    },
  });
};
