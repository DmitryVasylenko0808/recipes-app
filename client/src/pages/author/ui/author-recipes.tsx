import { RecipesGrid, RecipesGridSkeleton, useGetAuthorRecipes } from '@/entities/recipes';
import { Pagination, usePagination } from '@/features/pagination';
import { Typograpghy } from '@/shared';
import { useParams } from 'react-router';

const INITIAL_LIMIT = 16;

export const AuthorRecipes = () => {
  const { id } = useParams();
  const { page, limit, onPageChange } = usePagination({
    initialLimit: INITIAL_LIMIT,
  });
  const { data, isPending, isFetching } = useGetAuthorRecipes({
    authorId: id,
    page,
    limit,
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <Typograpghy tagVariant="h3" className="mb-6">
        Author recipes ({data?.totalCount})
      </Typograpghy>
      {isPending ? (
        <RecipesGridSkeleton countItems={16} cols={4} />
      ) : (
        <RecipesGrid isFetching={isFetching} recipes={data?.data} cols={4} />
      )}
      <Pagination totalPages={data?.totalPages} currentPage={page} onPageChange={onPageChange} />
    </div>
  );
};
