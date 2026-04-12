import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { CurrentUser } from 'src/common/current-user.decorator';
import { PrivateAuthGuard } from 'src/common/private-auth.guard';
import { PaginationQueryDto } from 'src/recipes/dtos';
import { GetFavoriteRecipesDto } from './dtos/get.favorite.recipes';
import { FavoriteRecipeDto } from './dtos/favorite.recipe.dto';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @UseGuards(PrivateAuthGuard)
  async getFavoriteRecipes(
    @CurrentUser('id') userId: string,
    @Query() queryDto: PaginationQueryDto
  ) {
    const result = await this.favoritesService.getFavoriteRecipesByUserId(userId, queryDto);
    return new GetFavoriteRecipesDto(result);
  }

  @Post()
  @UseGuards(PrivateAuthGuard)
  async addFavoriteRecipe(@CurrentUser('id') userId: string, @Body('recipeId') recipeId: string) {
    const data = await this.favoritesService.addFavoriteRecipe(userId, recipeId);
    return new FavoriteRecipeDto(data);
  }

  @Delete(':id')
  @UseGuards(PrivateAuthGuard)
  async deleteFavoriteRecipe(@Param('id') id: string) {
    const data = await this.favoritesService.deleteFavoriteRecipe(id);
    return new FavoriteRecipeDto(data);
  }
}
