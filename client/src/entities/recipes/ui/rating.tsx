import { Typograpghy } from '@/shared';
import { Star } from 'lucide-react';

type RatingProps = {
  rating: number;
  maxRating: number;
  ratingsCount: number;
};

export const Rating = ({ rating, maxRating, ratingsCount }: RatingProps) => {
  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-0.5">
        {Array.from({ length: maxRating }).map((_, i) => (
          <Star size={14} className="text-muted-foreground/30" key={i} />
        ))}
      </div>
      <Typograpghy tagVariant="span">({ratingsCount})</Typograpghy>
    </div>
  );
};
