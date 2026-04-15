import {
  CommentItem,
  CommentsList,
  CommentsSkeleton,
  useGetRecipeComments,
} from '@/entities/comments';
import { Pagination, usePagination } from '@/features/pagination';
import { Typograpghy } from '@/shared';
import { useParams } from 'react-router';

export const RecipeComments = () => {
  const { id } = useParams();
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
        <div>No comments</div>
      ) : (
        <div>
          <Typograpghy tagVariant="h2" className="mb-6">
            Comments ({data?.totalCount})
          </Typograpghy>
          <CommentsList
            comments={data?.data}
            isFetching={isFetching}
            renderItem={(c) => <CommentItem comment={c} />}
          />
        </div>
      )}
      <Pagination totalPages={data?.totalPage} currentPage={page} onPageChange={onPageChange} />
    </div>
  );
};
