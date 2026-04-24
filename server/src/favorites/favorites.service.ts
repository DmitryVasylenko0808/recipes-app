import { Injectable, NotFoundException } from '@nestjs/common';
import { FavoritesRepository } from './favorites.repository';
import { PaginationQueryDto } from 'src/recipes/dtos';
import { GetFavoriteRecipesDto } from './dtos/get.favorite.recipes';
import { FavoriteRecipeDto } from './dtos/favorite.recipe.dto';

@Injectable()
export class FavoritesService {
  constructor(private readonly favoritesRepository: FavoritesRepository) {}

  async getFavoriteRecipesByUserId(userId: string, options: PaginationQueryDto) {
    const { data, totalCount } = await this.favoritesRepository.findManyByUserId(userId, options);

    return new GetFavoriteRecipesDto({
      data,
      totalCount,
      totalPages: Math.ceil(totalCount / options.limit),
      currentPage: options.page,
    });
  }

  async addFavoriteRecipe(userId: string, recipeId: string) {
    const favoriteRecipe = await this.favoritesRepository.create(userId, recipeId);

    return new FavoriteRecipeDto(favoriteRecipe);
  }

  async deleteFavoriteRecipe(userId: string, recipeId: string) {
    const favoriteRecipe = await this.favoritesRepository.findOne(userId, recipeId);

    if (!favoriteRecipe) throw new NotFoundException('Favorite recipe is not found');

    return new FavoriteRecipeDto(favoriteRecipe);
  }
}
