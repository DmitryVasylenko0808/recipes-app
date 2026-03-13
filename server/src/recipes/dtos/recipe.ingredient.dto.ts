import { IsString, IsInt, Min } from 'class-validator';

export class RecipeIngredientDto {
  @IsString()
  ingredientId: string;

  @IsInt()
  @Min(1)
  amount: number;

  @IsString()
  unit: string;

  constructor(partial: Partial<RecipeIngredientDto>) {
    Object.assign(this, partial);
  }
}
