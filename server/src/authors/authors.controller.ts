import { Controller, Get, Param, Patch } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { GetOneAuthorDto } from './dtos';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Get(':id')
  async getAuthorById(@Param('id') id: string) {
    const author = await this.authorsService.getAuthorById(id);
    return new GetOneAuthorDto(author);
  }

  @Patch()
  async updateAuthor(userId: number) {
    throw new Error('Not implemented');
  }
}
