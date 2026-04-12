import { Injectable, NotFoundException } from '@nestjs/common';
import { FavoritesRepository } from './favorites.repository';
import { PaginationQueryDto } from 'src/recipes/dtos';

@Injectable()
export class FavoritesService {
  constructor(private readonly favoritesRepository: FavoritesRepository) {}

  async getFavoriteRecipesByUserId(userId: string, options: PaginationQueryDto) {
    const [data, totalCount] = await Promise.all([
      this.favoritesRepository.findFavoriteRecipesByUserId(userId, options),
      this.favoritesRepository.count({ userId }),
    ]);

    return {
      data,
      totalCount,
      totalPage: Math.ceil(totalCount / options.limit),
      currentPage: options.page,
    };
  }

  async addFavoriteRecipe(userId: string, recipeId: string) {
    return await this.favoritesRepository.create(userId, recipeId);
  }

  async deleteFavoriteRecipe(id: string) {
    const favoriteRecipe = await this.favoritesRepository.findOneById(id);

    if (!favoriteRecipe) throw new NotFoundException('Favorite recipe is not found');

    return await this.favoritesRepository.deleteById(id);
  }
}
