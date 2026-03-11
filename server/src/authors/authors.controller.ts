import { Controller, Get, Param, Patch } from '@nestjs/common';
import { AuthorsService } from './authors.service';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Get(':id')
  async getAuthorById(@Param('id') id: number) {
    throw new Error('Not implemented');
  }

  @Patch()
  async updateAuthor(userId: number) {
    throw new Error('Not implemented');
  }
}
