import { Ingredient } from 'src/generated/prisma/client';

export class IngredientDto implements Ingredient {
  id: string;
  name: string;

  constructor(partial: Partial<IngredientDto>) {
    Object.assign(this, partial);
  }
}
