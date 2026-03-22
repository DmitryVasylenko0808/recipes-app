import { RecipeCard, RecipesSkeleton } from '@/entities/recipes';
import { useGetAuthorRecipes } from '@/entities/recipes/model/hooks/use-get-author-recipes';
import { Pagination, usePagination } from '@/features/pagination';
import { Typograpghy } from '@/shared';
import { useParams } from 'react-router';

export const AuthorRecipes = () => {
  const { id } = useParams();
  const { page, limit, onPageChange } = usePagination({
    initialLimit: 2,
  });
  const { data, isFetching } = useGetAuthorRecipes({
    authorId: id,
    page,
    limit,
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <Typograpghy tagVariant="h3" className="mb-6">
        Author recipes ({data?.totalCount})
      </Typograpghy>
      {isFetching && <RecipesSkeleton className="gap-6" />}
      {data && (
        <div className="flex flex-wrap gap-6">
          {data.data?.map((r) => (
            <RecipeCard recipe={r} key={r.id} />
          ))}
        </div>
      )}
      <Pagination totalPages={data?.totalPages} currentPage={page} onPageChange={onPageChange} />
    </div>
  );
};
