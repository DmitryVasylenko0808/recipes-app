import { Badge, Card, pathKeys, Typograpghy } from '@/shared';
import type { RecipeCardProps } from './recipe-card';
import { ChefHat, Clock, Eye } from 'lucide-react';
import { Rating } from './rating';
import { useNavigate } from 'react-router';

export const RecipeCardHorizontal = ({ recipe, actionsSlot }: RecipeCardProps) => {
  const navigate = useNavigate();

  return (
    <Card className="duration-100 hover:shadow-xl">
      <div className="flex" onClick={() => navigate(pathKeys.recipes.byId(recipe.id))}>
        <div className="relative h-40 w-40">
          <Badge variant="primary" className="absolute top-2 left-2">
            {recipe.category.name}
          </Badge>
          <img
            src={recipe.previewImage}
            alt=" recipe preview image"
            className="h-full w-full rounded-l-xl"
          />
        </div>
        <div className="flex-1 p-4">
          <div className="flex items-center justify-between">
            <Typograpghy tagVariant="h3">{recipe.title}</Typograpghy>
            <div className="flex gap-2">{actionsSlot}</div>
          </div>
          <Typograpghy tagVariant="p" className="mb-3 line-clamp-2">
            {recipe.description}
          </Typograpghy>
          <div className="mb-2 flex gap-3">
            <Typograpghy tagVariant="span" className="inline-flex items-center gap-1">
              <Clock size={14} /> {recipe.cookingTime} min
            </Typograpghy>
            <Typograpghy tagVariant="span" className="inline-flex items-center gap-1">
              <Eye size={14} /> {recipe.viewsCount}
            </Typograpghy>
            <Typograpghy tagVariant="span" className="inline-flex items-center gap-1">
              <ChefHat size={14} /> {recipe.difficulty}
            </Typograpghy>
          </div>
          <Rating
            rating={recipe.ratingsAvg}
            maxRating={5}
            ratingsCount={recipe.ratingsCount}
            showCount
          />
        </div>
      </div>
    </Card>
  );
};
