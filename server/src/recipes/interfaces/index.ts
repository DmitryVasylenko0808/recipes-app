import { Rating, Recipe } from 'src/generated/prisma/client';
import {
  GetRecipesQueryDto,
  GetAuthorRecipesQueryDto,
  CreateRecipeRequestDto,
  UpdateRecipeRequestDto,
} from '../dtos';
import { RangeDate, RateStats, RecipeListItem, RecipeList, RecipeFull } from '../recipes.types';

export interface IRecipesRepository {
  findById(id: string): Promise<RecipeFull | null>;
  findMany(options: GetRecipesQueryDto, userId?: string): Promise<RecipeList>;
  findTrending(limit: number, rangeDate: RangeDate, userId?: string): Promise<RecipeListItem[]>;
  findPopular(limit: number, userId?: string): Promise<RecipeListItem[]>;
  findManyByAuthorId(authorId: string, options: GetAuthorRecipesQueryDto): Promise<RecipeList>;
  findByCategoryId(categoryId: string, userId?: string): Promise<RecipeListItem[]>;
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
