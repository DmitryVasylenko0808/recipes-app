import { Injectable, NotFoundException } from '@nestjs/common';
import { FavoritesRepository } from './favorites.repository';
import { PaginationQueryDto } from 'src/recipes/dtos';

@Injectable()
export class FavoritesService {
  constructor(private readonly favoritesRepository: FavoritesRepository) {}

  async getFavoriteRecipesByUserId(userId: string, options: PaginationQueryDto) {
    const { data, totalCount } = await this.favoritesRepository.findManyByUserId(userId, options);

    return {
      data,
      totalCount,
      totalPages: Math.ceil(totalCount / options.limit),
      currentPage: options.page,
    };
  }

  async addFavoriteRecipe(userId: string, recipeId: string) {
    return await this.favoritesRepository.create(userId, recipeId);
  }

  async deleteFavoriteRecipe(userId: string, recipeId: string) {
    const favoriteRecipe = await this.favoritesRepository.findOne(userId, recipeId);

    if (!favoriteRecipe) throw new NotFoundException('Favorite recipe is not found');

    return await this.favoritesRepository.deleteOne(userId, recipeId);
  }
}
