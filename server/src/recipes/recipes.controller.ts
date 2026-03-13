import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { PrivateAuthGuard } from 'src/common/private-auth.guard';
import { CurrentUser } from 'src/common/current-user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/common/multer.config';
import {
  CreateRecipeRequestDto,
  GetRecipesQueryDto,
  GetRecipesResponseDto,
  RecipeDto,
  RecipeDetailsResponseDto,
  UpdateRecipeRequestDto,
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
    return new RecipeDetailsResponseDto(recipe);
  }

  @Post()
  @UseGuards(PrivateAuthGuard)
  @UseInterceptors(FileInterceptor('previewImage', multerOptions))
  async createRecipe(
    @CurrentUser('id') authorId: string,
    @Body() dto: CreateRecipeRequestDto,
    @UploadedFile() previewImageFile: Express.Multer.File
  ) {
    const recipe = await this.recipesService.create(authorId, dto, previewImageFile.filename);
    return new RecipeDto(recipe);
  }

  @Patch(':id')
  @UseGuards(PrivateAuthGuard)
  @UseInterceptors(FileInterceptor('previewImage', multerOptions))
  async updateRecipe(
    @Param('id') id: string,
    @Body() dto: UpdateRecipeRequestDto,
    @UploadedFile() previewImageFile?: Express.Multer.File
  ) {
    const recipe = await this.recipesService.update(id, dto, previewImageFile?.filename);
    return new RecipeDto(recipe);
  }

  @Delete(':id')
  @UseGuards(PrivateAuthGuard)
  async deleteRecipe(@Param('id') id: string) {
    const recipe = await this.recipesService.delete(id);
    return new RecipeDto(recipe);
  }
}
