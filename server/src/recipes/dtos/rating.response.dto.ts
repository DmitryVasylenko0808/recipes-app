import { ApiProperty } from '@nestjs/swagger';

export class RatingDto {
  @ApiProperty({
    description: 'Unique identifier of rating',
    example: '43dff760-fe8e-4f60-9dda-e593e924ebda',
  })
  id: string;

  @ApiProperty({
    description: 'Unique identifier of user',
    example: '43dff760-fe8e-4f60-9dda-e593e924ebda',
  })
  userId: string;

  @ApiProperty({
    description: 'Unique identifier of recipe',
    example: '43dff760-fe8e-4f60-9dda-e593e924ebda',
  })
  recipeId: string;

  @ApiProperty({
    description: 'Rate value of recipe',
    example: 4,
  })
  value: number;

  constructor(partial: Partial<RatingDto>) {
    Object.assign(this, partial);
  }
}
