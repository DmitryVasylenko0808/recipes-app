import { Injectable } from '@nestjs/common';
import { FavoriteListItem } from '../types';
import { FavoriteRecipe } from 'src/generated/prisma/client';
import { FavoriteRecipeShortDto } from '../dtos/favorite.recipe.dto';
import { FavoriteRecipeDto } from '../dtos/get.favorite.recipes';
import { RecipesMapper } from 'src/recipes/mappers/recipes.mapper';

@Injectable()
export class FavoritesMapper {
  constructor(private readonly recipesMapper: RecipesMapper) {}

  toShortDto(favorite: FavoriteRecipe): FavoriteRecipeShortDto {
    return {
      id: favorite.id,
      userId: favorite.userId,
      recipeId: favorite.recipeId,
      favoritedAt: favorite.favoritedAt,
    };
  }

  toDto(favorite: FavoriteListItem): FavoriteRecipeDto {
    return {
      id: favorite.id,
      userId: favorite.userId,
      recipeId: favorite.recipeId,
      recipe: this.recipesMapper.toPreviewDto({ ...favorite.recipe, favoriteEntries: [] }),
      favoritedAt: favorite.favoritedAt,
    };
  }
}
