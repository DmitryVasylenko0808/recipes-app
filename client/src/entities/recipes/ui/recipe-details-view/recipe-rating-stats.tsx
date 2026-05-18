import { Typograpghy } from '@/shared';
import type { ReactNode } from 'react';
import { Rating } from '../rating';

type RecipeRatingStatsProps = {
  ratingsAvg: number;
  ratingsCount: number;
  actionsSlot?: ReactNode;
};

export const RecipeRatingStats = ({
  ratingsAvg,
  ratingsCount,
  actionsSlot,
}: RecipeRatingStatsProps) => {
  return (
    <div>
      <div className="flex justify-between pb-6">
        <div>
          <Typograpghy tagVariant="span" className="mb-2 inline-block text-sm">
            Recipe rating
          </Typograpghy>
          <Rating maxRating={5} rating={ratingsAvg} ratingsCount={ratingsCount} size="lg">
            <Typograpghy tagVariant="span" className="text-foreground text-lg font-medium">
              {ratingsAvg ? ratingsAvg : 'No ratings'}
            </Typograpghy>
            {ratingsCount && (
              <Typograpghy tagVariant="span" className="text-sm">
                ({ratingsCount} ratings)
              </Typograpghy>
            )}
          </Rating>
        </div>
        {actionsSlot}
      </div>
      <div className="bg-ring/30 h-px" />
    </div>
  );
};
