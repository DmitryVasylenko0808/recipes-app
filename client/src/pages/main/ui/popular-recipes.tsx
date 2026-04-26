import {
  RecipeCardHorizontal,
  RecipesGrid,
  RecipesGridSkeleton,
  useGetPopularRecipes,
} from '@/entities/recipes';
import { ToggleFavoriteRecipeButton } from '@/features/favorites/toggle';
import { Typograpghy } from '@/shared';
import { Star } from 'lucide-react';

export const PopularRecipes = () => {
  const { data, isPending } = useGetPopularRecipes();

  return (
    <section className="mx-auto my-12 max-w-7xl px-4">
      <div className="mb-6 flex items-center gap-2">
        <Star className="text-primary fill-primary" />
        <Typograpghy tagVariant="h2">Popular Recipes</Typograpghy>
      </div>
      {isPending ? (
        <RecipesGridSkeleton countItems={4} cols={2} horizontal />
      ) : (
        <RecipesGrid
          recipes={data}
          cols={2}
          renderItems={(r) => (
            <RecipeCardHorizontal
              recipe={r}
              key={r.id}
              actionsSlot={<ToggleFavoriteRecipeButton recipe={r} />}
            />
          )}
        />
      )}
    </section>
  );
};
