import { FavoriteRecipe } from 'src/generated/prisma/client';
import { FindManyFavoritesResult } from './types';
import { PaginationQueryDto } from 'src/recipes/dtos';
import { FavoriteRecipeWhereInput } from 'src/generated/prisma/models';

export interface IFavoritesRepository {
  findManyByUserId(userId: string, options: PaginationQueryDto): Promise<FindManyFavoritesResult>;
  findOne(userId: string, recipeId: string): Promise<FavoriteRecipe | null>;
  create(userId: string, recipeId: string): Promise<FavoriteRecipe>;
  deleteOne(userId: string, recipeId: string): Promise<FavoriteRecipe>;
  count(filter: FavoriteRecipeWhereInput): Promise<number>;
}
