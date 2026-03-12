import { Controller, Get, Param, Query } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import {
  GetRecipesQueryDto,
  GetRecipesResponseDto,
  RecipePreviewResponseDto,
  RecipeResponseDto,
} from './dtos';

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
}
