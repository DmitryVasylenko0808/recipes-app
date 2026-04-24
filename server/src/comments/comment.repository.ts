import { Injectable } from '@nestjs/common';
import { ICommentsRepository } from './interfaces';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetCommentsQueryDto } from './dtos/get.comments.query.dto';
import {
  CommentUncheckedCreateInput,
  CommentUncheckedUpdateInput,
  CommentWhereInput,
} from 'src/generated/prisma/models';
import { Comment } from 'src/generated/prisma/client';
import { CommentList } from './types';

@Injectable()
export class CommentRepository implements ICommentsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findManyByRecipeId(recipeId: string, options: GetCommentsQueryDto): Promise<CommentList> {
    const { page, limit } = options;

    const [data, totalCount] = await this.prisma.$transaction([
      this.prisma.comment.findMany({
        where: { recipeId },
        include: { user: true },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.comment.count({
        where: {
          recipeId,
        },
      }),
    ]);

    return { data, totalCount };
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
