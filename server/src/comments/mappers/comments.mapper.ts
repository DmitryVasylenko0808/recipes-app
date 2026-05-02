import { Injectable } from '@nestjs/common';
import { CommentListItem } from '../types';
import { CommentResponseDto } from '../dtos/comment.response.dto';
import { Comment, CommentLike } from 'src/generated/prisma/client';
import { CommentShortDto } from '../dtos/comment.short.dto';
import { transformImage } from 'src/common/utils/transform-image';
import { CommentLikeResponseDto } from '../dtos/comment.like.response.dto';

@Injectable()
export class CommentsMapper {
  toShortDto(comment: Comment): CommentShortDto {
    return {
      id: comment.id,
      userId: comment.userId,
      recipeId: comment.recipeId,
      content: comment.content,
      createdAt: comment.createdAt,
      updatedAt: comment.updatedAt,
    };
  }

  toDto(comment: CommentListItem, context?: { isLiked?: boolean }): CommentResponseDto {
    return {
      id: comment.id,
      userId: comment.userId,
      user: {
        id: comment.user.id,
        firstname: comment.user.firstname,
        secondname: comment.user.secondname,
        avatar: transformImage(comment.user.avatar),
      },
      recipeId: comment.recipeId,
      content: comment.content,
      likesCount: comment.likesCount,
      createdAt: comment.createdAt,
      updatedAt: comment.updatedAt,
      ...context,
    };
  }

  toLikeDto(like: CommentLike): CommentLikeResponseDto {
    return {
      userId: like.userId,
      commentId: like.commentId,
    };
  }
}
