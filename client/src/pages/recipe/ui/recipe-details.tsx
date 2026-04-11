import { RecipeDetailsView, useGetOneRecipe } from '@/entities/recipes';
import { Loader, useAuth } from '@/shared';
import { useParams, Navigate } from 'react-router';
import { RecipeActionsMenu } from './recipe-actions-menu';
import { useIncrementViews } from '@/features/recipe/increment-views';

export const RecipeDetails = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useGetOneRecipe(id);
  const { currentUser } = useAuth();

  useIncrementViews(id);

  if (error) return <Navigate to="*" state={{ errorMessage: error.message }} />;

  const isOwnRecipe = currentUser?.id === data?.authorId;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      {isLoading && <Loader variant="primary" size="lg" className="my-10" center />}
      {data && (
        <RecipeDetailsView
          recipe={data}
          actionsSlot={isOwnRecipe && <RecipeActionsMenu recipe={data} />}
        />
      )}
    </div>
  );
};
