import { Badge, Card, pathKeys, Typograpghy } from '@/shared';
import type { RecipePreview } from '../model/types/recipe-preview';
import { Link } from 'react-router';

type RecipeCardProps = {
  recipe: RecipePreview;
};

export const RecipeCard = ({ recipe }: RecipeCardProps) => {
  return (
    <Card className="h-120 w-73 duration-100 hover:shadow-xl">
      <Link to={pathKeys.recipes.byId(recipe.id)}>
        <div className="relative h-48 w-full">
          <Badge variant="primary" className="absolute top-2 left-2">
            {recipe.category.name}
          </Badge>
          <img
            className="h-full w-full rounded-t-md"
            src={recipe.previewImage}
            alt="recipe preview image"
          />
        </div>
        <div className="p-6">
          <div className="mb-1.5 flex items-center justify-between">
            <Typograpghy tagVariant="h4" className="line-clamp-1">
              {recipe.title}
            </Typograpghy>
            <Typograpghy tagVariant="span" className="text-sm">
              {recipe.cookingTime} min
            </Typograpghy>
          </div>
          <Typograpghy tagVariant="p" className="mb-4 line-clamp-2">
            {recipe.description}
          </Typograpghy>
          <div className="mb-3 flex flex-wrap gap-1.5">
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
      </Link>
    </Card>
  );
};
