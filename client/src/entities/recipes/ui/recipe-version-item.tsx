import { Badge, Card, Typograpghy } from '@/shared';
import type { ReactNode } from 'react';
import type { RecipeVersionPreview } from '../model/types/recipe-version-preview';
import { Calendar } from 'lucide-react';

type RecipeVersionItemProps = {
  recipeVersion: RecipeVersionPreview;
  actionsSlot?: ReactNode;
};

export const RecipeVersionItem = ({ recipeVersion, actionsSlot }: RecipeVersionItemProps) => {
  return (
    <Card className="flex p-5">
      <div className="flex-auto">
        <div className="mb-3 flex gap-2">
          <Badge variant={recipeVersion.isCurrent ? 'primary' : 'secondary'}>
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
      <div>{actionsSlot}</div>
    </Card>
  );
};
