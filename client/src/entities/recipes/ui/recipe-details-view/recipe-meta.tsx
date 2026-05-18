import type { Category } from '@/entities/categories';
import type { Tag } from '@/entities/tags';
import { Badge, Typograpghy } from '@/shared';
import { ChefHat, Clock, Eye, type LucideIcon } from 'lucide-react';
import type { ComponentProps } from 'react';
import type { Difficulty } from '../../model/types/recipe-preview';

type RecipeMetaProps = {
  category?: Category;
  difficulty?: Difficulty;
  cookingTime?: number;
  viewsCount?: number;
  tags?: Tag[];
};
export const RecipeMeta = ({
  category,
  difficulty,
  cookingTime,
  viewsCount,
  tags,
}: RecipeMetaProps) => {
  return (
    <div>
      <div className="mb-6 flex gap-4">
        {category && (
          <MetaBlock>
            <Typograpghy tagVariant="span" className="text-sm">
              Category
            </Typograpghy>
            <Typograpghy tagVariant="p" className="font-medium">
              {category.name}
            </Typograpghy>
          </MetaBlock>
        )}
        {difficulty && (
          <MetaBlock icon={ChefHat}>
            <Typograpghy tagVariant="span" className="text-sm">
              Difficulty
            </Typograpghy>
            <Typograpghy tagVariant="p" className="font-medium">
              {difficulty}
            </Typograpghy>
          </MetaBlock>
        )}
        {cookingTime && (
          <MetaBlock icon={Clock}>
            <Typograpghy tagVariant="span" className="text-sm">
              Cooking time
            </Typograpghy>
            <Typograpghy tagVariant="p" className="font-medium">
              {cookingTime} minutes
            </Typograpghy>
          </MetaBlock>
        )}
        {viewsCount && (
          <MetaBlock icon={Eye}>
            <Typograpghy tagVariant="span" className="text-sm">
              Views
            </Typograpghy>
            <Typograpghy tagVariant="p" className="font-medium">
              {viewsCount}
            </Typograpghy>
          </MetaBlock>
        )}
      </div>
      {tags && (
        <div className="flex gap-2">
          {tags.map((t) => (
            <Badge variant="secondary" key={t.id}>
              {t.name}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

type MetaBlockProps = ComponentProps<'div'> & { icon?: LucideIcon };

const MetaBlock = ({ children, icon: Icon, ...divProps }: MetaBlockProps) => (
  <div
    className="border-ring/30 bg-secondary inline-flex items-center gap-2 rounded-md px-4 py-2"
    {...divProps}
  >
    {Icon && <Icon size={20} className="text-primary" />}
    <div className="flex-col gap-0.5">{children}</div>
  </div>
);
