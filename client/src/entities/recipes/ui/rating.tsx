import { Typograpghy } from '@/shared';
import { cn } from '@/shared/lib/utils/cn';
import { Star } from 'lucide-react';

type RatingProps = {
  rating: number;
  maxRating: number;
  ratingsCount: number;
};

export const Rating = ({ rating, maxRating, ratingsCount }: RatingProps) => {
  const renderRatings = Array.from({ length: maxRating }).map((_, i) => {
    const ratingValue = i + 1;

    const isFilled = ratingValue <= rating;
    const isPartial = !isFilled && ratingValue - 0.5 <= rating;

    return isPartial ? (
      <PartialStar key={i} />
    ) : (
      <Star
        size={14}
        className={cn('text-muted-foreground/30', { 'text-primary fill-primary': isFilled })}
        key={i}
      />
    );
  });

  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-0.5">{renderRatings}</div>
      <Typograpghy tagVariant="span">
        {rating} ({ratingsCount})
      </Typograpghy>
    </div>
  );
};

export const PartialStar = () => (
  <div className="relative h-3.5 w-3.5">
    <Star size={14} className="text-muted-foreground/30 absolute top-0 left-0" />
    <div className="absolute top-0 left-0 w-[50%] overflow-hidden">
      <Star size={14} className="text-primary fill-primary" />
    </div>
  </div>
);
