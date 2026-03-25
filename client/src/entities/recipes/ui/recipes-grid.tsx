import { cn } from '@/shared/lib/utils/cn';
import type { RecipePreview } from '../model/types/recipe-preview';
import { RecipeCard } from './recipe-card';

type RecipeGridProps = { recipes?: RecipePreview[]; cols?: number };

export const RecipesGrid = ({ recipes = [], cols = 3 }: RecipeGridProps) => {
  return (
    <div
      className={cn('grid gap-6', {
        'grid-cols-1': cols === 1,
        'grid-cols-2': cols === 2,
        'grid-cols-3': cols === 3,
        'grid-cols-4': cols === 4,
        'grid-cols-5': cols === 5,
        'grid-cols-6': cols === 6,
      })}
    >
      {recipes.map((r) => (
        <RecipeCard recipe={r} key={r.id} />
      ))}
    </div>
  );
};
