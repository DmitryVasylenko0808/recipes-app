import { Badge, Typograpghy } from '@/shared';
import type { ReactNode } from 'react';
import type { RecipeVersionPreview } from '../model/types/recipe-version-preview';
import { Calendar } from 'lucide-react';
import { cn } from '@/shared/lib/utils/cn';

type RecipeVersionItemProps = {
  recipeVersion: RecipeVersionPreview;
  actionsSlot?: ReactNode;
  accent?: boolean;
};

export const RecipeVersionItem = ({
  recipeVersion,
  actionsSlot,
  accent,
}: RecipeVersionItemProps) => {
  return (
    <div
      className={cn('bg-card border-ring/30 text-card-foreground flex rounded-xl border p-5', {
        'bg-accent': accent,
      })}
    >
      <div className="flex-auto">
        <div className="mb-3 flex gap-2">
          <Badge variant={recipeVersion.isCurrent || accent ? 'primary' : 'secondary'}>
            Version {recipeVersion.version} {recipeVersion.isCurrent && '(Current)'}
          </Badge>
          <Typograpghy tagVariant="p">{recipeVersion.changeDescription}</Typograpghy>
        </div>
        <div>
          <Typograpghy tagVariant="span" className="inline-flex items-center">
            <Calendar size={16} className="mr-2 inline" />{' '}
            {new Date(recipeVersion.createdAt).toLocaleString()}
          </Typograpghy>
        </div>
      </div>
      <div className="flex gap-2">{actionsSlot}</div>
    </div>
  );
};
