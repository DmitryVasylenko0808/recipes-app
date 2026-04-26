import { ApiProperty } from '@nestjs/swagger';
import { AuthorPreviewDto } from 'src/authors/dtos';

export class CommentResponseDto {
  @ApiProperty({
    description: 'Unique identifier of comment',
    example: 'b3c87e2b-235d-4d6c-9949-971ec4cc7aa7',
  })
  id: string;

  @ApiProperty({
    description: 'Unique identifier of comment',
    example: '399fc39a-3fce-4156-86cd-a33f4c486f98',
  })
  userId: string;

  @ApiProperty({
    description: 'Details of user',
    type: AuthorPreviewDto,
  })
  user: AuthorPreviewDto;

  @ApiProperty({
    description: 'Unique identifier of recipe',
    example: '399fc39a-3fce-4156-86cd-a33f4c486f98',
  })
  recipeId: string;

  @ApiProperty({
    description: 'Content of comment',
    example:
      'Cotidie acquiro amor sperno. Aggero campana beatus vero sum iste cogo truculenter dapifer.',
  })
  content: string;

  @ApiProperty({
    description: 'Date of sending comment',
    example: '2025-08-31T11:49:01.306Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Date of updating comment',
    example: '2025-08-31T11:49:01.306Z',
  })
  updatedAt: Date;
}
