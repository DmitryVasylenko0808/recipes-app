import { Card, Typograpghy } from '@/shared';
import type { RecipeIngredient } from '../../model/types/recipe-preview';

type RecipeIngredientsProps = { ingredients: RecipeIngredient[] };

export const RecipeIngredients = ({ ingredients }: RecipeIngredientsProps) => {
  return (
    <Card className="p-6">
      <Typograpghy tagVariant="h2" className="mb-4">
        Ingredients
      </Typograpghy>
      <ul className="marker:text-primary list-disc space-y-3 pl-4 marker:h-2 marker:w-2">
        {ingredients.map((ing) => (
          <li key={`${ing.ingredientId}-${ing.unit}-${ing.name}`}>
            {ing.amount} {ing.unit} {ing.name}
          </li>
        ))}
      </ul>
    </Card>
  );
};
