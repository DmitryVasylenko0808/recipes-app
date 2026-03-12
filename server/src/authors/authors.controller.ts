import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { GetAuthorRequestDto, UpdateAuthorRequestDto, UpdateAuthorResponseDto } from './dtos';
import { PrivateAuthGuard } from 'src/common/private-auth.guard';
import { CurrentUser } from 'src/common/current-user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/common/multer.config';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Get(':id')
  async getAuthorById(@Param('id') id: string) {
    const author = await this.authorsService.getAuthorById(id);
    return new GetAuthorRequestDto(author);
  }

  @Patch()
  @UseGuards(PrivateAuthGuard)
  @UseInterceptors(FileInterceptor('avatar', multerOptions))
  async updateAuthor(
    @CurrentUser('id') userId: string,
    @Body() dto: UpdateAuthorRequestDto,
    @UploadedFile() avatarFile?: Express.Multer.File
  ) {
    const author = await this.authorsService.updateAuthor(userId, dto, avatarFile?.filename);
    return new UpdateAuthorResponseDto(author);
  }
}
