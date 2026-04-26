import { Injectable } from '@nestjs/common';
import { Ingredient } from 'src/generated/prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { IIngredientsRepository } from './interfaces';

@Injectable()
export class IngredientsRepository implements IIngredientsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findMany(): Promise<Ingredient[]> {
    return this.prisma.ingredient.findMany();
  }
}
