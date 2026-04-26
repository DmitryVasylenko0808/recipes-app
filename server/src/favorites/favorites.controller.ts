import { Body, Controller, Delete, Get, Post, Query, UseGuards } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { CurrentUser } from 'src/common/current-user.decorator';
import { PrivateAuthGuard } from 'src/common/private-auth.guard';
import { PaginationQueryDto } from 'src/recipes/dtos';
import { FavoriteRecipeDto } from './dtos/favorite.recipe.dto';
import { FavoriteRecipeShortDto } from './dtos/favorite.recipe.short.dto';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ApiPaginatedResponse } from 'src/common/api-paginated-response.decorator';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @UseGuards(PrivateAuthGuard)
  @ApiBearerAuth()
  @ApiPaginatedResponse(FavoriteRecipeDto)
  @ApiUnauthorizedResponse({ description: 'Unathorized' })
  async getFavoriteRecipes(
    @CurrentUser('id') userId: string,
    @Query() queryDto: PaginationQueryDto
  ) {
    return this.favoritesService.getFavoriteRecipesByUserId(userId, queryDto);
  }

  @Post()
  @UseGuards(PrivateAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: FavoriteRecipeShortDto })
  @ApiUnauthorizedResponse({ description: 'Unathorized' })
  async addFavoriteRecipe(@CurrentUser('id') userId: string, @Body('recipeId') recipeId: string) {
    return this.favoritesService.addFavoriteRecipe(userId, recipeId);
  }

  @Delete()
  @UseGuards(PrivateAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: FavoriteRecipeShortDto })
  @ApiUnauthorizedResponse({ description: 'Unathorized' })
  @ApiNotFoundResponse({ description: 'Favorite recipe is not found' })
  async deleteFavoriteRecipe(
    @CurrentUser('id') userId: string,
    @Body('recipeId') recipeId: string
  ) {
    return this.favoritesService.deleteFavoriteRecipe(userId, recipeId);
  }
}
