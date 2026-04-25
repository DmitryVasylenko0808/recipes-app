import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';
import { CategoriesMapper } from './mappers/categories.mapper';

@Injectable()
export class CategoriesService {
  constructor(
    private readonly categoriesRepository: CategoriesRepository,
    private readonly categoriesMapper: CategoriesMapper
  ) {}

  async getAll() {
    const categories = await this.categoriesRepository.findMany();

    return categories.map((c) => this.categoriesMapper.toDto(c));
  }
}
