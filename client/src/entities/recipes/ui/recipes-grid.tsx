import { cn } from '@/shared/lib/utils/cn';
import type { RecipePreview } from '../model/types/recipe-preview';
import { RecipeCard } from './recipe-card';
import type { ComponentProps, ReactNode } from 'react';
import { ToggleFavoriteRecipeButton } from '@/features/favorites/toggle';

type RecipeGridProps = ComponentProps<'div'> & {
  recipes?: RecipePreview[];
  cols?: number;
  isFetching?: boolean;
  renderItems?: (item: RecipePreview) => ReactNode;
};

// !!
export const RecipesGrid = ({
  recipes = [],
  cols = 3,
  isFetching,
  className,
  renderItems,
}: RecipeGridProps) => {
  return (
    <div
      className={cn(
        'grid gap-6',
        {
          'grid-cols-1': cols === 1,
          'grid-cols-2': cols === 2,
          'grid-cols-3': cols === 3,
          'grid-cols-4': cols === 4,
          'grid-cols-5': cols === 5,
          'grid-cols-6': cols === 6,
        },
        {
          'opacity-50': isFetching,
        },
        className
      )}
    >
      {recipes.map((r) => (
        <RecipeCard recipe={r} key={r.id} actionsSlot={<ToggleFavoriteRecipeButton recipe={r} />} />
      ))}
      {renderItems()}
    </div>
  );
};
