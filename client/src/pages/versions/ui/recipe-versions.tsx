import {
  useGetRecipeVersions,
  RecipeVersionsList,
  RecipeVersionItem,
  ViewRecipeVersionButton,
  useGetOneRecipe,
} from '@/entities/recipes';
import { usePagination, Pagination } from '@/features/pagination';
import { RollbackRecipeButton } from '@/features/recipe/rollback';
import { Typograpghy, EmptyState, Loader } from '@/shared';
import { useEffect } from 'react';
import { useParams } from 'react-router';

export const INITIAL_LIMIT = 10;

export const RecipeVersions = () => {
  const { id } = useParams();
  const { page, onPageChange } = usePagination({ resetDependecies: [id] });
  const recipeQuery = useGetOneRecipe(id);
  const recipeVersionsQuery = useGetRecipeVersions({
    id,
    page,
    limit: INITIAL_LIMIT,
    enabled: !!recipeQuery.data?.id,
  });

  useEffect(() => {
    if (recipeQuery.error || recipeVersionsQuery.error) {
      alert(recipeQuery.error?.message || recipeVersionsQuery.error?.message);
    }
  }, [recipeQuery.error, recipeVersionsQuery.error]);

  if (recipeQuery.isLoading || recipeVersionsQuery.isLoading) {
    return <Loader size="lg" variant="primary" className="my-20" center />;
  }

  if (recipeQuery.data && recipeVersionsQuery.data) {
    return (
      <section className="mx-auto max-w-4xl px-4 py-8">
        <div className="mb-8">
          <Typograpghy tagVariant="h2" className="mb-2">
            Recipe history: {recipeQuery.data?.title}
          </Typograpghy>
          <Typograpghy tagVariant="p">
            {recipeVersionsQuery.data.totalCount} versions in history
          </Typograpghy>
        </div>
        {recipeVersionsQuery.data.totalCount === 0 ? (
          <EmptyState title="No version history available for this recipe." />
        ) : (
          <RecipeVersionsList
            recipeVersions={recipeVersionsQuery.data?.data}
            isFetching={recipeVersionsQuery.isFetching}
            renderItem={(rv) => (
              <RecipeVersionItem
                recipeVersion={rv}
                key={rv.id}
                actionsSlot={
                  <>
                    <ViewRecipeVersionButton
                      id={id}
                      version={rv.version}
                      isCurrent={rv.isCurrent}
                    />
                    {!rv.isCurrent && <RollbackRecipeButton recipeId={id} version={rv.version} />}
                  </>
                }
              />
            )}
          />
        )}
        <Pagination
          totalPages={recipeVersionsQuery.data.totalPages}
          currentPage={recipeVersionsQuery.data.currentPage}
          onPageChange={onPageChange}
        />
      </section>
    );
  }
};
