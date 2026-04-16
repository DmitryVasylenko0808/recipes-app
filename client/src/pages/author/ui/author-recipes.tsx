import {
  useGetAuthorRecipes,
  RecipesGridSkeleton,
  RecipesGrid,
  RecipeCard,
} from '@/entities/recipes';
import { usePagination, Pagination } from '@/features/pagination';
import { EmptyState, Typograpghy, useAuth } from '@/shared';
import { useParams } from 'react-router';
import { INITIAL_LIMIT } from '../constants';
import { ToggleFavoriteRecipeButton } from '@/features/favorites/toggle';
import { CreateRecipeButton } from '@/features/recipe/create';

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
  const { currentUser } = useAuth();

  const isOwnProfile = id === currentUser?.id;

  return (
    <div>
      {isPending ? (
        <RecipesGridSkeleton countItems={16} cols={4} />
      ) : data?.totalCount === 0 ? (
        <EmptyState
          title="No recipes yet"
          description={
            isOwnProfile
              ? 'You haven’t created any recipes yet. Start sharing your cooking ideas.'
              : 'This user hasn’t shared any recipes yet.'
          }
          action={isOwnProfile && <CreateRecipeButton variant="primary" />}
        />
      ) : (
        <div>
          <Typograpghy tagVariant="h3" className="mb-6">
            Author recipes ({data?.totalCount})
          </Typograpghy>
          <RecipesGrid
            isFetching={isFetching}
            recipes={data?.data}
            cols={4}
            renderItems={(r) => (
              <RecipeCard
                recipe={r}
                key={r.id}
                actionsSlot={<ToggleFavoriteRecipeButton recipe={r} />}
              />
            )}
          />
        </div>
      )}
      <Pagination totalPages={data?.totalPages} currentPage={page} onPageChange={onPageChange} />
    </div>
  );
};
