import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthorsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAuthorById(id: string) {}
  async createAuthor(data: unknown) {}
  async updateAuthor(data: unknown) {}
}
