import { Injectable } from '@nestjs/common';
import { CommentListItem } from '../types';
import { CommentResponseDto } from '../dtos/get.comments.response.dto';
import { Comment } from 'src/generated/prisma/client';
import { CommentShortDto } from '../dtos/comment.short.dto';
import { transformImage } from 'src/common/utils/transform-image';

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

  toDto(comment: CommentListItem): CommentResponseDto {
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
      createdAt: comment.createdAt,
      updatedAt: comment.updatedAt,
    };
  }
}
