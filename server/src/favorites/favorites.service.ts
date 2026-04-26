import { Injectable, NotFoundException } from '@nestjs/common';
import { FavoritesRepository } from './favorites.repository';
import { PaginationQueryDto } from 'src/recipes/dtos';
import { FavoritesMapper } from './mappers/favorites.mapper';
import { paginated } from 'src/common/utils/paginated';

@Injectable()
export class FavoritesService {
  constructor(
    private readonly favoritesRepository: FavoritesRepository,
    private readonly favoritesMapper: FavoritesMapper
  ) {}

  async getFavoriteRecipesByUserId(userId: string, options: PaginationQueryDto) {
    const { limit, page } = options;

    const { data, totalCount } = await this.favoritesRepository.findManyByUserId(userId, options);

    return paginated({
      data: data.map((f) => this.favoritesMapper.toDto(f)),
      limit,
      totalCount,
      page,
    });
  }

  async addFavoriteRecipe(userId: string, recipeId: string) {
    const favoriteRecipe = await this.favoritesRepository.create(userId, recipeId);

    return this.favoritesMapper.toShortDto(favoriteRecipe);
  }

  async deleteFavoriteRecipe(userId: string, recipeId: string) {
    const favoriteRecipe = await this.favoritesRepository.findOne(userId, recipeId);

    if (!favoriteRecipe) throw new NotFoundException('Favorite recipe is not found');

    const deletedFavoriteRecipe = await this.favoritesRepository.deleteOne(userId, recipeId);

    return this.favoritesMapper.toShortDto(deletedFavoriteRecipe);
  }
}
