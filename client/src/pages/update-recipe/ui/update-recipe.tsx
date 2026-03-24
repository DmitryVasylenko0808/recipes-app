import type { RecipePreview } from '@/entities/recipes';
import { useGetOneRecipe } from '@/entities/recipes/model/hooks/use-get-one-recipe';
import { UpdateRecipeForm } from '@/features/recipe/update/ui/update-recipe-form';
import { Navigate, useNavigate, useParams } from 'react-router';

export const UpdateRecipe = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useGetOneRecipe(id);
  const navigate = useNavigate();

  const handleSubmit = (recipe: RecipePreview) => {
    alert('Recipe is updated');
    navigate(`/recipes/${recipe.id}`);
  };

  if (error) return <Navigate to="*" />;

  return (
    <div className="mx-auto max-w-3xl p-6">
      {isLoading && 'Loading...'}
      {data && <UpdateRecipeForm recipe={data} onSubmit={handleSubmit} />}
    </div>
  );
};
