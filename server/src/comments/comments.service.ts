import { Injectable, NotFoundException } from '@nestjs/common';
import { CommentRepository } from './comment.repository';
import { GetCommentsQueryDto } from './dtos/get.comments.query.dto';
import { PostCommentRequestDto } from './dtos/post.comment.request.dto';
import { UpdateCommentRequestDto } from './dtos/update.comment.request.dto';
import { CommentsMapper } from './mappers/comments.mapper';
import { paginated } from 'src/common/utils/paginated';

@Injectable()
export class CommentsService {
  constructor(
    private readonly commentsRepository: CommentRepository,
    private readonly commentsMapper: CommentsMapper
  ) {}

  async getCommentsByRecipeId(recipeId: string, options: GetCommentsQueryDto) {
    const { limit, page } = options;

    const { data, totalCount } = await this.commentsRepository.findManyByRecipeId(
      recipeId,
      options
    );

    return paginated({
      data: data.map((c) => this.commentsMapper.toDto(c)),
      limit,
      totalCount,
      page,
    });
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
