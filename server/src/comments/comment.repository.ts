import { Injectable } from '@nestjs/common';
import { ICommentsRepository } from './interfaces';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetCommentsQueryDto } from './dtos/get.comments.query.dto';
import {
  CommentOrderByWithRelationInput,
  CommentUncheckedCreateInput,
  CommentUncheckedUpdateInput,
  CommentWhereInput,
} from 'src/generated/prisma/models';
import { Comment } from 'src/generated/prisma/client';
import { CommentList, SortCommentsPreset } from './types';

@Injectable()
export class CommentRepository implements ICommentsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findManyByRecipeId(
    recipeId: string,
    options: GetCommentsQueryDto,
    userId?: string
  ): Promise<CommentList> {
    const { page, limit, sortPreset = 'newest' } = options;

    const sortPresets: Record<SortCommentsPreset, CommentOrderByWithRelationInput> = {
      [SortCommentsPreset.NEWEST]: { createdAt: 'desc' },
      [SortCommentsPreset.POPULAR]: { likesCount: 'desc' },
    };

    const [data, totalCount] = await this.prisma.$transaction([
      this.prisma.comment.findMany({
        where: { recipeId },
        include: {
          user: true,
          likes: { where: { userId } },
        },
        orderBy: sortPresets[sortPreset],
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
    return this.prisma.comment.findUnique({ where: { id } });
  }

  async create(data: CommentUncheckedCreateInput): Promise<Comment> {
    return this.prisma.comment.create({ data });
  }

  async update(id: string, data: CommentUncheckedUpdateInput): Promise<Comment> {
    return this.prisma.comment.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<Comment> {
    return this.prisma.comment.delete({ where: { id } });
  }

  async count(filter?: CommentWhereInput): Promise<number> {
    return this.prisma.comment.count({ where: filter });
  }
}
