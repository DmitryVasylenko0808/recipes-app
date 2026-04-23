import {
  RecipeCard,
  RecipesGrid,
  RecipesGridSkeleton,
  useGetSimilarRecipes,
} from '@/entities/recipes';
import { ToggleFavoriteRecipeButton } from '@/features/favorites/toggle';
import { Typograpghy } from '@/shared';
import { Lightbulb } from 'lucide-react';
import { useParams } from 'react-router';

export const SimilarRecipes = () => {
  const { id } = useParams();
  const { data, isPending } = useGetSimilarRecipes(id);

  return (
    <section className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-6 flex items-center gap-2">
        <Lightbulb className="text-primary" />
        <Typograpghy tagVariant="h2">You Might Also Like</Typograpghy>
      </div>
      {isPending ? (
        <RecipesGridSkeleton countItems={3} cols={3} />
      ) : (
        <RecipesGrid
          recipes={data?.data}
          cols={3}
          renderItems={(r) => (
            <RecipeCard
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
