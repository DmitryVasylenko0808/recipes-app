import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class PostCommentRequestDto {
  @ApiProperty({
    description: 'Content of comment',
    example:
      'Cotidie acquiro amor sperno. Aggero campana beatus vero sum iste cogo truculenter dapifer.',
  })
  @IsNotEmpty({ message: 'Content is required' })
  content: string;
}
