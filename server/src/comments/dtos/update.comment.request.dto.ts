import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateCommentRequestDto {
  @IsOptional()
  @IsNotEmpty({ message: 'Content is required' })
  content?: string;
}
