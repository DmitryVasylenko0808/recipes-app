import { useGetOneRecipe, type RecipePreview } from '@/entities/recipes';
import { UpdateRecipeForm } from '@/features/recipe/update';
import { Loader } from '@/shared';
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
      {isLoading && <Loader variant="primary" size="lg" className="my-10" center />}
      {data && <UpdateRecipeForm recipe={data} onSubmit={handleSubmit} />}
    </div>
  );
};
