import { Injectable } from '@nestjs/common';
import { ICategoriesRepository } from './interfaces';
import { PrismaService } from 'src/prisma/prisma.service';
import { Category } from 'src/generated/prisma/client';

@Injectable()
export class CategoriesRepository implements ICategoriesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findMany(): Promise<Category[]> {
    return await this.prisma.category.findMany();
  }
}
