import { Injectable } from '@nestjs/common';
import { Category } from 'src/generated/prisma/client';
import { CategoryDto } from '../dtos';

@Injectable()
export class CategoriesMapper {
  toDto(category: Category): CategoryDto {
    return {
      id: category.id,
      name: category.name,
    };
  }
}
