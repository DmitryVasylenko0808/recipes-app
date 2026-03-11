import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthorsRepository } from './authors.repository';

@Injectable()
export class AuthorsService {
  constructor(private readonly authorsRepository: AuthorsRepository) {}

  async getAuthorById(id: string) {
    const author = await this.authorsRepository.findById(id);

    if (!author) throw new NotFoundException('Author is not found');

    return author;
  }

  async createAuthor(data: unknown) {}
  async updateAuthor(data: unknown) {}
}
