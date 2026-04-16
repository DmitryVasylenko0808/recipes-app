import {
  CommentItem,
  CommentsList,
  CommentsSkeleton,
  useGetRecipeComments,
} from '@/entities/comments';
import { DeleteCommentButton } from '@/features/comments/delete';
import { UpdateCommentButton } from '@/features/comments/update';
import { Pagination, usePagination } from '@/features/pagination';
import { EmptyState, Typograpghy, useAuth } from '@/shared';
import { useParams } from 'react-router';

export const RecipeComments = () => {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const { page, limit, onPageChange } = usePagination({ initialLimit: 15 });
  const { data, isPending, isFetching } = useGetRecipeComments({
    recipeId: id,
    page,
    limit,
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
          <Typograpghy tagVariant="h2" className="mb-6">
            Comments ({data?.totalCount})
          </Typograpghy>
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
              />
            )}
          />
        </div>
      )}
      <Pagination totalPages={data?.totalPage} currentPage={page} onPageChange={onPageChange} />
    </div>
  );
};
