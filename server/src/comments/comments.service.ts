import { Injectable } from '@nestjs/common';
import { CommentRepository } from './comment.repository';
import { GetCommentsQueryDto } from './dtos/get.comments.query.dto';
import { PostCommentRequestDto } from './dtos/post.comment.request.dto';
import { RecipesService } from 'src/recipes/recipes.service';

@Injectable()
export class CommentsService {
  constructor(
    private readonly commentsRepository: CommentRepository,
    private readonly recipesService: RecipesService
  ) {}

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

  async postComment(recipeId: string, userId: string, dto: PostCommentRequestDto) {
    await this.recipesService.getOneById(recipeId);

    return await this.commentsRepository.create({ recipeId, userId, ...dto });
  }
}
