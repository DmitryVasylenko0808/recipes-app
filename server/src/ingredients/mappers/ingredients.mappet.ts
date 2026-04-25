import { Injectable } from '@nestjs/common';
import { Ingredient } from 'src/generated/prisma/client';
import { IngredientDto } from '../dtos';

@Injectable()
export class IngredientsMapper {
  toDto(ingredient: Ingredient): IngredientDto {
    return {
      id: ingredient.id,
      name: ingredient.name,
    };
  }
}
