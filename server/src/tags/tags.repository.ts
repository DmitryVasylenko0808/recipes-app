import { Injectable } from '@nestjs/common';
import { Tag } from 'src/generated/prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ITagsRepository } from './interfaces';

@Injectable()
export class TagsRepository implements ITagsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findMany(): Promise<Tag[]> {
    return this.prisma.tag.findMany();
  }
}
