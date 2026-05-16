import { Injectable } from '@nestjs/common';
import { IRecipesRepository } from '../interfaces';
import {
  RangeDate,
  RateStats,
  RecipeListItem,
  RecipeList,
  RecipeFull,
  AddVersionData,
} from '../recipes.types';
import { Recipe } from 'src/generated/prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { RecipeWhereInput } from 'src/generated/prisma/models';
import { CreateRecipeRequestDto, GetAuthorRecipesQueryDto, GetRecipesQueryDto } from '../dtos';

@Injectable()
export class RecipesRepository implements IRecipesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string, userId?: string): Promise<RecipeFull | null> {
    return this.prisma.recipe.findUnique({
      where: { id },
      include: {
        currentVersion: {
          include: {
            category: true,
            recipeSteps: true,
            recipeTags: {
              include: { tag: true },
            },
            recipeIngredients: {
              include: { ingredient: true },
            },
          },
        },
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
      },
    });
  }

  async findMany(options: GetRecipesQueryDto, userId?: string): Promise<RecipeList> {
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

    const filter: RecipeWhereInput['currentVersion'] = {
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
        where: { currentVersion: filter },
        include: {
          currentVersion: {
            include: {
              category: true,
              recipeTags: {
                include: { tag: true },
              },
              recipeIngredients: {
                include: { ingredient: true },
              },
            },
          },
          favoriteEntries: userId
            ? {
                where: { userId },
                select: { userId: true },
              }
            : false,
        },
        skip: limit * (page - 1),
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.recipe.count({ where: { currentVersion: filter } }),
    ]);

    return { data, totalCount };
  }

  async findTrending(
    limit: number,
    rangeDate: RangeDate,
    userId?: string
  ): Promise<RecipeListItem[]> {
    const { from, to } = rangeDate;

    return this.prisma.recipe.findMany({
      where: {
        createdAt: {
          gte: from,
          lt: to,
        },
      },
      include: {
        currentVersion: {
          include: {
            category: true,
            recipeTags: {
              include: { tag: true },
            },
            recipeIngredients: {
              include: { ingredient: true },
            },
          },
        },
        favoriteEntries: userId
          ? {
              where: { userId },
              select: { userId: true },
            }
          : undefined,
      },
      orderBy: { ratingsAvg: 'desc' },
      take: limit,
    });
  }

  async findPopular(limit: number, userId?: string): Promise<RecipeListItem[]> {
    return this.prisma.recipe.findMany({
      include: {
        currentVersion: {
          include: {
            category: true,
            recipeTags: {
              include: { tag: true },
            },
            recipeIngredients: {
              include: { ingredient: true },
            },
          },
        },
        favoriteEntries: userId
          ? {
              where: { userId },
              select: { userId: true },
            }
          : undefined,
      },
      orderBy: { ratingsAvg: 'desc' },
      take: limit,
    });
  }

  async findManyByAuthorId(
    authorId: string,
    options: GetAuthorRecipesQueryDto,
    userId?: string
  ): Promise<RecipeList> {
    const { page, limit } = options;

    const [data, totalCount] = await this.prisma.$transaction([
      this.prisma.recipe.findMany({
        where: { authorId },
        include: {
          currentVersion: {
            include: {
              category: true,
              recipeTags: {
                include: { tag: true },
              },
              recipeIngredients: {
                include: { ingredient: true },
              },
            },
          },
          favoriteEntries: userId
            ? {
                where: { userId },
                select: { userId: true },
              }
            : false,
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

  async findByCategoryId(categoryId: string, userId?: string): Promise<RecipeListItem[]> {
    return this.prisma.recipe.findMany({
      where: {
        currentVersion: {
          categoryId,
        },
      },
      include: {
        currentVersion: {
          include: {
            category: true,
            recipeTags: {
              include: { tag: true },
            },
            recipeIngredients: {
              include: { ingredient: true },
            },
          },
        },
        favoriteEntries: userId
          ? {
              where: { userId },
              select: { userId: true },
            }
          : false,
      },
    });
  }

  async create(
    authorId: string,
    data: CreateRecipeRequestDto,
    previewImageFilename: string
  ): Promise<Recipe> {
    const { recipeSteps, recipeTagIds, recipeIngredients, ...restData } = data;

    return this.prisma.$transaction(async (tx) => {
      const recipe = await tx.recipe.create({ data: { authorId } });
      const recipeVersion = await tx.recipeVersion.create({
        data: {
          recipeId: recipe.id,
          version: 1,
          ...restData,
          previewImage: previewImageFilename,
          recipeSteps: { create: recipeSteps.map((rs) => ({ content: rs })) },
          recipeTags: { create: recipeTagIds.map((id) => ({ tagId: id })) },
          recipeIngredients: { create: recipeIngredients },
        },
      });
      const recipeWithCurrentVersion = await tx.recipe.update({
        where: { id: recipe.id },
        data: { currentVersionId: recipeVersion.id },
      });

      return recipeWithCurrentVersion;
    });
  }

  async updateRateStats(id: string, rateStats: Partial<RateStats>): Promise<Recipe> {
    return this.prisma.recipe.update({
      where: { id },
      data: rateStats,
    });
  }

  async delete(id: string): Promise<Recipe> {
    return this.prisma.recipe.delete({
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

  async setVersion(recipeId: string, versionId: string): Promise<Recipe> {
    return this.prisma.recipe.update({
      where: { id: recipeId },
      data: { currentVersionId: versionId },
    });
  }

  async addVersionAndSetCurrent(recipeId: string, data: AddVersionData) {
    const { recipeSteps, recipeTagIds, recipeIngredients, previewImageFilename, ...restData } =
      data;

    return this.prisma.$transaction(async (tx) => {
      const lastVersion = await tx.recipeVersion.findFirst({
        where: { recipeId },
        orderBy: { version: 'desc' },
        take: 1,
      });

      const newVersion = await tx.recipeVersion.create({
        data: {
          recipeId,
          version: lastVersion ? lastVersion.version + 1 : 1,
          previewImage: previewImageFilename,
          recipeSteps: { create: recipeSteps.map((rs) => ({ content: rs })) },
          recipeTags: { create: recipeTagIds.map((id) => ({ tagId: id })) },
          recipeIngredients: { create: recipeIngredients },
          ...restData,
        },
      });

      return tx.recipe.update({
        where: { id: recipeId },
        data: { currentVersionId: newVersion.id },
      });
    });
  }
}
