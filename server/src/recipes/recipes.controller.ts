import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { RecipesService } from './services/recipes.service';
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
  RecipePreviewResponseDto,
} from './dtos';
import {
  ApiBadRequestResponse,
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
import { GetCommentsResponseDto } from 'src/comments/dtos/get.comments.response.dto';
import { GetCommentsQueryDto } from 'src/comments/dtos/get.comments.query.dto';
import { CommentShortDto } from 'src/comments/dtos/comment.short.dto';
import { PostCommentRequestDto } from 'src/comments/dtos/post.comment.request.dto';
import { CommentsService } from 'src/comments/comments.service';
import { RateRecipeRequestDto } from './dtos/requests/rate.recipe.request.dto';
import { RatingsService } from './services/ratings.service';
import { RatingDto } from './dtos/responses/rating.response.dto';

@ApiTags('Recipes')
@Controller('recipes')
export class RecipesController {
  constructor(
    private readonly recipesService: RecipesService,
    private readonly commentsService: CommentsService,
    private readonly ratingsService: RatingsService
  ) {}

  @Get()
  @UseGuards(OptionalAuthGuard)
  @ApiOkResponse({ type: GetRecipesResponseDto })
  async getAll(@Query() queryDto: GetRecipesQueryDto, @CurrentUser('id') userId?: string) {
    return this.recipesService.getAll(queryDto, userId);
  }

  @Get('trending')
  @UseGuards(OptionalAuthGuard)
  @ApiOkResponse({ type: [RecipePreviewResponseDto] })
  async getTrending(@CurrentUser('id') userId?: string) {
    return this.recipesService.getTrending(userId);
  }

  @Get('popular')
  @UseGuards(OptionalAuthGuard)
  @ApiOkResponse({ type: [RecipePreviewResponseDto] })
  async getPopular(@CurrentUser('id') userId?: string) {
    return this.recipesService.getPopular(userId);
  }

  @Get(':id')
  @UseGuards(OptionalAuthGuard)
  @ApiOkResponse({ type: RecipeDetailsResponseDto })
  @ApiNotFoundResponse({ description: 'Recipe is not found' })
  async getOneById(@Param('id') id: string, @CurrentUser('id') userId?: string) {
    return this.recipesService.getOneById(id, userId);
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
    return this.recipesService.create(authorId, dto, previewImageFile.filename);
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
    return this.recipesService.update(id, userId, dto, previewImageFile?.filename);
  }

  @Delete(':id')
  @UseGuards(PrivateAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: RecipeDto })
  @ApiNotFoundResponse({ description: 'Cannot delete non-existed recipe' })
  async deleteRecipe(@Param('id') id: string) {
    return this.recipesService.delete(id);
  }

  @Patch(':id/views')
  async incrementViews(@Param('id') id: string) {
    await this.recipesService.incrementViews(id);
  }

  @Put(':id/ratings')
  @UseGuards(PrivateAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: RatingDto })
  @ApiUnauthorizedResponse({ description: 'Unathorized' })
  @ApiBadRequestResponse({ description: 'Cannot rate non-existed recipe' })
  async rateRecipe(
    @Param('id') id: string,
    @CurrentUser('id') userId: string,
    @Body() dto: RateRecipeRequestDto
  ) {
    return this.ratingsService.rateRecipe(userId, id, dto);
  }

  @Get(':id/similar')
  @UseGuards(OptionalAuthGuard)
  async getSimilar(@Param('id') id: string, @CurrentUser('id') userId?: string) {
    return this.recipesService.getSimilar(id, userId);
  }

  @Get(':id/comments')
  @ApiOkResponse({ type: GetCommentsResponseDto })
  async getCommentsByRecipeId(@Param('id') id: string, @Query() queryDto: GetCommentsQueryDto) {
    return this.commentsService.getCommentsByRecipeId(id, queryDto);
  }

  @Post(':id/comments')
  @UseGuards(PrivateAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: CommentShortDto })
  @ApiUnauthorizedResponse({ description: 'Unathorized' })
  async postComment(
    @Param('id') id: string,
    @CurrentUser('id') userId: string,
    @Body() dto: PostCommentRequestDto
  ) {
    return this.commentsService.postComment(id, userId, dto);
  }
}
