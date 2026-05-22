import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CommentRepository } from './comment.repository';
import { GetCommentsQueryDto } from './dtos/get.comments.query.dto';
import { PostCommentRequestDto } from './dtos/post.comment.request.dto';
import { UpdateCommentRequestDto } from './dtos/update.comment.request.dto';
import { CommentsMapper } from './mappers/comments.mapper';
import { paginated } from 'src/common/utils/paginated';
import { CommentListItem } from './types';

@Injectable()
export class CommentsService {
  constructor(
    private readonly commentsRepository: CommentRepository,
    private readonly commentsMapper: CommentsMapper
  ) {}

  async getCommentsByRecipeId(recipeId: string, options: GetCommentsQueryDto, userId?: string) {
    const { limit, page } = options;

    const { data, totalCount } = await this.commentsRepository.findManyByRecipeId(
      recipeId,
      options,
      userId
    );

    return paginated({
      data: data.map((c) => this.commentsMapper.toDto(c, { isLiked: this.isLiked(c) })),
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
    if (comment.userId !== userId)
      throw new ForbiddenException('Cannot update, you are not author the comment');

    const data = await this.commentsRepository.update(id, { userId, ...dto });

    return this.commentsMapper.toShortDto(data);
  }

  async deleteComment(id: string, userId: string) {
    const comment = await this.commentsRepository.findOneById(id);

    if (!comment) throw new NotFoundException('Comment is not found');
    if (comment.userId !== userId)
      throw new ForbiddenException('Cannot delete, you are not author the comment');

    const data = await this.commentsRepository.delete(id);

    return this.commentsMapper.toShortDto(data);
  }

  async addLikeComment(id: string, userId: string) {
    const like = await this.commentsRepository.findLike(id, userId);

    if (like) throw new ConflictException('This comment is already liked');

    const [_, addedLike] = await Promise.all([
      this.commentsRepository.update(id, { likesCount: { increment: 1 } }),
      this.commentsRepository.addLike(id, userId),
    ]);

    return this.commentsMapper.toLikeDto(addedLike);
  }

  async deleteLikeComment(id: string, userId: string) {
    const like = await this.commentsRepository.findLike(id, userId);

    if (!like) throw new BadRequestException("Cannot unlike, because you didn't like this comment");

    const [_, deletedLike] = await Promise.all([
      this.commentsRepository.update(id, { likesCount: { decrement: 1 } }),
      this.commentsRepository.deleteLike(id, userId),
    ]);

    return this.commentsMapper.toLikeDto(deletedLike);
  }

  private isLiked(comment: CommentListItem) {
    return !!comment.likes.length;
  }
}
