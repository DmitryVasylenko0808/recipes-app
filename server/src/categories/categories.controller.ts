import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoryDto } from './dtos';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  @ApiOkResponse({ type: [CategoryDto] })
  async getAll() {
    return this.categoriesService.getAll();
  }
}
