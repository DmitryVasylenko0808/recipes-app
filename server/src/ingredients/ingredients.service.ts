import { Injectable } from '@nestjs/common';
import { IngredientsRepository } from './ingredients.repository';
import { IngredientDto } from './dtos';

@Injectable()
export class IngredientsService {
  constructor(private readonly ingredientsRepository: IngredientsRepository) {}

  async getAll() {
    const ingredients = await this.ingredientsRepository.findMany();

    return ingredients.map((ingredient) => new IngredientDto(ingredient));
  }
}
