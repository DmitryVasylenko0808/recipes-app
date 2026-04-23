import { Typograpghy } from '@/shared';
import { cn } from '@/shared/lib/utils/cn';
import { Star } from 'lucide-react';
import type { ReactNode } from 'react';

type StarSize = 'sm' | 'lg';

type RatingProps = {
  rating: number;
  maxRating: number;
  ratingsCount: number;
  size?: StarSize;
  showCount?: boolean;
  children?: ReactNode;
};

const sizesMap: Record<StarSize, number> = {
  sm: 14,
  lg: 26,
};

export const Rating = ({
  rating,
  maxRating,
  ratingsCount,
  size = 'sm',
  showCount,
  children,
}: RatingProps) => {
  const renderRatings = Array.from({ length: maxRating }).map((_, i) => {
    const ratingValue = i + 1;

    const isFilled = ratingValue <= rating;
    const isPartial = !isFilled && ratingValue - 0.5 <= rating;

    return isPartial ? (
      <div
        className={cn('relative', {
          'h-3.5 w-3.5': size === 'sm',
          'h-6.5 w-6.5': size === 'lg',
        })}
        key={i}
      >
        <Star size={sizesMap[size]} className="text-muted-foreground/30 absolute top-0 left-0" />
        <div className="absolute top-0 left-0 w-[50%] overflow-hidden">
          <Star size={sizesMap[size]} className="text-primary fill-primary" />
        </div>
      </div>
    ) : (
      <Star
        size={sizesMap[size]}
        className={cn('text-muted-foreground/30', { 'text-primary fill-primary': isFilled })}
        key={i}
      />
    );
  });

  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-0.5">{renderRatings}</div>
      {showCount && <Typograpghy tagVariant="span">({ratingsCount})</Typograpghy>}
      {children}
    </div>
  );
};
