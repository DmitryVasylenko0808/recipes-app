import { Injectable } from '@nestjs/common';
import { Rating } from 'src/generated/prisma/client';
import { RatingDto } from '../dtos/responses/rating.response.dto';

@Injectable()
export class RatingsMapper {
  toDto(rating: Rating): RatingDto {
    return {
      id: rating.id,
      userId: rating.userId,
      recipeId: rating.recipeId,
      value: rating.value,
    };
  }
}
