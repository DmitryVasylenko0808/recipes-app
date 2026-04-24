import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { IFavoritesRepository } from './interfaces';
import { FavoriteList } from './types';
import { FavoriteRecipe } from 'src/generated/prisma/client';
import { PaginationQueryDto } from 'src/recipes/dtos';
import { FavoriteRecipeWhereInput } from 'src/generated/prisma/models';

@Injectable()
export class FavoritesRepository implements IFavoritesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findManyByUserId(userId: string, options: PaginationQueryDto): Promise<FavoriteList> {
    const { page, limit } = options;

    const [data, totalCount] = await this.prisma.$transaction([
      this.prisma.favoriteRecipe.findMany({
        where: { userId },
        include: {
          recipe: {
            include: {
              category: true,
              recipeIngredients: {
                include: { ingredient: true },
              },
              recipeTags: {
                include: { tag: true },
              },
            },
          },
        },
        orderBy: { favoritedAt: 'desc' },
        take: limit,
        skip: limit * (page - 1),
      }),
      this.prisma.favoriteRecipe.count({ where: { userId } }),
    ]);

    return { data, totalCount };
  }

  async findOne(userId: string, recipeId: string): Promise<FavoriteRecipe | null> {
    return await this.prisma.favoriteRecipe.findUnique({
      where: {
        userId_recipeId: {
          userId,
          recipeId,
        },
      },
    });
  }

  async create(userId: string, recipeId: string): Promise<FavoriteRecipe> {
    return await this.prisma.favoriteRecipe.create({
      data: {
        recipeId,
        userId,
      },
    });
  }

  async deleteOne(userId: string, recipeId: string): Promise<FavoriteRecipe> {
    return await this.prisma.favoriteRecipe.delete({
      where: {
        userId_recipeId: {
          userId,
          recipeId,
        },
      },
    });
  }

  async count(filter: FavoriteRecipeWhereInput): Promise<number> {
    return await this.prisma.favoriteRecipe.count({ where: filter });
  }
}
