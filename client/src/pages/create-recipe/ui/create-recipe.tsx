import type { RecipePreview } from '@/entities/recipes';
import { CreateRecipeForm } from '@/features/recipe/create';
import { pathKeys } from '@/shared';
import { useNavigate } from 'react-router';

export const CreateRecipe = () => {
  const navigate = useNavigate();

  const handleSubmit = (recipe: RecipePreview) => {
    alert('Recipe is created');
    navigate(pathKeys.recipes.byId(recipe.id));
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <CreateRecipeForm onSubmit={handleSubmit} />
    </div>
  );
};
