import { Injectable } from '@nestjs/common';
import { CommentFindManyResultItem, ICommentsRepository } from './interfaces';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetCommentsQueryDto } from './dtos/get.comments.query.dto';
import {
  CommentUncheckedCreateInput,
  CommentUncheckedUpdateInput,
  CommentWhereInput,
} from 'src/generated/prisma/models';
import { Comment } from 'src/generated/prisma/client';

@Injectable()
export class CommentRepository implements ICommentsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findManyByRecipeId(
    recipeId: string,
    options: GetCommentsQueryDto
  ): Promise<CommentFindManyResultItem[]> {
    const { page, limit } = options;

    return await this.prisma.comment.findMany({
      where: { recipeId },
      include: { user: true },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async findOneById(id: string): Promise<Comment | null> {
    return await this.prisma.comment.findUnique({ where: { id } });
  }

  async create(data: CommentUncheckedCreateInput): Promise<Comment> {
    return await this.prisma.comment.create({ data });
  }

  async update(id: string, data: CommentUncheckedUpdateInput): Promise<Comment> {
    return await this.prisma.comment.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<Comment> {
    return await this.prisma.comment.delete({ where: { id } });
  }

  async count(filter?: CommentWhereInput): Promise<number> {
    return await this.prisma.comment.count({ where: filter });
  }
}
