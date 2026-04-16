import { RecipeDetailsSkeleton, RecipeDetailsView, useGetOneRecipe } from '@/entities/recipes';
import { useAuth } from '@/shared';
import { useParams, Navigate } from 'react-router';
import { RecipeActionsMenu } from './recipe-actions-menu';
import { useIncrementViews } from '@/features/recipe/increment-views';
import { ToggleFavoriteRecipeButton } from '@/features/favorites/toggle';

export const RecipeDetails = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useGetOneRecipe(id);
  const { currentUser } = useAuth();

  useIncrementViews(id);

  if (error) return <Navigate to="*" state={{ errorMessage: error.message }} />;

  const isOwnRecipe = currentUser?.id === data?.authorId;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      {isLoading && <RecipeDetailsSkeleton />}
      {data && (
        <RecipeDetailsView
          recipe={data}
          actionsSlot={
            <div className="flex gap-2">
              <ToggleFavoriteRecipeButton recipe={data} />
              {isOwnRecipe && <RecipeActionsMenu recipe={data} />}
            </div>
          }
        />
      )}
    </div>
  );
};
