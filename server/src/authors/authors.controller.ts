import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { PrivateAuthGuard } from 'src/common/private-auth.guard';
import { CurrentUser } from 'src/common/current-user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/common/multer.config';
import { RecipesService } from 'src/recipes/services/recipes.service';
import { GetAuthorRecipesQueryDto, RecipePreviewResponseDto } from 'src/recipes/dtos';
import { AuthorDetailsDto, UpdateAuthorRequestDto } from './dtos';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { OptionalAuthGuard } from 'src/common/optional-auth.guard';
import { ApiPaginatedResponse } from 'src/common/api-paginated-response.decorator';

@ApiTags('Authors')
@Controller('authors')
export class AuthorsController {
  constructor(
    private readonly authorsService: AuthorsService,
    private readonly recipesService: RecipesService
  ) {}

  @Get(':id')
  @ApiOkResponse({ type: AuthorDetailsDto })
  @ApiNotFoundResponse({ description: 'Author is not found' })
  async getAuthorById(@Param('id') id: string) {
    return this.authorsService.getAuthorById(id);
  }

  @Patch()
  @UseGuards(PrivateAuthGuard)
  @UseInterceptors(FileInterceptor('avatar', multerOptions))
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiOkResponse({ type: AuthorDetailsDto })
  @ApiUnauthorizedResponse({ description: 'Unathorized' })
  async updateAuthor(
    @CurrentUser('id') userId: string,
    @Body() dto: UpdateAuthorRequestDto,
    @UploadedFile() avatarFile?: Express.Multer.File
  ) {
    return this.authorsService.updateAuthor(userId, dto, avatarFile?.filename);
  }

  @Get(':id/recipes')
  @UseGuards(OptionalAuthGuard)
  @ApiPaginatedResponse(RecipePreviewResponseDto)
  async getRecipesByAuthorId(
    @Param('id') id: string,
    @Query() queryDto: GetAuthorRecipesQueryDto,
    @CurrentUser('id') userId?: string
  ) {
    return this.recipesService.getByAuthorId(id, queryDto, userId);
  }
}
