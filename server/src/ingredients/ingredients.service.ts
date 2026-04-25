import { Injectable } from '@nestjs/common';
import { IngredientsRepository } from './ingredients.repository';
import { IngredientsMapper } from './mappers/ingredients.mappet';

@Injectable()
export class IngredientsService {
  constructor(
    private readonly ingredientsRepository: IngredientsRepository,
    private readonly ingredientsMapper: IngredientsMapper
  ) {}

  async getAll() {
    const ingredients = await this.ingredientsRepository.findMany();

    return ingredients.map((i) => this.ingredientsMapper.toDto(i));
  }
}
