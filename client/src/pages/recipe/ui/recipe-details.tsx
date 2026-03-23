import { RecipeDetailsView } from '@/entities/recipes';
import { useGetOneRecipe } from '@/entities/recipes/model/hooks/use-get-one-recipe';
import { useAuth } from '@/shared';
import { useParams, Navigate } from 'react-router';
import { RecipeActionsMenu } from './recipe-actions-menu';

export const RecipeDetails = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useGetOneRecipe(id);
  const { currentUser } = useAuth();

  if (error) return <Navigate to="*" />;

  const isOwnRecipe = currentUser?.id === data?.authorId;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      {isLoading && <div>Loading...</div>}
      {data && (
        <RecipeDetailsView
          recipe={data}
          actionsSlot={isOwnRecipe && <RecipeActionsMenu recipe={data} />}
        />
      )}
    </div>
  );
};
