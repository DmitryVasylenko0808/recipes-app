import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateCommentRequestDto {
  @ApiPropertyOptional({
    description: 'Content of comment',
    example:
      'Cotidie acquiro amor sperno. Aggero campana beatus vero sum iste cogo truculenter dapifer.',
  })
  @IsOptional()
  @IsNotEmpty({ message: 'Content is required' })
  content?: string;
}
