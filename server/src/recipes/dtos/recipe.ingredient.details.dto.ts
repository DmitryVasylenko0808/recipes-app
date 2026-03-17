import { Exclude } from 'class-transformer';
import { RecipeIngredientDetails } from '../recipes.types';

export class RecipeIngredientDetailsDto {
  @Exclude()
  id: string;

  @Exclude()
  recipeId: string;

  ingredientId: string;
  name: string;
  amount: number;
  unit: string;

  constructor(partial: Partial<RecipeIngredientDetails>) {
    const { ingredient, ...restData } = partial;
    Object.assign(this, restData, ingredient);
  }
}
