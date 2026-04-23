import { cn } from '@/shared/lib/utils/cn';

type RecipesGridSkeletonProps = { countItems?: number; cols?: number; horizontal?: boolean };

export const RecipesGridSkeleton = ({
  countItems = 9,
  cols = 3,
  horizontal,
}: RecipesGridSkeletonProps) => {
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
      {Array.from({ length: countItems }).map((_, i) => (
        <div
          className={cn('bg-accent h-110 animate-pulse rounded-md', {
            'h-40': horizontal,
            'h-110': !horizontal,
          })}
          key={i}
        />
      ))}
    </div>
  );
};
