import { Controller, Get, Param } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { RecipeResponseDto } from './dtos';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Get(':id')
  async getOneById(@Param('id') id: string) {
    const recipe = await this.recipesService.getOneById(id);
    return new RecipeResponseDto(recipe);
  }
}
