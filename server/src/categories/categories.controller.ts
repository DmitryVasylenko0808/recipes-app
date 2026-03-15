import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoryDto } from './dtos';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async getAll() {
    const categories = await this.categoriesService.getAll();
    return categories.map((c) => new CategoryDto(c));
  }
}
