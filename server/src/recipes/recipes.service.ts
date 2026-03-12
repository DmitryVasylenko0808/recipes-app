import { Injectable, NotFoundException } from '@nestjs/common';
import { RecipesRepository } from './recipes.repository';

@Injectable()
export class RecipesService {
  constructor(private readonly recipesRepository: RecipesRepository) {}

  async getOneById(id: string) {
    const recipe = await this.recipesRepository.findById(id);

    if (!recipe) throw new NotFoundException('Recipe is not found');

    return recipe;
  }
}
