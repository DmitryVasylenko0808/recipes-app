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
import { PrivateAuthGuard } from 'src/common/private-auth.guard';
import { CurrentUser } from 'src/common/current-user.decorator';
import { CommentShortDto } from './dtos/comment.short.dto';
import { UpdateCommentRequestDto } from './dtos/update.comment.request.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CommentLikeResponseDto } from './dtos/comment.like.response.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Patch(':id')
  @UseGuards(PrivateAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: CommentShortDto })
  @ApiUnauthorizedResponse({ description: 'Unathorized' })
  @ApiNotFoundResponse({ description: 'Comment is not found' })
  async updateComment(
    @Param('id') id: string,
    @CurrentUser('id') userId: string,
    @Body() dto: UpdateCommentRequestDto
  ) {
    return this.commentsService.updateComment(id, userId, dto);
  }

  @Delete(':id')
  @UseGuards(PrivateAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: CommentShortDto })
  @ApiUnauthorizedResponse({ description: 'Unathorized' })
  @ApiNotFoundResponse({ description: 'Comment is not found' })
  async deleteComment(@Param('id') id: string) {
    return this.commentsService.deleteComment(id);
  }

  @Post(':id/likes')
  @UseGuards(PrivateAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: CommentLikeResponseDto })
  @ApiUnauthorizedResponse({ description: 'Unathorized' })
  @ApiConflictResponse({ description: 'This comment is already liked' })
  async likeComment(@Param('id') id: string, @CurrentUser('id') userId: string) {
    return this.commentsService.addLikeComment(id, userId);
  }

  @Delete(':id/likes')
  @UseGuards(PrivateAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: CommentLikeResponseDto })
  @ApiUnauthorizedResponse({ description: 'Unathorized' })
  @ApiBadRequestResponse({ description: "Cannot unlike, because you didn't like this comment" })
  async deleteLikeComment(@Param('id') id: string, @CurrentUser('id') userId: string) {
    return this.commentsService.deleteLikeComment(id, userId);
  }
}
