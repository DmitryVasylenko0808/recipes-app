import { Injectable } from '@nestjs/common';
import { IngredientsRepository } from './ingredients.repository';

@Injectable()
export class IngredientsService {
  constructor(private readonly ingredientsRepository: IngredientsRepository) {}

  async getAll() {
    return await this.ingredientsRepository.findMany();
  }
}
