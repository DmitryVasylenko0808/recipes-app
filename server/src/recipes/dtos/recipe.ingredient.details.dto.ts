import { Exclude } from 'class-transformer';
import { RecipeIngredientDetails } from '../recipes.types';
import { ApiProperty } from '@nestjs/swagger';

export class RecipeIngredientDetailsDto {
  @Exclude()
  id: string;

  @Exclude()
  recipeId: string;

  @ApiProperty({
    description: 'Unique identifier of recipe ingredient',
    example: '43dff760-fe8e-4f60-9dda-e593e924ebda',
  })
  ingredientId: string;

  @ApiProperty({
    description: 'Name of recipe ingredient',
    example: 'Eggs',
  })
  name: string;

  @ApiProperty({
    description: 'Amount of recipe ingredient',
    example: 100,
  })
  amount: number;

  @ApiProperty({
    description: 'Unit of recipe ingredient',
    example: 'g',
  })
  unit: string;

  constructor(partial: Partial<RecipeIngredientDetails>) {
    const { ingredient, ...restData } = partial;
    Object.assign(this, restData, ingredient);
  }
}
