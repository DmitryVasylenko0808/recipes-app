import {
  useGetRecipeVersions,
  RecipeVersionsList,
  RecipeVersionItem,
  ViewRecipeVersionButton,
} from '@/entities/recipes';
import { usePagination, Pagination } from '@/features/pagination';
import { RollbackRecipeButton } from '@/features/recipe/rollback';
import { Typograpghy, EmptyState, Loader } from '@/shared';
import { useParams, Navigate } from 'react-router';

export const INITIAL_LIMIT = 10;

export const RecipeVersions = () => {
  const { id } = useParams();
  const { page, onPageChange } = usePagination({ resetDependecies: [id] });
  const { data, isPending, isFetching, error } = useGetRecipeVersions({
    id,
    page,
    limit: INITIAL_LIMIT,
  });

  if (isPending) return <Loader size="lg" variant="primary" className="my-20" center />;
  if (error) return <Navigate to="*" state={{ errorMessage: error.message }} />;

  return (
    <section className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8">
        <Typograpghy tagVariant="h2" className="mb-2">
          Recipe history
        </Typograpghy>
        <Typograpghy tagVariant="p">{data?.totalCount} versions in history</Typograpghy>
      </div>
      {data?.totalCount === 0 ? (
        <EmptyState title="No version history available for this recipe." />
      ) : (
        <RecipeVersionsList
          recipeVersions={data?.data}
          isFetching={isFetching}
          renderItem={(rv) => (
            <RecipeVersionItem
              recipeVersion={rv}
              key={rv.id}
              actionsSlot={
                <>
                  <ViewRecipeVersionButton id={id} version={rv.version} isCurrent={rv.isCurrent} />
                  {!rv.isCurrent && <RollbackRecipeButton recipeId={id} version={rv.version} />}
                </>
              }
            />
          )}
        />
      )}
      <Pagination
        totalPages={data.totalPages}
        currentPage={data.currentPage}
        onPageChange={onPageChange}
      />
    </section>
  );
};
