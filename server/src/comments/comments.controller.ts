import { Controller, Get, Param, Query } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { GetCommentsQueryDto } from './dtos/get.comments.query.dto';
import { GetCommentsResponseDto } from './dtos/get.comments.response.dto';

@Controller('recipes/:recipeId/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  async getByRecipeId(@Param('recipeId') recipeId: string, @Query() queryDto: GetCommentsQueryDto) {
    const result = await this.commentsService.getCommentsByRecipeId(recipeId, queryDto);
    return new GetCommentsResponseDto(result);
  }
}
