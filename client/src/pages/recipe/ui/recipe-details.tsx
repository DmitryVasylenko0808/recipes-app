import { RecipeDetailsView } from '@/entities/recipes';
import { useGetOneRecipe } from '@/entities/recipes/model/hooks/use-get-one-recipe';
import { useParams, Navigate } from 'react-router';

export const RecipeDetails = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useGetOneRecipe(id);

  if (error) return <Navigate to="*" />;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      {isLoading && <div>Loading...</div>}
      {data && <RecipeDetailsView recipe={data} />}
    </div>
  );
};
