import { Injectable, NotFoundException } from '@nestjs/common';
import { CommentRepository } from './comment.repository';
import { GetCommentsQueryDto } from './dtos/get.comments.query.dto';
import { PostCommentRequestDto } from './dtos/post.comment.request.dto';
import { UpdateCommentRequestDto } from './dtos/update.comment.request.dto';
import { CommentsMapper } from './mappers/comments.mapper';

@Injectable()
export class CommentsService {
  constructor(
    private readonly commentsRepository: CommentRepository,
    private readonly commentsMapper: CommentsMapper
  ) {}

  async getCommentsByRecipeId(recipeId: string, options: GetCommentsQueryDto) {
    const { data, totalCount } = await this.commentsRepository.findManyByRecipeId(
      recipeId,
      options
    );

    return {
      data: data.map((c) => this.commentsMapper.toDto(c)),
      totalCount,
      totalPages: Math.ceil(totalCount / options.limit),
      currentPage: options.page,
    };
  }

  async postComment(recipeId: string, userId: string, dto: PostCommentRequestDto) {
    const comment = await this.commentsRepository.create({ recipeId, userId, ...dto });

    return this.commentsMapper.toShortDto(comment);
  }

  async updateComment(id: string, userId: string, dto: UpdateCommentRequestDto) {
    const comment = await this.commentsRepository.findOneById(id);

    if (!comment) throw new NotFoundException('Comment is not found');

    const data = await this.commentsRepository.update(id, { userId, ...dto });

    return this.commentsMapper.toShortDto(data);
  }

  async deleteComment(id: string) {
    const comment = await this.commentsRepository.findOneById(id);

    if (!comment) throw new NotFoundException('Comment is not found');

    const data = await this.commentsRepository.delete(id);

    return this.commentsMapper.toShortDto(data);
  }
}
