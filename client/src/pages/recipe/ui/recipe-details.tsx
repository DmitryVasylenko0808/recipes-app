import {
  RecipeAuthor,
  RecipeDetailsSkeleton,
  RecipeDetailsView,
  RecipeImage,
  RecipeIngredients,
  RecipeMeta,
  RecipeRatingStats,
  RecipeSteps,
  RecipeSummary,
  useGetOneRecipe,
} from '@/entities/recipes';
import { useAuth } from '@/shared';
import { useParams, Navigate } from 'react-router';
import { RecipeActionsMenu } from './recipe-actions-menu';
import { useIncrementViews } from '@/features/recipe/increment-views';
import { ToggleFavoriteRecipeButton } from '@/features/favorites/toggle';
import { RateRecipe } from '@/features/recipe/rate';

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
        <RecipeDetailsView>
          <RecipeImage image={data.previewImage} />
          <RecipeSummary
            title={data.title}
            description={data.description}
            actionsSlot={
              <div className="flex gap-2">
                <ToggleFavoriteRecipeButton recipe={data} />
                {isOwnRecipe && <RecipeActionsMenu recipe={data} />}
              </div>
            }
          />
          <RecipeAuthor author={data.author} />
          <RecipeMeta
            category={data.category}
            cookingTime={data.cookingTime}
            difficulty={data.difficulty}
            viewsCount={data.viewsCount}
            tags={data.recipeTags}
          />
          <RecipeRatingStats
            ratingsAvg={data.ratingsAvg}
            ratingsCount={data.ratingsCount}
            actionsSlot={<RateRecipe recipeId={data.id} maxRating={5} rating={data.userRating} />}
          />
          <RecipeIngredients ingredients={data.recipeIngredients} />
          <RecipeSteps steps={data.recipeSteps} />
        </RecipeDetailsView>
      )}
    </div>
  );
};
