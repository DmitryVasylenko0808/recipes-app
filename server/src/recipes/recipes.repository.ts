import { Injectable } from '@nestjs/common';
import {
  CreateRecipeData,
  IRecipesRepository,
  RecipeDetails,
  RecipeFindManyOptions,
  UpdateRecipeData,
} from './interfaces';
import { Recipe } from 'src/generated/prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RecipesRepository implements IRecipesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<RecipeDetails | null> {
    return await this.prisma.recipe.findUnique({
      where: { id },
      include: {
        author: true,
        recipeTags: {
          include: {
            tag: true,
          },
        },
      },
    });
  }

  async findMany(options: RecipeFindManyOptions): Promise<Recipe[]> {
    throw new Error('Method not implemented.');
  }

  async findManyByAuthorId(authorId: string, options: RecipeFindManyOptions): Promise<Recipe[]> {
    throw new Error('Method not implemented.');
  }

  async create(data: CreateRecipeData): Promise<Recipe> {
    throw new Error('Method not implemented.');
  }

  async update(data: UpdateRecipeData): Promise<Recipe> {
    throw new Error('Method not implemented.');
  }

  async delete(id: string): Promise<Recipe> {
    throw new Error('Method not implemented.');
  }
}
