import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCommentLikes, postCommentLikes } from '../../api';
import type { Comment } from '@/entities/comments';

export const useToggleCommentLike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (comment: Comment) =>
      comment.isLiked ? deleteCommentLikes(comment.id) : postCommentLikes(comment.id),
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: ['comments', variables.recipeId] });

      const prevComments = queryClient.getQueriesData({
        queryKey: ['comments', variables.recipeId],
      });

      queryClient.setQueriesData({ queryKey: ['comments', variables.recipeId] }, (old: any) => {
        return {
          ...old,
          data: old.data.map((item: any) =>
            item.id === variables.id
              ? {
                  ...item,
                  likesCount: item.isLiked ? item.likesCount - 1 : item.likesCount + 1,
                  isLiked: !item.isLiked,
                }
              : item
          ),
        };
      });

      return { prevComments };
    },
    onError: (_error, _variables, onMutateResult) => {
      onMutateResult?.prevComments?.forEach(([key, data]) => {
        queryClient.setQueryData(key, data);
      });
    },
    onSettled(_data, _error, variables) {
      queryClient.invalidateQueries({ queryKey: ['comments', variables.recipeId] });
    },
  });
};
