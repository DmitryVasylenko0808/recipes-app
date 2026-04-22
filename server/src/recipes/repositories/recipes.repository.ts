import { Injectable } from '@nestjs/common';
import { IRecipesRepository } from '../interfaces';
import {
  RangeDate,
  RateStats,
  RecipeFindManyItem,
  RecipeFindManyResult,
  RecipeFindOneResult,
} from '../recipes.types';
import { Recipe } from 'src/generated/prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { RecipeWhereInput } from 'src/generated/prisma/models';
import {
  CreateRecipeRequestDto,
  GetAuthorRecipesQueryDto,
  GetRecipesQueryDto,
  UpdateRecipeRequestDto,
} from '../dtos';

@Injectable()
export class RecipesRepository implements IRecipesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string, userId?: string): Promise<RecipeFindOneResult | null> {
    return await this.prisma.recipe.findUnique({
      where: { id },
      include: {
        category: true,
        author: true,
        favoriteEntries: userId
          ? {
              where: { userId },
              select: { userId: true },
            }
          : undefined,
        ratings: userId
          ? {
              where: { userId },
            }
          : undefined,
        recipeTags: {
          include: { tag: true },
        },
        recipeIngredients: {
          include: { ingredient: true },
        },
      },
    });
  }

  async findMany(options: GetRecipesQueryDto, userId?: string): Promise<RecipeFindManyResult> {
    const {
      page,
      limit,
      search,
      categoryNames,
      minCookingTime,
      maxCookingTime,
      tagNames,
      ingredientNames,
      difficulties,
    } = options;

    const filter: RecipeWhereInput = {
      title: { startsWith: search, mode: 'insensitive' },
      category: {
        name: { in: categoryNames },
      },
      cookingTime: { gte: minCookingTime, lte: maxCookingTime },
      difficulty: { in: difficulties },
      recipeTags: {
        some: {
          tag: {
            name: { in: tagNames },
          },
        },
      },
      recipeIngredients: {
        some: {
          ingredient: {
            name: { in: ingredientNames },
          },
        },
      },
    };

    const [data, totalCount] = await this.prisma.$transaction([
      this.prisma.recipe.findMany({
        where: filter,
        include: {
          category: true,
          favoriteEntries: userId
            ? {
                where: { userId },
                select: { userId: true },
              }
            : false,
          recipeTags: {
            include: { tag: true },
          },
          recipeIngredients: {
            include: { ingredient: true },
          },
        },
        skip: limit * (page - 1),
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.recipe.count({ where: filter }),
    ]);

    return { data, totalCount };
  }

  async findTrending(
    limit: number,
    rangeDate: RangeDate,
    userId?: string
  ): Promise<RecipeFindManyItem[]> {
    const { from, to } = rangeDate;

    return await this.prisma.recipe.findMany({
      where: {
        createdAt: {
          gte: from,
          lt: to,
        },
      },
      include: {
        category: true,
        favoriteEntries: userId
          ? {
              where: { userId },
              select: { userId: true },
            }
          : undefined,
        recipeTags: {
          include: { tag: true },
        },
        recipeIngredients: {
          include: { ingredient: true },
        },
      },
      orderBy: { ratingsAvg: 'desc' },
      take: limit,
    });
  }

  async findPopular(limit: number, userId?: string): Promise<RecipeFindManyItem[]> {
    return await this.prisma.recipe.findMany({
      include: {
        category: true,
        favoriteEntries: userId
          ? {
              where: { userId },
              select: { userId: true },
            }
          : undefined,
        recipeTags: {
          include: { tag: true },
        },
        recipeIngredients: {
          include: { ingredient: true },
        },
      },
      orderBy: { ratingsAvg: 'desc' },
      take: limit,
    });
  }

  async findManyByAuthorId(
    authorId: string,
    options: GetAuthorRecipesQueryDto,
    userId?: string
  ): Promise<RecipeFindManyResult> {
    const { page, limit } = options;

    const [data, totalCount] = await this.prisma.$transaction([
      this.prisma.recipe.findMany({
        where: { authorId },
        include: {
          category: true,
          favoriteEntries: userId
            ? {
                where: { userId },
                select: { userId: true },
              }
            : false,
          recipeTags: {
            include: { tag: true },
          },
          recipeIngredients: {
            include: { ingredient: true },
          },
        },
        skip: limit * (page - 1),
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.recipe.count({
        where: { authorId },
      }),
    ]);

    return { data, totalCount };
  }

  async findByCategoryId(categoryId: string, userId?: string): Promise<RecipeFindManyItem[]> {
    return await this.prisma.recipe.findMany({
      where: { categoryId },
      include: {
        category: true,
        favoriteEntries: userId
          ? {
              where: { userId },
              select: { userId: true },
            }
          : false,
        recipeTags: {
          include: { tag: true },
        },
        recipeIngredients: {
          include: { ingredient: true },
        },
      },
    });
  }

  async create(
    authorId: string,
    data: CreateRecipeRequestDto,
    previewImageFilename: string
  ): Promise<Recipe> {
    const { recipeTagIds, recipeIngredients, ...restData } = data;

    return await this.prisma.recipe.create({
      data: {
        ...restData,
        authorId,
        previewImage: previewImageFilename,
        recipeTags: { create: recipeTagIds.map((id) => ({ tagId: id })) },
        recipeIngredients: { create: recipeIngredients },
      },
    });
  }

  async update(
    id: string,
    data: UpdateRecipeRequestDto,
    previewImageFilename?: string
  ): Promise<Recipe> {
    const { recipeTagIds, recipeIngredients, ...restData } = data;

    return await this.prisma.recipe.update({
      where: { id },
      data: {
        ...restData,
        previewImage: previewImageFilename,
        recipeTags: recipeTagIds && {
          deleteMany: {},
          create: recipeTagIds?.map((id) => ({ tagId: id })),
        },
        recipeIngredients: recipeIngredients && { deleteMany: {}, create: recipeIngredients },
      },
    });
  }

  async updateRateStats(id: string, rateStats: Partial<RateStats>): Promise<Recipe> {
    return await this.prisma.recipe.update({
      where: { id },
      data: rateStats,
    });
  }

  async delete(id: string): Promise<Recipe> {
    return await this.prisma.recipe.delete({
      where: { id },
    });
  }

  async incrementViews(id: string) {
    await this.prisma.recipe.update({
      where: { id },
      data: {
        viewsCount: { increment: 1 },
      },
    });
  }
}
