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
  CreateRecipeRequestMultipartDto,
  UpdateRecipeRequestMultipartDto,
} from './dtos';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { OptionalAuthGuard } from 'src/common/optional-auth.guard';

@ApiTags('Recipes')
@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Get()
  @UseGuards(OptionalAuthGuard)
  @ApiOkResponse({ type: GetRecipesResponseDto })
  async getAll(@Query() queryDto: GetRecipesQueryDto, @CurrentUser('id') userId?: string) {
    const recipes = await this.recipesService.getAll(queryDto, userId);
    return new GetRecipesResponseDto(recipes);
  }

  @Get(':id')
  @UseGuards(OptionalAuthGuard)
  @ApiOkResponse({ type: RecipeDetailsResponseDto })
  @ApiNotFoundResponse({ description: 'Recipe is not found' })
  async getOneById(@Param('id') id: string, @CurrentUser('id') userId?: string) {
    const recipe = await this.recipesService.getOneById(id, userId);
    return new RecipeDetailsResponseDto(recipe);
  }

  @Post()
  @UseGuards(PrivateAuthGuard)
  @UseInterceptors(FileInterceptor('previewImage', multerOptions))
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateRecipeRequestMultipartDto })
  @ApiOkResponse({ type: RecipeDto })
  @ApiUnauthorizedResponse({ description: 'Unathorized' })
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
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UpdateRecipeRequestMultipartDto })
  @ApiOkResponse({ type: RecipeDto })
  @ApiUnauthorizedResponse({ description: 'Unathorized' })
  @ApiNotFoundResponse({ description: 'Recipe is not found' })
  @ApiForbiddenResponse({ description: 'Not author of recipe' })
  async updateRecipe(
    @CurrentUser('id') userId: string,
    @Param('id') id: string,
    @Body() dto: UpdateRecipeRequestDto,
    @UploadedFile() previewImageFile?: Express.Multer.File
  ) {
    const recipe = await this.recipesService.update(id, userId, dto, previewImageFile?.filename);
    return new RecipeDto(recipe);
  }

  @Delete(':id')
  @UseGuards(PrivateAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: RecipeDto })
  @ApiNotFoundResponse({ description: 'Cannot delete non-existed recipe' })
  async deleteRecipe(@Param('id') id: string) {
    const recipe = await this.recipesService.delete(id);
    return new RecipeDto(recipe);
  }

  @Patch(':id/views')
  async incrementViews(@Param('id') id: string) {
    await this.recipesService.incrementViews(id);
  }
}
