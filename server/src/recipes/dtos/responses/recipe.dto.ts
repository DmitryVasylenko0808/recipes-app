import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class RecipeDto {
  @ApiProperty({
    description: 'Unique identifier of recipe',
    example: '43dff760-fe8e-4f60-9dda-e593e924ebda',
  })
  id: string;

  @ApiProperty({
    description: 'Show how many users viewed recipe',
    example: 50,
  })
  viewsCount: number;

  @ApiProperty({
    description: 'Show how many users rated recipe',
    example: 20,
  })
  ratingsCount: number;

  @ApiProperty({
    description: 'Average rating of recipe',
    example: 4.5,
  })
  @Transform(({ value }) => Math.round(value * 10) / 10)
  ratingsAvg: number;

  @ApiProperty({
    description: 'Published date of recipe',
    example: '2024-11-01T02:14:34.244Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Unique identifier of author',
    example: '43dff760-fe8e-4f60-9dda-e593e924ebda',
  })
  authorId: string;
}
