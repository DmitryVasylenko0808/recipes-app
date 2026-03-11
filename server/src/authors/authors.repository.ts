import { Injectable } from '@nestjs/common';
import { IAuthorsRepository } from './interfaces';
import { Author } from 'src/generated/prisma/client';
import { AuthorCreateInput, AuthorUpdateInput } from 'src/generated/prisma/models';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthorsRepository implements IAuthorsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<Author | null> {
    return await this.prisma.author.findUnique({
      where: { id },
    });
  }

  async findOneBy<K extends keyof Author, V extends Author[K]>(
    key: K,
    value: V
  ): Promise<Author | null> {
    return await this.prisma.author.findFirst({
      where: { [key]: value },
    });
  }

  async create(data: AuthorCreateInput): Promise<Author> {
    return await this.prisma.author.create({ data });
  }

  async update(data: AuthorUpdateInput): Promise<Author> {
    throw new Error('Method not implemented.');
  }
}
