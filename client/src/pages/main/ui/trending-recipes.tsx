import {
  RecipeCardHorizontal,
  RecipesGrid,
  RecipesGridSkeleton,
  useGetTrendingRecipes,
} from '@/entities/recipes';
import { ToggleFavoriteRecipeButton } from '@/features/favorites/toggle';
import { Typograpghy } from '@/shared';
import { TrendingUp } from 'lucide-react';

export const TrendingRecipes = () => {
  const { data, isPending } = useGetTrendingRecipes();

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-6 flex items-center gap-2">
        <TrendingUp className="text-primary" />
        <Typograpghy tagVariant="h2">Trending Recipes</Typograpghy>
      </div>
      {isPending ? (
        <RecipesGridSkeleton countItems={4} cols={2} horizontal />
      ) : (
        <RecipesGrid
          recipes={data?.data}
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
