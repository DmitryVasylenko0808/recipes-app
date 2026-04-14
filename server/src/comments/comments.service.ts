import { Injectable } from '@nestjs/common';
import { CommentRepository } from './comment.repository';
import { GetCommentsQueryDto } from './dtos/get.comments.query.dto';

@Injectable()
export class CommentsService {
  constructor(private readonly commentsRepository: CommentRepository) {}

  async getCommentsByRecipeId(recipeId: string, options: GetCommentsQueryDto) {
    const [comments, totalCount] = await Promise.all([
      this.commentsRepository.findManyByRecipeId(recipeId, options),
      this.commentsRepository.count({ recipeId }),
    ]);

    return {
      data: comments,
      totalCount,
      totalPage: Math.ceil(totalCount / options.limit),
      currentPage: options.page,
    };
  }
}
