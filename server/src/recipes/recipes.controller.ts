import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import {
  CreateRecipeDto,
  GetRecipesQueryDto,
  GetRecipesResponseDto,
  RecipeDto,
  RecipePreviewResponseDto,
  RecipeResponseDto,
} from './dtos';
import { PrivateAuthGuard } from 'src/common/private-auth.guard';
import { CurrentUser } from 'src/common/current-user.decorator';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Get()
  async getAll(@Query() queryDto: GetRecipesQueryDto) {
    const recipes = await this.recipesService.getAll(queryDto);
    return new GetRecipesResponseDto(recipes);
  }

  @Get(':id')
  async getOneById(@Param('id') id: string) {
    const recipe = await this.recipesService.getOneById(id);
    return new RecipeResponseDto(recipe);
  }

  @Post()
  @UseGuards(PrivateAuthGuard)
  async createRecipe(@CurrentUser('id') authorId: string, @Body() dto: CreateRecipeDto) {
    const recipe = await this.recipesService.create(authorId, dto);
    return new RecipeDto(recipe);
  }
}
