import { Typograpghy } from '@/shared';
import { cn } from '@/shared/lib/utils/cn';
import { Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useRateRecipe } from '../model/hooks/use-rate-recipe';
import type { RatingDto } from '../api';

type RateRecipeProps = {
  recipeId: string;
  maxRating: number;
  rating?: number;
  onRate?: (rating?: RatingDto) => void;
  onError?: (err: Error) => void;
};

export const RateRecipe = ({
  recipeId,
  maxRating,
  rating = 0,
  onRate,
  onError,
}: RateRecipeProps) => {
  const { mutateAsync } = useRateRecipe();
  const [hoverRating, setHoverRating] = useState(rating);

  useEffect(() => setHoverRating(rating), [rating]);

  const handleMouseLeave = () => setHoverRating(rating);
  const handleMouseEnter = (starIndex: number) => setHoverRating(starIndex);
  const handleClick = (rating: number) => {
    mutateAsync({ id: recipeId, value: rating }).then(onRate).catch(onError);
  };

  return (
    <div>
      <div className="flex justify-end">
        <Typograpghy tagVariant="span" className="mb-2 inline-block text-sm">
          {rating ? 'Your rating' : 'Rate recipe'}
        </Typograpghy>
      </div>
      <div className="flex justify-end">
        <div className="flex items-center gap-0.5" onMouseLeave={handleMouseLeave}>
          {Array.from({ length: maxRating }).map((_, i) => (
            <Star
              size={26}
              className={cn(
                'text-muted-foreground/30 cursor-pointer duration-100 hover:scale-110',
                {
                  'text-primary fill-primary': i + 1 <= hoverRating,
                }
              )}
              onMouseEnter={() => handleMouseEnter(i + 1)}
              onClick={() => handleClick(i + 1)}
              key={i}
            />
          ))}
        </div>
      </div>
      {!!rating && (
        <div className="mt-1 flex justify-end">
          <Typograpghy tagVariant="span" className="inline-block">
            Click to change your rating
          </Typograpghy>
        </div>
      )}
    </div>
  );
};
