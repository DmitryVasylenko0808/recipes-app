import {
  RecipeDetailsView,
  RecipeVersionItem,
  RecipeImage,
  RecipeSummary,
  RecipeMeta,
  RecipeIngredients,
  RecipeSteps,
  useGetRecipeVersion,
} from '@/entities/recipes';
import { Button, Loader, pathKeys } from '@/shared';
import { useParams, Navigate } from 'react-router';

export const RecipeVersionView = () => {
  const { id, version } = useParams();
  const { data, isLoading, error } = useGetRecipeVersion(id, Number(version));

  if (isLoading) return <Loader size="lg" variant="primary" className="my-20" center />;
  if (error) return <Navigate to="*" state={{ errorMessage: error.message }} />;

  return (
    data && (
      <div className="mx-auto max-w-4xl px-4 py-8">
        <RecipeDetailsView>
          <RecipeVersionItem
            recipeVersion={data.version}
            actionsSlot={
              <Button as="link" to={pathKeys.recipes.byId(data.version.recipeId)} variant="primary">
                View Current Version
              </Button>
            }
            accent
          />
          <RecipeImage image={data.recipe.previewImage} />
          <RecipeSummary title={data.recipe.title} description={data.recipe.description} />
          <RecipeMeta
            category={data.recipe.category}
            difficulty={data.recipe.difficulty}
            cookingTime={data.recipe.cookingTime}
          />
          <RecipeIngredients ingredients={data.recipe.recipeIngredients} />
          <RecipeSteps steps={data.recipe.recipeSteps} />
        </RecipeDetailsView>
      </div>
    )
  );
};
