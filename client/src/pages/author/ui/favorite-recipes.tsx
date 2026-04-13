import { useGetFavoriteRecipes } from '@/entities/favorites';
import { RecipesGridSkeleton, RecipesGrid } from '@/entities/recipes';
import { usePagination, Pagination } from '@/features/pagination';
import { Typograpghy } from '@/shared';
import { INITIAL_LIMIT } from '../constants';

export const FavoriteRecipes = () => {
  const { page, limit, onPageChange } = usePagination({
    initialLimit: INITIAL_LIMIT,
  });
  const { data, isPending, isFetching } = useGetFavoriteRecipes({
    page,
    limit,
  });

  return (
    <div>
      <Typograpghy tagVariant="h3" className="mb-6">
        Favorite recipes ({data?.totalCount})
      </Typograpghy>
      {isPending ? (
        <RecipesGridSkeleton countItems={16} cols={4} />
      ) : (
        <RecipesGrid isFetching={isFetching} recipes={data?.data.map((fr) => fr.recipe)} cols={4} />
      )}
      <Pagination totalPages={data?.totalPages} currentPage={page} onPageChange={onPageChange} />
    </div>
  );
};
