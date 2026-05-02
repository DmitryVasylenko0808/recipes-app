import {
  CommentItem,
  CommentsList,
  CommentsSkeleton,
  useGetRecipeComments,
} from '@/entities/comments';
import { DeleteCommentButton } from '@/features/comments/delete';
import { SortCommentSelector, useSortComments } from '@/features/comments/sort';
import { ToggleLikeCommentButton } from '@/features/comments/toggle-like';
import { UpdateCommentButton } from '@/features/comments/update';
import { Pagination, usePagination } from '@/features/pagination';
import { EmptyState, Typograpghy, useAuth } from '@/shared';
import { useParams } from 'react-router';

export const RecipeComments = () => {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const { sort, sortOptions, onChangeSort } = useSortComments();
  const { page, limit, onPageChange } = usePagination({
    initialLimit: 15,
    resetDependecies: [sort],
  });
  const { data, isPending, isFetching } = useGetRecipeComments({
    recipeId: id,
    page,
    limit,
    sort,
  });

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      {isPending ? (
        <CommentsSkeleton countItems={10} />
      ) : data?.totalCount === 0 ? (
        <EmptyState
          title="No comments yet"
          description="Start the conversation and leave the first comment."
        />
      ) : (
        <div>
          <div className="mb-6 flex justify-between">
            <Typograpghy tagVariant="h2" className="flex-auto">
              Comments ({data?.totalCount})
            </Typograpghy>
            <SortCommentSelector sortOptions={sortOptions} onChangeSort={onChangeSort} />
          </div>
          <CommentsList
            comments={data?.data}
            isFetching={isFetching}
            renderItem={(c) => (
              <CommentItem
                comment={c}
                key={c.id}
                actionsSlot={
                  <>
                    {c.userId === currentUser?.id && <UpdateCommentButton comment={c} />}
                    {c.userId === currentUser?.id && <DeleteCommentButton commentId={c.id} />}
                  </>
                }
                bottomActionsSlot={<ToggleLikeCommentButton comment={c} />}
              />
            )}
          />
        </div>
      )}
      <Pagination totalPages={data?.totalPages} currentPage={page} onPageChange={onPageChange} />
    </div>
  );
};
