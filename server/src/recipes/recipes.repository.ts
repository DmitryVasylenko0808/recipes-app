import { Injectable } from '@nestjs/common';
import { IRecipesRepository } from './interfaces';
import { RecipeDetails, RecipeFindManyResult } from './recipes.types';
import { Recipe } from 'src/generated/prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { RecipeWhereInput } from 'src/generated/prisma/models';
import {
  CreateRecipeRequestDto,
  GetAuthorRecipesQueryDto,
  GetRecipesQueryDto,
  UpdateRecipeRequestDto,
} from './dtos';

@Injectable()
export class RecipesRepository implements IRecipesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<RecipeDetails | null> {
    return await this.prisma.recipe.findUnique({
      where: { id },
      include: {
        category: true,
        author: true,
        recipeTags: {
          include: { tag: true },
        },
        recipeIngredients: {
          include: { ingredient: true },
        },
      },
    });
  }

  async findMany(options: GetRecipesQueryDto): Promise<RecipeFindManyResult> {
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

    const [data, totalCount] = await Promise.all([
      this.prisma.recipe.findMany({
        where: filter,
        include: {
          category: true,
          recipeTags: {
            include: { tag: true },
          },
        },
        skip: limit * (page - 1),
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.recipe.count({ where: filter }),
    ]);
    const totalPages = Math.ceil(totalCount / limit);

    return {
      data,
      totalCount,
      totalPages,
      currentPage: page,
    };
  }

  async findManyByAuthorId(
    authorId: string,
    options: GetAuthorRecipesQueryDto
  ): Promise<RecipeFindManyResult> {
    const { page, limit } = options;

    const [data, totalCount] = await Promise.all([
      this.prisma.recipe.findMany({
        where: { authorId },
        include: {
          category: true,
          recipeTags: {
            include: { tag: true },
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
    const totalPages = Math.ceil(totalCount / limit);

    return {
      data,
      totalCount,
      totalPages,
      currentPage: page,
    };
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

  async delete(id: string): Promise<Recipe> {
    return await this.prisma.recipe.delete({
      where: { id },
    });
  }
}
