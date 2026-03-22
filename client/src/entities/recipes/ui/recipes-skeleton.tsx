import { cn } from '@/shared/lib/utils/cn';
import type { ComponentProps } from 'react';

type RecipesSkeletonProps = ComponentProps<'div'>;

export const RecipesSkeleton = ({ className, ...divProps }: RecipesSkeletonProps) => {
  return (
    <div className={cn('flex flex-wrap gap-3', className)} {...divProps}>
      {Array.from({ length: 9 }).map((_, i) => (
        <div className="h-120 w-73 animate-pulse rounded-md bg-gray-200" key={i} />
      ))}
    </div>
  );
};
