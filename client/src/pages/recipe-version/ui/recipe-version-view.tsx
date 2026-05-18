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
            recipeVersion={{
              id: data.id,
              version: data.version,
              createdAt: data.createdAt,
              changeDescription: data.changeDescription,
              recipeId: data.recipeId,
            }}
            actionsSlot={
              <Button as="link" to={pathKeys.recipes.byId(data.recipeId)} variant="primary">
                View Current Version
              </Button>
            }
            accent
          />
          <RecipeImage image={data.previewImage} />
          <RecipeSummary title={data.title} description={data.description} />
          <RecipeMeta
            category={data.category}
            difficulty={data.difficulty}
            cookingTime={data.cookingTime}
          />
          <RecipeIngredients ingredients={data.recipeIngredients} />
          <RecipeSteps steps={data.recipeSteps} />
        </RecipeDetailsView>
      </div>
    )
  );
};
