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
import { RecipesService } from 'src/recipes/recipes.service';
import { GetAuthorRecipesQueryDto, GetRecipesResponseDto } from 'src/recipes/dtos';
import { GetAuthorRequestDto, UpdateAuthorRequestDto, UpdateAuthorResponseDto } from './dtos';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { OptionalAuthGuard } from 'src/common/optional-auth.guard';

@ApiTags('Authors')
@Controller('authors')
export class AuthorsController {
  constructor(
    private readonly authorsService: AuthorsService,
    private readonly recipesService: RecipesService
  ) {}

  @Get(':id')
  @ApiOkResponse({ type: GetAuthorRequestDto })
  @ApiNotFoundResponse({ description: 'Author is not found' })
  async getAuthorById(@Param('id') id: string) {
    const author = await this.authorsService.getAuthorById(id);
    return new GetAuthorRequestDto(author);
  }

  @Patch()
  @UseGuards(PrivateAuthGuard)
  @UseInterceptors(FileInterceptor('avatar', multerOptions))
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiOkResponse({ type: UpdateAuthorResponseDto })
  @ApiUnauthorizedResponse({ description: 'Unathorized' })
  async updateAuthor(
    @CurrentUser('id') userId: string,
    @Body() dto: UpdateAuthorRequestDto,
    @UploadedFile() avatarFile?: Express.Multer.File
  ) {
    const author = await this.authorsService.updateAuthor(userId, dto, avatarFile?.filename);
    return new UpdateAuthorResponseDto(author);
  }

  @Get(':id/recipes')
  @UseGuards(OptionalAuthGuard)
  @ApiOkResponse({ type: GetRecipesResponseDto })
  async getRecipesByAuthorId(
    @Param('id') id: string,
    @Query() queryDto: GetAuthorRecipesQueryDto,
    @CurrentUser('id') userId?: string
  ) {
    const recipes = await this.recipesService.getByAuthorId(id, queryDto, userId);
    return new GetRecipesResponseDto(recipes);
  }
}
