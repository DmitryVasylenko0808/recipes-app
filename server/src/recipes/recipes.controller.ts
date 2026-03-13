import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { RecipesService } from './recipes.service';
import {
  CreateRecipeDto,
  GetRecipesQueryDto,
  GetRecipesResponseDto,
  RecipeDto,
  RecipeResponseDto,
  UpdateRecipeDto,
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

  @Patch(':id')
  @UseGuards(PrivateAuthGuard)
  async updateRecipe(@Param('id') id: string, @Body() dto: UpdateRecipeDto) {
    const recipe = await this.recipesService.update(id, dto);
    return new RecipeDto(recipe);
  }

  @Delete(':id')
  @UseGuards(PrivateAuthGuard)
  async deleteRecipe(@Param('id') id: string) {
    const recipe = await this.recipesService.delete(id);
    return new RecipeDto(recipe);
  }
}
