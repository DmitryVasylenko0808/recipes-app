import { FavoriteRecipe } from 'src/generated/prisma/client';
import { Favorite } from './types';
import { PaginationQueryDto } from 'src/recipes/dtos';
import { FavoriteRecipeWhereInput } from 'src/generated/prisma/models';

export interface IFavoritesRepository {
  findFavoriteRecipesByUserId(userId: string, options: PaginationQueryDto): Promise<Favorite[]>;
  findOneById(id: string): Promise<FavoriteRecipe | null>;
  create(userId: string, recipeId: string): Promise<FavoriteRecipe>;
  deleteById(id: string): Promise<FavoriteRecipe>;
  count(filter: FavoriteRecipeWhereInput): Promise<number>;
}
