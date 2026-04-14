import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { GetCommentsQueryDto } from './dtos/get.comments.query.dto';
import { GetCommentsResponseDto } from './dtos/get.comments.response.dto';
import { PostCommentRequestDto } from './dtos/post.comment.request.dto';
import { PrivateAuthGuard } from 'src/common/private-auth.guard';
import { CurrentUser } from 'src/common/current-user.decorator';
import { CommentResponseDto } from './dtos/comment.response.dto';
import { UpdateCommentRequestDto } from './dtos/update.comment.request.dto';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@Controller('recipes/:recipeId/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  @ApiOkResponse({ type: GetCommentsResponseDto })
  async getByRecipeId(@Param('recipeId') recipeId: string, @Query() queryDto: GetCommentsQueryDto) {
    const result = await this.commentsService.getCommentsByRecipeId(recipeId, queryDto);
    return new GetCommentsResponseDto(result);
  }

  @Post()
  @UseGuards(PrivateAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: CommentResponseDto })
  @ApiUnauthorizedResponse({ description: 'Unathorized' })
  @ApiNotFoundResponse({ description: 'Recipe is not found' })
  async postComment(
    @Param('recipeId') recipeId: string,
    @CurrentUser('id') userId: string,
    @Body() dto: PostCommentRequestDto
  ) {
    const result = await this.commentsService.postComment(recipeId, userId, dto);
    return new CommentResponseDto(result);
  }

  @Patch(':commentId')
  @UseGuards(PrivateAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: CommentResponseDto })
  @ApiUnauthorizedResponse({ description: 'Unathorized' })
  @ApiNotFoundResponse({ description: 'Recipe or comment is not found' })
  async updateComment(
    @Param('recipeId') recipeId: string,
    @Param('commentId') commentId: string,
    @CurrentUser('id') userId: string,
    @Body() dto: UpdateCommentRequestDto
  ) {
    const result = await this.commentsService.updateComment({ recipeId, commentId, userId, dto });
    return new CommentResponseDto(result);
  }

  @Delete(':commentId')
  @UseGuards(PrivateAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: CommentResponseDto })
  @ApiUnauthorizedResponse({ description: 'Unathorized' })
  @ApiNotFoundResponse({ description: 'Recipe or comment is not found' })
  async deleteComment(@Param('recipeId') recipeId: string, @Param('commentId') commentId: string) {
    const result = await this.commentsService.deleteComment(recipeId, commentId);
    return new CommentResponseDto(result);
  }
}
