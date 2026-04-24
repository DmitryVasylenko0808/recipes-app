import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';
import { CategoryDto } from './dtos';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async getAll() {
    const categories = await this.categoriesRepository.findMany();

    return categories.map((c) => new CategoryDto(c));
  }
}
