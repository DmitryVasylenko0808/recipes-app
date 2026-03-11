import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { GetAuthorRequestDto, UpdateAuthorRequestDto, UpdateAuthorResponseDto } from './dtos';
import { PrivateAuthGuard } from 'src/common/private-auth.guard';
import { CurrentUser } from 'src/common/current-user.decorator';

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
  async updateAuthor(@CurrentUser('id') userId: string, @Body() dto: UpdateAuthorRequestDto) {
    const author = await this.authorsService.updateAuthor(userId, dto);
    return new UpdateAuthorResponseDto(author);
  }
}
