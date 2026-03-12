import { Injectable } from '@nestjs/common';
import {
  CreateRecipeData,
  IRecipesRepository,
  RecipeDetails,
  RecipeFindManyOptions,
  RecipeFindManyResult,
  RecipePreview,
  UpdateRecipeData,
} from './interfaces';
import { Recipe } from 'src/generated/prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetRecipesQueryDto } from './dtos';

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

  async findMany(options: GetRecipesQueryDto): Promise<RecipeFindManyResult> {
    const {
      page,
      limit,
      search,
      minCookingTime,
      maxCookingTime,
      tagNames,
      ingredientNames,
      difficulties,
    } = options;

    const [data, totalCount] = await Promise.all([
      this.prisma.recipe.findMany({
        where: {
          title: { startsWith: search, mode: 'insensitive' },
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
        },
        include: {
          recipeTags: {
            include: {
              tag: true,
            },
          },
        },
        skip: limit * (page - 1),
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.recipe.count({
        where: {
          title: { startsWith: search, mode: 'insensitive' },
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
        },
      }),
    ]);
    const totalPages = Math.ceil(totalCount / limit);

    return {
      data,
      totalCount,
      totalPages,
      currentPage: page,
    };

    // return await this.prisma.recipe.findMany({
    //   where: {
    //     cookingTime,
    //     difficulty,
    //     title: {
    //       startsWith: search,
    //     },
    //     recipeTags: {
    //       some: {
    //         tagId: {
    //           in: tagsId,
    //         },
    //       },
    //     },
    //   },
    //   take: page * 10,
    //   skip: limit,
    //   include: {
    //     recipeTags: {
    //       include: {
    //         tag: true,
    //       },
    //     },
    //   },
    // });
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
