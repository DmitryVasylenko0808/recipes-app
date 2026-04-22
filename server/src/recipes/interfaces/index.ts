import { Rating, Recipe } from 'src/generated/prisma/client';
import {
  GetRecipesQueryDto,
  GetAuthorRecipesQueryDto,
  CreateRecipeRequestDto,
  UpdateRecipeRequestDto,
} from '../dtos';
import {
  RangeDate,
  RateStats,
  RecipeFindManyItem,
  RecipeFindManyResult,
  RecipeFindOneResult,
} from '../recipes.types';

export interface IRecipesRepository {
  findById(id: string): Promise<RecipeFindOneResult | null>;
  findMany(options: GetRecipesQueryDto, userId?: string): Promise<RecipeFindManyResult>;
  findTrending(limit: number, rangeDate: RangeDate, userId?: string): Promise<RecipeFindManyItem[]>;
  findPopular(limit: number, userId?: string): Promise<RecipeFindManyItem[]>;
  findManyByAuthorId(
    authorId: string,
    options: GetAuthorRecipesQueryDto
  ): Promise<RecipeFindManyResult>;
  findByCategoryId(categoryId: string, userId?: string): Promise<RecipeFindManyItem[]>;
  create(
    authorId: string,
    data: CreateRecipeRequestDto,
    previewImageFilename: string
  ): Promise<Recipe>;
  update(id: string, data: UpdateRecipeRequestDto): Promise<Recipe>;
  updateRateStats(id: string, rateStats: Partial<RateStats>): Promise<Recipe>;
  delete(id: string): Promise<Recipe>;
  incrementViews(id: string): Promise<void>;
}

export interface IRatingsRepository {
  findOne(userId: string, recipeId: string): Promise<Rating | null>;
  upsert(userId: string, recipeId: string, value: number): Promise<Rating>;
}
