import { cn } from '@/shared/lib/utils/cn';
import type { ReactNode } from 'react';
import type { RecipeVersionPreview } from '../model/types/recipe-version-preview';

type RecipeVersionsListProps = {
  recipeVersions?: RecipeVersionPreview[];
  isFetching?: boolean;
  renderItem: (rv: RecipeVersionPreview) => ReactNode;
};

export const RecipeVersionsList = ({
  recipeVersions = [],
  isFetching,
  renderItem,
}: RecipeVersionsListProps) => {
  return (
    <div className={cn('space-y-4', { 'opacity-50': isFetching })}>
      {recipeVersions.map((rv) => renderItem(rv))}
    </div>
  );
};
