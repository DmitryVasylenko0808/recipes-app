import { Badge, Card, pathKeys, Typograpghy } from '@/shared';
import { useNavigate } from 'react-router';
import { Clock, Eye } from 'lucide-react';
import type { ReactNode } from 'react';
import type { RecipePreview } from '../model/types/recipe-preview';
import { Rating } from './rating';

export type RecipeCardProps = {
  recipe: RecipePreview;
  actionsSlot?: ReactNode;
};

export const RecipeCard = ({ recipe, actionsSlot }: RecipeCardProps) => {
  const navigate = useNavigate();

  return (
    <Card className="duration-100 hover:shadow-xl">
      <div onClick={() => navigate(pathKeys.recipes.byId(recipe.id))}>
        <div className="relative h-48 w-full">
          <Badge variant="primary" className="absolute top-2 left-2">
            {recipe.category.name}
          </Badge>
          <div className="absolute top-2 right-2">{actionsSlot}</div>
          <img
            className="h-full w-full rounded-t-md"
            src={recipe.previewImage}
            alt="recipe preview image"
          />
        </div>
        <div className="p-6">
          <div className="mb-1.5 flex items-center gap-0.5">
            <Typograpghy tagVariant="h4" className="line-clamp-1 flex-1">
              {recipe.title}
            </Typograpghy>
            <Typograpghy
              tagVariant="span"
              className="line-clamp-1 inline-flex items-center text-xs"
            >
              <Clock size={16} className="mr-1" />
              {recipe.cookingTime} min
            </Typograpghy>
          </div>
          <div className="mb-4">
            <Typograpghy tagVariant="p" className="line-clamp-2">
              {recipe.description}
            </Typograpghy>
          </div>
          <div className="mb-2 flex justify-between">
            <Typograpghy tagVariant="span" className="inline-flex">
              <Eye size={16} className="mr-1" />
              {recipe.viewsCount} views
            </Typograpghy>
            <Rating maxRating={5} rating={recipe.ratingsAvg} ratingsCount={recipe.ratingsCount} />
          </div>
          <div className="mb-1.5 flex flex-wrap gap-1.5">
            {recipe.recipeTags.map((t) => (
              <Badge variant="secondary" key={t.id}>
                {t.name}
              </Badge>
            ))}
          </div>
          <Typograpghy tagVariant="span" className="text-foreground mb-1.5">
            Ingredients:
            <div>
              <Typograpghy tagVariant="span">
                {recipe.recipeIngredients.map((ing) => ing.name).join(', ')}
              </Typograpghy>
            </div>
          </Typograpghy>
        </div>
      </div>
    </Card>
  );
};
